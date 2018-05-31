//
//  WhiteBoardColorToolView.swift
//  bigmarker
//
//  Created by Han Qing on 26/1/2018.
//  Copyright © 2018 hanqing. All rights reserved.
//


class WhiteBoardColorToolView: UIView {
    
    var conference: BMConference!
    var bm: BMRoom!
    var titleLabel: UILabel!
    
    var toolView:    WhiteBoardToolView!
    var colorView:   ColorView!
    var settingView: SettingView!    
    
    init(bm: BMRoom, conference: BMConference, toolView: WhiteBoardToolView, superView: UIView) {
        super.init(frame: CGRect.zero)
        self.bm = bm
        self.toolView   = toolView
        self.conference = conference
        self.isHidden = true
        superView.addSubview(self)
        setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    func setupUI(){
        self.backgroundColor = UIColor(red: 244/255, green: 246/255, blue: 248/255, alpha: 1)
        titleLabel = UILabel()
        titleLabel.text = "Whiteboard"
        titleLabel.textColor = UIColor(red: 113/255, green: 126/255, blue: 148/255, alpha: 1)
        titleLabel.font = UIFont(name: BMSFUIDisplay_Medium, size: 12)
    
        self.addSubview(titleLabel)
        self.setLayout()
        
        self.settingView = SettingView(superView: self, bm: self.bm)
    }
    
    
    func showColorView(){
        self.settingView.isHidden = true
        self.colorView = ColorView()
        self.colorView.delegate = toolView
        self.addSubview(colorView)
        self.colorView.setupUI()
        self.titleLabel.text = "Whiteboard Color"
    }
    
    
    func hideColorView(){
        self.colorView.isHidden   = true
        self.settingView.isHidden = false
        self.titleLabel.text = "Whiteboard"
    }
    

    func setLayout(){
     
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.toolView.mas_bottom)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            make?.height.mas_equalTo()(30)
        }
        
        self.titleLabel.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(15)
            make?.width.mas_equalTo()(100)
            make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
        }
        
        
    }

}
