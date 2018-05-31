//
//  MP4VideoView.swift
//  bigmarker
//
//  Created by hanqing on 6/3/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit
import AVFoundation
import MediaPlayer
class MP4VideoView: UIView {
    
    
    var pvc: MPMoviePlayerController!
    var link = ""
    var seconds:Float      = 0.0
    var eventTime:Double    = 0.0
    var playingState:Float = 2.0  // 1播放 2暂停
    var timeSinceLastEvent = 0.0
    
    var backgroundEndLabel :UILabel!
    
    
    init(frame: CGRect, link: String, seconds: Float, eventTime: Double, playingState: Float) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.red
        self.frame        = frame
        self.link         = link
        self.seconds      = seconds
        self.eventTime    = eventTime
        self.playingState = playingState
        self.isUserInteractionEnabled = false
        
        let remoteURL = NSURL(string: self.link)
        pvc = MPMoviePlayerController(contentURL: remoteURL as URL!)
        pvc.scalingMode  = MPMovieScalingMode.aspectFit
        pvc.controlStyle = MPMovieControlStyle.none
        pvc.prepareToPlay()
        pvc.view.frame = self.frame
        pvc.shouldAutoplay = false
        self.addSubview(pvc.view)
        
        backgroundEndLabel = UILabel.init(frame: CGRect.init(x: 0, y: 0, width: 250, height: 250))
        backgroundEndLabel.center = self.center
        backgroundEndLabel.backgroundColor = UIColor(red: 22/255.0, green: 24/255.0, blue: 25/255.0, alpha: 1.0)
        backgroundEndLabel.layer.cornerRadius = 20
        backgroundEndLabel.clipsToBounds = true
        backgroundEndLabel.text = "The video has ended"
        backgroundEndLabel.textColor = UIColor.white
        backgroundEndLabel.textAlignment = .center
        
        //======================
        NotificationCenter.default.addObserver(self, selector: #selector(text), name: NSNotification.Name.MPMoviePlayerPlaybackStateDidChange, object: pvc)
        //======================
    }
    
    
    func text(){
        let playbackState = pvc.playbackState
        
        /*
         case Stopped
         case Playing
         case Paused
         case Interrupted
         case SeekingForward
         case SeekingBackward
         */
        switch playbackState {
        case .playing:
            backgroundEndLabel.isHidden = true
            self.playingState = 1
            break
        case .paused:
            
            let seekTime = caclcuteSeekTime()
            if seekTime > Float(self.pvc.duration) {
                self.addSubview(backgroundEndLabel)
                backgroundEndLabel.isHidden = false
            }
            self.playingState = 2
            break
        case .stopped:
            break
            
        case .interrupted:
            backgroundEndLabel.isHidden = true
            break
        default:
            backgroundEndLabel.isHidden = true
            break
        }
        
    }
    func play(){
        
        if self.playingState == 2.0 {
            self.pvc.currentPlaybackTime = TimeInterval(seconds)
            self.pvc.pause()
        } else if  self.playingState == 1.0 {
            let seekTime = caclcuteSeekTime()
            if seekTime < Float(self.pvc.duration) {
                self.pvc.currentPlaybackTime =  TimeInterval(seekTime)
                self.pvc.play()
            }
            
        }
    }
    
    
    
    func seekPause(){
        self.pvc.currentPlaybackTime =  TimeInterval(seconds)
        self.pvc.pause()
    }
    
    func seekPlay(){
        self.pvc.currentPlaybackTime =  TimeInterval(seconds)
        self.pvc.play()
    }
    
    func sycPlay(seekTime: Float){
        self.pvc.currentPlaybackTime =  TimeInterval(seekTime)
        self.pvc.play()
    }
    
    func pause(){
        self.pvc.pause()
    }
    
    func remove(){
        self.pvc.view.removeFromSuperview()
        self.removeFromSuperview()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    func caclcuteSeekTime() -> Float{
        //        let time_since_event =  round(Double(NSDate().timeIntervalSince1970) - self.eventTime / 1000)
        //        let seek_time        =  Double(self.seconds) + time_since_event
        let time_since_event =  round(self.timeSinceLastEvent / 1000)
        let seek_time        =  Double(self.seconds) + time_since_event + 2
        
        //        print("11111111111111111111111")
        //        print(time_since_event)
        return Float(seek_time)
    }
    
    
    
}
