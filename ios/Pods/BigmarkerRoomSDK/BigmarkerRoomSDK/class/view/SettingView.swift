//
//  SettingView.swift
//  bigmarker
//
//  Created by Han Qing on 29/1/2018.
//  Copyright © 2018 hanqing. All rights reserved.
//

class SettingView: UIView{
    
    var bm:BMRoom!
    
    var arrowBtn: UIButton!
    var delBtn:   UIButton!
    var colorBtn: UIButton!
    
    
    init(superView: UIView,  bm:BMRoom!) {
        super.init(frame: CGRect.zero)
        self.bm = bm
        superView.addSubview(self)
        setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    func setupUI(){
        arrowBtn = UIButton()
        arrowBtn.setImage(UIImage(named: "BMSDK.bundle/up-Shape"), for: UIControlState.normal)
        arrowBtn.addTarget(self, action: #selector(hideSettingView), for: UIControlEvents.touchUpInside)
        
        delBtn = UIButton()
        delBtn.setImage(UIImage(named: "BMSDK.bundle/shape"), for: UIControlState.normal)
        delBtn.addTarget(self, action: #selector(whiteBoardDel), for: UIControlEvents.touchUpInside)
        
        
        colorBtn = UIButton()
        colorBtn.layer.cornerRadius = 16.0 / 2
        colorBtn.layer.masksToBounds = true
        colorBtn.layer.borderColor = UIColor(red: 162/255, green: 171/255, blue: 187/255, alpha: 1).cgColor
        colorBtn.layer.borderWidth = 1
        colorBtn.backgroundColor = UIColor(red: 254/255, green: 255/255, blue: 100/255, alpha: 1)
        colorBtn.addTarget(self, action: #selector(showColorView), for: UIControlEvents.touchUpInside)
    
        self.addSubview(arrowBtn)
        self.addSubview(delBtn)
        self.addSubview(colorBtn)
        setLayout()
    }
    
    
    func showColorView(sender: AnyObject){
        if let whiteBoardColorToolView = self.superview as? WhiteBoardColorToolView {
            whiteBoardColorToolView.showColorView()
        }
    }
    
    func hideSettingView(sender: AnyObject){
        if let whiteBoardColorToolView = self.superview as? WhiteBoardColorToolView {
            if let whiteBoardToolView = whiteBoardColorToolView.toolView  {
                whiteBoardToolView.toggleSettingView(sender: sender)
            }
        }
    }
    
    func whiteBoardDel(sender: AnyObject){
        //self.bm.whiteboardRemove([:])
    }
    
    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(0)
            make?.width.mas_equalTo()(250)
        }
        
        self.arrowBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(12)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(-15)
            make?.width.mas_equalTo()(11)
            make?.height.mas_equalTo()(6)
        }
        
        self.delBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.arrowBtn.mas_left)?.setOffset(-15)
            make?.width.mas_equalTo()(14)
            make?.height.mas_equalTo()(16)
        }
            
        self.colorBtn.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(8)
            make?.right.mas_equalTo()(self.delBtn.mas_left)?.setOffset(-15)
            make?.width.mas_equalTo()(16)
            make?.height.mas_equalTo()(16)
        }
            
    }

    
}
