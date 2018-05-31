//
//  BMVideoViewController.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 12/3/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit
import MediaPlayer

let ScreenH = UIScreen.main.bounds.height
let ScreenW = UIScreen.main.bounds.width
let TabbarH: CGFloat = 49
let tableViewCell = "tableViewCell"
let cellColor   =  UIColor(red: 63/255, green: 92/255, blue: 130/255, alpha: 1)


struct AdminAndSwitch {
    static var isSwitchOn = false //记录开关的状态,关闭or开启
}

struct WhiteBoardImage {
    static var images: [UIImage?]   = []
}

class BMVideoViewController: UIViewController {
    
    
    var conference: BMConference!
    var bm: BMRoom!
    var notification: CWStatusBarNotification!
    
    var mp4View: MP4VideoView!
    var youtubeView: YouTubeVideoView!
    
    var otherVideoArray = [String]() // 存放mp4 youtube screenShare whiteBoard
    var videoArray      = [String]() // 存放 video
    var audioArray      = [String]() // 存放 audio
    var videoView : UIView!
    var removeVideoMuxerID = "" //记录创建的videoView的muxerID
    // 正在连接中的video
    var connectingMuxerArray: Set<String> = []
    var reloadTableView: Bool = false
    
    // 计时器，每隔20秒钟 去拉去视频数据
    var streamTimer: Timer!
    var youtubeTimer: Timer!
    
    var tableViewOriginFrame: CGRect!
    var collectionViewOriginFrame: CGRect!
    
    var audioOnly = false
    var rotation  = false
    
    
    //自己的video id
    var selfMuxerID = "" {
        didSet {
            self.videoPannelView.muxerID = selfMuxerID
        }
    }
    var screenID    = ""
    var screenShareView: ScreenShareView!
    var screenView: UIView?
    var whiteBoardView: WhiteBoardView!
    var youtubeLink       = ""
    var mp4Link           = ""
    var seconds: Float    = 0.0
    var eventTime: Double = 0.0
    var playingState      = 0
    var timeSinceLastEvent = 0.0
    
    var videoInfoDictionary: NSMutableDictionary = NSMutableDictionary()
    var videoPannelView: VideoPannelView!
    
    let MP4         = "mp4"
    let YOUTUBE     = "youtube"
    let WHITEBOARD  = "whiteboard"
    let SCREENSHARE = "screenShare"
    let LOADING     = "loading"
    
    
    
    lazy  var navView : BMNavView = { [weak self] in
        let navView = BMNavView(frame: CGRect(x: 0, y: 0, width: self!.view.frame.width, height: 64), conference: (self?.conference)!)
        navView.delegate = self
        return navView
        }()
    
    
    lazy  var tableView : UITableView = { [weak self] in
        let h     = (ScreenH - self!.navView.frame.height - TabbarH)
        let frame = CGRect(x: 0, y: self!.navView.frame.height, width: ScreenW, height: h)
        let tableView = UITableView(frame: frame, style: .plain)
        tableView.dataSource    =   self
        tableView.delegate      =   self
        tableView.backgroundColor = UIColor.white
        tableView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        tableView.isScrollEnabled = false
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: tableViewCell)
        tableView.layoutSubviews()
        return tableView
        }()
    
    
    lazy  var collectionView: UICollectionView = { [weak self] in
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        layout.minimumLineSpacing = 4
        layout.minimumInteritemSpacing = 2
        
        let collectionViewY  = self!.navView.frame.height
        let collectionViewH = ScreenH - self!.navView.frame.height - TabbarH
        
        let frame = CGRect.init(x: 0, y: collectionViewY, width: ScreenW, height: collectionViewH)
        
        let collectionView = UICollectionView(frame: frame, collectionViewLayout: layout)
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.bounces = false
        collectionView.isPagingEnabled = true
        collectionView.scrollsToTop = false
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        collectionView.backgroundColor = UIColor(red: 48/255, green: 75/255, blue: 111/255, alpha: 1)
        let bundle =  Bundle(path: Bundle(for: BMVideoViewController.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        let nib = UINib(nibName: "NoVideoCell", bundle: bundle)
        collectionView.register(nib, forCellWithReuseIdentifier: "NoVideoCell")
        
        collectionView.register(UICollectionViewCell.self, forCellWithReuseIdentifier: "cell")
        return collectionView
        }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        self.bm.youtubeCheckExisting()
        self.bm.mp4CheckExisting()
        streamTimer = Timer.scheduledTimer(timeInterval: 20, target: self, selector: #selector(syncStreams), userInfo: nil, repeats: true)
        
        youtubeTimer = Timer.scheduledTimer(timeInterval: 10, target: self, selector: #selector(checkYoutubeStatus), userInfo: nil, repeats: true)
        (self.tabBarController as! BMTabBarController).bmroomVideoDelegate = self
    }
    
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        
        UIApplication.shared.setStatusBarHidden(false, with: UIStatusBarAnimation.none)
    
        NotificationCenter.default.addObserver(self, selector: #selector(disconnectStream), name: NSNotification.Name(rawValue: "notifyDisconnectStream"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(moviePlayerLoadStateDidChange), name: NSNotification.Name(rawValue: "MPMoviePlayerLoadStateDidChangeNotification"), object: nil)
        
        //设置选中的tabbar底色
        self.tabBarController?.tabBar.selectionIndicatorImage =  UIImage().makeImageWithColorAndSize(color: UIColor.black, size: CGSize.init(width: self.tabBarController!.tabBar.frame.width/2, height: self.tabBarController!.tabBar.frame.height))
        //恢复message tabbar  为no chat 图片
        self.tabBarController?.tabBar.items![1].image = UIImage(named: "BMSDK.bundle/icon_chat_no")
        
    }
    
    
    override func viewDidDisappear(_ animated: Bool) {
        streamTimer.invalidate()
        youtubeTimer.invalidate()

         NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "notifyDisconnectStream"), object: nil)
         NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "MPMoviePlayerLoadStateDidChangeNotification"), object: nil)
         NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "badgeCount"), object: nil)
    }
    
    
    func moviePlayerLoadStateDidChange(){
        if  mp4View != nil  && self.mp4View.pvc.loadState == MPMovieLoadState.playable {
            self.mp4View.play()
        }
    }
    
    
    func disconnectStream(notification: NSNotification){
        bm.disconnectStream(selfMuxerID)
        self.selfMuxerID = ""
    }
    
    
    func syncStreams() {
        bm.getStreams()
    }
    
    func checkYoutubeStatus(){
        
        if self.mp4View != nil {
            if self.mp4View.playingState == 1 { // 播放
                self.bm.getServerTimeNow()
            }
        }
        
        if self.youtubeView == nil || self.youtubeView.playerView.playerState() == YTPlayerState.ended{
            return
        }
        
        if self.youtubeView.playingState == 1 { // 播放
            self.bm.getServerTimeNow()
        } else if self.youtubeView.playingState == 2 { // 暂停
            if  self.youtubeView.playerView.playerState() != YTPlayerState.paused {
                self.youtubeView.playerView.playVideo()
                self.youtubeView.playerView.seek(toSeconds: self.youtubeView.seconds, allowSeekAhead: true)
                self.youtubeView.playerView.pauseVideo()
            }
        }
    }
    
    func setupUI(){
        self.tableViewOriginFrame = self.tableView.frame
        self.collectionViewOriginFrame = self.collectionView.frame
        self.view.addSubview(navView)
        self.view.addSubview(tableView)
        self.view.addSubview(collectionView)
        self.initVideo()
        addPannelView()
    }
    
    func clearRoom(){
        self.videoPannelView.clearConnectTimer()
        for muxerInfo in self.bm.muxersInfo {
            self.bm.disconnectStream(muxerInfo.key as! String)
        }
        self.bm.disconnectFromServer()
        
        self.clearYoutube()
        self.clearMP4()
        
        self.streamTimer.invalidate()
        self.youtubeTimer.invalidate()

        
        if WhiteBoardImage.images.count != 0{
            WhiteBoardImage.images.removeAll()
        }
        if WhiteBoardDrawView.drawViews.count != 0 {
            WhiteBoardDrawView.drawViews.removeAll()
        }
        WhiteboardMyView.lineColor = UIColor.init(red: 254/255.0, green: 255/255.0, blue: 100/255.0, alpha: 1.0)
        WhiteboardMyView.lineWidth = 10.0
        

        self.dismiss(animated: false, completion: nil)
        
//        //判断当前页面是push方式还是present方式进入
//        if (self.navigationController?.viewControllers.count)! > 1 {
//            //push方式
//            self.navigationController?.popViewController(animated: true)
//        }else{
//            //present方式
//            self.dismiss(animated: true, completion: nil)
//        }
        
    }
    
    
    func makeNotice(title: String, color: UIColor){
        let view = NoticeView(frame: CGRect(x: 0, y: 0, width: ScreenW, height: 60), title: title)
        view.backgroundColor = color
        self.notification = CWStatusBarNotification()
        self.notification.display(with: view, forDuration: TimeInterval(2))
    }
    
    
    func calculateVideoFrame(muxerID: String, cellFrame: CGRect) -> CGRect{
        
        let videoInfo = bm.muxersInfo[muxerID] as! NSMutableDictionary
        let width  = videoInfo["width"]  as! CGFloat
        let height = videoInfo["height"] as! CGFloat
        if width == 0.0 && height == 0.0 {
            return cellFrame
        } else {
            let frame = calculateFrameByParent(parentFrame: cellFrame, viewSize: CGSize(width: width, height: height))
            return frame
        }
    }
    
    
    
    func calculateFrameByParent(parentFrame: CGRect, viewSize: CGSize) -> CGRect{
        let parentWidth  = parentFrame.width
        let parentHeight = parentFrame.height
        let viewWidth    = viewSize.width
        let viewHeight   = viewSize.height
        
        let targetHeight = viewHeight * parentWidth / viewWidth
        if targetHeight <= parentHeight {
            return CGRect(x: 0, y: 0, width: parentWidth, height: targetHeight)
        } else {
            let targetWidth = viewWidth * parentHeight / viewHeight
            return CGRect(x: 0, y: 0, width: targetWidth, height: parentHeight)
        }
    }
    
    
    func covertLevelToPitch(level: Float) -> Float{
        switch level {
        case 0:
            return 0
        case 10...59:
            return 0.1
        case 60...65:
            return 0.2
        case 66...69:
            return 0.3
        case 70...79:
            return 0.4
        case 80...85:
            return 0.5
        case 86...89:
            return 0.6
        case 90...99:
            return 0.7
        case 100...109:
            return 0.8
        case 110...119:
            return 0.9
        case 120...127:
            return 1.0
        default:
            return 0
        }
    }
    
    
    func resetButton(){
        
        if camIsBlock()  && !micIsBlock()  {
            self.videoPannelView.hideAudioButton()
            self.videoPannelView.showAudioButton()
        } else if !camIsBlock() && micIsBlock() {
            self.videoPannelView.hideVideoButton()
            self.videoPannelView.hideMuteButton()
            self.videoPannelView.showVideoButton()
        } else if !camIsBlock() && !micIsBlock() {
            self.videoPannelView.hideVideoButton()
            self.videoPannelView.hideMuteButton()
            self.videoPannelView.showVideoButton()
            self.videoPannelView.showAudioButton()
        }
    }
    
    
    func enableAllAttendeeCam(){
        if !self.conference.adminRole(){
            if self.camIsOpen(){
                self.videoPannelView.videoStatus = ButtonStatus.open
            } else {
                self.videoPannelView.showVideoButton()
            }
        }
    }
    
    func disEnableAllAttendeeCam(){
        if !self.conference.adminRole() {
            if self.camIsOpen() {
                closeUsreCam()
            } else {
                self.videoPannelView.hideVideoButton()
            }
        }
    }
    
    
    func enableAllAttendeeMic(){
        if !self.conference.adminRole() {
            if self.camIsOpen(){
                self.videoPannelView.audioStatus = ButtonStatus.open
            } else {
                self.videoPannelView.showAudioButton()
            }
        }
    }
    
    func disEnableAllAttendeeMic(){
        if !self.conference.adminRole(){
            if self.camIsOpen(){
                self.videoPannelView.audioStatus = ButtonStatus.block
            } else {
                self.closeMic()
                self.videoPannelView.hideAudioButton()
            }
        }
    }
    
    func closeUsreCam(){
        // 注: 不管是否是管理员，都可以关闭cam
        // close user video   关闭 用户cam
        self.closeCam()
        if self.camIsOpen(){
            self.videoPannelView.clearConnectTimer()
        }
        if !self.micIsBlock(){
            self.videoPannelView.showAudioButton()
        }
    }
    
    func closeUserMic(){
        // 注: 不管是否是管理员，都可以关闭mic
        // close user audio   关闭 用户mic
        
        self.closeMic()
        if self.micIsOpen(){
            self.videoPannelView.clearConnectTimer()
        }
        if !self.micIsBlock(){
            self.videoPannelView.showAudioButton()
        } else if !self.camIsBlock() {
            self.videoPannelView.showVideoButton()
        }
    }
    
    
    
    func initVideo(){
        
        if bm != nil {
            for videoDic in bm.muxersInfo as NSMutableDictionary{
                
                let muxerId = videoDic.key as? String ?? ""
                let value   = videoDic.value as! NSDictionary
                let videoStatus = value["video"] as? String ?? ""
                let audioStatus = value["audio"] as? String ?? ""
                connectingMuxerArray.insert(muxerId)
                self.bm.connectStream(muxerId, enableVideo: videoStatus, enableAudio: audioStatus)
            }
            
            if bm.whiteboardInfo.count > 0 {
                otherVideoArray.insert(WHITEBOARD, at: 0)
                self.reloadView()
            }
        }
        
    }
    
    func closeCam(){
        self.videoArray.removeObject(object: LOADING)
        self.bm.disconnectStream(self.selfMuxerID)
        self.selfMuxerID = ""
        self.videoPannelView.videoConnectionStatus = false
        self.videoPannelView.hideMuteButton()
        self.videoPannelView.hideVideoButton()
        self.reloadView()
    }
    
    func closeMic(){
        //self.videoArray.removeObject(LOADING)
        self.bm.disconnectStream(selfMuxerID)
        self.selfMuxerID = ""
        self.videoPannelView.audioConnectionStatus = false
        self.videoPannelView.hideAudioButton()
        self.reloadView()
    }
    
    func setAdmin(status: Int){
        // set admin 设置/取消 管理员
        if status == 1 {
            // 1 是否开启视频
            // 2 attendee mic cam 是否开启
            // block
            if self.attendeeCamIsOpen() && self.attendeeMicIsOpen() {
                self.videoPannelView.showVideoButton()
                self.videoPannelView.showAudioButton()
            } else if self.attendeeCamIsOpen() && !self.attendeeMicIsOpen() {
                if self.camIsOpen() && !self.micIsOpen() {
                    self.videoPannelView.audioStatus = ButtonStatus.open
                    //测试 ，此时关闭cam， mic，cam都显示
                } else if self.micIsOpen() {
                    // 如果把mic 给unblock了 那么可以开启
                } else {
                    //
                    self.videoPannelView.showAudioButton()
                }
            } else if !self.attendeeCamIsOpen() && self.attendeeMicIsOpen() {
                if self.camIsOpen() {
                    // 如果把cam 给unblock了 那么可以开启
                } else if self.micIsOpen() {
                    self.videoPannelView.showVideoButton()
                } else {
                    self.videoPannelView.showVideoButton()
                }
                
            } else if !self.attendeeCamIsOpen() && !self.attendeeMicIsOpen() {
                // 虽然attendee 没有开启，但是管理员可以 unblock
                if self.camIsOpen() {
                    self.videoPannelView.audioStatus = ButtonStatus.open
                    self.videoPannelView.videoStatus = ButtonStatus.open
                } else if self.micIsOpen() {
                    self.videoPannelView.audioStatus = ButtonStatus.open
                    self.videoPannelView.showVideoButton()
                } else {
                    self.videoPannelView.showVideoButton()
                    self.videoPannelView.showAudioButton()
                }
                
            }
            
        } else {
            
            if self.attendeeCamIsOpen() && self.attendeeMicIsOpen() {
                
            } else if self.attendeeCamIsOpen() && !self.attendeeMicIsOpen() {
                
                if self.camIsOpen() {
                    self.videoPannelView.audioStatus = ButtonStatus.block
                    //测试   此时关闭cam时， mic关闭  cam打开
                } else if self.micIsOpen() {
                    self.closeMic()
                } else {
                    self.videoPannelView.hideAudioButton()
                }
                
            } else if !self.attendeeCamIsOpen() && self.attendeeMicIsOpen() {
                if self.camIsOpen() {
                    self.closeCam()
                    self.videoPannelView.showAudioButton()
                } else if self.micIsOpen() {
                    self.videoPannelView.hideVideoButton()
                } else {
                    self.videoPannelView.hideVideoButton()
                }
                
            } else if !self.attendeeCamIsOpen() && !self.attendeeMicIsOpen() {
                if self.camIsOpen() {
                    self.closeCam()
                } else if self.micIsOpen() {
                    self.closeMic()
                    self.videoPannelView.hideVideoButton()
                } else {
                    self.videoPannelView.hideVideoButton()
                    self.videoPannelView.hideAudioButton()
                }
            }
        }
    }
    
    
    func camIsOpen() -> Bool{
        return self.selfMuxerID != "" && self.bm.videoViews[self.selfMuxerID] != nil
    }
    
    func micIsOpen() -> Bool{
        return self.selfMuxerID != "" && self.bm.videoViews[self.selfMuxerID] == nil
    }
    
    func camIsBlock() -> Bool{
        return bm.muteUserVideo == "disable"
    }
    
    func micIsBlock() -> Bool{
        return bm.muteUserAudio == "disable"
    }
    
    
    func attendeeCamIsOpen() -> Bool{
        return self.bm.muteAllCam == "enable"
    }
    
    func attendeeMicIsOpen() -> Bool{
        return self.bm.muteAllMic == "enable"
    }
    
    
    func makeToAdmin(){
        if self.camIsOpen() {
            if !self.micIsOpen(){
                self.videoPannelView.audioStatus = ButtonStatus.open
            }
        } else if self.micIsOpen() {
            if !self.camIsOpen() {
                self.videoPannelView.showVideoButton()
            }
        } else {
            self.videoPannelView.showAudioButton()
            self.videoPannelView.showVideoButton()
        }
    }
    
    func canleAdmin(){
        if self.camIsOpen() {
            if !self.attendeeCamIsOpen() || self.camIsBlock(){
                self.closeCam()
                self.videoPannelView.hideVideoButton()
            }
            if !self.attendeeMicIsOpen() || self.micIsBlock() {
                self.videoPannelView.audioStatus = ButtonStatus.block
            }
            
        } else if self.micIsOpen() {
            if self.attendeeCamIsOpen() || !self.camIsBlock(){
                self.videoPannelView.showVideoButton()
            }
            if !self.attendeeMicIsOpen() || self.micIsBlock() {
                closeMic()
            }
        } else {
            if !self.attendeeMicIsOpen() {
                self.videoPannelView.hideAudioButton()
            }
            if !self.attendeeCamIsOpen(){
                self.videoPannelView.hideVideoButton()
            }
            if self.attendeeCamIsOpen(){
                self.videoPannelView.showVideoButton()
            }
            if self.attendeeMicIsOpen(){
                self.videoPannelView.showAudioButton()
            }
        }
    }
    
    
    func addPannelView(){
        let frame = CGRect(x: ScreenW - 130, y: 20, width: 80, height: 40)
        videoPannelView = VideoPannelView(frame: frame, admin:  self.conference.isAdmin(), bm: self.bm)
        videoPannelView.switchVideoDelegate = self
        self.view.addSubview(videoPannelView)
    }
    
    
    func reloadView(){
        
        // 没有whiteboard mp4 youtube 但是有视频
        if self.otherVideoArray.count == 0 && self.videoArray.count > 0 {
            //self.disConnectView.hidden = true
            let h   = ScreenH - self.navView.frame.height - TabbarH
            self.tableView.frame = CGRect.zero
            self.collectionView.frame = CGRect(x: 0, y: self.navView.frame.height, width: ScreenW, height: h)
            self.tableView.reloadData()
            self.collectionView.reloadData()
        } else if self.otherVideoArray.count > 0 && self.videoArray.count > 0 && !rotation{
            // 有whiteboard mp4 youtube 并且有视频
            //self.disConnectView.hidden = true
            
            
            if audioOnly {
                let h   = (ScreenH - self.navView.frame.height - TabbarH)
                self.tableView.frame = CGRect(x: 0, y: self.navView.frame.height, width: ScreenW, height: h)
                self.tableView.reloadData()
                self.collectionView.frame = CGRect.zero
                return
            }
            
            let h   = (ScreenH - self.navView.frame.height - TabbarH) / 2
            if self.tableView.frame.height < (h + 20) && self.tableView.frame.height > 0  {
                self.collectionView.frame = CGRect(x: 0, y: self.navView.frame.height + self.tableView.frame.height, width: ScreenW, height: h)
                self.collectionView.reloadData()
                if self.reloadTableView{
                    self.tableView.reloadData()
                }
                return
            } else {
                self.tableView.frame = CGRect(x: 0, y: self.navView.frame.height, width: ScreenW, height: h)
                self.tableView.reloadData()
                self.collectionView.frame = CGRect(x: 0, y: self.navView.frame.height + self.tableView.frame.height, width: ScreenW, height: h)
                self.collectionView.reloadData()
            }
            
        } else if (self.otherVideoArray.count > 0 && self.videoArray.count == 0)  || rotation{
            // 有whiteboard mp4 youtube 但是没有视频
            
//            print("============")
//            print(self.otherVideoArray)
            
            let h     = ScreenH - self.navView.frame.height - TabbarH
            let frame = CGRect(x: 0, y: self.navView.frame.height, width: ScreenW, height: h)
            self.tableView.frame = frame
            self.collectionView.frame = CGRect.zero
            self.tableView.reloadData()
            self.collectionView.reloadData()
            self.removeVideoMuxerID = ""
        }
        else {
            self.tableView.frame = self.tableViewOriginFrame
            self.collectionView.frame = self.collectionViewOriginFrame
            self.tableView.reloadData()
            self.collectionView.reloadData()
        }
        
        self.reloadTableView = false
        
    }
    
    func getVideoUserInfo(muxerID: String) -> VideoUserInfo{
        let videoUserInfo = VideoUserInfo()
        if let muxerInfo: NSDictionary = bm.muxersInfo[muxerID] as? NSDictionary {
            if let sid: String = muxerInfo["sid"] as? String {
                if let userInfo: NSDictionary = bm.usersInfo[sid] as? NSDictionary {
                    videoUserInfo.userName  = userInfo.value(forKey: "name") as! String!
                    videoUserInfo.avatarUrl = userInfo.value(forKey: "photo") as! String
                }
            }
        }
        return videoUserInfo
    }
    
    
    func sortVideoPosition(muxerID: String!){
        
        let userInfo = getVideoUserInfo(muxerID: muxerID)
        let videoInfo = VideoInfo(muxerID: muxerID, userName: userInfo.userName, avatarUrl: userInfo.avatarUrl, muxerInfo: bm.muxersInfo[muxerID] as! NSMutableDictionary)
        
        // 如果是screenShare
        if bm.screenViews[muxerID] != nil {
            self.screenID  = muxerID
            videoInfo.type = VideoType.screen
            videoInfoDictionary[muxerID] = videoInfo
            self.otherVideoArray.append(SCREENSHARE)
            return
        }
        
        
        if !self.videoArray.contains(muxerID){
            
            connectingMuxerArray.remove(muxerID)
            if bm.videoViews[muxerID] != nil {
                if selfMuxerID == muxerID {
                    // 收到是自己链接的video
                    self.videoArray.removeObject(object: LOADING)
                    videoInfo.type = VideoType.selfvideo
                    videoInfoDictionary[muxerID] = videoInfo
                    self.videoArray.insert(muxerID, at: 0)
                } else {
                    // 接受到的是其他人的video
                    videoInfo.type = VideoType.video
                    videoInfoDictionary[muxerID] = videoInfo
                    self.videoArray.append(muxerID)
                }
            } else {
                //  audio
                self.audioArray.append(muxerID)
                
                //                if selfMuxerID == muxerID {
                //                    // 接受到的是自己的audio
                //                    self.videoArray.removeObject(LOADING)
                //                    videoInfo.type = VideoType.selfaudio
                //                    videoInfoDictionary[muxerID] = videoInfo
                //                    self.videoArray.insert(muxerID, atIndex: 0)
                //                } else {
                //                    // 接受到的是其他人的audio
                //                    videoInfo.type = VideoType.audio
                //                    videoInfoDictionary[muxerID] = videoInfo
                //                    self.videoArray.append(muxerID)
                //                }
            }
            
            // 去掉重复的
            self.audioArray = ToolHelper.uniq(source: audioArray)
            self.videoArray = ToolHelper.uniq(source: videoArray)
            
        }
    }
    
    
    func videoAction(action: String, status: Int){
        var action_ = action
        if (action == "mute-user-video" || action == "mute-user-audio")  {
            //判断当前已经打开的video id 存不存在  来确定是 mute 还是 close
            if let muxerInfo = bm.muxersInfo[self.selfMuxerID ] as? NSDictionary {
                
                if bm.videoViews[self.selfMuxerID] != nil && action == "mute-user-video" {
                    action_ = "close-user-video"
                }  else if  muxerInfo["audio"] as? String == "true" && action == "mute-user-audio" {
                    action_ = "close-user-audio"
                }
                //                if muxerInfo["video"] as? String == "false" {
                //                    action_ = "close-user-audio"
                //                } else {
                //                    action_ = "close-user-video"
                //                }
            }
        }
        
        
        DispatchQueue.main.sync {
            if action_ == "admin" {
                if status == 1 {
                    self.makeToAdmin()
                } else if status == 0 {
                    self.canleAdmin()
                }
            } else if action_ == "mute-user-video" { // show/hide user video   打开/禁止 用户cam
                // 1  显示/隐藏 button
                if status == 1 {
                    self.videoPannelView.showVideoButton()
                } else {
                    if self.camIsOpen(){
                        self.closeCam()
                        self.videoPannelView.clearConnectTimer()
                    }
                    self.videoPannelView.blockVideoButton()
                }
            } else if action_ == "mute-user-audio" { // show/hide user audio   打开/禁止 用户mic
                // 1  显示/隐藏 button
                if status == 1 {
                    self.videoPannelView.showAudioButton()
                    // todo self.enableAllAttendeeMic()
                } else {
                    if self.micIsOpen(){
                        self.closeMic()
                        self.videoPannelView.clearConnectTimer()
                    }
                    self.videoPannelView.blockAudioButton()
                    // todo self.disEnableAllAttendeeMic()
                }
            } else if action_ == "close-user-video" {
                if self.camIsOpen(){
                    self.closeUsreCam()
                    self.videoPannelView.clearConnectTimer()
                }
            } else if action_ == "close-user-audio" {
                if self.micIsOpen(){
                    self.closeUserMic()
                    self.videoPannelView.clearConnectTimer()
                }
            } else if action_ == "mute-all-mic" {
                //  attendee mic  disable/able   打开/禁止  观众的mic
                if status == 1 {
                    if !self.conference.adminRole() {
                        self.bm.muteUserAudio = "enable"
                    }
                    self.enableAllAttendeeMic()
                } else {
                    if !self.conference.adminRole() {
                        self.bm.muteUserAudio = "disable"
                    }
                    self.disEnableAllAttendeeMic()
                }
            } else if action_ == "mute-all-cam" {
                // set attendee cam  disable/able   打开/禁止  观众的cam
                if status == 1 {
                    if !self.conference.adminRole() {
                        self.bm.muteUserVideo = "enable"
                    }
                    self.enableAllAttendeeCam()
                } else {
                    if !self.conference.adminRole() {
                        self.bm.muteUserVideo = "disable"
                    }
                    self.disEnableAllAttendeeCam()
                    //self.videoPannelView.clearConnectTimer()
                }
            }
        }
    }
    
    
}


extension BMVideoViewController: BigRoomVideoDelegate {
    
    func bigRoomNotificationDelegateReceiveNewStream(didReceiveNewStream muxerID: String!, enableVideo video: String!, enableAudio audio: String!) {
        if !connectingMuxerArray.contains(muxerID) && !videoArray.contains(muxerID){
            connectingMuxerArray.insert(muxerID)
            bm.connectStream(muxerID, enableVideo: video, enableAudio: audio)
        }
    }
    
    
    //链接视频
    func bigRoomNotificationDelegateConnectStream(muxerID: String!) {
        
        //DispatchQueue.main.sync {
        self.sortVideoPosition(muxerID: muxerID)
        if muxerID == self.selfMuxerID {
            self.videoPannelView.clearConnectTimer()
            // to do ??
            if self.bm.videoViews[muxerID] == nil {
                self.videoPannelView.audioConnectionStatus = true
            } else {
                self.videoPannelView.videoConnectionStatus = true
            }
        }
        //如果连接的screenShare 则reload tableview  否则 reload  collectionView
        if self.bm.screenViews[muxerID] != nil {
            if self.removeVideoMuxerID == ""{
                self.reloadView()
            }
        } else {
            if self.removeVideoMuxerID == ""{
                // DispatchQueue.main.sync {
                self.reloadView()
                // }
            }
        }
        //}
    }
    
    
    //断开视频链接
    func bigRoomNotificationDelegateDisconnectedStream(muxerID: String!) {
        DispatchQueue.main.sync {
            
            if muxerID == self.screenID {
                // 关掉的是 screen share
                self.screenID = ""
                self.otherVideoArray.removeObject(object: SCREENSHARE)
                if self.screenShareView != nil {
                    self.rotation = false
                    self.screenShareView.superview!.transform = CGAffineTransform(rotationAngle: 0)
                    self.screenShareView.removeFromSuperview()
                    self.reloadView()
                }
                
                if self.removeVideoMuxerID == ""{
                    self.reloadView()
                }
                return
            }
            
            
            if self.videoArray.contains(muxerID) {
                self.videoInfoDictionary.removeObject(forKey: muxerID)
                self.videoArray.removeObject(object: muxerID)
            }
            if self.removeVideoMuxerID == ""{
                self.reloadView()
            } else{
                if self.removeVideoMuxerID == muxerID{
                    self.videoView.removeFromSuperview()
                    self.videoView = nil
                    self.reloadView()
                }
            }
        }
        
    }
    
    
    func bigRoomNotificationDelegateRemoveFromRoom() {
        DispatchQueue.main.async{
            self.clearRoom()
            
            //=========================
            //            NSNotificationCenter.defaultCenter().postNotificationName("return", object: nil, userInfo: nil)
            //=========================
        }
    }
    
    func bigRoomNotificationDelegateMuteAudio(muxerID: String, status: Bool) {
        DispatchQueue.main.async {
            if let i = self.videoArray.index(of: muxerID) {
                let indexPath = NSIndexPath(item: i, section: 0)
                if let cell = self.collectionView.cellForItem(at: indexPath as IndexPath){
                    if let bottomView: VideoBottomUserInfoView =  cell.contentView.viewWithTag(VIDEO_BOTTOM_VIEW_TAG) as? VideoBottomUserInfoView {
                        bottomView.muted(status: status)
                    }
                }
            }
            
            if muxerID == self.selfMuxerID && self.bm.videoViews[self.selfMuxerID] != nil {
                if status {
                    self.videoPannelView.updateUnMuteAudioUI(sender: self.videoPannelView.mutedUIButton)
                } else {
                    self.videoPannelView.updateMuteAudioUI(sender: self.videoPannelView.mutedUIButton)
                }
            } else if muxerID == self.selfMuxerID && self.bm.videoViews[self.selfMuxerID] == nil {
                //close user audio
                if status {
                    //self.bm.switchStream(self.selfMuxerID(), enableVideo: "true", enableAudio: "true", sendMessage: false)
                } else {
                    self.closeMic()
                    self.videoPannelView.showAudioButton()
                }
            }
        }
        
    }
    
    func bigRoomNotificationDelegateWhiteBoardCreated() {
        
        // 第一次加载whiteboard
        if !otherVideoArray.contains(WHITEBOARD){
            DispatchQueue.main.sync{
                self.otherVideoArray.insert(WHITEBOARD, at: 0)
                self.reloadView()
            }
        } else {
            // 替换前一张whiteboard  先去除之前的 再加载新的
            otherVideoArray.removeObject(object: self.WHITEBOARD)
            WhiteBoardImage.images.removeAll()
            WhiteBoardDrawView.drawViews.removeAll()
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "whiteboardPageRemoved"), object: nil)
            
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0, execute: {
                self.otherVideoArray.insert(self.WHITEBOARD, at: 0)
                self.reloadTableView = true
                self.reloadView()
            })
        }
        
        
    }
    
    func bigRoomNotificationDelegateWhiteBoardRemoved() {
        DispatchQueue.main.async{
            if self.otherVideoArray.contains(self.WHITEBOARD){
                self.otherVideoArray.removeObject(object: self.WHITEBOARD)
                print(self.otherVideoArray)
                self.rotation = false
                self.whiteBoardView.superview!.transform = CGAffineTransform(rotationAngle: 0)
                self.whiteBoardView.removeFromSuperview()
                
                self.reloadView()
                WhiteBoardImage.images.removeAll()
                if WhiteBoardDrawView.drawViews.count != 0 {
                    WhiteBoardDrawView.drawViews.removeAll()
                }
                WhiteboardMyView.lineColor = UIColor.init(red: 254/255.0, green: 255/255.0, blue: 100/255.0, alpha: 1.0)
                WhiteboardMyView.lineWidth = 10.0
            }
        }
    }
    
    func bigRoomNotificationDelegateWhiteBoardSwitch(page: Int) {
        self.bm.whiteboardInfo[2] = page
        DispatchQueue.main.async{
            if self.otherVideoArray.contains(self.WHITEBOARD){
                if let whiteboard = self.view.viewWithTag(WHITE_BOARD_TAG) as? WhiteBoardView {
                    whiteboard.switchPage(page: page)
                }
            }
        }
    }
    
    // 打开摄像头视频失败
    func bigRoomNotificationDelegateFailedConnectStream(muxerID: String) {
        DispatchQueue.main.async{
            if muxerID == self.selfMuxerID {
                self.videoPannelView.clearConnectTimer()
                self.connectingMuxerArray.remove(muxerID)
                self.videoArray.removeObject(object: muxerID)
                self.videoArray.removeObject(object: self.LOADING)
                self.resetButton()
                self.reloadView()
            }
            self.selfMuxerID = ""
            //todo
            //判断链接失败的原因
            //self.disConnectView.hidden = false
        }
    }
    
    // audio声音改变
    func bigRoomNotificationDelegateAudioSizeChanged(muxerID: String!, level: Int32) {
        DispatchQueue.main.async{
            let pitch = self.covertLevelToPitch(level: Float(level))
            if let i = self.videoArray.index(of: muxerID) {
                let indexPath = NSIndexPath(item: i, section: 0)
                if let cell = self.collectionView.cellForItem(at: indexPath as IndexPath){
                    if let progressView: UIProgressView =  cell.contentView.viewWithTag(PROGRESS_VIEW_TAG) as? UIProgressView {
                        progressView.setProgress(pitch, animated: true)
                    }
                }
            }
        }
    }
    
    //视频的尺寸改变
    func bigRoomNotificationDelegateVideoFrameChanged(muxerID: String, size: CGSize) {
        if screenID == muxerID {
            return
        }
        
        DispatchQueue.main.async{
            if  let index = self.videoArray.index(of: muxerID) {
                if let videoInfoView =  self.collectionView.viewWithTag(index+1) as! VideoInfoView? {
                    if let videoView = videoInfoView.viewWithTag(VIDEO_VIEW_ATG) as UIView? {
                        let parentView  = videoInfoView.superview
                        let frame = self.calculateFrameByParent(parentFrame: parentView!.frame, viewSize: size)
                        videoView.frame = frame
                        videoView.center = parentView!.convert(parentView!.center, from: parentView!.superview)
                        
                        let bottomView   = videoInfoView.bottomUserInfoView
                        let y = videoView.frame.origin.y+videoView.frame.height - 30
                        bottomView?.frame =  CGRect(x: videoInfoView.frame.origin.x, y: y, width: videoInfoView.frame.width, height: 30)
                        
                    }
                }
            }
        }
    }
    
    
    func bigRoomNotificationDelegateCloseRoom() {
        DispatchQueue.main.async{
            self.clearRoom()
        }
    }
    
    func bigRoomNotificationDelegateOpenOffer(message: [NSObject : AnyObject]) {
        DispatchQueue.main.sync {
           
            guard let msgDict = message as? NSDictionary else { return }
            let id    = msgDict["data"] as! String
            Offer.requestDatas(id: id, successCallback: { (offer) in
                DispatchQueue.main.async{
                    let offerView = OfferView()
                    self.view.window?.addSubview(offerView)
                    offerView.offer = offer
                }
            }, failCallback: {
            })

        }
    }
    
    func bigRoomNotificationDelegateServerTime(message: [NSObject : AnyObject]) {
        DispatchQueue.main.async{
            let msgDict = message as NSDictionary
            if let time = msgDict["data"] as? Double{
                if self.mp4View != nil && self.mp4View.playingState == 1 {
                    let seekTime    = round((time - self.eventTime) / 1000 ) + Double(self.seconds)
                    let currentTime = round(self.mp4View.pvc.currentPlaybackTime)
                    
                    //                    print("server time is", seekTime)
                    //                    print("current time is",  round(self.mp4View.pvc.currentPlaybackTime))
                    
                    // 本地播放的速度慢于服务器 5秒 或者 和服务器播放状态不统一
                    if (seekTime - currentTime) >= 5 || self.mp4View.pvc.playbackState != MPMoviePlaybackState.playing {
                        self.mp4View.sycPlay(seekTime: Float(seekTime))
                    }
                }
                
                
                if self.youtubeView != nil && self.youtubeView.playingState == 1 {
                    //print("========================youtubeView")
                    
                    let seekTime    = round((time - self.eventTime) / 1000 ) + Double(self.seconds)
                    let currentTime = round(self.youtubeView.playerView.currentTime())
                    
                    //                    print("server time is", seekTime)
                    //                    print("current time is", round(self.youtubeView.playerView.currentTime()))
                    
                    // 本地播放的速度慢于服务器 5秒 或者 和服务器播放状态不统一
                    if (Float(seekTime) - currentTime) > 5 || self.youtubeView.playerView.playerState() != YTPlayerState.playing {
                        self.youtubeView.syncVideo(seekTime: Float(seekTime))
                    }
                }
            }
        }
    }
        
        
        func bigRoomNotificationDelegateYoutubeLoad(message: [NSObject : AnyObject]) {
            
            
            if self.youtubeTimer == nil {
                 DispatchQueue.main.async{
                    self.youtubeTimer = Timer.scheduledTimer(timeInterval: 10, target: self, selector: #selector(self.checkYoutubeStatus), userInfo: nil, repeats: true)
                }
            }
            
            //todo 代码需要检查一下
            DispatchQueue.main.async{
                let msgDict      = message as NSDictionary
                guard let data   = msgDict["data"] as? NSDictionary else { return }
                guard let link   = data["youtubeLink"] as? String   else { return }
                if !self.otherVideoArray.contains(self.YOUTUBE) {
                    self.otherVideoArray.insert(self.YOUTUBE, at: 0)
                    self.otherVideoArray.removeObject(object: self.MP4)
                }
                
                //  标记刷新tableview部分
                if self.youtubeLink != link{
                    self.reloadTableView = true
                }
                
                if self.youtubeView != nil {
                    if link != self.youtubeLink {
                        self.assemVideoData(msg: message as NSDictionary)
                        self.reloadView()
                    }
                    self.assemVideoData(msg: message as NSDictionary)
                    self.youtubeView.seconds      = self.seconds
                    self.youtubeView.eventTime    = self.eventTime
                    self.youtubeView.playingState = self.playingState
                    self.youtubeView.seekVideo()
                } else {
                    self.assemVideoData(msg: message as NSDictionary)
                    if self.removeVideoMuxerID == ""{
                        self.reloadView()
                    }
                }
            }
        }
        
        func bigRoomNotificationDelegateYoutubeSeek(message: [NSObject : AnyObject]) {
            
        }
        
        func bigRoomNotificationDelegateYoutubePlay(message: [NSObject : AnyObject]) {
            DispatchQueue.main.async{
                if self.youtubeView != nil {
                    self.assemVideoData(msg: message as NSDictionary)
                    self.youtubeView.seconds      = self.seconds
                    self.youtubeView.eventTime    = self.eventTime
                    self.youtubeView.playingState = self.playingState
                    self.youtubeView.seekVideo()
                }
            }
        }
        
        func bigRoomNotificationDelegateYoutubePause(message: [NSObject : AnyObject]) {
            DispatchQueue.main.async{
                if self.youtubeView != nil {
                    self.assemVideoData(msg: message as NSDictionary)
                    self.youtubeView.seconds      = self.seconds
                    self.youtubeView.eventTime    = self.eventTime
                    self.youtubeView.playingState = self.playingState
                    self.youtubeView.playerView.pauseVideo()
                }
            }
        }
        
        func bigRoomNotificationDelegateYoutubeEnd(message: [NSObject : AnyObject]) {
            DispatchQueue.main.async{
                self.otherVideoArray.removeObject(object: self.YOUTUBE)
                if self.youtubeView != nil {
                    self.clearYoutube()
                    if self.removeVideoMuxerID == ""{
                        self.reloadView()
                    }
                }
            }
        }
        
        func bigRoomNotificationDelegateYoutubeMute(message: [NSObject : AnyObject]) {
            
        }
        
        func bigRoomNotificationDelegateYoutubeUnmute(message: [NSObject : AnyObject]) {
            
        }
        
        func bigRoomNotificationDelegateYoutubeVolumeChange(message: [NSObject : AnyObject]) {
            
        }
        
        func bigRoomNotificationDelegateYoutubeAction(message: [NSObject : AnyObject]) {
        }
        
        
        func bigRoomNotificationDelegateMp4Load(message: [NSObject : AnyObject]) {
            
            if self.youtubeTimer == nil {
               DispatchQueue.main.async{
                    self.youtubeTimer = Timer.scheduledTimer(timeInterval: 10, target: self, selector: #selector(self.checkYoutubeStatus), userInfo: nil, repeats: true)
                }
            }
            
            DispatchQueue.main.async{
                let msgDict = message as NSDictionary
                guard let data   = msgDict["data"] as? NSDictionary else { return }
                guard let link   = data["link"] as? String          else { return }
                
                if !self.otherVideoArray.contains(self.MP4) {
                    self.otherVideoArray.insert(self.MP4, at: 0)
                    self.otherVideoArray.removeObject(object: self.YOUTUBE)
                }
                
                if self.mp4View != nil {
                    if link != self.mp4Link {
                        self.assemVideoData(msg: message as NSDictionary)
                        self.reloadView()
                    }
                    
                    self.assemVideoData(msg: message as NSDictionary)
                    self.mp4View.seconds      = self.seconds
                    self.mp4View.eventTime    = self.eventTime
                    self.mp4View.playingState = Float(self.playingState)
                    self.mp4View.seekPlay()
                } else {
                    self.assemVideoData(msg: message as NSDictionary)
                    if self.removeVideoMuxerID == ""{
                        self.reloadView()
                    }
                }

            }
        }
        
        
        func bigRoomNotificationDelegateMp4End(message: [NSObject : AnyObject]) {
            DispatchQueue.main.async {
                self.otherVideoArray.removeObject(object: self.MP4)
                if self.mp4View != nil {
                    self.clearMP4()
                    if self.removeVideoMuxerID == ""{
                        self.reloadView()
                    }else{
                        
                    }
                }
            }
        }
        
        
        func bigRoomNotificationDelegateMp4Play(message: [NSObject : AnyObject]) {
            DispatchQueue.main.async{
                if self.mp4View != nil {
                    self.assemVideoData(msg: message as NSDictionary)
                    self.mp4View.seconds      = self.seconds
                    self.mp4View.eventTime    = self.eventTime
                    self.mp4View.playingState = Float(self.playingState)
                    if self.mp4View.playingState == 2 {
                        self.mp4View.seekPause()
                    } else {
                        self.mp4View.seekPlay()
                    }
                    
                }
            }
        }
        
        
        func bigRoomNotificationDelegateMp4Pause(message: [NSObject : AnyObject]) {
            DispatchQueue.main.async{
                if self.mp4View != nil {
                    self.mp4View.pause()
                }
            }
        }
        
        func bigRoomNotificationDelegateMp4Mute(message: [NSObject : AnyObject]) {
            
        }
        
        func bigRoomNotificationDelegateMp4Unmute(message: [NSObject : AnyObject]) {
            
        }
        
        
        func bigRoomNotificationDelegateVideoAction(action: String, status: Int) {
            
            var action_ = action
            if (action == "mute-user-video" || action == "mute-user-audio")  {
                //判断当前已经打开的video id 存不存在  来确定是 mute 还是 close
                if let muxerInfo = bm.muxersInfo[self.selfMuxerID ] as? NSDictionary {
                    
                    if bm.videoViews[self.selfMuxerID] != nil && action == "mute-user-video" {
                        action_ = "close-user-video"
                    }  else if  muxerInfo["audio"] as? String == "true" && action == "mute-user-audio" {
                        action_ = "close-user-audio"
                    }
                    
                }
            }
            
            
            DispatchQueue.main.async{
                if action_ == "admin" {
                    if status == 1 {
                        self.makeToAdmin()
                    } else if status == 0 {
                        self.canleAdmin()
                    }
                } else if action_ == "mute-user-video" { // show/hide user video   打开/禁止 用户cam
                    // 1  显示/隐藏 button
                    if status == 1 {
                        self.videoPannelView.showVideoButton()
                    } else {
                        if self.camIsOpen(){
                            self.closeCam()
                            self.videoPannelView.clearConnectTimer()
                        }
                        self.videoPannelView.blockVideoButton()
                    }
                } else if action_ == "mute-user-audio" { // show/hide user audio   打开/禁止 用户mic
                    // 1  显示/隐藏 button
                    if status == 1 {
                        self.enableAllAttendeeMic()
                    } else {
                        if self.micIsOpen(){
                            self.closeMic()
                            self.videoPannelView.clearConnectTimer()
                        }
                        self.disEnableAllAttendeeMic()
                    }
                } else if action_ == "close-user-video" {
                    if self.camIsOpen(){
                        self.closeUsreCam()
                        self.videoPannelView.clearConnectTimer()
                    }
                } else if action_ == "close-user-audio" {
                    if self.micIsOpen(){
                        self.closeUserMic()
                        self.videoPannelView.clearConnectTimer()
                    }
                } else if action_ == "mute-all-mic" {
                    //  attendee mic  disable/able   打开/禁止  观众的mic
                    if status == 1 {
                        if !self.conference.adminRole() {
                            self.bm.muteUserAudio = "enable"
                        }
                        self.enableAllAttendeeMic()
                    } else {
                        if !self.conference.adminRole() {
                            self.bm.muteUserAudio = "disable"
                        }
                        self.disEnableAllAttendeeMic()
                    }
                } else if action_ == "mute-all-cam" {
                    // set attendee cam  disable/able   打开/禁止  观众的cam
                    if status == 1 {
                        if !self.conference.adminRole() {
                            self.bm.muteUserVideo = "enable"
                        }
                        self.enableAllAttendeeMic()
                    } else {
                        if !self.conference.adminRole() {
                            self.bm.muteUserVideo = "disable"
                        }
                        self.disEnableAllAttendeeMic()
                        //self.videoPannelView.clearConnectTimer()
                    }
                }
            }
        }
        
        func bigRoomNotificationDelegateMsgAddTabbar(message: [NSObject : AnyObject]) {
            if self.tabBarController?.selectedIndex != 1{
                DispatchQueue.main.async{
                    self.tabBarController?.tabBar.items![1].image = UIImage(named: "BMSDK.bundle/icon_chat_new")?.withRenderingMode(.alwaysOriginal)
                }
            }
        }
    
    
    func clearMP4() {
        if mp4View != nil {
            self.mp4Link = ""
            self.mp4View.pvc.view.removeFromSuperview()
            self.mp4View.removeFromSuperview()
            self.mp4View = nil
            self.mp4View = nil
            self.seconds            = 0.0
            self.eventTime          = 0.0
            self.playingState       = 0
            self.timeSinceLastEvent = 0.0
        }
    }
    
    func clearYoutube() {
        if youtubeView != nil {
            self.youtubeLink = ""
            self.youtubeView.playerView.stopVideo()
            self.youtubeView.playerView.removeWebView()
            self.youtubeView.removeFromSuperview()
            self.youtubeView = nil
            self.seconds            = 0.0
            self.eventTime          = 0.0
            self.playingState       = 0
            self.timeSinceLastEvent = 0.0
        }
    }
    
    func assemVideoData(msg: NSDictionary){
        let msgDict = msg as NSDictionary
        let data    =  msgDict["data"] as! NSDictionary
        if let elapseTime = data["elapseTime"] as? Float {
            self.seconds = elapseTime
        } else if let elapseTime = data["elapseTime"] as? String {
            self.seconds = (elapseTime as NSString).floatValue
        }
        
        if let eventTime = data["eventTime"]  as? Double {
            self.eventTime = eventTime
        } else if let eventTime = data["eventTime"] as? String {
            self.eventTime = (eventTime as NSString).doubleValue
        }
        
        if let playingState = data["playingState"] as? Int {
            self.playingState = playingState
        } else if let playingState = data["playingState"] as? String {
            self.playingState = (playingState as NSString).integerValue
        } else {
            //print("playingState null")
        }
        
        if let link = data["link"] as? String {
            self.mp4Link = link
        } else if let link = data["youtubeLink"] as? String {
            self.youtubeLink = link
        }
        
    }
    
    
}


extension BMVideoViewController: SwitchVideoNotification{
    
    /////////////////////
    // 打开视频链接超过13秒 刷新
    func notifyReloadView(){
        DispatchQueue.main.async{
            self.videoPannelView.audioConnectionStatus = false
            self.videoPannelView.videoConnectionStatus = false
            self.videoPannelView.clearVideo()
            self.videoPannelView.clearConnectTimer()
            self.videoPannelView.muxerID = ""
            self.selfMuxerID = ""
            self.videoArray.removeObject(object: "loading")
            self.videoPannelView.initPannelStatus()
            self.collectionView.reloadData()
            
            let alertView = UIAlertController(title: "Connection Failed", message: "", preferredStyle: .alert)
            
            alertView.addAction(UIAlertAction(title: "Go back", style: .default, handler: { action in
                self.videoPannelView.clearConnectTimer()
            }))
            alertView.addAction(UIAlertAction(title: "Try again", style: .default, handler: { action in
                self.videoPannelView.reconnect()
            }))
            self.present(alertView, animated: true, completion: nil)
            
        }
    }
    
    
    func notifyOpenVideo(muxerID: String){
        makeNotice(title: "Mic and camera on", color: UIColor(red: 100/255, green: 210/255, blue: 123/255, alpha: 1))
        self.selfMuxerID = muxerID
        self.videoArray.insert(LOADING, at: 0)
        self.connectingMuxerArray.insert(muxerID)
        self.reloadView()
    }
    
    func notifyOpenAudio(muxerID: String){
        makeNotice(title: "Mic on", color: UIColor(red: 100/255, green: 210/255, blue: 123/255, alpha: 1))
        self.selfMuxerID = muxerID
        self.connectingMuxerArray.insert(muxerID)
        self.reloadView()
    }
    
    func notifyCloseVideo(muxerID: String){
        makeNotice(title: "Camera off", color: UIColor(red: 238/255, green: 61/255, blue: 61/255, alpha: 1))
        self.selfMuxerID = ""
        self.connectingMuxerArray.remove(muxerID)
        self.videoArray.removeObject(object: muxerID)
        self.videoArray.removeObject(object: LOADING)
        self.videoPannelView.videoConnectionStatus = false
        self.reloadView()
    }
    
    func notifyCloseAudio(muxerID: String) {
        makeNotice(title: "Mic off", color: UIColor(red: 238/255, green: 61/255, blue: 61/255, alpha: 1))
        self.selfMuxerID = ""
        self.connectingMuxerArray.remove(muxerID)
        self.audioArray.removeObject(object: muxerID)
        //self.videoArray.removeObject(LOADING)
        self.videoPannelView.audioConnectionStatus = false
        self.reloadView()
    }
    
    func notifyMuteAudioBySelf(muxerID: String, status: Bool) {
        if status == false {
            makeNotice(title: "Mic muted", color: UIColor(red: 238/255, green: 61/255, blue: 61/255, alpha: 1))
        } else {
            makeNotice(title: "Mic unmuted", color: UIColor(red: 100/255, green: 210/255, blue: 123/255, alpha: 1))
        }
    }
    
    
}


extension BMVideoViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        if rotation {
            return 0
        }
        
        if self.audioOnly && otherVideoArray.count > 0 {
            return 0
        }
        
        if self.audioOnly {
            return 1
        }
        
        if audioArray.count > 0 && (videoArray.count == 0) && (otherVideoArray.count == 0) {
            return 1
        }
        
        if (videoArray.count == 0) && (otherVideoArray.count == 0) {
            return 1
        } else if videoArray.count > 4{
            return 4
        } else {
            return videoArray.count
        }
    }
    
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        
        if videoArray.isEmpty && audioArray.isEmpty && otherVideoArray.isEmpty {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NoVideoCell", for: indexPath) as! NoVideoCell
            return cell
            
        } else if (videoArray.isEmpty && !audioArray.isEmpty) || audioOnly {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath)
            var audioArr = self.audioArray
            if audioOnly {
                audioArr += self.videoArray
            }
            let audioView = AudioViewUI(bm: self.bm, audioArray: audioArr)
            cell.contentView.addSubview(audioView)
            audioView.setupUI()
            return cell
        } else {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath)
            for view in cell.contentView.subviews {
                view.removeFromSuperview()
            }
            cell.contentView.tag = indexPath.row + 11
            cell.contentView.backgroundColor = cellColor
            
            let muxerID = videoArray[indexPath.row] as String
            let videoInfo = videoInfoDictionary[muxerID] as? VideoInfo
            
            if muxerID == LOADING {
                let loadingView = LoadingView(frame: cell.bounds)
                cell.contentView.addSubview(loadingView)
            } else if bm.videoViews[muxerID] != nil {
                var frame: CGRect!
                if videoArray.count == 1 {
                    frame = calculateVideoFrame(muxerID: muxerID, cellFrame: CGRect(x: 0, y: ScreenH/2 - ScreenH/3, width: ScreenW, height: ScreenH/2))
                } else {
                    frame = calculateVideoFrame(muxerID: muxerID, cellFrame: cell.bounds)
                }
                
                let videoView   = bm.videoViews[muxerID] as! UIView
                
                let videoInfoView = VideoInfoView(frame: cell.bounds, videoFrame: frame, videoView: videoView, videoInfo: videoInfo!,fullScreen:false,videoArrayCount:videoArray.count)
                videoInfoView.tag = indexPath.row + 1
                cell.contentView.addSubview(videoInfoView)
            }
            
            return cell
        }
        
    }
    
    
    func collectionView(_ collectionView: UICollectionView!,
                        layout collectionViewLayout: UICollectionViewLayout!,
                        sizeForItemAtIndexPath indexPath: NSIndexPath!) -> CGSize {
        
        var width:CGFloat  = 0
        var height:CGFloat = 0
        
        if audioOnly || (videoArray.isEmpty && !audioArray.isEmpty){
            return self.collectionView.frame.size
        }
        
        if (videoArray.count == 0) && (otherVideoArray.count == 0) {
            return self.collectionView.frame.size
        }
        
        switch videoArray.count {
        case 1:
            width  = ScreenW
            height = self.collectionView.frame.height
        case 2:
            if otherVideoArray.count == 0 {
                width  = ScreenW
                height = self.collectionView.frame.height / 2 - 2
            } else {
                width  = ScreenW / 2 - 3
                height = self.collectionView.frame.height  - 2
            }
        default :
            width  = ScreenW / 2 - 3
            height = self.collectionView.frame.height / 2 - 2
        }
        return CGSize(width: width, height: height)
    }
    
    func gobackButtonClick(sender:UIButton){
        
        videoView.removeFromSuperview()
        videoView = nil
        self.removeVideoMuxerID = ""
        self.reloadView()
    }
    
    func gobackTapClick(){
        let alertView = UIAlertController(title: "", message: "Are you sure you want to exit this webinar?", preferredStyle: .alert)
        alertView.addAction(UIAlertAction(title: "OK", style: .default, handler: { action in
            self.clearRoom()
        }))
        alertView.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))
        self.present(alertView, animated: true, completion: nil)
    }
    
}



extension BMVideoViewController: UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.otherVideoArray.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        //todo ??
        if self.mp4View != nil {
            self.bm.mp4CheckExisting()
        }
        
        if self.youtubeView != nil {
            self.bm.youtubeCheckExisting()
        }
        
        let cell = tableView.dequeueReusableCell(withIdentifier: tableViewCell, for: indexPath as IndexPath) as UITableViewCell
        
        for subView in cell.contentView.subviews {
            subView.removeFromSuperview()
        }
        
        cell.selectionStyle = UITableViewCellSelectionStyle.none
        let muxerID   = self.otherVideoArray[indexPath.row] as String
        if muxerID == MP4 {
            self.mp4View = MP4VideoView(frame: cell.bounds, link: self.mp4Link, seconds: self.seconds, eventTime: self.eventTime, playingState: Float(self.playingState))
            self.mp4View.timeSinceLastEvent = self.timeSinceLastEvent
            cell.contentView.addSubview(mp4View)
        } else if muxerID == YOUTUBE {
            if self.youtubeView != nil {
                self.youtubeView.removeFromSuperview()
            }
            let frame = CGRect.init(x: 0, y: 32, width: cell.frame.width, height: cell.frame.height)
            self.youtubeView = YouTubeVideoView(frame: frame, seconds: self.seconds, eventTime: self.eventTime, playingState: self.playingState)
            self.youtubeView.timeSinceLastEvent = self.timeSinceLastEvent
            self.youtubeView.loadVideo(url: self.youtubeLink)
            self.youtubeView.tag = 100
            self.tabBarController?.view.addSubview(youtubeView)
        } else if muxerID == WHITEBOARD {
            self.whiteBoardView = WhiteBoardView(frame: cell.bounds, conference: self.conference, bm: self.bm,isNormal: true, superV: cell.contentView, rotation:  self.rotation)
            whiteBoardView.setWhiteBoardDelegate(delegate: self as WhiteBoardFullScreenNotification)
            whiteBoardView.rotation(rotation: self.rotation)
        } else if muxerID == SCREENSHARE  {
            if let screenView = bm.screenViews[self.screenID] as? UIView {
                let videoInfo = videoInfoDictionary[self.screenID] as? VideoInfo
                self.screenView = screenView
                
                self.screenShareView = ScreenShareView(bm: self.bm, screenView: screenView, userName: videoInfo!.userName, superView: cell.contentView,rotation: self.rotation)
                self.screenShareView.delegate = self
                self.screenShareView.rotation(rotation: self.rotation)
                
            }
        }
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        
        if otherVideoArray.count == 0 {
            return 0
        } else {
            return self.tableView.frame.height
        }
        
    }
    
}

extension BMVideoViewController: BMNavViewDelegate{
    func quiteRoomNotification() {
        self.quiteRoom()
    }
    
    func audioOnlyNotification(status: Bool) {
        self.audioOnly = status
        self.reloadView()
    }
    
    func quiteRoom(){
        let alertView = UIAlertController(title: "", message: "Are you sure you want to exit this webinar?", preferredStyle: .alert)
        alertView.addAction(UIAlertAction(title: "OK", style: .default, handler: { action in
            self.clearRoom()
            PeopleMessage.pollCount = "0"
        }))
        alertView.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))
        self.present(alertView, animated: true, completion: nil)
    }
}



extension BMVideoViewController: WhiteBoardFullScreenNotification, SwitchScreenNotification{
    
    
    func didSwitchScreen(rotation: Bool) {
        self.rotation = rotation
        if self.videoArray.count > 0 {
            self.reloadView()
        }
    }
    
    
    func notifyWhiteBoardFullScreen(rotation: Bool){
        self.rotation = rotation
        self.changeTabBarStatus(status: rotation)
        if self.videoArray.count > 0 {
            self.reloadView()
        }
    }
    
    func changeTabBarStatus(status: Bool){
        self.tabBarController?.tabBar.backgroundColor = UIColor.red
        self.tabBarController?.tabBar.isHidden = status
    }
    
    
    func mp4Load(message: [NSObject : AnyObject]){
        bigRoomNotificationDelegateMp4Load(message: message)
    }
    
    
    func mp4Ended(message: [NSObject : AnyObject]){
        bigRoomNotificationDelegateMp4End(message: message)
    }
    
    
    func mp4Play(message: [NSObject : AnyObject]){
      bigRoomNotificationDelegateMp4Play(message: message)
    }
    
    
    func mp4Pause(message: [NSObject : AnyObject]){
       bigRoomNotificationDelegateMp4Pause(message: message)
    }
    
    
    func youtubeLoad(message: [NSObject : AnyObject]){
       bigRoomNotificationDelegateYoutubeLoad(message: message)
    }
    
    func youtubePlay(message: [NSObject : AnyObject]) {
        bigRoomNotificationDelegateMp4Play(message: message)
    }
    
    func youtubePause(message: [NSObject : AnyObject]) {
       bigRoomNotificationDelegateYoutubePause(message: message)
    }
    
    func youtubeEnd(message: [NSObject : AnyObject]) {
        bigRoomNotificationDelegateYoutubeEnd(message: message)
    }
    
    
}
