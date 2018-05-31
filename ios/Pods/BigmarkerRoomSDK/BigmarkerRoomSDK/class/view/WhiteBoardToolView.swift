//
//  WhiteBoardToolView.swift
//  bigmarker
//
//  Created by Han Qing on 16/1/2018.
//  Copyright © 2018 hanqing. All rights reserved.
//
import UIKit

class WhiteBoardToolView: UIView {
    
    var conference: BMConference!
    var bm: BMRoom!
    var colorToolView: WhiteBoardColorToolView!
    
    var titleLabel: UILabel!
    var fullScreenImageView: UIImageView!
    var settingBtn: UIButton!
    var whiteboardView: WhiteBoardView!
    var leftBtn : UIButton!
    var rightBrn: UIButton!
    
    init(bm: BMRoom, conference: BMConference, whiteboardView: WhiteBoardView) {
       super.init(frame: CGRect.zero)
       self.bm = bm
       self.whiteboardView  = whiteboardView
       self.conference = conference
       whiteboardView.addSubview(self)
       setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
        
      func setupUI(){
        
        titleLabel = UILabel()
        titleLabel.text = "Slide \(currentPage()) of \(totalPage())"
        titleLabel.textAlignment = NSTextAlignment.center
        
        titleLabel.textColor = UIColor(red: 113/255, green: 126/255, blue: 148/255, alpha: 1)
        titleLabel.font = UIFont(name: BMSFUIDisplay_Medium, size: 12)
        
        leftBtn = UIButton()
        leftBtn.setImage(UIImage(named: "BMSDK.bundle/Shape_left"), for: UIControlState.normal)
        leftBtn.addTarget(self, action: #selector(prePage), for: UIControlEvents.touchUpInside)
        
        rightBrn = UIButton()
        rightBrn.setImage(UIImage(named: "BMSDK.bundle/Shape_right"), for: UIControlState.normal)
        rightBrn.addTarget(self, action: #selector(nextPage), for: UIControlEvents.touchUpInside)
        
        
        setBtnVisable()
        
        
        settingBtn = UIButton()
        
        if conference.adminRole(){
            settingBtn.setImage(UIImage(named: "BMSDK.bundle/shape_blue"), for: UIControlState.normal)
            settingBtn.addTarget(self, action: #selector(toggleSettingView), for: UIControlEvents.touchUpInside)
        } else {
            settingBtn.setImage(UIImage(named: "BMSDK.bundle/pen"), for: UIControlState.normal)
        }
      
        self.addSubview(settingBtn)
        
        fullScreenImageView = UIImageView()
        fullScreenImageView.image = UIImage(named: "BMSDK.bundle/iconExpand")
        fullScreenImageView.isUserInteractionEnabled = true
        
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(fullScreen))
        fullScreenImageView.addGestureRecognizer(tapGesture)
        
        
        self.addSubview(leftBtn)
        self.addSubview(rightBrn)
        self.addSubview(titleLabel)
        self.addSubview(fullScreenImageView)
        self.setLayout()
        
        self.colorToolView = WhiteBoardColorToolView(bm: self.bm, conference: self.conference, toolView: self, superView: self.superview!)
    }
    
    func setBtnVisable(){
        if conference.adminRole(){
            
            if whiteboardView.totoalCount() == 1{
                self.leftBtn.isHidden  = true
                self.rightBrn.isHidden = true
            } else {
                leftBtn.isHidden  = false
                rightBrn.isHidden = false
            }
            
        } else {
            leftBtn.isHidden  = true
            rightBrn.isHidden = true
        }
    }
    
    func nextPage(btn: UIButton){
       var index = 0
        
       let nextPage = self.currentPage() + 1
      
        if nextPage  > self.totalPage() {
          index = 0
        } else {
          index = self.whiteboardView.currentPage() + 1
        }
        
      if self.whiteboardView.imageUrls.count >= index {
        let url   = self.whiteboardView.imageUrls[index]
        
        let data: [NSObject : AnyObject] = ["index" as NSObject: index as AnyObject, "url" as NSObject: url as AnyObject]
        let data1: [String] = [self.whiteboardView.hashId, url]
        //self.bm.whiteboard(data, nextPage: data1)
      }
      
    }
    
    func prePage(btn: UIButton){
        var index = 0
        
        let prePage = self.currentPage() - 1
        
        if prePage  == 0 {
            index = self.totalPage() - 1
        } else {
            index = self.whiteboardView.currentPage() - 1
        }
        
        if self.whiteboardView.imageUrls.count > index {
            let url   = self.whiteboardView.imageUrls[index]
            
            let data: [NSObject : AnyObject] = ["index" as NSObject: index as AnyObject, "url" as NSObject: url as AnyObject]
            let data1: [String] = [self.whiteboardView.hashId, url]
            //self.bm.whiteboard(data, nextPage: data1)
        }

    }
    
    
    func changeSettingBtn(){
        if conference.adminRole(){
            settingBtn.setImage(UIImage(named: "BMSDK.bundle/shape_blue"), for: UIControlState.normal)
            settingBtn.addTarget(self, action: #selector(toggleSettingView), for: UIControlEvents.touchUpInside)
        } else {
            settingBtn.setImage(UIImage(named: "BMSDK.bundle/pen"), for: UIControlState.normal)
        }
    }
    
    func showColorView(sender: AnyObject){
        UIView.animate(withDuration: 0.5, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
            if self.colorToolView.isHidden == true{
                self.colorToolView.isHidden = false
            } else {
                self.colorToolView.isHidden = true
            }
            }, completion: nil)
    }
    
    
    func toggleSettingView(sender: AnyObject){
        UIView.animate(withDuration: 0.5, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
            if self.colorToolView.isHidden == true{
                self.colorToolView.isHidden = false
                self.superview!.bringSubview(toFront: self.colorToolView)
            } else {
                self.colorToolView.isHidden = true
            }
            }, completion: nil)
    }
    

    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
        }
        
        self.leftBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(10)
            make?.right.mas_equalTo()(self.titleLabel.mas_left)?.setOffset(-6)
            make?.width.mas_equalTo()(6)
            make?.height.mas_equalTo()(10)
        }
        
        self.titleLabel.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(0)
            make?.center.mas_equalTo()(self)
            make?.width.mas_equalTo()(80)
            make?.height.mas_equalTo()(30)
        }
        
        self.rightBrn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(10)
            make?.right.mas_equalTo()(self.titleLabel.mas_right)?.setOffset(10)
            make?.width.mas_equalTo()(6)
            make?.height.mas_equalTo()(10)
        }
        
        self.fullScreenImageView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(7)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(-10)
            make?.width.mas_equalTo()(15)
            make?.height.mas_equalTo()(15)
        }
        
        self.settingBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(7)
            make?.right.mas_equalTo()(self.fullScreenImageView.mas_left)?.setOffset(-15)
            make?.width.mas_equalTo()(13)
            make?.height.mas_equalTo()(16)
        }
        
    }
    
    
    func changePage(){
      titleLabel.text = "Slide \(currentPage()) of \(totalPage())"
    }
    
    func totalPage() -> Int{
       return (self.bm.whiteboardInfo[0] as AnyObject).count
    }
    
    
    func currentPage() -> Int {
        return (self.bm.whiteboardInfo[2] as? Int ?? 0) + 1
    }
    
    
    func fullScreen(sender:UITapGestureRecognizer){
        if whiteboardView.rotation {
            whiteboardView.rotation = false
            whiteboardView.whiteboardFullScreen(rotation: whiteboardView.rotation)
        } else {
            whiteboardView.rotation = true
            whiteboardView.whiteboardFullScreen(rotation: whiteboardView.rotation)
        }

    }
    
    
    
}

extension WhiteBoardToolView: WhiteBoardSelectedColorNotification {
    
    func notifyColorSelected(color: UIColor) {
        self.whiteboardView.colorSelected(color: color)
        self.colorToolView.settingView.colorBtn.backgroundColor = color
    }
    
}


