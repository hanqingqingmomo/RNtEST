//
//  BigRoomBase.swift
//  bigmarker
//
//  Created by hanqing on 2/15/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

@objc public protocol BigRoomConnectionProtocol {
    @objc optional func  bmRoomDidConnect(bm: BMRoom!)
    @objc optional func  bmRoomFailedConnect(bm: BMRoom!)
}

public class BigRoomBase: NSObject,  BMRoomDelegate {
    
    public var delegate:BigRoomConnectionProtocol?
    
    var host   = ""
    var mcuID  = ""
    var userID = ""
    var data   = ""
    var conference: BMConference!
    
    public init(conference: BMConference) {
        self.conference = conference
        self.host = conference.conferenceServer!.replacingOccurrences(of: "https://", with: "")
    }
    
    
    public func connectServer(){
        let options: NSMutableDictionary = NSMutableDictionary()
        options["host"]     = self.host
        options["authData"] = conference.dataKey!
        options["mcuID"]    = conference.mcuID!
        options["userID"]   = conference.userID!
        options["twilioPassword"]   = conference.twilioPassword
        options["twilioUsername"]   = conference.twilioUsername
        
        BMRoom(delegate: self, options: options as [NSObject : AnyObject])!.connectToServer()
    }
    
    public func disConnectServer(){
        let options: NSMutableDictionary = NSMutableDictionary()
        options["host"]     = self.host
        options["authData"] = conference.dataKey!
        options["mcuID"]    = conference.mcuID!
        options["userID"]   = conference.userID!
        options["twilioPassword"]   = conference.twilioPassword
        options["twilioUsername"]   = conference.twilioUsername
        
        BMRoom(delegate: self, options: options as [NSObject : AnyObject])!.disconnectFromServer()
    }
    
    
    public func bmRoomDidConnect(_ bm: BMRoom!) {
        self.delegate?.bmRoomDidConnect!(bm: bm)
    }
    
    public func bmRoomFailedConnect(_ bm: BMRoom!) {
        self.delegate?.bmRoomFailedConnect!(bm: bm)
    }
    
    public func bmRoom(_ bm: BMRoom!, didReceiveSyncMessages messages: [NSObject : AnyObject]!) {}
    public func bmRoom(_ bm: BMRoom!, didSyncChatMessages messages: [NSObject : AnyObject]!) {}
    public func bmRoom(_ bm: BMRoom!, didReceiveChatMessage message: [NSObject : AnyObject]!) {}
    public func bmRoom(_ bm: BMRoom!, didConnectStream muxerID: String!) {}
    public func bmRoom(_ bm: BMRoom!, disconnectedStream muxerID: String!) {}
    public func bmRoom(_ bm: BMRoom!, didReceiveMessage message: [NSObject : AnyObject]!) {}
    public func bmRoom(_ bm: BMRoom!, didReceiveNewStream muxerID: String!, enableVideo video: String!, enableAudio audio: String!) {
    }
    public func bmRoom(_ bm: BMRoom!, failedConnectStream muxerID: String!) {}
    public func bmRoom(_ bm: BMRoom!, userConnected user: [NSObject : AnyObject]!) {
    }
    public func bmRoom(_ bm: BMRoom!, userDisconnected sid: String!) {}
    public func bmRoomDidClose(_ bm: BMRoom!) {}
    public func bmRoom(_ bm: BMRoom!, didChangeVideoDimension muxerID: String!, with size: CGSize) {}
    public func bmRoom(_ bm: BMRoom!, muxerAudioLevel muxerID: String!, changedTo level: Int32) {}
    
    
    func bmRoom(_ bm: BMRoom!, loadYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, playYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, pauseYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, endYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, actionYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, muteYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, unmuteYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, seekYoutubeMsg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, volumeChangeYoutubeMsg message: [NSObject : AnyObject]!) {}
    
    
    func bmRoom(_ bm: BMRoom!, actionMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, endMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, loadMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, muteMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, pauseMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, playMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, unmuteMP4Msg message: [NSObject : AnyObject]!) {}
    func bmRoom(_ bm: BMRoom!, volumeChangeMP4Msg message: [NSObject : AnyObject]!) {}
    
}
