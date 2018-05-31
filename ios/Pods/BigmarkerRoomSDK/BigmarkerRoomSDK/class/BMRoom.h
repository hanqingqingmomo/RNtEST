#ifndef BMRoom_h
#define BMRoom_h
#import <Foundation/Foundation.h>
#import <math.h>
#import <UIKit/UIKit.h>
@class BMRoom;

@protocol BMRoomDelegate <NSObject>
@optional
- (void)bmRoomDidConnect:(BMRoom*)bm;
- (void)bmRoomFailedConnect:(BMRoom*)bm;
- (void)bmRoomDidClose:(BMRoom*)bm;

- (void)bmRoom:(BMRoom*)bm didReceiveMessage:(NSDictionary*)message;

- (void)bmRoom:(BMRoom*)bm didReceiveSyncMessages:(NSDictionary*)messages;
- (void)bmRoom:(BMRoom*)bm didReceiveChatMessage:(NSDictionary*)message;

- (void)bmRoom:(BMRoom*)bm
didReceiveNewStream:(NSString*)muxerID
   enableVideo:(NSString*)video
   enableAudio:(NSString*)audio;
- (void)bmRoom:(BMRoom*)bm didConnectStream:(NSString*)muxerID;
- (void)bmRoom:(BMRoom*)bm
didChangeVideoDimension:(NSString*)muxerID
      withSize:(CGSize)size;
- (void)bmRoom:(BMRoom*)bm failedConnectStream:(NSString*)muxerID;
- (void)bmRoom:(BMRoom*)bm disconnectedStream:(NSString*)muxerID;

- (void)bmRoom:(BMRoom*)bm userConnected:(NSDictionary*)user;
- (void)bmRoom:(BMRoom*)bm userDisconnected:(NSString*)sid;

- (void)bmRoom:(BMRoom*)bm muxerAudioLevel:(NSString*)muxerID
     changedTo:(int)level;

- (void)bmRoom:(BMRoom*)bm loadYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm playYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm pauseYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm endYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm muteYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm unmuteYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm volumeChangeYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm actionYoutubeMsg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm seekYoutubeMsg:(NSDictionary*)message;

- (void)bmRoom:(BMRoom*)bm loadMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm playMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm pauseMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm endMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm muteMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm unmuteMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm volumeChangeMP4Msg:(NSDictionary*)message;
- (void)bmRoom:(BMRoom*)bm actionMP4Msg:(NSDictionary*)message;
@end

@interface BMRoom : NSObject


@property(nonatomic, strong) id<BMRoomDelegate> delegate;

@property(nonatomic, strong) NSMutableDictionary* videoViews;
@property(nonatomic, strong) NSMutableDictionary* screenViews;
@property(nonatomic, strong) NSMutableDictionary* usersInfo;
@property(nonatomic, copy) NSString* socketID;
@property(nonatomic, strong) NSMutableDictionary* muxersInfo;

@property(nonatomic, strong) NSMutableDictionary* messagesInfo;

@property(nonatomic, strong) NSMutableArray* whiteboardInfo;

@property(nonatomic, copy) NSString* viewQA;
@property(nonatomic, copy) NSString* enableQA;
@property(nonatomic, copy) NSString* muteAllMic;
@property(nonatomic, copy) NSString* muteAllCam;
@property(nonatomic, copy) NSString* muteUserAudio;
@property(nonatomic, copy) NSString* muteUserVideo;
@property(nonatomic, copy) NSString* seeallLock;
@property(nonatomic, copy) NSString* chatLock;

- (instancetype) initWithDelegate:(id<BMRoomDelegate>)delegate
                          options:(NSDictionary*)options;

- (void) connectToServer;
- (void) disconnectFromServer;

- (NSString*) connectStream:(NSString*)muxerID
                enableVideo:(NSString*)video
                enableAudio:(NSString*)audio;

- (void) getStreams;

- (void) disconnectStream:(NSString*)muxerID;

// Change the stream on the fly(add, remove, change), because our mcu server
// don't support renegotiation, so this method will implement later.
// This method will trigger the renegotion while `switchStream` not
- (void) changeStream:(NSString*)muxerID
          enableVideo:(NSString*)video
          enableAudio:(NSString*)audio;

// Mute or unmute track in stream. if you mute local track, the receiver will
// not get the track, if you mute remote track, this only affect locally.
- (void) switchStream:(NSString*)muxerID
          enableVideo:(NSString*)video
          enableAudio:(NSString*)audio
          sendMessage:(BOOL)message;


- (void) toggleAudioOutput:(NSString*)message;

- (void) sendMessage:(NSDictionary*)msg;


- (void) youtubeCheckExisting;
- (void) mp4CheckExisting;
// Change messages
- (void) syncChatMessages:(NSDictionary*)data;
- (void) sendChatMessage:(NSString*)content toUser:(NSString*)to_id;
- (void) sendPrivateChatMessage:(NSString*)content toUser:(NSString*)to_id;

//QA
- (void) voteQA:(NSDictionary*)data;
- (void) newQA:(NSDictionary*)data;
- (void) deleteQA:(NSString*)data;
- (void) answeredQA:(NSString*)data;

//Poll
- (void) PollNew:(NSDictionary*)data;
- (void) PollDelete:(NSDictionary*)data;
- (void) PollSubmit:(NSDictionary*)data;

//whiteboard
-(void)whiteboardGetHistory:(NSDictionary *)data;//接收坐标
-(void)whiteboardDrawAction:(NSDictionary *)data;//发送颜色以及字体大小
-(void)whiteboardMouseMove:(NSDictionary *)data;//发送坐标
-(void)whiteboardDrawHistory:(NSDictionary *)data;//上传图片截图
-(void)whiteboardGoHistory:(NSDictionary *)data;//发送undo和redo的命令
-(void)whiteboardRemove:(NSDictionary *)data; //删除whiteboard
-(void)whiteboard:(NSDictionary *)data NextPage:(NSArray *)data1;//翻页

- (void) getServerTimeNow;
@end

#endif
