//
//  VideoInfo.swift
//  bigmarker
//
//  Created by hanqing on 3/30/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//
enum VideoType {
    case video
    case audio
    case screen
    case selfvideo
    case selfaudio
}

import Foundation
class VideoInfo: NSObject{

    var muxerID  = ""
    var userName = ""
    var type = VideoType.video
    var avatarUrl = ""
    var muxerInfo: NSMutableDictionary!
    
    init(muxerID: String, userName: String, avatarUrl: String, muxerInfo: NSMutableDictionary) {
        self.muxerID   = muxerID
        self.userName  = userName
        self.avatarUrl = avatarUrl
        self.muxerInfo = muxerInfo
    }
    
    func isMuted() -> Bool{
        return self.muxerInfo["mute"] as! String == "true"
    }
    
}