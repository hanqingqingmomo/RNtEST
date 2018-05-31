//
//  ColorView.swift
//  bigmarker
//
//  Created by Han Qing on 29/1/2018.
//  Copyright © 2018 hanqing. All rights reserved.
//
@objc protocol WhiteBoardSelectedColorNotification {
    @objc optional func notifyColorSelected(color: UIColor)
}
class ColorView: UIView{
    
    var doneLabel: UILabel!
    var yellowBtn: UIButton!
    var greenBtn:  UIButton!
    var redBtn:    UIButton!
    var purpleBtn: UIButton!
    var blueBtn:   UIButton!
    var lightPurpleBtn: UIButton!
    
    let btnH: CGFloat = 14.0
    var color: UIColor = UIColor(red: 254/255, green: 255/255, blue: 100/255, alpha: 1)
    
    var delegate: WhiteBoardSelectedColorNotification!
    
    func setupUI(){
        doneLabel = UILabel()
        doneLabel.text = "Done"
        doneLabel.textColor = UIColor(red: 16/255, green: 137/255, blue: 245/255, alpha: 1)
        doneLabel.font = UIFont(name: BMGTRegular, size: 14.0)
        doneLabel.isUserInteractionEnabled = true
        let tapForCalendar = UITapGestureRecognizer(target: self, action: #selector(showSettingView))
        doneLabel.addGestureRecognizer(tapForCalendar)
        
        yellowBtn = UIButton()
        yellowBtn.layer.cornerRadius = self.btnH / 2
        yellowBtn.layer.masksToBounds = true
        yellowBtn.backgroundColor = UIColor(red: 254/255, green: 255/255, blue: 100/255, alpha: 1)
        yellowBtn.addTarget(self, action: #selector(selectColor), for: UIControlEvents.touchUpInside)
        
        greenBtn = UIButton()
        greenBtn.layer.cornerRadius = self.btnH / 2
        greenBtn.layer.masksToBounds = true
        greenBtn.backgroundColor = UIColor(red: 109/255, green: 255/255, blue: 255/255, alpha: 1)
        greenBtn.addTarget(self, action: #selector(selectColor), for: UIControlEvents.touchUpInside)
        
        redBtn = UIButton()
        redBtn.layer.cornerRadius = self.btnH / 2
        redBtn.layer.masksToBounds = true
        redBtn.backgroundColor = UIColor(red: 249/255, green: 0/255, blue: 107/255, alpha: 1)
        redBtn.addTarget(self, action: #selector(selectColor), for: UIControlEvents.touchUpInside)
        
        purpleBtn = UIButton()
        purpleBtn.layer.cornerRadius = self.btnH / 2
        purpleBtn.layer.masksToBounds = true
        purpleBtn.backgroundColor = UIColor(red: 107/255, green: 0/255, blue: 255/255, alpha: 1)
        purpleBtn.addTarget(self, action: #selector(selectColor), for: UIControlEvents.touchUpInside)
        
        lightPurpleBtn = UIButton()
        lightPurpleBtn.layer.cornerRadius = self.btnH / 2
        lightPurpleBtn.layer.masksToBounds = true
        lightPurpleBtn.backgroundColor = UIColor(red: 177/255, green: 92/255, blue: 255/255, alpha: 1)
        lightPurpleBtn.addTarget(self, action: #selector(selectColor), for: UIControlEvents.touchUpInside)
        
        blueBtn = UIButton()
        blueBtn.layer.cornerRadius = self.btnH / 2
        blueBtn.layer.masksToBounds = true
        blueBtn.backgroundColor = UIColor(red: 1/255, green: 96/255, blue: 255/255, alpha: 1)
        blueBtn.addTarget(self, action: #selector(selectColor), for: UIControlEvents.touchUpInside)
        
        self.addSubview(doneLabel)
        self.addSubview(yellowBtn)
        self.addSubview(greenBtn)
        self.addSubview(redBtn)
        self.addSubview(purpleBtn)
        self.addSubview(lightPurpleBtn)
        self.addSubview(blueBtn)
        
        setLayout()
        
    }
    
    
    
    
    func selectColor(btn: UIButton){
        self.color = btn.backgroundColor!
        
        delBtnLayer()
        
        btn.layer.cornerRadius = btnH / 2
        btn.layer.masksToBounds = true
        btn.layer.borderColor = UIColor(red: 162/255, green: 171/255, blue: 187/255, alpha: 1).cgColor
        btn.layer.borderWidth = 1
        
        btn.layer.cornerRadius = btnH / 2
        btn.layer.shadowColor = UIColor(red: 0/255, green: 0/255, blue: 0/255, alpha:0.5).cgColor
        btn.layer.shadowOffset = CGSize(width: 0, height: 2)
        btn.layer.shadowOpacity = 1.0
        btn.layer.masksToBounds = true
        
        self.delegate.notifyColorSelected!(color: color)
    }
    
    
    func delBtnLayer(){
       let btns = [self.yellowBtn, self.blueBtn, self.greenBtn, self.lightPurpleBtn, self.redBtn, self.purpleBtn]
        for btn in btns {
           btn?.layer.borderColor = UIColor.clear.cgColor
           btn?.layer.borderWidth = 0
           btn?.layer.shadowOpacity = 0
        }
    }
    
    
    func showSettingView(){
        if let whiteBoardColorToolView = self.superview as? WhiteBoardColorToolView {
            whiteBoardColorToolView.hideColorView()
            //self.delegate.notifyColorSelected!(color)
        }
    }
    
    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(0)
            make?.width.mas_equalTo()(200)
        }
        
        self.doneLabel.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(5)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(-5)
            make?.width.mas_equalTo()(40)
            make?.height.mas_equalTo()(20)
            
        
        self.blueBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.doneLabel.mas_left)?.setOffset(-15)
            make?.width.mas_equalTo()(self.btnH)
            make?.height.mas_equalTo()(self.btnH)
        }
        
        self.lightPurpleBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.blueBtn.mas_left)?.setOffset(-10)
            make?.width.mas_equalTo()(self.btnH)
            make?.height.mas_equalTo()(self.btnH)
        }
        
        self.purpleBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.lightPurpleBtn.mas_left)?.setOffset(-10)
            make?.width.mas_equalTo()(self.btnH)
            make?.height.mas_equalTo()(self.btnH)
        }
        
        self.redBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.purpleBtn.mas_left)?.setOffset(-10)
            make?.width.mas_equalTo()(self.btnH)
            make?.height.mas_equalTo()(self.btnH)
        }
        
        self.greenBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.redBtn.mas_left)?.setOffset(-10)
            make?.width.mas_equalTo()(self.btnH)
            make?.height.mas_equalTo()(self.btnH)
        }
        
        self.yellowBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.greenBtn.mas_left)?.setOffset(-10)
            make?.width.mas_equalTo()(self.btnH)
            make?.height.mas_equalTo()(self.btnH)
        }
        
      }
        
    }

    
}
