#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

#import "MQTTKit.h"
#import "BMRoom.h"
#import "WebRTC/WebRTC.h"

#if (DEBUG || TESTCASE)
#define BASE_LOG_FUN(format, ...) NSLog(format, ## __VA_ARGS__)
#else
#define BASE_LOG_FUN(format, ...)
#endif



@interface BMRoom ()
<RTCPeerConnectionDelegate, RTCEAGLVideoViewDelegate>


@property(nonatomic, strong) MQTTClient* mqtt;
@property(nonatomic, copy) NSString* mqttHost;
@property(nonatomic, copy) NSString* mcuID;
@property(nonatomic, copy) NSString* userID;
@property(nonatomic, copy) NSString* authData;

@property(nonatomic, copy) NSString* twilioUsername;
@property(nonatomic, copy) NSString* twilioPassword;

@property(nonatomic, strong) RTCPeerConnectionFactory* peerConnectionFactory;
@property(nonatomic, strong) NSMutableDictionary* peers;
@property(nonatomic, strong) NSMutableDictionary* peersInfo;
@property(nonatomic, strong) NSMutableDictionary* videosInfo;
@property(nonatomic, strong) NSMutableDictionary* streams;

@property(nonatomic, strong) NSMutableDictionary* actions;

@property(nonatomic, copy) NSString* frontCamID;
@property(nonatomic, copy) NSString* backCamID;

- (RTCVideoTrack*) _getLocalVideoTrack:(NSString*)videoStr;
- (RTCAudioTrack*) _getLocalAudioTrack:(NSString*)audioStr;

- (RTCMediaStream*) _getLocalStream:(NSString*)muxerID
                        enableVideo:(NSString*)video
                        enableAudio:(NSString*)audio;

- (void) _sendMessageToTopic:(NSString *)topic message:(NSDictionary *)msg;

- (void) _didCreateSessionDescription:(RTCPeerConnection *)peerConnection
                                  sdp:(RTCSessionDescription *)sdp
                                error:(NSError*)error;

@end

@implementation BMRoom {
    NSString* _roomChannel;
    NSString* _mcuChannel;
    NSString* _userChannel;
}


- (NSString*) getPeerID {
    NSString *alphabet =
    @"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY0123456789";
    NSMutableString *s = [NSMutableString stringWithCapacity:20];
    for (NSUInteger i = 0U; i < 20; i++) {
        u_int32_t r = arc4random() % [alphabet length];
        unichar c = [alphabet characterAtIndex:r];
        [s appendFormat:@"%C", c];
    }
    return s;
}

- (instancetype) initWithDelegate:(id<BMRoomDelegate>)delegate
                          options:(NSDictionary*)options {
    if (self = [super init]) {
        self.delegate = delegate;
        
        self.mqttHost = options[@"host"];
        self.mcuID = options[@"mcuID"];
        self.userID = options[@"userID"];
        self.authData = options[@"authData"];
        
        self.twilioUsername = options[@"twilioUsername"];
        self.twilioPassword = options[@"twilioPassword"];
        
        [RTCPeerConnectionFactory initialize];
        self.peerConnectionFactory = [[RTCPeerConnectionFactory alloc] init];
        
        self.muxersInfo = [[NSMutableDictionary alloc] init];
        self.peers = [[NSMutableDictionary alloc] init];
        self.peersInfo = [[NSMutableDictionary alloc] init];
        self.videosInfo = [[NSMutableDictionary alloc] init];
        self.streams = [[NSMutableDictionary alloc] init];
        self.videoViews = [[NSMutableDictionary alloc] init];
        self.screenViews = [[NSMutableDictionary alloc] init];
        self.usersInfo = [[NSMutableDictionary alloc] init];
        self.messagesInfo = [[NSMutableDictionary alloc] init];
        self.whiteboardInfo = [[NSMutableArray alloc] init];
        
        self.muteAllMic = @"";
        self.muteAllCam = @"";
        self.muteUserAudio = @"";
        self.muteUserVideo = @"";
        
        self.viewQA   = @"";
        self.enableQA = @"";
        
        self.mqtt = [[MQTTClient alloc] initWithClientId:self.userID];
        
        _roomChannel = @"room";
        _userChannel = [NSString stringWithFormat:@"user:%@:%@", self.userID, [self getPeerID]];
        _mcuChannel = [NSString stringWithFormat:@"room:%@", self.mcuID];
        
        
        __weak typeof(self) weakSelf = self;
        self.actions = [[NSMutableDictionary alloc] init];
        self.actions[@"stream:sdp"] = ^ (NSDictionary* msg) {
            NSString* mid = msg[@"muxerID"];
            if (!weakSelf.peers[mid]) return;
            
            RTCPeerConnection* peerConnection = weakSelf.peers[mid];
            if (!peerConnection) return;
            
            NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
            
            if (!weakSelf.peersInfo[key]) return;
            NSMutableDictionary *peerInfo = weakSelf.peersInfo[key];
            
            RTCSessionDescription* rsdp =
            [[RTCSessionDescription alloc] initWithType:RTCSdpTypePrAnswer sdp:msg[@"sdp"]];
            
            [peerConnection setRemoteDescription:rsdp completionHandler:^(NSError * _Nullable error) {
                peerInfo[@"remoteDescriptionSetted"] = @"true";
                
                while ([peerInfo[@"localCandidates"] count] > 0) {
                    NSDictionary* lcandidate = [peerInfo[@"localCandidates"] objectAtIndex:0];
                    [weakSelf _sendMessageToTopic:peerInfo[@"muxerChannel"] message:lcandidate];
                    [peerInfo[@"localCandidates"] removeObjectAtIndex:0];
                }
                BASE_LOG_FUN(@"Remote Description setted");
            }];
            
        };
        self.actions[@"stream:candidate"] = ^ (NSDictionary* msg) {
            if (!msg[@"sdpMid"] || !msg[@"sdpMLineIndex"] || !msg[@"candidate"]) return;
            NSString* mid = msg[@"muxerID"];
            if (!weakSelf.peers[mid]) return;
            
            NSString *cand_mid = msg[@"sdpMid"];
            NSString *cand_sdp = msg[@"candidate"];
            int cand_num = (int)[msg[@"sdpMLineIndex"] integerValue];
            RTCIceCandidate* rcandidate =
            [[RTCIceCandidate alloc] initWithSdp:cand_sdp sdpMLineIndex:cand_num sdpMid:cand_mid];
            RTCPeerConnection* peerConnection = weakSelf.peers[mid];
            if (!peerConnection) return;
            NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
            
            if (!weakSelf.peersInfo[key]) return;
            NSMutableDictionary *peerInfo = weakSelf.peersInfo[key];
            [weakSelf.peers[mid] addIceCandidate:rcandidate];
            
            if ([peerInfo[@"remoteDescriptionSetted"] isEqualToString:@"true"]) {
                //[weakSelf.peers[mid] addIceCandidate:rcandidate];
            } else {
                [peerInfo[@"remoteCandidates"] addObject:rcandidate];
            }
        };
        self.actions[@"stream:new"] = ^ (NSDictionary* msg) {
            NSString* mid = msg[@"muxerID"];
            if (!weakSelf.peers[mid] && !weakSelf.muxersInfo[mid]) {
                // BASE_LOG_FUN(@"Connecting to muxer: %@", msg);
                // video and audio in muxersInfo is the real things
                NSMutableDictionary* muxerInfo = [[NSMutableDictionary alloc] init];
                muxerInfo[@"status"] = @"sended";
                muxerInfo[@"video"] = msg[@"video"];
                muxerInfo[@"audio"] = msg[@"audio"];
                muxerInfo[@"mute"] = msg[@"mute"];
                muxerInfo[@"action"] = @"subscribe";
                muxerInfo[@"sid"] = msg[@"sid"];
                muxerInfo[@"width"] = [NSNumber numberWithFloat:0.0];
                muxerInfo[@"height"] = [NSNumber numberWithFloat:0.0];
                weakSelf.muxersInfo[mid] = muxerInfo;
            }
            
            [weakSelf.delegate bmRoom:weakSelf
                  didReceiveNewStream:mid
                          enableVideo:msg[@"video"]
                          enableAudio:msg[@"audio"]];
        };
        self.actions[@"stream:disconnected"] = ^ (NSDictionary* msg) {
            NSString* mid = msg[@"muxerID"];
            if (weakSelf.peers[mid] && weakSelf.muxersInfo[mid]) {
                [weakSelf.delegate bmRoom:weakSelf disconnectedStream:mid];
                [weakSelf _removeStream:mid];
            }
        };
        self.actions[@"stream:failed"] = ^ (NSDictionary* msg) {
            NSString* mid = msg[@"muxerID"];
            if (weakSelf.peers[mid] && weakSelf.muxersInfo[mid]) {
                [weakSelf.delegate bmRoom:weakSelf failedConnectStream:mid];
                [weakSelf _removeStream:mid];
            }
        };
        self.actions[@"stream:audioLevel"] = ^ (NSDictionary* msg) {
            NSString* mid = msg[@"muxerID"];
            int level = [msg[@"data"] intValue];
            if (weakSelf.peers[mid] && weakSelf.muxersInfo[mid]) {
                [weakSelf.delegate bmRoom:weakSelf muxerAudioLevel:mid changedTo:level];
            }
        };
        self.actions[@"user:auth"] = ^ (NSDictionary* msg) {
            if (msg[@"result"]) {
                weakSelf.socketID = msg[@"result"];
                [weakSelf.delegate bmRoomDidConnect:weakSelf];
            } else {
                [weakSelf.delegate bmRoomFailedConnect:weakSelf];
                BASE_LOG_FUN(@"Connection failed: auth failed");
            }
        };
        self.actions[@"user:connect"] = ^ (NSDictionary* msg) {
            NSString* sid = msg[@"sid"];
            if (!sid) return;
            
            if (!weakSelf.usersInfo[sid]) {
                weakSelf.usersInfo[sid] = msg;
                [weakSelf.delegate bmRoom:weakSelf userConnected:msg];
            }
        };
        self.actions[@"user:disconnect"] = ^ (NSDictionary* msg) {
            NSString* sid = msg[@"sid"];
            if (!sid) return;
            
            [weakSelf.usersInfo removeObjectForKey:sid];
            [weakSelf.delegate bmRoom:weakSelf userDisconnected:sid];
        };
        self.actions[@"message:sync"] = ^ (NSDictionary* msgs) {
            if (!msgs[@"data"]) return;
            weakSelf.messagesInfo = [msgs[@"data"] mutableCopy];
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveSyncMessages:msgs[@"data"]];
        };
        self.actions[@"message:new"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"] || !msg[@"data"][@"timestamp"]) return;
            NSString* ts = msg[@"data"][@"timestamp"];
            if (!weakSelf.messagesInfo[ts]) {
                weakSelf.messagesInfo[ts] = msg[@"data"];
            }
            [weakSelf.delegate bmRoom:weakSelf didReceiveChatMessage:msg[@"data"]];
        };
        self.actions[@"room:close"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoomDidClose:weakSelf];
        };
        self.actions[@"stream:mute"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"][@"mid"]) return;
            NSMutableDictionary* muxerInfo = weakSelf.muxersInfo[msg[@"data"][@"mid"]];
            if (!muxerInfo) return;
            muxerInfo[@"mute"] = @"true";
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        
        self.actions[@"videoShare:get_time_now"] = ^ (NSDictionary* msg) {
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        
        self.actions[@"handout:switch"] = ^ (NSDictionary* msg) {
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        
        self.actions[@"open-offer"] = ^ (NSDictionary* msg) {
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        
        self.actions[@"stream:unmute"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"][@"mid"]) return;
            NSMutableDictionary* muxerInfo = weakSelf.muxersInfo[msg[@"data"][@"mid"]];
            if (!muxerInfo) return;
            muxerInfo[@"mute"] = @"false";
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"whiteboard:create"] = ^ (NSDictionary* msg) {
            weakSelf.whiteboardInfo = [msg[@"data"] mutableCopy];
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"whiteboard:close"] = ^ (NSDictionary* msg) {
            [weakSelf.whiteboardInfo removeAllObjects];
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"admin"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"] || !msg[@"data"][@"user"] || !msg[@"data"][@"status"] || !msg[@"data"][@"user"][@"sid"]) return;
            
            if([weakSelf.socketID isEqualToString:msg[@"data"][@"user"][@"sid"]]) {
                weakSelf.muteUserAudio = msg[@"data"][@"status"] ? @"enable" : @"disable";
                weakSelf.muteUserVideo = msg[@"data"][@"status"] ? @"enable" : @"disable";
            }
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"question-answer-view-lock"] = ^ (NSDictionary* msg) {
            if (msg[@"data"] == [NSNull null]) {
                weakSelf.viewQA = @"enable";
            } else {
                weakSelf.viewQA = msg[@"data"];
            }
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"question-answer-lock"] = ^ (NSDictionary* msg) {
            if (msg[@"data"] == [NSNull null]) {
                weakSelf.enableQA = @"enable";
            } else {
                weakSelf.enableQA = msg[@"data"];
            }
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"mute-all-mic"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"] || !msg[@"data"][@"sid"] || !msg[@"data"][@"status"]) return;
            
            weakSelf.muteAllMic = msg[@"data"][@"status"];
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"mute-all-cam"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"] || !msg[@"data"][@"sid"] || !msg[@"data"][@"status"]) return;
            
            weakSelf.muteAllCam = msg[@"data"][@"status"];
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"mute-user-audio"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"] || !msg[@"data"][@"sid"] || !msg[@"data"][@"status"]) return;
            
            if([msg[@"data"][@"sid"] isEqualToString:weakSelf.socketID]) {
                weakSelf.muteUserAudio = msg[@"data"][@"status"];
            }
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"mute-user-video"] = ^ (NSDictionary* msg) {
            if (!msg[@"data"] || !msg[@"data"][@"sid"] || !msg[@"data"][@"status"]) return;
            
            if([msg[@"data"][@"sid"] isEqualToString:weakSelf.socketID]) {
                weakSelf.muteUserVideo = msg[@"data"][@"status"];
            }
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"seeall-lock"] = ^ (NSDictionary* msg) {
            if (msg[@"data"] == [NSNull null]) {
                weakSelf.seeallLock = @"enable";
            } else {
                weakSelf.seeallLock = msg[@"data"];
            }
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        self.actions[@"chat-lock"] = ^ (NSDictionary* msg) {
            
            if (msg[@"data"] == [NSNull null]) {
                //            NSLog(@"aaaaaaaaa");
                weakSelf.chatLock = @"enable";
            } else {
                //            NSLog(@"bbbbbbbb");
                weakSelf.chatLock = msg[@"data"];
            }
            
            [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
        };
        
        /////////// youtube start
        self.actions[@"videoShare:load"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf loadYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:pause"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf pauseYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:play"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf playYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:end"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf endYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:mute"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf muteYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:unmute"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf unmuteYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:volumeChange"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf volumeChangeYoutubeMsg:msg];
        };
        
        self.actions[@"videoShare:action"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf actionYoutubeMsg:msg];
        };
        //////////  youtube end
        
        
        /////////////  MP4 start
        self.actions[@"mp4Share:load"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf loadMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:pause"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf pauseMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:play"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf playMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:end"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf endMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:mute"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf muteMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:unmute"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf unmuteMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:volumeChange"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf volumeChangeMP4Msg:msg];
        };
        
        self.actions[@"mp4Share:action"] = ^ (NSDictionary* msg) {
            [weakSelf.delegate bmRoom:weakSelf actionMP4Msg:msg];
        };
        /////////////  MP4 end
        
        
        [self.mqtt setMessageHandler:^(MQTTMessage *message) {
            NSData* jsonData =
            [message.payloadString dataUsingEncoding:NSUTF8StringEncoding];
            NSMutableDictionary* msg =
            [NSJSONSerialization JSONObjectWithData:jsonData
                                            options:kNilOptions error:nil];
            NSString* action = msg[@"action"];
            // BASE_LOG_FUN(@"MQTT message received: %@ ", msg);
            
            if (weakSelf.actions[action]) {
                void(^dictClock)(NSDictionary*) = weakSelf.actions[action];
                dictClock(msg);
            } else {
                [weakSelf.delegate bmRoom:weakSelf didReceiveMessage:msg];
            }
        }];
        
        
        // self.mqtt.disconnectionHandler = ^(NSUInteger code) {
        // TODO:
        // };
    }
    
    return self;
};

- (void) connectToServer {
    
    NSDictionary* authMsg = @{
                              @"action": @"user:auth",
                              @"channel": _userChannel,
                              @"userID": self.userID,
                              @"mcuID": self.mcuID,
                              @"serverURL": [NSString stringWithFormat:@"https://%@", self.mqttHost],
                              @"data": self.authData,
                              @"twilioUsername": self.twilioUsername,
                              @"twilioPassword": self.twilioPassword
                              };
    
    if (self.mqtt.connected) return;
    
    [self.mqtt connectToHost:self.mqttHost
           completionHandler:^(NSUInteger code) {
               
               if (code == ConnectionAccepted) {
                   [self.mqtt subscribe:_roomChannel withCompletionHandler:nil];
                   [self.mqtt subscribe:_mcuChannel withCompletionHandler:nil];
                   [self.mqtt subscribe:_userChannel withCompletionHandler:nil];
                   
                   [self _sendMessageToTopic:@"room" message:authMsg];
               } else {
                   [self.delegate bmRoomFailedConnect:self];
                   BASE_LOG_FUN(@"Connection failed: Can not connect mqtt server");
               }
           }];
}

- (void) disconnectFromServer {
    [self.mqtt disconnectWithCompletionHandler:^(NSUInteger code) {
        // TODO: do something
    }];
}

- (void) sendMessage:(NSDictionary*)msg {
    [self _sendMessageToTopic:@"room" message:msg];
}

// QA START

- (void) voteQA:(NSDictionary*)data {
    NSDictionary* msg = @{@"action": @"questionAnswer:voted", @"data":  data};
    [self sendMessage:msg];
}

- (void) newQA:(NSDictionary*)data {
    NSDictionary* msg = @{@"action": @"questionAnswer:new", @"data":  data};
    [self sendMessage:msg];
}

- (void) deleteQA:(NSString*)data {
    NSDictionary* msg = @{@"action": @"questionAnswer:delete", @"data":  data};
    [self sendMessage:msg];
}

- (void) answeredQA:(NSString*)data {
    NSDictionary* msg = @{@"action": @"questionAnswer:answered", @"data":  data};
    [self sendMessage:msg];
}
// QA END

//Poll START
- (void) PollNew:(NSDictionary*)data {
    NSDictionary* msg = @{@"action": @"new_poll", @"data":  data};
    [self sendMessage:msg];
}

- (void) PollDelete:(NSDictionary*)data {
    NSDictionary* msg = @{@"action": @"delete_poll", @"data":  data};
    [self sendMessage:msg];
}

- (void) PollSubmit:(NSDictionary*)data {
    NSDictionary* msg = @{@"action": @"submit_answer", @"data":  data};
    [self sendMessage:msg];
}
//Poll END

//Whiteboard
-(void)whiteboardMouseMove:(NSDictionary *)data{
    NSDictionary *msg = @{@"action":@"whiteboard:mousemove",@"data":data};
    [self sendMessage:msg];
}
-(void)whiteboardDrawHistory:(NSDictionary *)data{
    NSDictionary *msg = @{@"action":@"whiteboard:draw_history",@"data":data};
    [self sendMessage:msg];
}
-(void)whiteboardGetHistory:(NSDictionary *)data{
    NSDictionary *msg = @{@"action":@"whiteboard:get_history",@"data":data};
    [self sendMessage:msg];
}
-(void)whiteboardDrawAction:(NSDictionary *)data{
    NSDictionary *msg = @{@"action":@"whiteboard:draw_action",@"data":data};
    [self sendMessage:msg];
}
-(void)whiteboardGoHistory:(NSDictionary *)data{
    NSDictionary *msg = @{@"action":@"whiteboard:go_history",@"data":data};
    [self sendMessage:msg];
}

-(void)whiteboard:(NSDictionary *)data NextPage:(NSArray *)data1{
    
    NSDictionary *msg1 = @{@"action":@"whiteboard:switch",@"data":data[@"index"]};
    NSDictionary *msg2 = @{@"action":@"whiteboard:record_current",@"data":data1};
    NSDictionary *msg3 = @{@"action":@"whiteboard:play",@"data":data[@"url"]};
    [self sendMessage:msg1];
    [self sendMessage:msg2];
    [self sendMessage:msg3];
}
-(void)whiteboardRemove:(NSDictionary *)data{
    NSDictionary *msg = @{@"action":@"whiteboard:end",@"data":data};
    NSDictionary *msg_ = @{@"action":@"whiteboard:close",@"data":data};
    [self sendMessage:msg];
    [self sendMessage:msg_];
}

- (void) syncChatMessages: (NSDictionary*)data {
    NSDictionary* msg = @{@"action": @"message:sync", @"channel": _userChannel,  @"data":  data};
    [self sendMessage:msg];
}

- (void) getServerTimeNow {
    NSMutableDictionary* msg = [[NSMutableDictionary alloc] init];
    msg[@"action"] = @"videoShare:get_time_now";
    [self sendMessage:msg];
}

- (void) youtubeCheckExisting {
    NSMutableDictionary* msg = [[NSMutableDictionary alloc] init];
    msg[@"action"] = @"videoShare:check_existing";
    [self sendMessage:msg];
}

- (void) mp4CheckExisting {
    NSMutableDictionary* msg = [[NSMutableDictionary alloc] init];
    msg[@"action"] = @"mp4Share:check_existing";
    [self sendMessage:msg];
}

- (void) sendChatMessage:(NSString*)content toUser:(NSString *)to_id {
    NSDictionary* myInfo = self.usersInfo[self.socketID];
    if (!myInfo) return;
    
    NSDictionary* data = @{
                           @"name": myInfo[@"name"],
                           @"photo": myInfo[@"photo"],
                           @"to_id": to_id,
                           @"content": content,
                           @"sid": myInfo[@"sid"]
                           };
    NSDictionary* msg = @{@"action": @"message:send", @"data":  data};
    [self sendMessage:msg];
}

- (void) sendPrivateChatMessage:(NSString*)content toUser:(NSString *)to_id {
    NSDictionary* myInfo = self.usersInfo[self.socketID];
    if (!myInfo) return;
    
    NSDictionary* data = @{
                           @"name": myInfo[@"name"],
                           @"photo": myInfo[@"photo"],
                           @"to_id": to_id,
                           @"content": content,
                           @"chat_type": @"private_chat",
                           @"sid": myInfo[@"sid"]
                           };
    NSDictionary* msg = @{@"action": @"message:send", @"data":  data};
    [self sendMessage:msg];
}


- (void) toggleAudioOutput:(NSString *)message {
    if ([message isEqualToString:@"speaker"]) {
        NSError* __autoreleasing err = nil;
        AVAudioSession* audioSession = [AVAudioSession sharedInstance];
        [audioSession
         overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:&err];
    } else if ([message isEqualToString:@"handset"]) {
        NSError* __autoreleasing err = nil;
        AVAudioSession* audioSession = [AVAudioSession sharedInstance];
        [audioSession
         overrideOutputAudioPort:AVAudioSessionPortOverrideNone error:&err];
    }
}


- (void) _sendMessageToTopic:(NSString *)topic message:(NSDictionary *)msg {
    NSData *datamsg =
    [NSJSONSerialization dataWithJSONObject:msg
                                    options:NSJSONWritingPrettyPrinted
                                      error:nil];
    NSString *jmsg = [[NSString alloc] initWithData:datamsg
                                           encoding:NSUTF8StringEncoding];
    
    [self.mqtt publishString:jmsg
                     toTopic:topic
                     withQos:AtMostOnce
                      retain:NO
           completionHandler:^(int mid) {
               BASE_LOG_FUN(@"message has been delivered");
           }];
}

- (RTCVideoTrack*) _getLocalVideoTrack:(NSString*)videoStr {
    RTCVideoTrack* localVideoTrack;
    
#if !TARGET_IPHONE_SIMULATOR && TARGET_OS_IPHONE
    
    
    NSDictionary *mandatory = @{kRTCMediaConstraintsMaxFrameRate : @"10", kRTCMediaConstraintsMaxHeight: @"180"};
    RTCMediaConstraints *constraints = [[RTCMediaConstraints alloc] initWithMandatoryConstraints:mandatory optionalConstraints:nil];
    
    RTCAVFoundationVideoSource *videoSource = [self.peerConnectionFactory avFoundationVideoSourceWithConstraints:constraints];
    
    if ([videoStr isEqual: @"front"]) {
        [videoSource setUseBackCamera:NO];
    } else {
        [videoSource setUseBackCamera:YES];
    }
    
    localVideoTrack = [self.peerConnectionFactory videoTrackWithSource:videoSource trackId:@"ARDAMSv0"];
    
    /*************** video track *****************/
    
    
    
    //    NSMutableArray *m1 = [[NSMutableArray alloc] init];
    //    NSMutableArray *o1 = [[NSMutableArray alloc] init];
    //
    //    [m1 addObject:[[RTCPair alloc] initWithKey:@"maxFrameRate" value:@"10"]];
    //    [m1 addObject:[[RTCPair alloc] initWithKey:@"maxHeight" value:@"180"]];
    //    RTCMediaConstraints* c1 =
    //    [[RTCMediaConstraints alloc] initWithMandatoryConstraints:m1
    //                                          optionalConstraints:o1];
    
    
    
    
    //    NSDictionary *mandatoryConstraints =
    //    @{@"maxFrameRate" : @"10",@"maxHeight" : @"180"};
    //
    //    RTCMediaConstraints* c1 =
    //    [[RTCMediaConstraints alloc] initWithMandatoryConstraints:mandatoryConstraints optionalConstraints: nil];
    //
    //
    //    for (AVCaptureDevice* captureDevice in
    //         [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo]) {
    //        if (captureDevice.position == AVCaptureDevicePositionFront) {
    //            self.frontCamID = [captureDevice localizedName];
    //        }
    //        if (captureDevice.position == AVCaptureDevicePositionBack) {
    //            self.backCamID = [captureDevice localizedName];
    //        }
    //    }
    //
    //    RTCVideoCapturer* capturer;
    //    if ([videoStr isEqual: @"front"] && self.frontCamID) {
    //
    //        capturer =
    //        [RTCVideoCapturer capturerWithDeviceName:self.frontCamID];
    //    }
    //    if ([videoStr isEqual: @"back"] && self.backCamID) {
    //        capturer =
    //        [RTCVideoCapturer capturerWithDeviceName:self.backCamID];
    //    }
    //    if (capturer) {
    //        RTCVideoSource* videoSource =
    //        [self.peerConnectionFactory videoSourceWithCapturer:capturer
    //                                                constraints:c1];
    //
    //        localVideoTrack =
    //        [self.peerConnectionFactory videoTrackWithID:@"ARDAMSv0"
    //                                              source:videoSource];
    //
    //    }
    
#endif
    
    return localVideoTrack;
}

- (RTCAudioTrack*) _getLocalAudioTrack:(NSString *)audioStr {
    RTCAudioTrack* audioTrack =
    [self.peerConnectionFactory audioTrackWithTrackId:@"ARDAMSa0"];
    return audioTrack;
}

- (RTCMediaStream*) _getLocalStream:(NSString*)muxerID
                        enableVideo:(NSString*)video
                        enableAudio:(NSString*)audio {
    RTCMediaStream* localStream =
    [self.peerConnectionFactory mediaStreamWithStreamId:@"ARDAMS"];
    
    RTCVideoTrack* localVideoTrack = [self _getLocalVideoTrack:video];
    if (localVideoTrack) {
        [localStream addVideoTrack:localVideoTrack];
    }
    
    if ([audio isEqualToString:@"true"]) {
        RTCAudioTrack* localAudtioTrack = [self _getLocalAudioTrack:@"true"];
        [localStream addAudioTrack:localAudtioTrack];
    }
    
    self.streams[muxerID] = localStream;
    
    return localStream;
}

- (NSString*) connectStream:(NSString *)muxerID
                enableVideo:(NSString *)video
                enableAudio:(NSString *)audio {
    
    
    NSString* peerID = [self getPeerID];
    NSString* action = muxerID ? @"subscribe" : @"publish";
    muxerID = muxerID ? muxerID : peerID;
    
    if ([muxerID isEqualToString:peerID]) {
        NSMutableDictionary* muxerInfo = [[NSMutableDictionary alloc] init];
        muxerInfo[@"status"] = @"init";
        muxerInfo[@"video"] = video;
        muxerInfo[@"audio"] = audio;
        muxerInfo[@"mute"] = @"false";
        muxerInfo[@"action"] = @"publish";
        muxerInfo[@"sid"] = self.socketID;
        muxerInfo[@"width"] = [NSNumber numberWithFloat:0.0];
        muxerInfo[@"height"] = [NSNumber numberWithFloat:0.0];
        self.muxersInfo[muxerID] = muxerInfo;
    }
    
    NSMutableDictionary* muxerInfo = self.muxersInfo[muxerID];
    
    if ([muxerInfo[@"status"] isEqualToString:@"connecting"]) {
        // [self.delegate bmRoom:self failedConnectStream:muxerID];
        return nil;
    }
    if ([muxerInfo[@"status"] isEqualToString:@"connected"]) {
        // [self.delegate bmRoom:self failedConnectStream:muxerID];
        return nil;
    }
    if ([muxerInfo[@"audio"] isEqualToString:@"false"]
        && ![audio isEqualToString:@"false"]) {
        [self.delegate bmRoom:self failedConnectStream:muxerID];
        return nil;
    }
    if ([muxerInfo[@"video"] isEqualToString:@"false"]
        && ![video isEqualToString:@"false"]) {
        [self.delegate bmRoom:self failedConnectStream:muxerID];
        return nil;
    }
    
    muxerInfo[@"status"] = @"connecting";
    
    NSMutableArray* iceServers = [NSMutableArray array];
    
    /* build turn server start */
    NSArray * stun_urls = @[@"stun:13.91.46.140:3478?transport=udp"];
    RTCIceServer * stun_servers = [[RTCIceServer alloc] initWithURLStrings:stun_urls
                                                                  username:@""
                                                                credential:@""];
    
    NSArray * turn_urls = @[@"turn:13.91.3.242:443?transport=udp"];
    RTCIceServer * turn_servers = [[RTCIceServer alloc] initWithURLStrings:turn_urls
                                                                  username:@"bigroom"
                                                                credential:@"bigroom"];
    
    
    //    NSURL* url1 = [NSURL URLWithString:@"stun:13.91.46.140:3478?transport=udp"];
    //    RTCICEServer* s1 = [[RTCIceServer alloc] initWithURI:url1 username: @"" password:@""];
    //
    //
    //
    //    NSURL* url2 = [NSURL URLWithString:@"turn:13.91.3.242:443?transport=udp"];
    //    RTCICEServer* s2 = [[RTCICEServer alloc] initWithURI:url2
    //                                                username:  @"bigroom"
    //                                                password:  @"bigroom"];
    
    [iceServers addObjectsFromArray:@[turn_servers,stun_servers]];
    /* build turn server end */
    
    RTCConfiguration *config = [[RTCConfiguration alloc] init];
    [config setIceServers:iceServers];
    
    RTCMediaConstraints* constraints =
    [[RTCMediaConstraints alloc] initWithMandatoryConstraints:nil
                                          optionalConstraints:nil];
    
    RTCPeerConnection* peerConnection =
    [self.peerConnectionFactory peerConnectionWithConfiguration:config
                                                    constraints:constraints
                                                       delegate:self];
    
    self.peers[muxerID] = peerConnection;
    NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
    
    NSString* peerChannel = [NSString stringWithFormat:@"peer:%@", peerID];
    NSString* muxerChannel =
    [NSString stringWithFormat:@"muxer:%@:%@", self.mcuID, muxerID];
    NSString* mcuChannel = [NSString stringWithFormat:@"mcu:%@", self.mcuID];
    NSString* peerAction =
    [NSString stringWithFormat:@"stream:%@", action];
    
    // video and audio in peerInfo is the actual constraints that we connect
    
    NSMutableDictionary* peerInfo = [[NSMutableDictionary alloc] init];
    peerInfo[@"muxerID"] = muxerID;
    peerInfo[@"peerID"] = peerID;
    peerInfo[@"peerChannel"] = peerChannel;
    peerInfo[@"muxerChannel"] = muxerChannel;
    peerInfo[@"mcuChannel"] = mcuChannel;
    peerInfo[@"peerAction"] = peerAction;
    peerInfo[@"video"] = video;
    peerInfo[@"audio"] = audio;
    peerInfo[@"localDescriptionSetted"] = @"false";
    peerInfo[@"remoteDescriptionSetted"] = @"false";
    peerInfo[@"localCandidates"] = [[NSMutableArray alloc] init];
    peerInfo[@"remoteCandidates"] = [[NSMutableArray alloc] init];
    
    self.peersInfo[key] = peerInfo;
    
    [self.mqtt subscribe:peerChannel withCompletionHandler:nil];
    
    if ([@"publish" isEqualToString:action]) {
        RTCMediaStream* lms =
        [self _getLocalStream:muxerID enableVideo:video enableAudio:audio];
        
        [peerConnection addStream:lms];
    }
    
    
    NSDictionary *mandatoryConstraints =
    @{@"OfferToReceiveAudio" : @"true",@"OfferToReceiveVideo" : @"true"};
    
    RTCMediaConstraints* constraints2 =
    [[RTCMediaConstraints alloc] initWithMandatoryConstraints:mandatoryConstraints optionalConstraints: nil];
    
    
    [peerConnection offerForConstraints:constraints2
                      completionHandler:^(RTCSessionDescription * _Nullable sdp, NSError * _Nullable error) {
                          [self _didCreateSessionDescription:peerConnection sdp:sdp error:error];
                      }];
    return peerID;
}


- (void) getStreams {
    NSMutableDictionary* msg = [[NSMutableDictionary alloc] init];
    msg[@"action"] = @"stream:sync";
    msg[@"channel"] = _userChannel;
    [self sendMessage:msg];
}

- (void) _removeStream:(NSString*)muxerID {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        RTCPeerConnection* peerConnection = self.peers[muxerID];
        if (!peerConnection) return;
        NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
        
        RTCEAGLVideoView* videoView = self.videoViews[muxerID];
        if (videoView) {
            [videoView removeFromSuperview];
        }
        RTCEAGLVideoView* screenView = self.screenViews[muxerID];
        if (screenView) {
            [screenView removeFromSuperview];
        }
        
        RTCMediaStream* stream = self.streams[muxerID];
        
        for (RTCAudioTrack* audioTrack in stream.audioTracks){
            [stream removeAudioTrack:audioTrack];
        }
        for (RTCVideoTrack* videoTrack in stream.videoTracks){
            [stream removeVideoTrack:videoTrack];
        }
        
        // [peerConnection removeStream:stream];
        [self.peersInfo removeObjectForKey:key];
        [self.muxersInfo removeObjectForKey:muxerID];
        [self.peers removeObjectForKey:muxerID];
        [self.streams removeObjectForKey:muxerID];
        [self.videoViews removeObjectForKey:muxerID];
        [self.screenViews removeObjectForKey:muxerID];
        [peerConnection close];
    });
    
    
}

- (void) disconnectStream:(NSString *)muxerID {
    RTCPeerConnection* peerConnection = self.peers[muxerID];
    if (!peerConnection) return;
    
    NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
    NSDictionary* peerInfo = self.peersInfo[key];
    if ([peerInfo[@"peerAction"] isEqualToString:@"stream:publish"]) {
        NSDictionary* dmsg = @{
                               @"action": @"stream:disconnect",
                               @"channel": peerInfo[@"peerChannel"],
                               @"muxerID": peerInfo[@"muxerID"]
                               };
        [self _sendMessageToTopic:peerInfo[@"mcuChannel"] message:dmsg];
    } else {
        [self _removeStream:muxerID];
    }
}

- (void) changeStream:(NSString*)muxerID
          enableVideo:(NSString *)video
          enableAudio:(NSString *)audio {
    
    RTCMediaStream* stream = self.streams[muxerID];
    if (!stream) return;
    NSMutableDictionary* muxerInfo = self.muxersInfo[muxerID];
    if (!muxerInfo) return;
    if (![muxerInfo[@"status"] isEqualToString:@"connected"]) return;
    if (![muxerInfo[@"action"] isEqualToString:@"publish"]) return;
    if ([muxerInfo[@"video"] isEqualToString:video]
        && [muxerInfo[@"audio"] isEqualToString:audio]) return;
    RTCPeerConnection* peerConn = self.peers[muxerID];
    if (!peerConn) return;
    
    if ([muxerInfo[@"status"] isEqualToString:@"connected"]) {
        [peerConn removeStream:stream];
        RTCMediaStream* newStream =
        [self _getLocalStream:muxerID enableVideo:video enableAudio:video];
        [peerConn addStream:newStream];
        muxerInfo[@"video"] = video;
        muxerInfo[@"audio"] = audio;
    }
}

- (void) switchStream:(NSString*)muxerID
          enableVideo:(NSString *)video
          enableAudio:(NSString *)audio
          sendMessage:(BOOL)message {
    RTCMediaStream* stream =  self.streams[muxerID];
    
    
    for (RTCMediaStreamTrack* audioTrack in stream.audioTracks) {
        if (audioTrack.isEnabled && [audio isEqualToString:@"true"]) return;
        if (!audioTrack.isEnabled && [audio isEqualToString:@"false"]) return;
        
        if ([audio isEqualToString:@"true"]) {
            [audioTrack setIsEnabled:true];
            
            if (message) {
                NSMutableDictionary* msg = [[NSMutableDictionary alloc] init];
                msg[@"action"] = @"stream:unmute";
                msg[@"data"] = muxerID;
                [self sendMessage:msg];
            }
        }
        if ([audio isEqualToString:@"false"]) {
            [audioTrack setIsEnabled:false];
            
            if (message) {
                NSMutableDictionary* msg = [[NSMutableDictionary alloc] init];
                msg[@"action"] = @"stream:mute";
                msg[@"data"] = muxerID;
                [self sendMessage:msg];
            }
        }
    }
    for (RTCMediaStreamTrack* videoTrack in stream.videoTracks) {
        if ([video isEqualToString:@"true"]) {
            [videoTrack setIsEnabled:true];
        }
        if ([video isEqualToString:@"false"]) {
            [videoTrack setIsEnabled:false];
        }
    }
}


- (void) _didCreateSessionDescription:(RTCPeerConnection *)peerConnection
                                  sdp:(RTCSessionDescription *)sdp
                                error:(NSError*)error {
    dispatch_async(dispatch_get_main_queue(), ^{
        
        NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
        if (!self.peersInfo[key]) return;
        NSMutableDictionary *peerInfo = self.peersInfo[key];
        NSString *muxerID = peerInfo[@"muxerID"];
        if (!muxerID || !self.muxersInfo[muxerID]) return;
        NSMutableDictionary *muxerInfo = self.muxersInfo[muxerID];
        if (!muxerInfo) return;
        
        __weak RTCPeerConnection *peer = peerConnection;
        [peerConnection setLocalDescription:sdp
                          completionHandler:^(NSError * _Nullable error) {
                              peerInfo[@"localDescriptionSetted"] = @"true";
                              while ([peerInfo[@"remoteCandidates"] count] > 0) {
                                  RTCIceCandidate* rcandidate = [peerInfo[@"remoteCandidates"] objectAtIndex:0];
                                  [peer addIceCandidate:rcandidate];
                                  [peerInfo[@"remoteCandidates"] removeObjectAtIndex:0];
                              }
                          }];
        
        if (peerInfo && [muxerInfo[@"status"] isEqualToString:@"connecting"]) {
            NSDictionary* dmsg = @{
                                   @"action": peerInfo[@"peerAction"],
                                   @"channel": peerInfo[@"peerChannel"],
                                   @"muxerID": peerInfo[@"muxerID"],
                                   @"enableVideo": peerInfo[@"video"],
                                   @"enableAudio": peerInfo[@"audio"],
                                   @"csdp": sdp.description,
                                   @"twilioUsername": self.twilioUsername,
                                   @"twilioPassword": self.twilioPassword
                                   };
            
            [self _sendMessageToTopic:peerInfo[@"muxerChannel"] message:dmsg];
            // BASE_LOG_FUN(@"PCO Compleate sdp %@", dmsg[@"csdp"]);
        }
    });
}


#pragma mark - RTCPeerConnectionDelegate

- (void)peerConnection:(RTCPeerConnection*)peerConnection
didChangeSignalingState:(RTCSignalingState)stateChanged {
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
          didAddStream:(RTCMediaStream*)stream {
    dispatch_async(dispatch_get_main_queue(), ^{
        BASE_LOG_FUN(@"PCO onAddStream.");
        NSAssert([stream.audioTracks count] == 1 || [stream.videoTracks count] == 1,
                 @"Expected audio or video track");
        NSAssert([stream.audioTracks count] <= 1,
                 @"Expected at most 1 audio stream");
        NSAssert([stream.videoTracks count] <= 1,
                 @"Expected at most 1 video stream");
        
        NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
        if (!self.peersInfo[key]) return;
        NSDictionary* peerInfo = self.peersInfo[key];
        NSString* muxerID = peerInfo[@"muxerID"];
        if (!self.streams[muxerID]) {
            self.streams[muxerID] = stream;
        }
        
        RTCMediaStream* realStream = self.streams[muxerID];
        if (realStream
            && [realStream.videoTracks count] > 0
            && ![peerInfo[@"video"] isEqualToString:@"false"]) {
            RTCVideoTrack* videoTrack = realStream.videoTracks[0];
            // RTCEAGLVideoView* videoView = [[RTCEAGLVideoView alloc] init];
            RTCEAGLVideoView* videoView = [[RTCEAGLVideoView alloc] initWithFrame:CGRectZero];
            NSNumber *vkey = [NSNumber numberWithUnsignedLong:videoView.hash];
            self.videosInfo[vkey] = muxerID;
            
            videoView.delegate = self;
            [videoTrack addRenderer:videoView];
            if ([peerInfo[@"video"] isEqualToString:@"screen"]) {
                self.screenViews[muxerID] = videoView;
            } else {
                self.videoViews[muxerID] = videoView;
            }
        }
    });
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
       didRemoveStream:(RTCMediaStream*)stream {
    dispatch_async(dispatch_get_main_queue(),
                   ^{ BASE_LOG_FUN(@"PCO onRemoveStream."); });
}

- (void)peerConnectionShouldNegotiate:(RTCPeerConnection*)peerConnection {
    dispatch_async(dispatch_get_main_queue(), ^{
        BASE_LOG_FUN(@"PCO onRenegotiationNeeded - ignoring because AppRTC has a "
                     "predefined negotiation strategy");
    });
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
didGenerateIceCandidate:(RTCIceCandidate*)candidate {
    dispatch_async(dispatch_get_main_queue(), ^{
        
        NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
        if (!self.peersInfo[key]) return;
        NSMutableDictionary *peerInfo = self.peersInfo[key];
        NSString *muxerID = peerInfo[@"muxerID"];
        if (!muxerID || !self.muxersInfo[muxerID]) return;
        NSMutableDictionary *muxerInfo = self.muxersInfo[muxerID];
        if (!muxerInfo) return;
        
        NSDictionary* dmsg = @{
                               @"action": @"stream:candidate",
                               @"peerID": peerInfo[@"peerID"],
                               @"muxerID": peerInfo[@"muxerID"],
                               @"candidate_sdp": candidate.sdp,
                               @"candidate_sdpmid": candidate.sdpMid,
                               @"candidate_sdpmlineindex": [NSNumber numberWithLong:candidate.sdpMLineIndex]
                               };
        
        if ([peerInfo[@"remoteDescriptionSetted"] isEqualToString:@"true"]) {
            [self _sendMessageToTopic:peerInfo[@"muxerChannel"] message:dmsg];
        } else {
            [peerInfo[@"localCandidates"] addObject:dmsg];
        }
        BASE_LOG_FUN(@"PCO onICECandidate.\n%@", candidate.sdp);
    });
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
didRemoveIceCandidates:(RTCIceCandidate*)candidate {
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
   iceGatheringChanged:(RTCIceGatheringState)newState {
    dispatch_async(dispatch_get_main_queue(), ^{
        // if (newState == RTCICEGatheringComplete) {}
        
        BASE_LOG_FUN(@"PCO onIceGatheringChange. %ld", (long)newState);
    });
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
didChangeIceConnectionState:(RTCIceConnectionState)newState {
    dispatch_async(dispatch_get_main_queue(), ^{
        BASE_LOG_FUN(@"PCO onIceConnectionChange. %ld", (long)newState);
        
        NSNumber *key = [NSNumber numberWithUnsignedLong:peerConnection.hash];
        if (!self.peersInfo[key]) return;
        
        NSDictionary* peerInfo = self.peersInfo[key];
        NSString* muxerID = peerInfo[@"muxerID"];
        
        NSMutableDictionary* muxerInfo = self.muxersInfo[muxerID];
        if (!muxerInfo) return;
        
        if (newState == RTCIceConnectionStateConnected) {
            [self.delegate bmRoom:self didConnectStream:muxerID];
            muxerInfo[@"status"] = @"connected";
        }
        
        if (newState == RTCIceConnectionStateFailed) {
            muxerInfo[@"status"] = @"connect_failed";
            [self.delegate bmRoom:self failedConnectStream:muxerID];
        }
    });
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
didChangeIceGatheringState:(RTCIceGatheringState)newState {
}

- (void)peerConnection:(RTCPeerConnection*)peerConnection
    didOpenDataChannel:(RTCDataChannel*)dataChannel {
    NSAssert(NO, @"AppRTC doesn't use DataChannels");
}

#pragma mark - RTCEAGLVideoViewDelegate

- (void)videoView:(RTCEAGLVideoView*)videoView didChangeVideoSize:(CGSize)size {
    NSNumber *key = [NSNumber numberWithUnsignedLong:videoView.hash];
    NSString* muxerID = self.videosInfo[key];
    if (!muxerID) return;
    
    if (!self.muxersInfo[muxerID]) return;
    self.muxersInfo[muxerID][@"width"] = [NSNumber numberWithFloat:size.width];
    self.muxersInfo[muxerID][@"height"] = [NSNumber numberWithFloat:size.height];
    
    [self.delegate bmRoom:self didChangeVideoDimension:muxerID withSize:size];
}
@end
