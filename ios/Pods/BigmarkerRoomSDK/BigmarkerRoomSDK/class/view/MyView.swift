//
//  MyView.swift
//  bigmarker
//
//  Created by 刘欣 on 2017/8/10.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit


struct Point {
    static var MyBeganpoint : CGPoint! //记录点(x,y)
}

class MyView: UIView {
    
    var bm: BMRoom!
    var currentPage : Int!
    var hashId : NSString!
    var whiteBoardView: WhiteBoardView!
    
    
    //保存线条颜色
    var colorArray : NSMutableArray  = []
    //保存被移除的线条颜色
    var deleColorArray : NSMutableArray  = []
    //每次触摸结束前经过的点，形成线的点数组
    var pointArray : NSMutableArray  = []
    //每次触摸结束后的线数组
    var lineArray : NSMutableArray  = []
    //删除的线的数组，方便重做时取出来
    var deleArray : NSMutableArray  = []
    //删除线条时删除的线条宽度储存的数组
    var deleWidthArray : NSMutableArray = []
    //正常存储的线条宽度的数组
    var WidthArray : NSMutableArray = []
    //是否需要隐藏颜色和宽度
    var colorHidden = false
    var widthHidden = false

    var widthLabel : UILabel! //宽度label
    var stepp : UIStepper!//宽度计时器
    var backImageVeiw : UIImageView!//接收web传过来的图片
    var position = 0 //现在是第几笔
    var max = 0 //一共有多少笔
    
    init(frame: CGRect, bm: BMRoom, superView: WhiteBoardView,currentPage:Int) {
        super.init(frame: CGRect.zero)
        self.bm = bm
        self.whiteBoardView = superView
        self.currentPage = currentPage
        //加载服务器的图片
        backImageVeiw = UIImageView()
        self.isUserInteractionEnabled = true
        backImageVeiw.isUserInteractionEnabled = true
        self.addSubview(backImageVeiw)
        //backImageVeiw.backgroundColor = UIColor.redColor()
        NotificationCenter.default.addObserver(self, selector: #selector(addImage), name: NSNotification.Name(rawValue: "whiteboardDrawModel"), object: nil)
        //向服务器发送信号,看有没有画图的图片
        var dict = [String:AnyObject]()
        dict["whId"] = self.bm.whiteboardInfo[1] as? String as AnyObject?
        dict["whIndex"] = self.currentPage as AnyObject?
        self.bm.whiteboardGetHistory(dict)
        
        superView.backgroundImageView.addSubview(self)
        
        setLayout()
    }
    
    //clear按钮点击
    func clearBtnClick(){
//        deleArray.removeAllObjects()
//        deleColorArray.removeAllObjects()
//        colorArray.removeAllObjects()
//        lineArray.removeAllObjects()
//        pointArray.removeAllObjects()
//        deleWidthArray.removeAllObjects()
//        WidthArray.removeAllObjects()
//        self.setNeedsDisplay()
//        
//        if self.isUserInteractionEnabled == true {
//            //颜色
//            let colorStr = getColorString(color: WhiteboardMyView.lineColor)
//            var dict = [NSString:AnyObject]()
//            dict["whId"] = self.hashId
//            dict["whIndex"] = self.currentPage as AnyObject?
//            dict["value"] = " " as AnyObject?//不需要发截图
//            dict["position"] = 0 as AnyObject?//现在是第几笔
////            dict["size"] = ["width":self.frame.size.width,"height":self.frame.size.height]
//            dict["size"] = ["width":676,"height":676]
//            dict["max"] = 0 as AnyObject?//一共有多少笔
//            dict["pointSize"] = WhiteboardMyView.lineWidth as AnyObject?
//            dict["pointColor"] = colorStr as AnyObject?
//            dict["clear"] = true as AnyObject?
//            //print("发送坐标 : \(dict)")
//            self.bm.whiteboardDrawHistory(dict)
//        }
//        
//        //画笔数归零
//        self.position = 0
//        self.max = 0
    }
    

    //新用户进来接收之前的坐标图片
  @objc  func addImage(notification:NSNotification){
//         DispatchQueue.main.sync{
//            let dic = notification.userInfo
//            let model = dic!["model"] as! WhiteboardDrawModel
//            
//            if self.currentPage == model.whIndex{
//                //清除之前所有的图片和划线
//                self.deleArray.removeAllObjects()
//                self.deleColorArray.removeAllObjects()
//                self.colorArray.removeAllObjects()
//                self.lineArray.removeAllObjects()
//                self.pointArray.removeAllObjects()
//                self.deleWidthArray.removeAllObjects()
//                self.WidthArray.removeAllObjects()
//                self.setNeedsDisplay()
//                
//                let imageData = NSData(base64Encoded:model.value, options: NSData.Base64DecodingOptions.ignoreUnknownCharacters)
//                let imageOrigin = UIImage(data: imageData! as Data)
//                self.backImageVeiw.image = imageOrigin
//                WhiteboardMyView.lineColor = UIColor(red: model.red/255.0, green: model.green/255.0, blue: model.blue/255.0, alpha: 1.0)
//                WhiteboardMyView.lineWidth = CGFloat(Double(model.pointSize)!)
//                self.position = model.position
//                self.max = model.max
//            }
//            
//        }
        
    }
    
    
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    //uiview默认的drawRect方法，覆盖重写，可在界面上重绘，并将AViewController.xib的文件设置为自定义的MyView
    override func draw(_ rect: CGRect) {
//        let context = UIGraphicsGetCurrentContext()
//        context!.beginPathCGContextBeginPath(context!)
//        context!.setLineWidth(10.0)
//        //线条拐角样式，设置为平滑
//        context!.setLineJoin(.round);
//        //线条开始样式，设置为平滑
//        context!.setLineCap(.round);
//        //查看lineArray数组里是否有线条，有就将之前画的重绘，没有只画当前线条
//        if lineArray.count > 0 {
//            for i in 0...(lineArray.count - 1) {
//                let array = NSArray(array:lineArray[i] as! [AnyObject])
//                if array.count > 0 {
//                    context!.beginPath()
//                    let myStartPoint = CGPointFromString(array.object(at: 0) as! String)
//                    CGContextMoveToPoint(context, myStartPoint.x, myStartPoint.y)
//                    for j in 0..<(array.count - 1) {
//                        let myEndPoint = CGPointFromString(array.object(at: j+1) as! String)
//                        CGContextAddLineToPoint(context, myEndPoint.x,myEndPoint.y)
//                    }
//                    //获取colorArray数组里的要绘制线条的颜色
//                    let lineColor = colorArray[i]
//                    //获取WidthArray数组里的要绘制线条的宽度
//                    let width = WidthArray[i] as! CGFloat
//                    //设置线条的颜色，要取uicolor的CGColor
//                    CGContextSetStrokeColorWithColor(context!, (lineColor as AnyObject).cgColor)
//                    //设置线条宽度
//                    CGContextSetLineWidth(context!, width)
//                    //保存自己画的
//                    CGContextStrokePath(context!)
//                    
//                }
//            }
//        }
//        //画当前的线
//        if pointArray.count > 0 {
//            CGContextBeginPath(context!)
//            let myStartPoint = CGPointFromString(pointArray[0] as! String)
//            CGContextMoveToPoint(context, myStartPoint.x, myStartPoint.y)
//            for j in 0..<(pointArray.count - 1) {
//                let myEndPoint = CGPointFromString(pointArray[j+1] as! String)
//                CGContextAddLineToPoint(context, myEndPoint.x,myEndPoint.y)
//            }
//            let lineColor = WhiteboardMyView.lineColor
//            let width = CGFloat(WhiteboardMyView.lineWidth)
//            CGContextSetStrokeColorWithColor(context!, lineColor.CGColor)
//            CGContextSetLineWidth(context!, width)
//            CGContextStrokePath(context!)
//        }
    }
    
    //手指触屏开始
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
//        //toolboard必须隐藏才能开始画,防止截图截到toolboard
//         //self.toolboard.hidden = true
//        self.whiteBoardView.toolView.colorToolView.isHidden = true
//        if !whiteBoardView.conference.adminRole(){
//            //print("================  return")
//            return
//        }
//   
//         let touch = (touches as NSSet).anyObject()
//         Point.MyBeganpoint = (touch! as AnyObject).locationInView(self)
//        if self.isUserInteractionEnabled == true {
//            //传坐标****************************
//            var dict = [NSString:AnyObject]()
//            dict["drawer"] = bm.socketID as AnyObject?
//            dict["drawing"] = false as AnyObject?
//            dict["offset"] = ["left":0,"top":0]
//            dict["whiteboard"] = ["height":self.frame.size.height,"width":self.frame.size.width]
//            dict["x"] = Point.MyBeganpoint.x as AnyObject?
//            dict["y"] = Point.MyBeganpoint.y as AnyObject?
//            self.bm.whiteboardMouseMove(dict)
//        }
//        
    }
    //手指移动时候发出
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
//        if !whiteBoardView.conference.adminRole(){
//            return
//        }
//          //if self.whiteBoardView.drawingSwitch.on {
//            //如果toolboard隐藏了,可以画
//            let touch = (touches as NSSet).anyObject()
//            Point.MyBeganpoint = touch!.locationInView(self)
//            let sPoint = NSStringFromCGPoint(Point.MyBeganpoint)
//            pointArray.addObject(sPoint)
//            self.setNeedsDisplay()
//            
//            if self.userInteractionEnabled == true {
//                //传坐标****************************
//                var dict = [NSString:AnyObject]()
//                dict["drawer"] = bm.socketID
//                dict["drawing"] = true
//                dict["offset"] = ["left":0,"top":0]
//                dict["whiteboard"] = ["height":self.frame.size.height,"width":self.frame.size.width]
//                dict["x"] = Point.MyBeganpoint.x
//                dict["y"] = Point.MyBeganpoint.y
//                self.bm.whiteboardMouseMove(dict)
//            }
//        
    }
    //手指离开屏幕的时候
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
//        if !whiteBoardView.conference.adminRole(){
//            return
//        }
//        
//        
//        //if self.whiteBoardView.drawingSwitch.on {
//            addLA()
//        
//        if self.userInteractionEnabled == true {
//            //传手指离开屏幕的命令**************************
//            var dict = [NSString:AnyObject]()
//            dict["drawer"] = bm.socketID
//            dict["drawing"] = true
//            dict["saveHistory"] = true
//            self.bm.whiteboardMouseMove(dict)
//            //print("history : \(dict)")
//        }
        
    }
    //在touch结束前将获取到的点，放到pointArray里
    func addPA(nPoint:CGPoint){
//        let sPoint = NSStringFromCGPoint(nPoint)
//        pointArray.addObject(sPoint)
        
    }
    //在touchend时，将已经绘制的线条的颜色，宽度，线条线路保存到数组里
    func addLA(){
        
//        colorArray.addObject(WhiteboardMyView.lineColor)
//        let num = NSNumber.init(float: Float(WhiteboardMyView.lineWidth))
//        WidthArray.addObject(num)
//        let array = NSArray.init(array: pointArray)
//        lineArray.addObject(array)
//        pointArray = []
//        
//        if self.userInteractionEnabled == true {
//            //截图**********************************
//            let image = self.makeImageWithView(self, size: CGSizeMake(self.frame.size.width, self.frame.size.height))
//            let data = UIImagePNGRepresentation(image)
//            let base64 = data?.base64EncodedStringWithOptions(.Encoding64CharacterLineLength)
//            //颜色
//            let colorStr = getColorString(WhiteboardMyView.lineColor)
//            
//            var dict = [NSString:AnyObject]()
//            dict["whId"] = self.hashId
//            dict["whIndex"] = self.currentPage
//            dict["value"] = "data:image/png;base64,\(base64!)"
//            dict["position"] = (lineArray.indexOfObject(array) + 1) + position //现在是第几笔
//            
////            dict["size"] = ["width":self.frame.size.width,"height":self.frame.size.height]
//            dict["size"] = ["width":676,"height":676]
//            dict["max"] = lineArray.count + max//一共有多少笔
//            dict["pointSize"] = WhiteboardMyView.lineWidth
//            dict["pointColor"] = colorStr
//            dict["clear"] = false
//            //print("发送坐标 : \(dict)")
//            self.bm.whiteboardDrawHistory(dict)
//        }
//        
//        
        
    }
    //取得UIColor的三个颜色数值
    func getColorString(color:UIColor) ->String{
        
//        var red:CGFloat = 0.0
//        var green:CGFloat = 0.0
//        var blue:CGFloat = 0.0
//        var alpha:CGFloat = 0.0
//        
//        let colorRef = color.CGColor
//        let countComponents = CGColorGetNumberOfComponents(colorRef)
//        if countComponents == 4 {
//            let components = CGColorGetComponents(colorRef)
//            red = components[0] * 255.0
//            green = components[1] * 255.0
//            blue = components[2] * 255.0
//            alpha = components[3]
//        }
//        let colorString = "rgba\(Int(red), Int(green), Int(blue), Int(alpha))"
//        return colorString
        return ""
    }
    
    // 截图:下面方法，第一个参数表示区域大小。第二个参数表示是否是非透明的。如果需要显示半透明效果，需要传NO，否则传YES。第三个参数就是屏幕密度了，关键就是第三个参数 [UIScreen mainScreen].scale。
    func makeImageWithView(view:UIView,size:CGSize) ->(UIImage){
        UIGraphicsBeginImageContextWithOptions(size, false, 0.0)
        view.layer.render(in: UIGraphicsGetCurrentContext()!)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return image!
    }
    
    
    //改变宽度的size
    func valueChanged(stepper:UIStepper){
//        widthLabel.text = String(stepp.value)
//        WhiteboardMyView.lineWidth = CGFloat(stepper.value)
//        
//        var dict = [NSString:AnyObject]()
//        dict["actionName"] = "changeSize"
//        dict["value"] = WhiteboardMyView.lineWidth
//        dict["drawer"] = self.bm.socketID
//        self.bm.whiteboardDrawAction(dict)
    }
    
    
    //点击宽度的label
    func widthLabelTap(){
//        if (widthHidden == true) {
//            stepp.hidden = true;
//            widthHidden = false;
//        }else{
//            stepp.hidden = false;
//            widthHidden = true;
//        }
        
    }
    //将删除线条数组里的信息，移动到当前数组，在主界面重绘redo
    func reform(){
//        if deleArray.count != 0 {
//            lineArray.addObject(deleArray.lastObject!)
//            deleArray.removeLastObject()
//        }
//        if deleColorArray.count != 0 {
//            colorArray.addObject(deleColorArray.lastObject!)
//            deleColorArray.removeLastObject()
//            
//        }
//        if deleWidthArray.count != 0 {
//            WidthArray.addObject(deleWidthArray.lastObject!)
//            deleWidthArray.removeLastObject()
//        }
//        self.setNeedsDisplay()
//        if self.userInteractionEnabled == true {
//            var dict = [NSString:AnyObject]()
//            dict["whId"] = hashId
//            dict["whIndex"] = currentPage
//            dict["goForth"] = true
//            dict["doDraw"] = true
//            self.bm.whiteboardGoHistory(dict)
//        }
        
        
    }
    //撤销，将当前最后一条信息移动到删除数组里，方便恢复时调用undo
    func revocation(){
//        if lineArray.count != 0 {
//            deleArray.addObject(lineArray.lastObject!)
//            lineArray.removeLastObject()
//        }
//        if colorArray.count != 0 {
//            deleColorArray.addObject(colorArray.lastObject!)
//            colorArray.removeLastObject()
//            
//        }
//        if WidthArray.count != 0 {
//            deleWidthArray.addObject(WidthArray.lastObject!)
//            WidthArray.removeLastObject()
//        }
//        self.setNeedsDisplay()
//        if self.userInteractionEnabled == true {
//            var dict = [NSString:AnyObject]()
//            dict["whId"] = hashId
//            dict["whIndex"] = currentPage
//            dict["goForth"] = false
//            dict["doDraw"] = true
//            self.bm.whiteboardGoHistory(dict)
//        }
        
        
    }
    //移除所有信息并重绘
    func clear(){
//        deleArray.removeAllObjects()
//        deleColorArray.removeAllObjects()
//        colorArray.removeAllObjects()
//        lineArray.removeAllObjects()
//        pointArray.removeAllObjects()
//        deleWidthArray.removeAllObjects()
//        WidthArray.removeAllObjects()
//        self.setNeedsDisplay()
//        
//        //画笔数归零
//        self.position = 0
//        self.max = 0
    }
    
    
    func selectColor(color:UIColor){
//        WhiteboardMyView.lineColor = color;
//        let colorStr = getColorString(color)
//        var dict = [NSString:AnyObject]()
//        dict["actionName"] = "setColor"
//        dict["value"] = colorStr
//        dict["drawer"] = self.bm.socketID
//        self.bm.whiteboardDrawAction(dict)
        
    }
    
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.whiteBoardView.backgroundImageView.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.whiteBoardView.backgroundImageView.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.whiteBoardView.backgroundImageView.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.whiteBoardView.backgroundImageView.mas_bottom)?.setOffset(0)
        }
        
        self.backImageVeiw.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
        }
   
    }
    
 
}
