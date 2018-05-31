
//
//  WhiteBoardView.swift
//  bigmarker
//
//  Created by hanqing on 7/23/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit
import AVFoundation

@objc protocol WhiteBoardFullScreenNotification {
    @objc optional func notifyWhiteBoardFullScreen(rotation: Bool)
    @objc optional func notifyGoBack()
}
struct WhiteBoardDrawView {
    static var drawViews : [MyView?] = [] //保存所有的whiteBoard
}


struct WhiteboardMyView {
    static var lineColor = UIColor.init(red: 254/255.0, green: 255/255.0, blue: 100/255.0, alpha: 1.0)
    static var lineWidth : CGFloat = 10.0
}


class WhiteBoardView: UIView {

    var images: [UIImage?]   = []
    var imageUrls: [String]   = []
    var conference: BMConference!
    var backgroundImageView: UIImageView!

    var tapGesture: UITapGestureRecognizer?
    var bm: BMRoom!
    var isNormal : Bool!

    var blankWhiteboard = false
    var loadStatus = false //图片是否加载完毕
    
    var delegate: WhiteBoardFullScreenNotification?
    
    var toolView: WhiteBoardToolView!
    
    var rotation =  false  //无旋转
    var hashId   = ""

    
    init(frame: CGRect,conference: BMConference, bm: BMRoom,isNormal: Bool, superV: UIView, rotation: Bool) {
        super.init(frame: CGRect.zero)
        superV.addSubview(self)
        self.conference = conference
        self.bm = bm
        self.isNormal = isNormal
        self.tag = WHITE_BOARD_TAG
        self.backgroundColor = UIColor.white
        self.rotation = rotation
        
        //判断只是画板还是有图片
        if self.bm.whiteboardInfo.count >= 3 && self.bm.whiteboardInfo[3] as! String == "blank-whiteboard"{
            blankWhiteboard = true
        }
        
        self.backgroundImageView = UIImageView()
        self.backgroundImageView.isUserInteractionEnabled = true
        self.backgroundImageView.backgroundColor = UIColor.white
        self.addSubview(backgroundImageView)
        
        self.toolView = WhiteBoardToolView(bm: self.bm, conference: self.conference, whiteboardView: self)
        
        self.setLayout()
        
        initWhiteBoard()
        
        
        NotificationCenter.default.addObserver(self, selector: #selector(addCoorinate), name: NSNotification.Name(rawValue: "addCoorinate"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(drawColorAndSize), name: NSNotification.Name(rawValue: "drawColorAndSize"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(changeColor), name: NSNotification.Name(rawValue: "changeColor"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(changSize), name: NSNotification.Name(rawValue: "changeSize"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(clearLine), name: NSNotification.Name(rawValue: "clearLine"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(changeRole), name: NSNotification.Name(rawValue: "changeMemberOrAdmin"), object: nil)

    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    //控制是否能画的开关出现或隐藏
   @objc func changeRole(notification:NSNotification){
        //let isAdmin = notification.object as! Bool
        DispatchQueue.main.sync{
            self.toolView.changeSettingBtn()
        }
    }
    
    //接收web页传来的clear命令
   @objc func clearLine(){
        if self.loadStatus == false {
            return
        }
        DispatchQueue.main.sync{
            if WhiteBoardDrawView.drawViews.count != 0 && (WhiteBoardDrawView.drawViews.count >= self.currentPage()) {
                WhiteBoardDrawView.drawViews[self.currentPage()]?.clear()
                WhiteBoardDrawView.drawViews[self.currentPage()]?.backImageVeiw.image = nil
            }
        }
    }
    //接收web页提前传过来的字体大小
   @objc func changSize(notification:NSNotification){
        if self.loadStatus == false {
            return
        }
        let dic = notification.userInfo
        let model = dic!["model"] as! DrawSizeModel
        if model.value == "0" {
            WhiteboardMyView.lineWidth = CGFloat(10)
        }else{
            WhiteboardMyView.lineWidth = CGFloat(Double(model.value)!)
        }
        
    }
    //接收web页提前传过来的颜色
 @objc func changeColor(notification:NSNotification){
        let dic = notification.userInfo
        let model = dic!["model"] as! DrawColorModel
        if model.red == CGFloat(0) && model.green == CGFloat(0) && model.blue == CGFloat(0) {
            WhiteboardMyView.lineColor = UIColor.init(red: 254/255.0, green: 255/255.0, blue: 0/255.0, alpha: 1.0)
        }else{
            WhiteboardMyView.lineColor = (UIColor.init(red: (model.red)/255.0, green: (model.green)/255.0, blue: (model.blue)/255.0, alpha: 1.0))
        }
         DispatchQueue.main.sync {
            self.toolView.colorToolView.settingView.colorBtn.backgroundColor = WhiteboardMyView.lineColor
        }
        
    }
    
    //提前接收web页传过来的颜色和字体大小
   @objc func drawColorAndSize(notification:NSNotification){
        let dic = notification.userInfo
        let model = dic!["model"] as! DrawPositionModel
        
        if model.pointSize == "0" {
            WhiteboardMyView.lineWidth = CGFloat(10)
        }else{
            WhiteboardMyView.lineWidth = CGFloat(Double(model.pointSize)!)
        }
        if model.red == CGFloat(0) && model.green == CGFloat(0) && model.blue == CGFloat(0) {
            WhiteboardMyView.lineColor = UIColor.init(red: 254/255.0, green: 255/255.0, blue: 0/255.0, alpha: 1.0)
        }else{
            WhiteboardMyView.lineColor = (UIColor.init(red: (model.red)/255.0, green: (model.green)/255.0, blue: (model.blue)/255.0, alpha: 1.0))
        }
    }
    
    //web页传过来的坐标
  @objc  func addCoorinate(notification:NSNotification){
        if self.loadStatus == false {
            return
        }
            if isNormal == true {
                 DispatchQueue.main.sync{
                    let dic = notification.userInfo
                    let model = dic!["model"] as! CoordinateModel
                    if model.saveHistory == false {
                        if WhiteBoardDrawView.drawViews.count != 0 && (WhiteBoardDrawView.drawViews.count >= self.currentPage()) {
                            if let myview = WhiteBoardDrawView.drawViews[self.currentPage()]{
                                let x = ((model.dataX - model.offsetLeft) * Float(myview.frame.size.height)) / (model.webHeight)
                                let y = ((model.dataY - model.offsetTop) * Float(myview.frame.size.width)) / model.webWidth
                                WhiteBoardDrawView.drawViews[self.currentPage()]?.addPA(nPoint: CGPoint(x: CGFloat(x), y: CGFloat(y)))
                            }
                        }
                       
                    }else{
                        if WhiteBoardDrawView.drawViews.count != 0 && (WhiteBoardDrawView.drawViews.count >= self.currentPage()) {
                            WhiteBoardDrawView.drawViews[self.currentPage()]?.setNeedsDisplay()
                            WhiteBoardDrawView.drawViews[self.currentPage()]?.addLA()
                        }
                    }
                }
            }
        }

    private func initWhiteBoard(){
        if WhiteBoardImage.images.count == 0 {
            
            if self.bm.whiteboardInfo.count > 0 {
//                loading = MBProgressHUD.showHUDAddedTo(self, animated: true)
//                loading.labelText = "Loading..."
            }
            //批量下载
            DispatchQueue.global().async {
                
                if self.bm.whiteboardInfo.count > 0 {
                    for urlString in self.bm.whiteboardInfo[0] as! Array<String> {
                        //print(urlString)
                        if let url:NSURL = NSURL.init(string: urlString) {
                            if let data:NSData = NSData.init(contentsOf: url as URL) {
                                if let image = UIImage.init(data: data as Data) {
                                    //print("====================================")
                                    self.images.append(image)
                                    self.imageUrls.append(urlString)
                                }
                            }
                        }
                    }
                }
                
                // 更新UI
                 DispatchQueue.main.sync{
                    self.loadStatus = true
                    //self.loading.hide(true)
                    if  self.bm == nil {
                        return
                    }
                    if self.bm.whiteboardInfo.count == 0 {
                        return
                    }
                    let currentImage = self.images[self.currentPage()]
                    self.backgroundImageView.image = currentImage
                    self.backgroundImageView.contentMode = UIViewContentMode.scaleAspectFit
                    WhiteBoardImage.images = self.images

                    //加画板
                    for (index,_) in self.images.enumerated(){
                        var frame: CGRect!
                        if self.blankWhiteboard {
                            frame = self.backgroundImageView.frame
                        } else {
                           frame = AVMakeRect(aspectRatio: self.backgroundImageView.image!.size, insideRect: self.backgroundImageView.bounds)
                        }

                        let myView = MyView(frame: frame, bm: self.bm, superView: self, currentPage:index)
//                        if self.blankWhiteboard {
//                            myView.frame = self.backgroundImageView.frame
//                        } else {
//                            myView.frame = AVMakeRectWithAspectRatioInsideRect(self.backgroundImageView.image!.size, self.backgroundImageView.bounds)
//                        }
                        myView.backgroundColor = UIColor.clear
                        myView.isHidden = true
                        myView.hashId = self.bm.whiteboardInfo[1] as? String as NSString!
                        self.hashId  = myView.hashId as String
                        WhiteBoardDrawView.drawViews.append(myView) //将每一个whiteboard加入WhiteBoardDrawView.drawViews保存
                     }
                    if WhiteBoardDrawView.drawViews.count != 0 && (WhiteBoardDrawView.drawViews.count >= self.currentPage()) {
                         WhiteBoardDrawView.drawViews[self.currentPage()]?.isHidden = false //当前页的whiteboard不需要隐藏
                    }
                   
                }
            }
        }else{
            self.loadStatus = true
            let currentImage = WhiteBoardImage.images[self.currentPage()]
            self.backgroundImageView.image = currentImage
            self.backgroundImageView.contentMode = UIViewContentMode.scaleAspectFit
            self.addSubview(self.backgroundImageView)
            //从WhiteBoardDrawView.drawViews取出whiteboard并加载
            if WhiteBoardDrawView.drawViews.count != 0 {
                for (_,myView) in WhiteBoardDrawView.drawViews.enumerated() {
                    myView?.isHidden = true
                    if isNormal == true{
//                        myView?.toolboard.frame = CGRectMake(0, 64+30, self.frame.width, 100)
//                        myView?.toolboard.tag = 113
                       // UIApplication.sharedApplication().keyWindow?.addSubview(myView!.toolboard)
                    } else {
//                        myView?.toolboard.frame = CGRectMake(0, 0, self.frame.width, 100)
//                        myView!.addSubview(myView!.toolboard)
                    }
                    if blankWhiteboard {
                        myView!.frame = self.backgroundImageView.frame
                    } else {
                        myView!.frame = AVMakeRect(aspectRatio: self.backgroundImageView.image!.size, insideRect: self.backgroundImageView.bounds)
                    }
                    
                    self.backgroundImageView.addSubview(myView!)
                }
                WhiteBoardDrawView.drawViews[currentPage()]?.isHidden = false
            }
            
        }
        
    }

    func setWhiteBoardDelegate(delegate: WhiteBoardFullScreenNotification){
        self.delegate = delegate
    }

    
    func currentPage() -> Int {
        if self.bm.whiteboardInfo.count >= 2 {
            return self.bm.whiteboardInfo[2] as? Int ?? 0
        }
        return 0
    }
    
    func totoalCount() ->Int {
        if self.bm.whiteboardInfo.count == 0 {
            return 0
        }
        return (self.bm.whiteboardInfo[0] as AnyObject).count
    }
    
    func switchPage(page: Int){
        
        if  self.loadStatus ==  false{
            self.toolView.titleLabel.text = "Slide \(currentPage()+1) of \(self.totoalCount())"
            return
        }
        
        for (index ,myView) in WhiteBoardDrawView.drawViews.enumerated() {
            if index == page {
                myView?.isHidden = false
            }else{
                myView?.isHidden = true
            }
        }

        if WhiteBoardImage.images.count != 0 {
            if let image = WhiteBoardImage.images[page] {
                self.backgroundImageView.image = image
                self.toolView.titleLabel.text = "Slide \(currentPage()+1) of \(self.totoalCount())"
            }
        }else{
            if let image = self.images[page] {
                self.backgroundImageView.image = image
                self.toolView.titleLabel.text = "Slide \(currentPage()+1) of \(self.totoalCount())"
            }
        }
    }
    
    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(0)
        }
        
        self.backgroundImageView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.toolView.mas_bottom)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
        }
 
    }
    
    
    func colorSelected(color: UIColor){
       WhiteBoardDrawView.drawViews[self.currentPage()]?.selectColor(color: color)
    }
    
    func whiteboardFullScreen(rotation: Bool){
        if bm.videoViews.count > 0 {
            delegate?.notifyWhiteBoardFullScreen!(rotation: rotation)
        } else {
            delegate?.notifyWhiteBoardFullScreen!(rotation: rotation)
            self.rotation(rotation: rotation)
        }
       
    }
    
    func rotation(rotation: Bool){
        if rotation {
            self.mas_remakeConstraints { (make) in
                make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
                make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(0)
                make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(10)
            }
            
            self.backgroundImageView.mas_remakeConstraints({ (make) in
                make?.top.mas_equalTo()(self.toolView.mas_bottom)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
                make?.centerX.mas_equalTo()(self)
                make?.width.mas_equalTo()(300)
            })
            
            
            UIView.animate(withDuration: 0.5, animations: {
                self.superview!.transform = CGAffineTransform(rotationAngle: 90.0 * (CGFloat(M_PI) / 180.0))
                }, completion: nil)
            
        } else {
            
            self.mas_remakeConstraints { (make) in
                make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
                make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(0)
                make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            }
            
            self.backgroundImageView.mas_remakeConstraints { (make) in
                make?.top.mas_equalTo()(self.toolView.mas_bottom)?.setOffset(0)
                make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
                make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
                make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
            }
            
            UIView.animate(withDuration: 0.5, animations:  {
                self.superview!.transform = CGAffineTransform(rotationAngle: 0)
                }, completion: nil)
        }
    }
 

}
