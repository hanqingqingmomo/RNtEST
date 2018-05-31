//
//  VideoPannelView.swift
//  bigmarker
//
//  Created by hanqing on 2/19/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

protocol SwitchVideoNotification {
    func notifyReloadView()
    func notifyOpenVideo(muxerID: String)
    func notifyOpenAudio(muxerID: String)
    func notifyCloseVideo(muxerID: String)
    func notifyCloseAudio(muxerID: String)
    func notifyMuteAudioBySelf(muxerID: String, status: Bool)
}

enum ButtonStatus {
    case open     //正在打开
    case close    //已经关闭
    case muted    //已经静音
    case unmuted  //取消静音
    case block
}

//正在打开的类型
enum OpenStatus {
    case video
    case audio
    case defaultStatus
}

class VideoPannelView: UIView {
    
    var videoUIButton: UIButton!
    var audioUIButton: UIButton!
    var mutedUIButton: UIButton!
    var bm: BMRoom!
    
    var videoStatus = ButtonStatus.close
    var audioStatus = ButtonStatus.close
    var mutedStatus = ButtonStatus.unmuted
    
    var muxerID = ""
    var audioConnectionStatus = false
    var videoConnectionStatus = false
    var admin                 = false
    var openType = OpenStatus.defaultStatus
    var switchVideoDelegate: SwitchVideoNotification?
    
    //会议链接timer
    var connectTimer: Timer!
    var connectTime = 0
    
    
    init(frame: CGRect, admin: Bool, bm: BMRoom?) {
        super.init(frame: frame)
        self.frame = frame
        self.bm    = bm
        self.admin = admin
        
        setupUI()
        initPannelStatus()
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
   @objc func switchMute(sender: UIButton){
        if videoConnectionStatus == true {
            if mutedStatus == ButtonStatus.unmuted {
                muteAudio(sender: sender)
            } else {
                unMuteAudio(sender: sender)
            }
        }
    }
    
  @objc  func switchVideo(sender:UIButton!){
        if true {
            
            if  videoStatus == ButtonStatus.close && audioStatus == ButtonStatus.close {
                if muxerID == "" && videoConnectionStatus == false {
                    openVideo(sender: sender)
                    hideAudioButton()
                    showMuteButton()
                }
            } else if videoStatus == ButtonStatus.close && audioStatus == ButtonStatus.open {
                if muxerID != "" && videoConnectionStatus == false && audioConnectionStatus == true {
                    closeAudio(sender: audioUIButton)
                    openVideo(sender: sender)
                    hideAudioButton()
                    showMuteButton()
                }
            } else if videoStatus == ButtonStatus.close && audioStatus == ButtonStatus.block {
                if muxerID == "" && videoConnectionStatus == false {
                    openVideo(sender: sender)
                    showMuteButton()
                }
            } else if videoStatus == ButtonStatus.open {
                if muxerID != "" && videoConnectionStatus == true {
                    closeVideo(sender: sender)
                    hideMuteButton()
                    if audioStatus != ButtonStatus.block {
                        showAudioButton()
                    }
                }
            }
        } else {
            ToolHelper.showAlertViewAboutNetwork(view: self.superview!)
        }
    }
    
   @objc func switchAudio(sender:UIButton!){
        if true {
            if  (videoStatus == ButtonStatus.close || videoStatus == ButtonStatus.block) && audioStatus == ButtonStatus.close {
                if muxerID == "" && audioConnectionStatus == false {
                    openAudio(sender: sender)
                }
            } else if (videoStatus == ButtonStatus.close || videoStatus == ButtonStatus.block) && audioStatus == ButtonStatus.open {
                if muxerID != "" && audioConnectionStatus == true {
                    closeAudio(sender: sender)
                }
            }
        }else {
            ToolHelper.showAlertViewAboutNetwork(view: self.superview!)
        }
    }
    
    
    func openVideo(sender:UIButton!){
        self.openType = OpenStatus.video
        videoStatus = ButtonStatus.open
        let muxerID = bm.connectStream(nil, enableVideo: "front", enableAudio: "true")
        sender.setImage(UIImage(named: "BMSDK.bundle/cam-on"), for: UIControlState.normal)
        switchVideoDelegate?.notifyOpenVideo(muxerID: muxerID!)
        
        self.connectTimer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(self.countConnectTime), userInfo: nil, repeats: true)
    }
    
    
   @objc func countConnectTime(){
        self.connectTime += 1
        //        print("===================")
        //        print(self.connectTime)
        if  self.connectTime > 10{
            self.bm.disconnectStream(self.muxerID)
            switchVideoDelegate?.notifyReloadView()
        }
    }
    
    func closeVideo(sender:UIButton!){
        videoStatus = ButtonStatus.close
        bm.disconnectStream(muxerID)
        sender.setImage(UIImage(named: "BMSDK.bundle/cam-off"), for: UIControlState.normal)
        switchVideoDelegate?.notifyCloseVideo(muxerID: muxerID)
    }
    
    func openAudio(sender:UIButton!){
        self.openType = OpenStatus.audio
        audioStatus = ButtonStatus.open
        let muxerID = bm.connectStream(nil, enableVideo: "false", enableAudio: "true")
        sender.setImage(UIImage(named: "BMSDK.bundle/mic-on"), for: UIControlState.normal)
        switchVideoDelegate?.notifyOpenAudio(muxerID: muxerID!)
        self.connectTimer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(self.countConnectTime), userInfo: nil, repeats: true)
    }
    
    func closeAudio(sender:UIButton!){
        audioStatus = ButtonStatus.close
        bm.disconnectStream(muxerID)
        sender.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        switchVideoDelegate?.notifyCloseAudio(muxerID: muxerID)
    }
    
    func updateMuteAudioUI(sender:UIButton!){
        mutedStatus = ButtonStatus.muted
        bm.switchStream(muxerID, enableVideo: "true", enableAudio: "false", sendMessage: false)
        sender.setImage(UIImage(named: "BMSDK.bundle/mic-mute"), for: UIControlState.normal)
        self.switchVideoDelegate?.notifyMuteAudioBySelf(muxerID: muxerID, status: false)
    }
    
    func updateUnMuteAudioUI(sender:UIButton!){
        mutedStatus = ButtonStatus.unmuted
        bm.switchStream(muxerID, enableVideo: "true", enableAudio: "true", sendMessage: false)
        sender.setImage(UIImage(named: "BMSDK.bundle/mic-on"), for: UIControlState.normal)
        self.switchVideoDelegate?.notifyMuteAudioBySelf(muxerID: muxerID, status: true)
    }
    
    func muteAudio(sender:UIButton!){
        mutedStatus = ButtonStatus.muted
        bm.switchStream(muxerID, enableVideo: "true", enableAudio: "false", sendMessage: true)
        sender.setImage(UIImage(named: "BMSDK.bundle/mic-mute"), for: UIControlState.normal)
        //self.switchVideoDelegate?.notifyMuteAudioBySelf(muxerID, status: false)
    }
    
    func unMuteAudio(sender:UIButton!){
        mutedStatus = ButtonStatus.unmuted
        bm.switchStream(muxerID, enableVideo: "true", enableAudio: "true", sendMessage: true)
        sender.setImage(UIImage(named: "BMSDK.bundle/mic-on"), for: UIControlState.normal)
        //self.switchVideoDelegate?.notifyMuteAudioBySelf(muxerID, status: true)
    }
    
    func clearVideo(){
        videoUIButton.setImage(UIImage(named: "BMSDK.bundle/cam-off"), for: UIControlState.normal)
        audioUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.hideMuteButton()
        audioStatus = ButtonStatus.close
        videoStatus = ButtonStatus.close
    }
    
    func clearConnectTimer() {
        self.connectTime = 0
        if self.connectTimer != nil {
            self.connectTimer.invalidate()
        }
    }
    
    func reconnect(){
        if self.openType ==  OpenStatus.audio {
            self.switchAudio(sender: self.audioUIButton)
            
        } else if self.openType == OpenStatus.video {
            self.switchVideo(sender: self.videoUIButton)
        }
    }
    
    
    //////////////////////////////////
    
    func showVideoButton(){
        videoUIButton.setImage(UIImage(named: "BMSDK.bundle/cam-off"), for: UIControlState.normal)
        videoStatus = ButtonStatus.close
        self.videoUIButton.isHidden = false
    }
    
    func hideVideoButton(){
        videoUIButton.setImage(UIImage(named: "BMSDK.bundle/cam-off"), for: UIControlState.normal)
        self.videoUIButton.isHidden = true
        videoStatus = ButtonStatus.block
    }
    
    func showMuteButton(){
        mutedUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-on"), for: UIControlState.normal)
        self.mutedUIButton.isHidden = false
    }
    
    func hideMuteButton(){
        mutedUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.mutedUIButton.isHidden = true
    }
    
    func showAudioButton(){
        audioUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.audioUIButton.isHidden = false
        audioStatus = ButtonStatus.close
    }
    
    func hideAudioButton(){
        audioUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.audioUIButton.isHidden = true
        audioStatus = ButtonStatus.close
    }
    
    func blockAudioButton(){
        audioUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.audioUIButton.isHidden = true
        audioStatus = ButtonStatus.block
    }
    
    func unblockAudioButton(){
        audioUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.audioUIButton.isHidden = false
        audioStatus = ButtonStatus.close
    }
    
    func unblockVideoButton(){
        videoUIButton.setImage(UIImage(named: "BMSDK.bundle/cam-off"), for: UIControlState.normal)
        self.videoUIButton.isHidden = false
        videoStatus = ButtonStatus.close
    }
    
    func blockVideoButton(){
        videoUIButton.setImage(UIImage(named: "BMSDK.bundle/-off"), for: UIControlState.normal)
        self.videoUIButton.isHidden = true
        videoStatus = ButtonStatus.block
    }
    
}


extension VideoPannelView {
    
     func setupUI(){
        self.tag = VIDEO_PANNEL_VIEW_TAG
        self.backgroundColor = UIColor.clear
        
        audioUIButton = UIButton(frame: CGRect(x: 3, y: 2, width: 40, height: 40))
        audioUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-off"), for: UIControlState.normal)
        self.addSubview(audioUIButton)
        
        videoUIButton = UIButton(frame: CGRect(x: 40, y: 2, width: 40, height: 40))
        videoUIButton.setImage(UIImage(named: "BMSDK.bundle/cam-off"), for: UIControlState.normal)
        self.addSubview(videoUIButton)
        
        mutedUIButton = UIButton()
        mutedUIButton.frame = audioUIButton.frame
        mutedUIButton.setImage(UIImage(named: "BMSDK.bundle/mic-on"), for: UIControlState.normal)
        mutedUIButton.isHidden = true
        self.addSubview(mutedUIButton)
        
        mutedUIButton.addTarget(self, action: #selector(switchMute), for: UIControlEvents.touchDown)
        audioUIButton.addTarget(self, action: #selector(switchAudio), for: UIControlEvents.touchDown)
        videoUIButton.addTarget(self, action: #selector(switchVideo), for: UIControlEvents.touchDown)
        
    }
    
    
    func initPannelStatus(){
        
        if !admin {
            self.audioStatus = ButtonStatus.block
            self.videoStatus = ButtonStatus.block
            self.videoUIButton.isHidden = true
            self.audioUIButton.isHidden = true
        }
        
        
        if admin {
            
            if !camIsBlock(){
                self.showVideoButton()
            } else {
                self.hideVideoButton()
            }
            
            if !micIsBlock(){
                self.showAudioButton()
            } else {
                self.hideAudioButton()
            }
            
        } else {
            
            if !adminInRoom() && !attendeeCamIsOpen(){
                self.blockVideoButton()
                //return
            }
            
            if !adminInRoom() && !attendeeMicIsOpen() {
                self.blockAudioButton()
                //return
            }
            
            
            if camIsBlock() && !attendeeCamIsOpen() {
                self.blockVideoButton()
            } else if camIsBlock() && attendeeCamIsOpen() {
                self.blockVideoButton()
            } else if !camIsBlock() && attendeeCamIsOpen() {
                self.showVideoButton()
            } else if !camIsBlock() && !attendeeCamIsOpen() {
                if self.bm != nil && bm.muteUserVideo != "" {
                    self.showVideoButton()
                }
            }
            
            if micIsBlock() && !attendeeMicIsOpen() {
                self.blockAudioButton()
            } else if micIsBlock() && attendeeMicIsOpen() {
                self.blockAudioButton()
            } else if !micIsBlock() && attendeeMicIsOpen() {
                self.showAudioButton()
            } else if !micIsBlock() && !attendeeMicIsOpen() {
                if self.bm != nil && bm.muteUserAudio != "" {
                    self.showAudioButton()
                }
            }
        }
        
    }
    
    private func adminInRoom() -> Bool {
        // todo ?? 需要确定一下这个需求
        //return (self.tabBarController as! BigRoomTabBarController).presenters.count > 0
        
        if bm == nil {
            return false
        }
        var presenters: [String] = []
        for userDic in bm.usersInfo as NSMutableDictionary {
            guard let udic  = userDic.value as? NSMutableDictionary else { return false }
            guard let role  = udic["role"]  as? String else { return false }
            guard let mid   = userDic.key   as? String else { return false }
            
            if role == "Presenter" {
                presenters.append(mid)
            }
        }
        
        return presenters.count > 0
    }
    
    
    private func camIsBlock() -> Bool{
        return self.bm != nil && bm.muteUserVideo == "disable"
    }
    
    private func micIsBlock() -> Bool{
        return self.bm != nil && bm.muteUserAudio == "disable"
    }
    
    
    private func attendeeCamIsOpen() -> Bool{
        return self.bm != nil && self.bm.muteAllCam == "enable"
    }
    
    private func attendeeMicIsOpen() -> Bool{
        return self.bm != nil && self.bm.muteAllMic == "enable"
    }
    
    
    
}
