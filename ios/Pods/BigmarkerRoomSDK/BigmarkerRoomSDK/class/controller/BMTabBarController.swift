//
//  BigRoomTabBarController.swift
//  bigmarker
//
//  Created by hanqing on 2/15/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//


import UIKit
import AVFoundation

@objc protocol BigRoomVideoDelegate{
     @objc optional func bigRoomNotificationDelegateOpenOffer(message: [NSObject : AnyObject])
    //video
    @objc optional func bigRoomNotificationDelegateReceiveNewStream(didReceiveNewStream muxerID: String!, enableVideo video: String!, enableAudio audio: String!)
    @objc optional func bigRoomNotificationDelegateFailedConnectStream(muxerID: String)
    @objc optional func bigRoomNotificationDelegateConnectStream(muxerID: String!)
    @objc optional func bigRoomNotificationDelegateDisconnectedStream(muxerID: String!)
    @objc optional func bigRoomNotificationDelegateRemoveFromRoom()
    @objc optional func bigRoomNotificationDelegateMuteAudio(muxerID: String, status: Bool)
    @objc optional func bigRoomNotificationDelegateVideoAction(action: String, status: Int)
    @objc optional func bigRoomNotificationDelegateVideoFrameChanged(muxerID: String, size: CGSize)
    @objc optional func bigRoomNotificationDelegateAudioSizeChanged(muxerID: String!, level: Int32)
    
    @objc optional func bigRoomNotificationDelegateWhiteBoardCreated()
    @objc optional func bigRoomNotificationDelegateWhiteBoardRemoved()
    @objc optional func bigRoomNotificationDelegateWhiteBoardSwitch(page: Int)
    
    @objc optional func bigRoomNotificationDelegateCloseRoom()
    
    @objc optional func bigRoomNotificationDelegateServerTime(message: [NSObject : AnyObject])
    
    @objc optional func bigRoomNotificationDelegateYoutubeLoad(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeSeek(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubePlay(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubePause(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeEnd(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeMute(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeUnmute(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeVolumeChange(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeAction(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateYoutubeClear()
    
    @objc optional func bigRoomNotificationDelegateMp4Load(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4End(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4Mute(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4Unmute(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4Pause(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4Play(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4VolumeChange(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4Action(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMp4Clear()
    
    @objc optional func bigRoomNotificationDelegateMsgAddTabbar(message: [NSObject : AnyObject])
    
}
@objc protocol BigRoomChatDelegate{
    @objc optional func bigRoomNotificationDelegateMsgAdd(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMsgDel(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMsgLoad(messages: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateMsgLock(status: Int)
    @objc optional func bigRoomNotificationDelegateMsgChangeRole(status: Int)
    
}

@objc protocol BigRoomHandoutDelegate{
    @objc optional func bigRoomNotificationDelegateHandoutSwitch(message: [NSObject : AnyObject])
}

@objc protocol BigRoomUserDelegate{
    @objc optional func bigRoomNotificationDelegateUserLeave(sid: String)
    @objc optional func bigRoomNotificationDelegateUserEnter(user: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateUserLoad()
    @objc optional func bigRoomNotificationDelegateUserLock(status: Int)
    @objc optional func bigRoomNotificationDelegateUserChangeRole(role: String, sid: String)
}

@objc protocol BigRoomQADelegate{
    @objc optional func bigRoomNotificationDelegateQANew(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateQAVote(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateQAAnswered(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateQADelete(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegateQALock(message:[NSObject : AnyObject])
}

@objc protocol BigRoomPollDelegate{
    @objc optional func bigRoomNotificationDelegatePollReload(message: [NSObject : AnyObject])
    @objc optional func bigRoomNotificationDelegatePollDelete(message:[NSObject : AnyObject])
}


public class BMTabBarController: UITabBarController {
    
    var bmroomVideoDelegate: BigRoomVideoDelegate?
    var bmroomUserDelegate: BigRoomUserDelegate?
    var bmroomChatDelegate: BigRoomChatDelegate?
    var bmroomQADelegate: BigRoomQADelegate?
    var bmroomPollDelegate: BigRoomPollDelegate?
    var bmroomHandoutDelegate: BigRoomHandoutDelegate?
    
    var conference: BMConference!
    var avSession: AVAudioSession!
    var bm: BMRoom!
    
    var videoController: BMVideoViewController!
    var msgController: BMMessageController!
    
    var backgroundView : NewPollView!
    
    public init(bm: BMRoom, conference: BMConference) {
        super.init(nibName: nil, bundle: nil)
        self.bm = bm
        self.conference = conference
        addChildVc()
    }
    
    required public init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    override public func viewDidLoad() {
        super.viewDidLoad()
        
        avSession = AVAudioSession.sharedInstance()
        UIApplication.shared.isIdleTimerDisabled = true
        
        let item = UITabBarItem.appearance()
        item.setTitleTextAttributes([NSForegroundColorAttributeName:UIColor.init(red: 193/255.0, green: 201/255.0, blue: 214/255.0, alpha: 1.0),NSFontAttributeName:UIFont(name: BMSFUIDisplay_Medium, size: 12)!], for:.normal)
        item.setTitleTextAttributes([NSForegroundColorAttributeName:UIColor.init(red: 43/255.0, green: 55/255.0, blue: 77/255.0, alpha: 1.0),NSFontAttributeName:UIFont(name: BMSFUIDisplay_Medium, size: 12.0)!], for:.selected)
    }
    
    override public func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        
        NotificationCenter.default.addObserver(self, selector: #selector(handleRouteChange), name: NSNotification.Name.AVAudioSessionRouteChange, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(audioSessionWasInterrupted ), name: NSNotification.Name.AVAudioSessionInterruption, object: avSession)
    }
    
    override public func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        self.navigationController?.navigationBar.isHidden = true
        self.tabBar.barTintColor = UIColor(red: 43/255, green: 55/255, blue: 76/255, alpha: 1)
    }
    
    override public func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(true)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.AVAudioSessionRouteChange, object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.AVAudioSessionInterruption, object: avSession)
    }
    
}


extension BMTabBarController {

    //todo
    func removeBadge() {
        tabBar.viewWithTag(111)?.removeFromSuperview()
        for view in self.tabBar.subviews {
            if view is CustomTabBadge {
                view.removeFromSuperview()
            }
        }
    }    
    
    func addChildVc(){
        self.videoController = BMVideoViewController()
        videoController.bm = self.bm
        videoController.conference = self.conference
        
        self.msgController  = BMMessageController()
        msgController.bm = self.bm
        msgController.conference = self.conference
        
        self.viewControllers = [videoController, msgController]
        customTabBar()
    }
    
    func customTabBar(){
        let normalImageArr = NSArray(array: ["icon_video_inactive","icon_chat_active"])
        let selectedImageArray = NSArray(array: ["icon_video_active","icon_chat_no"])
        
        for (index, singleVC) in (self.viewControllers?.enumerated())! {
            
            let image = UIImage(named: "BMSDK.bundle/\(normalImageArr[index] as! String)")?.withRenderingMode(.alwaysOriginal)
            let selectedImage = UIImage(named: "BMSDK.bundle/\(selectedImageArray[index] as! String)")?.withRenderingMode(.alwaysOriginal)
            let tabBarItem = UITabBarItem(title: nil, image: image, selectedImage: selectedImage)
            tabBarItem.imageInsets = UIEdgeInsetsMake(6, 0, -6, 0)
            singleVC.tabBarItem = tabBarItem
        }
    }
    
    func handleRouteChange(notification: NSNotification){
        let interuptionDict: NSDictionary = notification.userInfo! as NSDictionary
        let routeChangeReason: NSInteger = (interuptionDict.value(forKey: AVAudioSessionRouteChangeReasonKey)! as AnyObject).integerValue
        switch (routeChangeReason) {
            
        case Int(AVAudioSessionRouteChangeReason.newDeviceAvailable.rawValue):
            bm.toggleAudioOutput("handset")
            break;
        case Int(AVAudioSessionRouteChangeReason.oldDeviceUnavailable.rawValue):
            bm.toggleAudioOutput("speaker")
            break;
        default:
            break;
        }
    }
    
    func isHeadsetPluggedIn() -> Bool {
        let route: AVAudioSessionRouteDescription = AVAudioSession.sharedInstance().currentRoute
        for desc in route.outputs {
            if (desc ).portType == AVAudioSessionPortHeadphones {
                return true
            }
        }
        return false
    }
    
    func audioSessionWasInterrupted(notification: NSNotification) {
        if notification.name != NSNotification.Name.AVAudioSessionInterruption || notification.userInfo == nil{
            return
        }
        
        var info = notification.userInfo!
        var intValue: UInt = 0
        (info[AVAudioSessionInterruptionTypeKey] as! NSValue).getValue(&intValue)
        if let type = AVAudioSessionInterruptionType(rawValue: intValue) {
            switch type {
            case .began:
                self.removePersonFromRoom()
            case .ended: break
            }
        }
    }
    
    func removePersonFromRoom(){
        //todo
        self.navigationController?.popViewController(animated: false)
        DispatchQueue.main.sync {
            for muxerInfo in self.bm.muxersInfo {
                self.bm.disconnectStream(muxerInfo.key as! String)
            }
            self.bm.disconnectFromServer()
        }
        
    }
    
    
    
    func changeRole(message: [NSObject : AnyObject]){
        let messageDict =  message as NSDictionary
        
        guard let action    = messageDict["action"] as? String        else { return }
        guard let data      = messageDict["data"]   as? NSDictionary  else { return }
        guard let userInfo  = data["user"]      as? NSDictionary  else { return }
        guard let sid       = userInfo["sid"]   as? String        else { return }
        guard let role      = userInfo["role"]  as? String        else { return }
        
        if role == "Temp-Organizer" || role == "Presenter" {
            self.conference.tmpRole = "Admin"
        } else if role == "Member" {
            self.conference.tmpRole = "Member"
        }
        
        // 判断是不是更改自己的role
        if  sid == bm.socketID { // 非realAdmin  是指在会议室里非手动修改的role
            if !self.conference.isAdmin(){
                // "Temp-Origanizer  代表在会议室里手动设置的role"
                if role == "Organizer" || role == "Temp-Organizer" || role == "Presenter" {
                    self.bmroomUserDelegate?.bigRoomNotificationDelegateUserLock!(status: 1)
                    self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgLock!(status: 1)
                    self.bmroomVideoDelegate?.bigRoomNotificationDelegateVideoAction!(action: action, status: 1)
                }  else if role == "Member" {
                    self.bmroomUserDelegate?.bigRoomNotificationDelegateUserLock!(status: 0)
                    self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgLock!(status: 0)
                    self.bmroomVideoDelegate?.bigRoomNotificationDelegateVideoAction!(action: action, status: 0)
                    
                    // todo
                    self.videoController.videoAction(action: action, status: 0)
                }
            }
        }
        
        //发送会员变成管理员的通知,让whiteboard可以画
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changeMemberOrAdmin"), object: data["status"])
        self.bmroomUserDelegate?.bigRoomNotificationDelegateUserChangeRole!(role: role, sid: sid)
    }
    
}


extension BMTabBarController: BMRoomDelegate, SubmitNewPollDelegate {
    
    public func connectServer(){ }
    public func bmRoomDidConnect(_ bm: BMRoom!) { }
    public func bmRoomFailedConnect(_ bm: BMRoom!) { }
    
    public func  bmRoom(_ bm: BMRoom!, userConnected user: [AnyHashable : Any]!) {
        self.bmroomUserDelegate?.bigRoomNotificationDelegateUserEnter!(user: user as [NSObject : AnyObject])
    }
    
    public func bmRoom(_ bm: BMRoom!, userDisconnected sid: String!) {
        self.bmroomUserDelegate?.bigRoomNotificationDelegateUserLeave!(sid: sid)
    }
    
    public func bmRoom(_ bm: BMRoom!, didSyncChatMessages messages: [NSObject : AnyObject]!) {
        self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgLoad!(messages: messages)
    }
    
    
    public func bmRoom(_ bm: BMRoom!, didReceiveChatMessage message: [AnyHashable : Any]!) {
        self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgAdd!(message: message as [NSObject : AnyObject])
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateMsgAddTabbar!(message: message as [NSObject : AnyObject])
        
        let msg = Message(dictionary: message as NSDictionary)
        if msg.toId == "" {
            //chat的消息条数改变的通知
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "chatBadgeCount"), object: msg)
        }else{
            PeopleMessage.totalMessages.append(msg)
            PeopleMessage.bigTotalMessages.append(msg)
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "PeopleMsgAddNotification"), object: message)
        }
  
    }
    
    
    //分页获取chats
    public func bmRoom(_ bm: BMRoom!, didReceiveSyncMessages messages: [AnyHashable : Any]!) {
        self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgLoad!(messages: messages as [NSObject : AnyObject])
    }
    
    public func bmRoom(_ bm: BMRoom!, didReceiveNewStream muxerID: String!, enableVideo video: String!, enableAudio audio: String!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateReceiveNewStream!(didReceiveNewStream: muxerID, enableVideo: video, enableAudio: audio)
    }
    
    public func bmRoom(_ bm: BMRoom!, didConnectStream muxerID: String!) {
        if isHeadsetPluggedIn() {
            bm.toggleAudioOutput("handset")
        } else {
            bm.toggleAudioOutput("speaker")
        }
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateConnectStream!(muxerID: muxerID)
    }
    
    public func bmRoom(_ bm: BMRoom!, disconnectedStream muxerID: String!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateDisconnectedStream!(muxerID: muxerID)
    }
    
    
    public func bmRoom(_ bm: BMRoom!, didReceiveMessage message: [AnyHashable : Any]!) {
        
        let messageDict = message as NSDictionary
        guard let action = messageDict["action"] as? String else { return }
        
        if action == "handout:switch"  {
            self.bmroomHandoutDelegate?.bigRoomNotificationDelegateHandoutSwitch!(message: message as [NSObject : AnyObject])
            return
        }
        if action == "open-offer"  {
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateOpenOffer!(message: message as [NSObject : AnyObject])
            return
        }
        if action == "videoShare:get_time_now"  {
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateServerTime!(message: message as [NSObject : AnyObject])
            return
        }
        
        // change role admin/presenter/attendee
        if action == "admin"  {
            self.changeRole(message: message as [NSObject : AnyObject])
            return
        }
        
        // close user video or audio
        if (action == "mute-user-video" || action == "mute-user-audio")  {
            
            let data     = messageDict["data"] as! NSDictionary
            let status   = data["status"] as! String
            let sid      = data["sid"] as! String
            let twitter_name = data["twitter_name"] as? String
            
            //表示是对当前用户的操作
            if  (sid == bm.socketID && twitter_name == nil) {
                self.bmroomVideoDelegate?.bigRoomNotificationDelegateVideoAction!(action: action, status: status == "enable" ? 1 : 0)
                //todo
                self.videoController.videoAction(action: action, status: status == "enable" ? 1 : 0)
            }
            return
        }
        
        // kick user out room
        if (action == "leave-room") {
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateRemoveFromRoom!()
            return
        }
        
        // open/close attendee's cam & mic
        if (action == "mute-all-mic" || action == "mute-all-cam") {
            //print(self.conference.tmpRole)
            if !self.conference.adminRole(){
                guard let data   = message["data"] as? NSDictionary else { return }
                guard let status = data["status"] as? String else { return }
                self.bmroomVideoDelegate?.bigRoomNotificationDelegateVideoAction!(action: action, status: status == "enable" ? 1 : 0)
                //todo
                self.videoController.videoAction(action: action, status: status == "enable" ? 1 : 0)
            }
            return
        }
        
        if action == "stream:mute" {
            guard let data    = messageDict["data"] as? NSDictionary else { return }
            guard let muxerId = data["mid"] as? String else { return }
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateMuteAudio!(muxerID: muxerId, status: false)
            return
        }
        
        if action == "stream:unmute" {
            guard let data    = messageDict["data"] as? NSDictionary else { return }
            guard let muxerId = data["mid"] as? String else { return }
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateMuteAudio!(muxerID: muxerId, status: true)
            return
        }
        
        if (action == "whiteboard:create") {
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateWhiteBoardCreated!()
            return
        }
        
        if action == "whiteboard:close" {
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateWhiteBoardRemoved!()
            return
        }
        
        if action == "whiteboard:switch" {
            let page = messageDict["data"] as? Int ?? 0
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateWhiteBoardSwitch!(page: page)
            return
        }
        
        // enable or disenable public chat
        if action == "chat-lock" {
            if !self.conference.adminRole() {
                guard let status = messageDict["data"] as? String else { return }
                self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgLock!(status: status == "enable" ? 1 : 0)
            }
            return
        }
        
        // enable or disenable attendee list
        if action == "seeall-lock" {
            if !self.conference.adminRole(){
                guard let status = messageDict["data"] as? String else { return }
                self.bmroomUserDelegate?.bigRoomNotificationDelegateUserLock!(status: status == "enable" ? 1 : 0)
            }
            return
        }
        
        //delete a chat
        if action == "message:delete" {
            self.bmroomChatDelegate?.bigRoomNotificationDelegateMsgDel!(message: message as [NSObject : AnyObject])
            return
        }
        if action == "question-answer-lock" || action == "question-answer-view-lock"{
            self.bmroomQADelegate?.bigRoomNotificationDelegateQALock!(message: message as [NSObject : AnyObject])
        }
        
        if action == "questionAnswer:new" {
            self.bmroomQADelegate?.bigRoomNotificationDelegateQANew!(message: message as [NSObject : AnyObject])
            self.bmroomVideoDelegate?.bigRoomNotificationDelegateMsgAddTabbar!(message: message as [NSObject : AnyObject])
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changeQA"), object: nil)
            return
        }
        
        if action == "questionAnswer:voted" {
            self.bmroomQADelegate?.bigRoomNotificationDelegateQAVote!(message: message as [NSObject : AnyObject])
            return
        }
        
        if action == "questionAnswer:answered" {
            self.bmroomQADelegate?.bigRoomNotificationDelegateQAAnswered!(message: message as [NSObject : AnyObject])
            return
        }
        
        if action == "questionAnswer:delete" {
            self.bmroomQADelegate?.bigRoomNotificationDelegateQADelete!(message: message as [NSObject : AnyObject])
            return
        }
        
        if  action == "update_result" ||   action == "end_poll"  {
           self.bmroomPollDelegate?.bigRoomNotificationDelegatePollReload!(message: message as [NSObject : AnyObject])
            return
        }
        
        if (action == "new_poll" ) {
            
            guard let data  = message["data"] as? NSDictionary else { return }
            
            if let queue = data["in_queue"] as? String{
                if queue == "false" {
                    self.bmroomVideoDelegate?.bigRoomNotificationDelegateMsgAddTabbar!(message: message as [NSObject : AnyObject])
                    self.bmroomPollDelegate?.bigRoomNotificationDelegatePollReload!(message: message as [NSObject : AnyObject])
                    //记录新的投票数
                    PeopleMessage.pollCount = String(Int(PeopleMessage.pollCount)! + 1)
          
                    //如果有新的投票,发送通知,修改投票数
                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changePollCount"), object: nil)
                    //有新的投票
                    recieveNewPoll(message: message as [NSObject : AnyObject])
                }
            } else if let queue = data["in_queue"] as? Bool{
                    if queue == false {
                        self.bmroomVideoDelegate?.bigRoomNotificationDelegateMsgAddTabbar!(message: message as [NSObject : AnyObject])
                        self.bmroomPollDelegate?.bigRoomNotificationDelegatePollReload!(message: message as [NSObject : AnyObject])
                        //记录新的投票数
                        PeopleMessage.pollCount = String(Int(PeopleMessage.pollCount)! + 1)
                        //如果有新的投票,发送通知,修改投票数
                        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changePollCount"), object: nil)
                        //有新的投票
                        recieveNewPoll(message: message as [NSObject : AnyObject])
                    }
            } else {
                self.bmroomVideoDelegate?.bigRoomNotificationDelegateMsgAddTabbar!(message: message as [NSObject : AnyObject])
                self.bmroomPollDelegate?.bigRoomNotificationDelegatePollReload!(message: message as [NSObject : AnyObject])
                //记录新的投票数
                PeopleMessage.pollCount = String(Int(PeopleMessage.pollCount)! + 1)
                //如果有新的投票,发送通知,修改投票数
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changePollCount"), object: nil)
                //有新的投票
                recieveNewPoll(message: message as [NSObject : AnyObject])
            }
        }
        
        if action == "delete_poll" {
           self.bmroomPollDelegate?.bigRoomNotificationDelegatePollDelete!(message: message as [NSObject : AnyObject])
            return
        }
        
        
        //接收web页的坐标
        if action == "whiteboard:draw" {
            let coordinateModel = CoordinateModel.init(dictionary: message["data"] as! NSDictionary)
            if self.bm.socketID == coordinateModel.drawer{
                
            }else{
                //print("接收web页的坐标\(message["data"])")
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "addCoorinate"), object: nil, userInfo: ["model":coordinateModel])
            }
        }
        
        //接收web页的颜色和字体大小
        if action == "whiteboard:sync_position" {
            
            let drawPositionModel = DrawPositionModel.init(dictionary: message["data"] as! NSDictionary)
            //print("接收web页的颜色和字体大小:\(message["data"])")
     
             NotificationCenter.default.post(name: NSNotification.Name(rawValue: "drawColorAndSize"), object: nil, userInfo: ["model":drawPositionModel])
        }
        //提前接收web页传过来的颜色或者字体大小
        if action == "whiteboard:sync_draw_action" {
            print("提前接收web页传过来的颜色或者字体大小:\(message["data"])")
            let actionDic = message["data"] as! NSDictionary
            
            if actionDic["actionName"] as! String == "changeSize" {
                let drawSizeModel = DrawSizeModel.init(dictionary: actionDic)
                 NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changeSize"), object: nil, userInfo: ["model":drawSizeModel])
            }
  
            if actionDic["actionName"] as! String == "setColor" {
                let drawColorModel = DrawColorModel.init(dictionary: actionDic)
                 NotificationCenter.default.post(name: NSNotification.Name(rawValue: "changeColor"), object: nil, userInfo:  ["model":drawColorModel])
            }
            
        }
        //接收web页的清除所有坐标命令
        if action == "whiteboard:clear_draw" {
            //print("接收web页的清除所有坐标命令:\(message["data"])")
            
             NotificationCenter.default.post(name: NSNotification.Name(rawValue: "clearLine"), object: nil)
        }
        
        //新用户进来接收之前的画画的图片
        if action == "whiteboard:sync_history" {
            //print("新用户进来接收之前的画画的图片:\(message["data"])")
            if let whiteboardArr = message["data"] as? NSArray{
                let whiteboardDrawModel = WhiteboardDrawModel.init(dictionary: whiteboardArr[0] as! NSDictionary)
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "whiteboardDrawModel"), object: nil, userInfo:  ["model":whiteboardDrawModel])
            }
        }
        
    }
    
  public  func recieveNewPoll(message: [NSObject : AnyObject]){
           DispatchQueue.main.sync {
            if self.backgroundView != nil {
                self.backgroundView.removeFromSuperview()
            }
            guard let msgDict = message as? NSDictionary else { return }
            let action  = msgDict["action"] as! String
            let data    = msgDict["data"] as! NSDictionary
            
            
            if action == "new_poll" {
                let newPoll = NewPoll(dictionary: data)
                
                self.backgroundView = NewPollView(frame: CGRect.init(x: 0, y: 0, width: ScreenW, height: ScreenH),newPoll: newPoll)
                self.backgroundView.submitNewPollDelegate = self
                self.view.window?.addSubview(self.backgroundView)
            }
        }
    }
    
    func didRecieveSelectBtnWithId(model: NewPoll,chooseArray:NSArray){
        
        var dict = [NSString:AnyObject]()
        dict["poll_id"]       =  model.pollId as AnyObject?
        dict["timestamp"]     =  ToolHelper.getCurrentTimeStamp() as AnyObject?
        dict["photo"]         =  conference.currentUserInfo?.photo as AnyObject?
        dict["choose"]        =  NSArray(array: chooseArray)
        dict["submit_sid"]    =  bm.socketID as AnyObject?
        dict["poll_question"] =  model.pollQuestion as AnyObject?
        dict["choice"]        =  model.choiceIdDic
        
        self.bm.pollSubmit(dict)
        self.backgroundView.removeFromSuperview()
    }
    
    
    public func bmRoom(_ bm: BMRoom!, didChangeVideoDimension muxerID: String!, with size: CGSize) {
         self.bmroomVideoDelegate?.bigRoomNotificationDelegateVideoFrameChanged!(muxerID: muxerID, size: size)
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, muxerAudioLevel muxerID: String!, changedTo level: Int32) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateAudioSizeChanged!(muxerID: muxerID, level: level)
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, failedConnectStream muxerID: String!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateFailedConnectStream!(muxerID: muxerID)
        return
    }
    
    public func bmRoomDidClose(_ bm: BMRoom!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateCloseRoom!()
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "closeRoom"), object: nil)
        return
    }
    
    public func  bmRoom(_ bm: BMRoom!, loadYoutubeMsg message: [AnyHashable : Any]!)  {
        //self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeLoad!(message: message as [NSObject : AnyObject])
        self.videoController.youtubeLoad(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, seekYoutubeMsg message: [AnyHashable : Any]!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeSeek!(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, playYoutubeMsg message: [AnyHashable : Any]!) {
         self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubePlay!(message: message as [NSObject : AnyObject])
        //self.videoController.youtubePlay(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, pauseYoutubeMsg message: [AnyHashable : Any]!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubePause!(message: message as [NSObject : AnyObject])
        self.videoController.youtubePause(message: message as [NSObject : AnyObject])
        return
    }
    
    
    public func bmRoom(_ bm: BMRoom!, endYoutubeMsg message: [AnyHashable : Any]!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeEnd!(message: message as [NSObject : AnyObject])
        self.videoController.youtubeEnd(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, muteYoutubeMsg message: [AnyHashable : Any]!) {
        // self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeMute!(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, unmuteYoutubeMsg message: [AnyHashable : Any]!) {
        // self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeUnmute!(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, volumeChangeYoutubeMsg message: [AnyHashable : Any]!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeVolumeChange!(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, actionYoutubeMsg message: [AnyHashable : Any]!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateYoutubeAction!(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, loadMP4Msg message: [AnyHashable : Any]!) {
       //self.bmroomVideoDelegate?.bigRoomNotificationDelegateMp4Load!(message: message as [NSObject : AnyObject])
        self.videoController.mp4Load(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, endMP4Msg message: [AnyHashable : Any]!) {
       self.bmroomVideoDelegate?.bigRoomNotificationDelegateMp4End!(message: message as [NSObject : AnyObject])
        self.videoController.mp4Ended(message: message as [NSObject : AnyObject])
        return
    }
    
    
    public func bmRoom(_ bm: BMRoom!, muteMP4Msg message: [AnyHashable : Any]!) {}
    
    
    public func bmRoom(_ bm: BMRoom!, pauseMP4Msg message: [AnyHashable : Any]!) {
       self.bmroomVideoDelegate?.bigRoomNotificationDelegateMp4Pause!(message: message as [NSObject : AnyObject])
        self.videoController.mp4Pause(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, playMP4Msg message: [AnyHashable : Any]!) {
        self.bmroomVideoDelegate?.bigRoomNotificationDelegateMp4Play!(message: message as [NSObject : AnyObject])
        self.videoController.mp4Play(message: message as [NSObject : AnyObject])
        return
    }
    
    public func bmRoom(_ bm: BMRoom!, unmuteMP4Msg message: [AnyHashable : Any]!) { }
    
    public func bmRoom(_ bm: BMRoom!, volumeChangeMP4Msg message: [AnyHashable : Any]!) {}
    
    public func bmRoom(_ bm: BMRoom!, actionMP4Msg message: [AnyHashable : Any]!) {}
    
}


class CustomTabBadge: UILabel {}



