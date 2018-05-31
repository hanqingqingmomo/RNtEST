//
//  OfferView.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 19/5/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit

class OfferView: UIView {
    
    var offer: Offer? {
        didSet {
            if offer!.isCustom {
                setupCutomOffer()
            } else {
                setupOfferUI()
            }
        }
        
    }
    var teaser: UILabel!
    var headLine: UILabel!
    var normalPrice: UILabel!
    var discountedPrice: UILabel!
    var button: UIButton!
    var image: UIImageView!
    var adView: UIView!
    var exitIcon: UIImageView!
    var blurEffectView: UIVisualEffectView!
    
    var webView: UIWebView!
    var loading: MBProgressHUD!
    
    
    
    func setupBaseUI(){
        self.clipsToBounds = true
        self.layer.cornerRadius = 2
        
        exitIcon = UIImageView()
        exitIcon.image = UIImage(named: "BMSDK.bundle/return")
        exitIcon.translatesAutoresizingMaskIntoConstraints = false
        exitIcon.contentMode = .scaleAspectFit
        exitIcon.isUserInteractionEnabled = true
        let tap = UITapGestureRecognizer(target: self, action: #selector(exitView))
        exitIcon.addGestureRecognizer(tap)
        
        adView = UIView()
        adView.backgroundColor = UIColor.hexStringToUIColor(hex: offer!.bgColor)
        adView.clipsToBounds = true
        adView.layer.cornerRadius = 2
        
        let blurEffect = UIBlurEffect(style: UIBlurEffectStyle.dark)
        self.blurEffectView = UIVisualEffectView(effect: blurEffect)
        blurEffectView.alpha = 0.8
        blurEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        self.addSubview(blurEffectView)
        self.addSubview(exitIcon)
        self.addSubview(adView)
    }
    
    func setupOfferUI(){
        setupBaseUI()
        
        image = UIImageView()
        let url = URL(string: offer!.imageUrl)
        image.sd_setImage(with: url, placeholderImage: UIImage(named: "BMSDK.bundle/picdefault_profile_picture"))
        image.translatesAutoresizingMaskIntoConstraints = false
        image.contentMode = .scaleToFill
        
        teaser = UILabel()
        teaser.text = offer?.teaser
        teaser.font = UIFont(name: BMGTBold, size: 13)
        teaser.textColor = UIColor(red: 16/255.0, green: 137/255.0, blue: 245/255.0, alpha: 1.0)
        teaser.adjustsFontSizeToFitWidth = true
        teaser.minimumScaleFactor = 0.6
        
        headLine = UILabel()
        headLine.text = offer?.headline
        headLine.font = UIFont(name: BMGTBold, size: 16)
        headLine.textColor = UIColor(red: 43/255.0, green: 55/255.0, blue: 77/255.0, alpha: 1.0)
        headLine.numberOfLines = 3
        headLine.lineBreakMode = .byCharWrapping
        
        normalPrice = UILabel()
        let attrText = NSAttributedString.init(string: (offer?.normalPrice)!, attributes: [NSStrikethroughStyleAttributeName: 1])
        normalPrice.attributedText = attrText
        normalPrice.font = UIFont(name: BMGTRegular, size: 13)
        normalPrice.adjustsFontSizeToFitWidth = true
        normalPrice.minimumScaleFactor = 0.6
        normalPrice.textColor = UIColor(red: 113/255.0, green: 126/255.0, blue: 148/255.0, alpha: 1.0)
        
        discountedPrice = UILabel()
        discountedPrice.text = offer?.discountedPrice
        discountedPrice.font = UIFont(name: BMGTBold, size: 18)
        discountedPrice.adjustsFontSizeToFitWidth = true
        discountedPrice.minimumScaleFactor = 0.6
        discountedPrice.textColor = UIColor(red: 43/255.0, green: 55/255.0, blue: 77/255.0, alpha: 1.0)
        
        button = UIButton()
        button.isUserInteractionEnabled = true
        button.setTitle(offer?.buttonText, for: UIControlState.normal)
        button.clipsToBounds = true
        button.layer.cornerRadius = 3
        button.titleLabel?.textColor = UIColor.hexStringToUIColor(hex: offer!.buttonColor)
        button.titleLabel?.adjustsFontSizeToFitWidth = true
        button.titleLabel?.minimumScaleFactor = 0.6
        button.titleLabel?.textAlignment = .center
        button.titleLabel?.font = UIFont(name: BMGTBold, size: 16)
        button.backgroundColor = UIColor(red: 0/255.0, green: 196/255.0, blue: 181/255.0, alpha: 1.0)
        button.addTarget(self, action: #selector(goto), for: UIControlEvents.touchUpInside)
        
        if offer!.isVertical {
            teaser.textAlignment = .center
            headLine.textAlignment = .center
            normalPrice.textAlignment = .center
            discountedPrice.textAlignment = .center
        } else {
            teaser.textAlignment = .left
            headLine.textAlignment = .left
            normalPrice.textAlignment = .left
            discountedPrice.textAlignment = .left
        }
        
        adView.addSubview(image)
        adView.addSubview(teaser)
        adView.addSubview(headLine)
        adView.addSubview(normalPrice)
        adView.addSubview(discountedPrice)
        adView.addSubview(button)
        
        if offer!.isVertical{
            setLayoutV()
        } else {
            setLayoutH()
        }
    }
    
    func setupCutomOffer(){
        setupBaseUI()
        self.webView = UIWebView()
        self.webView.delegate = self
        
        let url = NSURL(string: "\(BMSERVICE_API_DOMAIN)"+"/offers/show_for_ios_app/\(self.offer!.offerId)")!
        let urlRequest = URLRequest(url: url as URL)
        loading = MBProgressHUD.showAdded(to: self.webView, animated: true)
        loading.label.text = "Loading..."
        webView.loadRequest(urlRequest)
        self.adView.addSubview(webView)
        setLayoutC()
    }
    
   @objc func exitView(){
        self.removeFromSuperview()
    }
    
   @objc func goto(){
        UIApplication.shared.openURL(URL(string: offer!.buttonLink)!)
    }
    
    func setLayoutBase(){
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview!.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview!.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview!.mas_bottom)?.setOffset(0)
        }
        
        self.exitIcon.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview!.mas_top)?.setOffset(20)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(-20)
            make?.width.mas_equalTo()(20)
            make?.height.mas_equalTo()(20)
        }
        
        self.blurEffectView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview!.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview!.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview!.mas_bottom)?.setOffset(0)
        }
    }
    
    func setLayoutC(){
        setLayoutBase()
        self.adView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(100)
            make?.left.mas_equalTo()(self.superview!.mas_left)?.setOffset(20)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(-20)
            make?.height.mas_equalTo()(400)
        }
        
        self.webView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.adView!.mas_top)?.setOffset(0)
            make?.left.mas_equalTo()(self.adView!.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.adView!.mas_right)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.adView!.mas_bottom)?.setOffset(0)
        }
    }
    
    func setLayoutV(){
        setLayoutBase()
        
        self.adView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(100)
            make?.left.mas_equalTo()(self.superview!.mas_left)?.setOffset(20)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(-20)
            make?.height.mas_equalTo()(400)
        }
        
        self.image.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.adView.mas_top)?.setOffset(0)
            make?.right.mas_equalTo()(self.adView.mas_right)?.setOffset(0)
            make?.left.mas_equalTo()(self.adView.mas_left)?.setOffset(0)
            make?.height.mas_equalTo()(150)
        }
        
        self.teaser.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.image.mas_bottom)?.setOffset(20)
            make?.left.mas_equalTo()(self.adView.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.adView.mas_right)?.setOffset(0)
            make?.height.mas_equalTo()(30)
        }
        
        self.headLine.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.teaser.mas_bottom)?.setOffset(10)
            make?.left.mas_equalTo()(self.adView.mas_left)?.setOffset(30)
            make?.right.mas_equalTo()(self.adView.mas_right)?.setOffset(-30)
            
        }
        
        self.normalPrice.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.headLine.mas_bottom)?.setOffset(10)
            make?.left.mas_equalTo()(self.adView.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.adView.mas_right)?.setOffset(0)
        }
        
        self.discountedPrice.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.normalPrice.mas_bottom)?.setOffset(10)
            make?.left.mas_equalTo()(self.adView.mas_left)?.setOffset(0)
            make?.right.mas_equalTo()(self.adView.mas_right)?.setOffset(0)
        }
        
        self.button.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.discountedPrice.mas_bottom)?.setOffset(20)
            make?.centerX.mas_equalTo()(self)
            make?.width.mas_equalTo()(100)
            make?.height.mas_equalTo()(40)
        }
    }
    
    
    func setLayoutH(){
        setLayoutBase()
        
        self.adView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(100)
            make?.left.mas_equalTo()(self.superview!.mas_left)?.setOffset(20)
            make?.right.mas_equalTo()(self.superview!.mas_right)?.setOffset(-20)
            make?.height.mas_equalTo()(250)
        }
        
        self.image.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.adView.mas_top)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.adView.mas_bottom)?.setOffset(0)
            make?.left.mas_equalTo()(self.adView.mas_left)?.setOffset(0)
            make?.width.mas_equalTo()(100)
        }
        
        self.teaser.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.adView)?.setOffset(10)
            make?.left.mas_equalTo()(self.image.mas_right)?.setOffset(15)
            make?.right.mas_equalTo()(self.adView!.mas_right)?.setOffset(0)
            make?.height.mas_equalTo()(30)
        }
        
        self.headLine.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.teaser.mas_bottom)?.setOffset(15)
            make?.left.mas_equalTo()(self.image.mas_right)?.setOffset(20)
            make?.right.mas_equalTo()(self.adView!.mas_right)?.setOffset(0)
        }
        
        self.normalPrice.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.headLine.mas_bottom)?.setOffset(10)
            make?.left.mas_equalTo()(self.image.mas_right)?.setOffset(15)
            make?.right.mas_equalTo()(self.adView!.mas_right)?.setOffset(0)
        }
        
        self.discountedPrice.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.normalPrice.mas_bottom)?.setOffset(10)
            make?.left.mas_equalTo()(self.image.mas_right)?.setOffset(15)
            make?.right.mas_equalTo()(self.adView!.mas_right)?.setOffset(0)
        }
        
        self.button.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.discountedPrice.mas_bottom)?.setOffset(20)
            make?.left.mas_equalTo()(self.image.mas_right)?.setOffset(15)
            make?.width.mas_equalTo()(100)
            make?.height.mas_equalTo()(40)
        }
    }
    
}


extension OfferView: UIWebViewDelegate{
    
    func webViewDidFinishLoad(_ webView: UIWebView) {
        if (!webView.isLoading) {
            self.loading.hide(animated: true)
            let contentSize = webView.scrollView.contentSize
            let viewSzie = self.bounds.size
            
            let rw: CGFloat = CGFloat(viewSzie.width / contentSize.width)
            
            webView.scrollView.minimumZoomScale = rw
            webView.scrollView.maximumZoomScale = rw
            webView.scrollView.zoomScale = rw
            
            self.webView.scrollView.contentSize  = CGSize.init(width: webView.frame.size.width, height: webView.scrollView.contentSize.height)
        }
    }
    
    
    
}
