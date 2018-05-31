//
//  BMNavView.swift
//  bigmarker
//
//  Created by Han Qing on 2/12/2017.
//  Copyright © 2017 hanqing. All rights reserved.
//
@objc protocol BMNavViewDelegate{
    @objc optional func quiteRoomNotification()
    @objc optional func audioOnlyNotification(status: Bool)
}

import UIKit
class BMNavView: UIView {
    
    var titleLabel: UILabel?
    var settingButton: UIButton?
    var conference:  BMConference?
    var delegate: BMNavViewDelegate?
    var audioOnly = false
    
    
    
    init(frame: CGRect, conference: BMConference) {
        super.init(frame: frame)
        self.frame = frame
        self.conference = conference
        self.backgroundColor = BMROOMNAV_COLOR
        setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    func setupUI(){
        self.titleLabel = UILabel.init(frame: CGRect.init(x: 15, y: 27, width: 230, height: 24))
        self.titleLabel?.textColor = UIColor.white
        self.titleLabel?.font = UIFont(name: BMGTBold, size: 20)
        self.titleLabel?.text = self.conference?.title
        self.titleLabel?.minimumScaleFactor = 0.5
        self.titleLabel?.baselineAdjustment = UIBaselineAdjustment.alignCenters
        self.titleLabel?.adjustsFontSizeToFitWidth = true
        self.addSubview(titleLabel!)
        let x = ScreenW - 40
        let settingButton = UIButton(frame: CGRect(x: x, y: 25, width: 30, height: 30))
        settingButton.setImage(UIImage(named: "BMSDK.bundle/setting"), for: UIControlState.normal)
        settingButton.addTarget(self, action: #selector(clickButton), for: .touchUpInside)
        self.addSubview(settingButton)
        
    }
    
  @objc  func clickButton(sender: AnyObject){
        
        let audio = PopoverAction.init(image:UIImage(named: "BMSDK.bundle/white"), title: "Audio only", handler: nil)
        
        let action = PopoverAction.init(image: UIImage(named: "BMSDK.bundle/icon-leave"), title: "Leave webinar", handler: {action in
            self.delegate?.quiteRoomNotification!()
        })
        
        
        let uiSwitch = UISwitch.init(frame: CGRect.init(x: 0, y: 18, width: 15, height: 3))
        uiSwitch.transform = CGAffineTransform(scaleX: 0.5, y: 0.5)
        uiSwitch.onTintColor = UIColor(red: 16/255, green: 137/255, blue: 245/255, alpha: 0.7)
        uiSwitch.addTarget(self, action:  #selector(switchChanged), for: UIControlEvents.valueChanged)
        uiSwitch.isOn = audioOnly
        let view = PopoverView()
        view.style = PopoverViewStyle.default
        view.showShade = true
        view.show(to: sender as! UIView, with: [audio!, action!])
        
        
        view.addSubview(uiSwitch)
    }
    
    
  @objc  func switchChanged(mySwitch: UISwitch) {
        if mySwitch.isOn {
            audioOnly = true
            self.delegate?.audioOnlyNotification!(status: audioOnly)
        } else {
            audioOnly = false
            self.delegate?.audioOnlyNotification!(status: audioOnly)
        }
        
    }
    
}
