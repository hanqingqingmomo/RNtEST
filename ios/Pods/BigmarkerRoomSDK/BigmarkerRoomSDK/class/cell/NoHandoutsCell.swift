//
//  NoHandoutsCellT.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 30/5/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit

class NoHandoutsCell: UITableViewCell {
    
    
    var imageV: UIImageView!
    var topTitleLabel: UILabel!
    var bottomTitleLabel: UILabel!
    //no-handouts-img

     func setupUI() {
        imageV = UIImageView()
        imageV.image  =  UIImage(named: "no-handouts-img")
        imageV.translatesAutoresizingMaskIntoConstraints = false
        imageV.contentMode = UIViewContentMode.scaleAspectFill
        self.addSubview(self.imageV)
        
        
        topTitleLabel = UILabel()
        topTitleLabel.text = "No handouts yet"
        topTitleLabel.font = UIFont(name: BMSFUIDisplay_Regular, size: 15.0)!
        topTitleLabel.textAlignment = .center
        topTitleLabel.textColor = UIColor.lightGray
        self.addSubview(topTitleLabel)
        
        bottomTitleLabel = UILabel()
        bottomTitleLabel.text = "Add a handout to share"
        bottomTitleLabel.font = UIFont(name: BMSFUIDisplay_Regular, size: 15.0)!
        bottomTitleLabel.textAlignment = .center
        bottomTitleLabel.textColor = UIColor.lightGray
        self.addSubview(bottomTitleLabel)
        
        
        setLayout()
    }

    func setLayout(){
        
        self.imageV.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(85)
            make?.centerX.equalTo()(self)
            make?.width.mas_equalTo()(40)
            make?.height.mas_equalTo()(80)
        }
        
        self.topTitleLabel.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.imageV?.mas_bottom)?.setOffset(20)
            make?.centerX.equalTo()(self)
            make?.width.mas_equalTo()(200)
            make?.height.mas_equalTo()(20)
        }
        
        self.bottomTitleLabel.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.topTitleLabel?.mas_bottom)?.setOffset(0)
            make?.centerX.equalTo()(self)
            make?.width.mas_equalTo()(200)
            make?.height.mas_equalTo()(20)
        }
        
    }

}
