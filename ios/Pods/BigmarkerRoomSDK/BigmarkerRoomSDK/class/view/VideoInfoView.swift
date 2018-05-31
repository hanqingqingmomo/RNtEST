//
//  VideoInfoView.swift
//  bigmarker
//
//  Created by hanqing on 3/30/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

class VideoInfoView: UIView {
    
    var videoInfo: VideoInfo!
    var bottomUserInfoView: VideoBottomUserInfoView!
    
   
    
    init(frame: CGRect, videoFrame: CGRect, videoView: UIView, videoInfo: VideoInfo,fullScreen:Bool,videoArrayCount:Int) {
        super.init(frame: frame)
        self.frame = frame
        self.videoInfo = videoInfo
        setVideoView(frame: videoFrame, videoView: videoView)
        
         let y = videoView.frame.origin.y+videoView.frame.height - 30
         bottomUserInfoView = VideoBottomUserInfoView(frame: CGRect(x: self.frame.origin.x, y: y, width: self.frame.width, height: 30), videoInfo: videoInfo)
        
        
        self.addSubview(bottomUserInfoView)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setVideoView(frame: CGRect, videoView: UIView){
        videoView.frame = frame
        videoView.tag = VIDEO_VIEW_ATG
        self.addSubview(videoView)
        videoView.center = self.convert(self.center, from: self.superview)
    }
    
    
}
