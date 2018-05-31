//
//  ClubInfoView.swift
//  bigmarker
//
//  Created by hanqing on 8/24/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

class ClubInfoView: UIView {

    var backgroundImageView: UIImageView!
    var clubImageView: UIImageView!
    var clubName: UILabel!
    var channel: BMChannel!
    
     init(frame: CGRect, channel: BMChannel) {
        super.init(frame: frame)
        self.frame = frame
        self.channel = channel
        
        self.backgroundImageView = UIImageView(frame: CGRect(x: self.bounds.origin.x, y: self.bounds.origin.y, width: self.frame.width, height: 130))
        
        let bgUrl = NSURL(string: self.channel.backgroundImage)
        
        self.backgroundImageView.sd_setImage(with: bgUrl as URL!)
        self.backgroundImageView.contentMode = UIViewContentMode.scaleToFill
    
        
        self.clubImageView = UIImageView(frame: CGRect(x: 10, y: 100, width: 60, height: 60))
        
        let url = URL(string: self.channel.logo)
    
        //self.clubImageView.sd_setImage(with: <#T##URL!#>, placeholderImage: <#T##UIImage!#>)
        self.clubImageView.sd_setImage(with: url, placeholderImage: UIImage(named: "BMSDK.bundle/default_community"))
        self.clubImageView.contentMode = UIViewContentMode.scaleAspectFit
        
        self.clubName = UILabel(frame: CGRect(x: 80, y: 130, width: 250, height: 30))
        self.clubName.text = self.channel.name
        self.clubName.font = UIFont(name: BMGTRegular, size: 13.0)

        self.addSubview(backgroundImageView)
        self.addSubview(clubImageView)
        self.addSubview(clubName)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
