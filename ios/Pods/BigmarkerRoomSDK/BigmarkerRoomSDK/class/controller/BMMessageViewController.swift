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
    
    lazy var pageTitleView : PageTitleView = {[weak self] in
        let titleFrame = CGRect(x: 0, y: kStatusBarH + kNavigationBarH, width: BMScreenW, height: 40)
        let titles = ["Chat", "People", "Polls", "Handouts", "Q&A"]
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
        
        let handoutController = BMHandoutsController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        (self!.tabBarController as! BMTabBarController).bmroomHandoutDelegate = handoutController
        childVcs.append(handoutController)
        
        let qaViewController = BMQAViewController(frame: CGRect.zero, bm: self!.bm, conference: self!.conference)
        (self!.tabBarController as! BMTabBarController).bmroomQADelegate = qaViewController
        childVcs.append(qaViewController)
        
        let contentView = PageContentView(frame: contentFrame, childVcs: childVcs, parentViewController: self)
        contentView.delegate = self
        return contentView
        }()
    
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        if let youtubeView = self.tabBarController?.view.viewWithTag(100) as? YouTubeVideoView {
            youtubeView.isHidden = true
        }
//        //显示chat的badge通知
//        NotificationCenter.default.addObserver(self, selector: #selector(self.changeChatBadge), name: NSNotification.Name(rawValue: "changeChatBadge"), object: nil)
//        //显示people的badge改变的通知
//        NotificationCenter.default.addObserver(self, selector: #selector(self.changePeopleMessageBadge), name: NSNotification.Name(rawValue: "changePeopleMessageBadge"), object: nil)
//        //修改投票数
//        NotificationCenter.default.addObserver(self, selector: #selector(self.changePollBadge), name: NSNotification.Name(rawValue: "changePollBadge"), object: nil)
//        //QA
//        NotificationCenter.default.addObserver(self, selector: #selector(self.changeQABadge), name: NSNotification.Name(rawValue: "changeQABadge"), object: nil)
//        NotificationCenter.default.addObserver(self, selector: #selector(self.changeHandoutBadge), name: NSNotification.Name(rawValue: "changeHandoutBadge"), object: nil)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(true)
        if let youtubeView = self.tabBarController?.view.viewWithTag(100) as? YouTubeVideoView {
            youtubeView.isHidden = false
        }
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
    
    
    func showBadge(index: Int){
        DispatchQueue.main.sync {
            let label = self.pageTitleView.titleLabels[index]
            let button = label.subviews.first
            if (button?.isKind(of: UIButton.self))! {
                button?.isHidden = false
            }
        }
    }

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



