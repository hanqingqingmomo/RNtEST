//
//  DesktopView.swift
//  bigmarker
//
//  Created by hanqing on 3/24/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

protocol SwitchScreenNotification {
    func didSwitchScreen(rotation: Bool)
}

class ScreenShareView: UIView {

    var bm: BMRoom!
    var bottomView: UIView!
    var userName = ""
    var rotation: Bool = false
    
    var nameLabel: UILabel!
    var fullButton: UIButton!
    
    var screenView: UIView!
    
    var delegate: SwitchScreenNotification?
    
    
    lazy private var topView: UIView = { [weak self] in

        var topView = UIView()
        topView.backgroundColor = UIColor(red: 56.0/255.0, green: 61.0/255.0, blue: 63.0/255.0, alpha: 1)
        
        self!.fullButton = UIButton()
        self!.fullButton.setImage(UIImage(named: "BMSDK.bundle/full_screen"), for: UIControlState.normal)
        self!.fullButton.addTarget(self, action: #selector(ScreenShareView.switchScreen), for: UIControlEvents.touchDown)
        topView.addSubview(self!.fullButton)
        
        self!.nameLabel = UILabel()
        self!.nameLabel.text = self!.userName + "'s Desktop"
        self!.nameLabel.font = UIFont(name: BMGTRegular, size: 17.0)!
        self!.nameLabel.textColor = UIColor.white
        self!.nameLabel.textAlignment = NSTextAlignment.left
        self!.nameLabel.adjustsFontSizeToFitWidth = true
        topView.addSubview(self!.nameLabel)
        
        return topView
        }()
    


    
    init(bm: BMRoom, screenView: UIView, userName: String, superView: UIView, rotation:  Bool) {
        super.init(frame: CGRect.zero)
        self.bm = bm
        self.rotation = rotation
        self.userName = userName
        self.screenView = screenView
        superView.addSubview(self)
        setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    
    func setupUI(){
       self.addSubview(self.topView)
       self.addSubview(screenView)
       setLayout()
    }
    
    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview!.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview!.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview!.mas_bottom)?.setOffset(0)
        }
        
        self.topView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.height.mas_equalTo()(40)
        }
        
        self.nameLabel.mas_makeConstraints { (make) in
            make?.centerY.mas_equalTo()(self.topView)
            make?.left.mas_equalTo()(self.topView.mas_left)?.setOffset(15)
            make?.width.mas_equalTo()(100)
            make?.height.mas_equalTo()(30)
        }
        
        self.fullButton.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.topView.mas_top)?.setOffset(5)
            make?.right.mas_equalTo()(self.topView.mas_right)?.setOffset(-10)
            make?.width.mas_equalTo()(30)
            make?.height.mas_equalTo()(30)
        }
        
        self.screenView.mas_makeConstraints { (make) in
            make?.centerY.mas_equalTo()(self)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.height.mas_equalTo()(300)
           
        }
        
    }
    
    
  @objc  func switchScreen(){
        if rotation {
            rotation = false
        } else {
            rotation = true
        }
        if bm.videoViews.count > 0 {
           self.delegate?.didSwitchScreen(rotation: rotation)
        } else {
            self.rotation(rotation: rotation)
            self.delegate?.didSwitchScreen(rotation: rotation)
        }
    }
    
    func rotation(rotation: Bool){
        if rotation {
            self.screenView.mas_remakeConstraints { (make) in
                make?.top.mas_equalTo()(self.topView.mas_bottom)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
                make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
                make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            }
            
            
            UIView.animate(withDuration: 0.5, animations: {
                self.superview!.transform = CGAffineTransform(rotationAngle: 90.0 * (CGFloat(M_PI) / 180.0))
                }, completion: nil)
            
        } else {
            
            self.screenView.mas_remakeConstraints { (make) in
                make?.centerY.mas_equalTo()(self)
                make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
                make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
                make?.height.mas_equalTo()(self.mas_height)?.dividedBy()(2)
            }
            
            UIView.animate(withDuration: 0.5, animations: {
                self.superview!.transform = CGAffineTransform(rotationAngle: 0)
                }, completion: nil)
        }
    }
    
    func rotateToRight(rotation: Bool){
        if rotation {
            self.screenView.mas_remakeConstraints { (make) in
                make?.top.mas_equalTo()(self.topView.mas_bottom)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
                make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
                make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            }
            
            UIView.animate(withDuration: 0.5, animations: {
                self.superview!.transform = CGAffineTransform(rotationAngle: CGFloat(-M_PI_2))
                }, completion: nil)
        }
    }
    
    
    func rotateToLeft(rotation: Bool){
        if rotation {
            self.screenView.mas_remakeConstraints { (make) in
                make?.top.mas_equalTo()(self.topView.mas_bottom)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
                make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
                make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            }
            
            UIView.animate(withDuration: 0.5, animations: {
                self.superview!.transform = CGAffineTransform(rotationAngle: 90.0 * (CGFloat(M_PI) / 180.0))
                }, completion: nil)
            
        }
    }

    
}
