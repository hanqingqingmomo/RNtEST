//
//  VideoBottomUserInfoView.swift
//  bigmarker
//
//  Created by hanqing on 7/13/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

class VideoBottomUserInfoView: UIView {
    
    var videoInfo: VideoInfo!
    var progressView: UIProgressView!
    var userNameLabel: UILabel!
    var mutedImageView: UIImageView!
    
    init(frame: CGRect, videoInfo: VideoInfo) {
        super.init(frame: frame)
        self.tag = VIDEO_BOTTOM_VIEW_TAG
        self.frame = frame
        self.backgroundColor = UIColor(red: 128/255, green: 128/255, blue: 128/255, alpha: 0.5)
        self.videoInfo = videoInfo
        setBottomView()
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func setBottomView(){
        
        progressView = UIProgressView(progressViewStyle: UIProgressViewStyle.bar)
        progressView.frame = CGRect(x: 0, y: self.frame.height - 3, width: self.frame.width, height: 1)
        progressView.trackTintColor = UIColor.lightGray
        progressView.tintColor = UIColor(red: 31/255, green: 196/255, blue: 166/255, alpha: 1)
        progressView.tag = PROGRESS_VIEW_TAG
        
        
        let blurEffect = UIBlurEffect(style: UIBlurEffectStyle.dark)
        let blurEffectView = UIVisualEffectView(effect: blurEffect)
        blurEffectView.alpha = 0.7
        blurEffectView.frame = self.bounds
        blurEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        self.addSubview(blurEffectView)
        
        userNameLabel = UILabel(frame: CGRect(x: 12, y: 1, width: self.frame.width/2 + 30 , height: 25))
        userNameLabel.text = videoInfo.userName
        userNameLabel.adjustsFontSizeToFitWidth = true
        userNameLabel.font = UIFont(name: BMSFUIDisplay_Medium, size: 13)
        userNameLabel.textColor = UIColor.white
        userNameLabel.textAlignment = NSTextAlignment.left
        
        mutedImageView = UIImageView(frame: CGRect(x: self.frame.width-20, y: 4, width: 17, height: 20))
        mutedImageView.image = UIImage(named: "BMSDK.bundle/audio-muted")
        
        if !videoInfo.isMuted() {
            mutedImageView.isHidden = true
        }
        
        self.addSubview(progressView)
        self.addSubview(userNameLabel)
        //self.addSubview(avatar)
        self.addSubview(mutedImageView)
    }
    
    func muted(status: Bool){
        if status == true {
             mutedImageView.isHidden = true
        } else {
             mutedImageView.isHidden = false
        }
    }
    


}
