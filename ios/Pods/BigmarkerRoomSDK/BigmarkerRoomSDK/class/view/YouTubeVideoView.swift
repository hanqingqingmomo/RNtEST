//
//  YouTubeVideoView.swift
//  bigmarker
//
//  Created by hanqing on 5/13/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

class YouTubeVideoView: UIView, YTPlayerViewDelegate {
    
    var playerView: YTPlayerView!
    var seconds:Float    = 0.0
    var eventTime:Double = 0.0
    var timeSinceLastEvent = 0.0
    var playingState     = 0 // 1 播放 2 暂停
    
    init(frame: CGRect, seconds: Float, eventTime: Double, playingState: Int) {
        super.init(frame: frame)
        self.seconds      = seconds
        self.eventTime    = eventTime
        self.playingState = playingState
        self.isUserInteractionEnabled = false
        self.frame        = frame
        self.playerView = YTPlayerView(frame: frame)
        self.playerView.delegate = self
        self.addSubview(playerView)
    }
    
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func loadVideo(url: String){
        let playerVars = [
            "controls" : 0,
            "playsinline" : 1,
            "autohide" : 2,
            "showinfo" : 0,
            "rel": 0,
            "modestbranding" : 0,
            "origin": "https://www.bigmarker.com/",
            "enablejsapi": 1
        ] as [String : Any]
        let id = extractYoutubeIdFromLink(link: url)
        self.playerView.load(withVideoId: id, playerVars: playerVars)
    }
    
    func extractYoutubeIdFromLink(link: String) -> String {
        
        let pattern = "((?<=(v|V)/)|(?<=be/)|(?<=(\\?|\\&)v=)|(?<=embed/))([\\w-]++)"
        guard let regExp = try? NSRegularExpression(pattern: pattern, options: .caseInsensitive) else {
            return ""
        }
        let nsLink = link as NSString
        let options = NSRegularExpression.MatchingOptions(rawValue: 0)
        let range = NSRange(location: 0,length: nsLink.length)
        let matches = regExp.matches(in: link as String, options:options, range:range)
        if let firstMatch = matches.first {
            
            return nsLink.substring(with: firstMatch.range)
        }
        return ""
    }
    
    
    func playYoutubeVideo(){
        if self.playingState == 2 {
            self.playerView.playVideo()
            self.playerView.seek(toSeconds: self.seconds, allowSeekAhead: true)
            self.playerView.pauseVideo()
        } else if self.playingState == 1 {
            let seekTime = caclcuteSeekTime()
            if seekTime < Float(self.playerView.duration()) {
                self.playerView.playVideo()
                self.playerView.seek(toSeconds: seekTime, allowSeekAhead: true)
            }
        }
    }
    
    func syncVideo(seekTime: Float){
        self.playerView.playVideo()
        self.playerView.seek(toSeconds: seekTime, allowSeekAhead: true)
    }
    
    func seekVideo(){
        if self.playingState == 2 {
            //self.playerView.playVideo()
            self.playerView.seek(toSeconds: self.seconds, allowSeekAhead: true)
            self.playerView.pauseVideo()
        } else if self.playingState == 1 {
            self.playerView.playVideo()
            self.playerView.seek(toSeconds: self.seconds, allowSeekAhead: true)
        }
    }
    
    func caclcuteSeekTime() -> Float{
        let time_since_event =  round(self.timeSinceLastEvent / 1000)
        let seek_time        =  Double(self.seconds) + time_since_event + 2
        //        print("11111111111111111111111")
        //        print(time_since_event)
        return Float(seek_time)
    }
    
    
    func playerViewDidBecomeReady(_ playerView: YTPlayerView) {
        playYoutubeVideo()
    }
    
    
}
