//
//  BigRoomMessageController.swift
//  bigmarker
//
//  Created by Han Qing on 12/19/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

struct PeopleMessage {
    static var chatCount = "0"
    static var totalMessages: [Message]  = []
    static var bigTotalMessages : [Message] = []
    static var pollCount = "0"
}

let kStatusBarH : CGFloat = 20
let kNavigationBarH : CGFloat = 44
let kTabbarH : CGFloat = 44
let kTitleViewH : CGFloat = 40

class BMMessageController:  UIViewController {
    
    var conference: BMConference!
    var bm:BMRoom!

    
    lazy  var navView : BMNavView = { [weak self] in
        let navView = BMNavView(frame: CGRect(x: 0, y: 0, width: self!.view.frame.width, height: 64), conference: self!.conference)
        navView.delegate = self
        return navView
        }()
    
    fileprivate lazy var pageTitleView : PageTitleView = {[weak self] in
        let titleFrame = CGRect(x: 0, y: kStatusBarH + kNavigationBarH, width: BMScreenW, height: 40)
        let titles = ["Chat", "People", "Polls", "Q&A", "Handouts"]
        let titleView = PageTitleView(frame: titleFrame, titles: titles)
        titleView.delegate = self
        return titleView
        }()
    
    
    fileprivate lazy var pageContentView : PageContentView = {[weak self] in
        
        // 1.确定内容的frame
        let contentH = BMScreenH - kStatusBarH - kNavigationBarH - kTitleViewH - kTabbarH
        let contentFrame = CGRect(x: 0, y: kStatusBarH + kNavigationBarH + kTitleViewH, width: BMScreenW, height: contentH)
        
        // 2.确定所有的子控制器
        var childVcs = [UIViewController]()
        let chatViewController = BMChatListViewController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        (self!.tabBarController as! BMTabBarController).bmroomChatDelegate = chatViewController
        childVcs.append(chatViewController)
        
        let peopleController = BMPeopleViewController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        childVcs.append(peopleController)
        
        let pollsViewController = BMPollsViewController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        (self!.tabBarController as! BMTabBarController).bmroomPollDelegate = pollsViewController
        childVcs.append(pollsViewController)
        
        let qaViewController = BMQAViewController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        (self!.tabBarController as! BMTabBarController).bmroomQADelegate = qaViewController
        childVcs.append(qaViewController)
        
        let handoutController = BMHandoutsController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        (self!.tabBarController as! BMTabBarController).bmroomHandoutDelegate = handoutController
        childVcs.append(handoutController)
        
        let contentView = PageContentView(frame: contentFrame, childVcs: childVcs, parentViewController: self)
        contentView.delegate = self
        return contentView
        }()
    
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        if let youtubeView = self.tabBarController?.view.viewWithTag(100) as? YouTubeVideoView {
            youtubeView.isHidden = true
        }
        //显示chat的badge通知
        NotificationCenter.default.addObserver(self, selector: #selector(BMMessageController.chatBadgeCount), name: NSNotification.Name(rawValue: "chatBadgeCount"), object: nil)
        //显示people的badge改变的通知
        NotificationCenter.default.addObserver(self, selector: #selector(BMMessageController.changePeopleMessageCount), name: NSNotification.Name(rawValue: "peopleMessageChange"), object: nil)
        //修改投票数
        NotificationCenter.default.addObserver(self, selector: #selector(BMMessageController.changePollCount), name: NSNotification.Name(rawValue: "changePollCount"), object: nil)
        //QA
        NotificationCenter.default.addObserver(self, selector: #selector(BMMessageController.changeQA), name: NSNotification.Name(rawValue: "changeQA"), object: nil)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(true)
        if let youtubeView = self.tabBarController?.view.viewWithTag(100) as? YouTubeVideoView {
            youtubeView.isHidden = false
        }
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "chatBadgeCount"), object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "peopleMessageChange"), object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "changePollCount"), object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "changeQA"), object: nil)
    }
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        clearBadgeValue()
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    
    func setupUI() {
        // 0.不需要调整UIScrollView的内边距
        automaticallyAdjustsScrollViewInsets = false
        
        view.addSubview(navView)
        view.addSubview(pageTitleView)
        view.addSubview(pageContentView)
    }
    
    
    
    private func clearBadgeValue(){
         (self.tabBarController as! BMTabBarController).removeBadge()
    }
    
    
    func chatBadgeCount(notification:NSNotification){
//         DispatchQueue.main.sync {
//            let message = notification.object as! Message
//            if self.selectIndex != 0{
//                if message.sid != self.bm.socketID{
//                    let x = (self.menuView?.item(at: 0).frame.width)! - 2
//                    let y = (self.menuView?.item(at: 0).frame.height)! / 2  - 1
//                    self.setupNumberLabel(item: (self.menuView?.item(at: 0))!, frame: CGRect(x: x, y: y, width: 7, height: 7))
//                }
//            }
//        }
    }
    
    func changePeopleMessageCount(notification:NSNotification){
        
        //DispatchQueue.main.sync {
//            if PeopleMessage.totalMessages.count == 0 {
//                self.menuView?.item(at: 1).numberLabel.isHidden = true
//            }else{
//                let x = (self.menuView?.item(at: 1).frame.width)! - 10
//                let y = (self.menuView?.item(at: 1).frame.height)! / 2 - 2
//                self.setupNumberLabel(item: (self.menuView?.item(at: 1))!, frame: CGRect(x: x, y: y, width: 7, height: 7))
//            }
        //}
    }
    
    func changePollCount(){
//         DispatchQueue.main.sync {
//            let x = (self.menuView?.item(at: 2).frame.width)! - 5
//            let y = (self.menuView?.item(at: 2).frame.height)! / 2
//            self.setupNumberLabel(item: (self.menuView?.item(at: 2))!, frame: CGRect(x: x, y: y, width: 7, height: 7))
//        }
    }
    
    func changeQA(){
//        DispatchQueue.main.sync {
//            let x = (self.menuView?.item(at: 3).frame.width)! - 5
//            let y = (self.menuView?.item(at: 3).frame.height)! / 2
//            self.setupNumberLabel(item: (self.menuView?.item(at: 3))!, frame: CGRect(x: x, y: y, width: 7, height: 7))
//        }
    }
    
//    func setupNumberLabel(item: WMMenuItem, frame: CGRect){
//        item.numberLabel.frame = frame
//        item.numberLabel.layer.cornerRadius = item.numberLabel.frame.width/2
//        item.numberLabel.clipsToBounds = true
//        item.numberLabel.isHidden = false
//        item.numberLabel.text = ""
//    }

}

extension BMMessageController: BMNavViewDelegate{
    
    func quiteRoomNotification() {
        let vc = self.tabBarController?.viewControllers![0] as? BMVideoViewController
        vc!.quiteRoom()

    }
    
    func audioOnlyNotification(status: Bool) {
        let vc = self.tabBarController?.viewControllers![0] as? BMVideoViewController
        vc?.audioOnly = status
        vc?.reloadView()
    }
    
}


// MARK:- 遵守PageTitleViewDelegate协议
extension BMMessageController : PageTitleViewDelegate {
    func pageTitleView(_ titleView: PageTitleView, selectedIndex index: Int) {
        pageContentView.setCurrentIndex(index)
    }
}


// MARK:- 遵守PageContentViewDelegate协议
extension BMMessageController : PageContentViewDelegate {
    func pageContentView(_ contentView: PageContentView, progress: CGFloat, sourceIndex: Int, targetIndex: Int) {
        pageTitleView.setTitleWithProgress(progress, sourceIndex: sourceIndex, targetIndex: targetIndex)
    }
}


