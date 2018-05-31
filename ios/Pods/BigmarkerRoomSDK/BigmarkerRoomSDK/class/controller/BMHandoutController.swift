//
//  BMHandoutController.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 14/5/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit

class BMHandoutController: UIViewController {
    
    var handout: Handout!
    var webView: UIWebView!
    
    var loading: MBProgressHUD!
    
    
    lazy  var navView : UIView = { [weak self] in
        let navView = UIView(frame: CGRect(x: 0, y: 0, width: self!.view.frame.width, height: 64))
        navView.backgroundColor = BMROOMNAV_COLOR
        
        var gobackButton = UIButton(frame: CGRect(x: BMScreenW - 40, y: 30, width: 30, height: 30))
        gobackButton.isUserInteractionEnabled = true
        gobackButton.setImage(UIImage(named: "BMSDK.bundle/return"), for: UIControlState.normal)
        gobackButton.addTarget(self!, action: #selector(quiteHD), for: UIControlEvents.touchUpInside)
        gobackButton.contentMode = UIViewContentMode.scaleAspectFit
        
        var title = UILabel(frame: CGRect(x: 70, y: 20, width: 200, height: 30))
        title.text = self?.handout!.title
        title.font = UIFont(name: BMSFUIDisplay_Regular, size: 17.0)!
        title.textAlignment = .center
        title.textColor = UIColor.white
        title.clipsToBounds = true
        
        navView.addSubview(gobackButton)
        navView.addSubview(title)
        return navView
        }()

    
    init(frame: CGRect, handout: Handout) {
        super.init(nibName: nil, bundle: nil)
        self.handout = handout
        self.view.frame = frame
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    
    func setupUI(){
        self.view.addSubview(navView)
        self.webView = UIWebView.init(frame: CGRect.init(x: 0, y: 64, width: BMScreenW, height: BMScreenH))
        self.webView.delegate = self
          var url:NSURL!
        if handout.isImage {
            url = NSURL.init(string: self.handout.url)!
        } else {
            url = NSURL.init(string: self.handout.previewUrl)!
        }
       
        let urlRequest = URLRequest.init(url: url as URL)
        loading = MBProgressHUD.showAdded(to: self.webView, animated: true)
        loading.labelText = "Loading..."
        webView.loadRequest(urlRequest)
        self.view.addSubview(webView)
    }
    
    
    func quiteHD(){
      self.dismiss(animated: false, completion: nil)
    }


}

extension BMHandoutController: UIWebViewDelegate{
    
    func webViewDidFinishLoad(_ webView: UIWebView) {
        
        if (!webView.isLoading) {
            self.loading.hide(animated: true)
        }
        
    }
    
    

}

