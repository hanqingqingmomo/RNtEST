//
//  HandoutCell.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 11/5/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit

class HandoutCell: UITableViewCell {
    
    var icon: UIImageView!
    var title: UILabel!
    var preview:  UILabel!
    var download: UILabel!
    
    
    
    var handout : Handout? {
        didSet {
            
            icon = UIImageView(frame: CGRect(x: 20, y: 20, width: 40, height: 40))
            
            let url = URL(string: handout!.icon)
            icon.sd_setImage(with: url, placeholderImage: UIImage(named: "BMSDK.bundle/picdefault_profile_picture"))
            icon.translatesAutoresizingMaskIntoConstraints = false
            icon.contentMode = UIViewContentMode.scaleAspectFill
            icon.clipsToBounds = true
            icon.layer.cornerRadius = 5
            
            title = UILabel(frame: CGRect(x: 70, y: 20, width: BMScreenW - 100, height: 20))
            title.text = handout!.title
            title.font = UIFont(name: BMSFUIDisplay_Regular, size: 15.0)!
            title.textAlignment = .left
            title.textColor = UIColor(red: 43/255, green: 55/255, blue: 77/255, alpha: 1)
            title.clipsToBounds = true
            
            preview = UILabel(frame: CGRect(x: 70, y: 40, width: 80, height: 40))
            preview.text = "Preview"
            preview.font = UIFont(name: BMSFUIDisplay_Regular, size: 15.0)!
            preview.textAlignment = .left
            preview.textColor = UIColor(red: 16/255, green: 137/255, blue: 245/255, alpha: 1)
            preview.clipsToBounds = true
        
            download = UILabel(frame: CGRect(x: 150, y: 40, width: 80, height: 40))
            download.text = "Download"
            download.font = UIFont(name: BMSFUIDisplay_Regular, size: 15.0)!
            download.textAlignment = .left
            download.textColor = UIColor(red: 16/255, green: 137/255, blue: 245/255, alpha: 1)
            download.clipsToBounds = true
            
            
            self.addSubview(icon)
            self.addSubview(title)
            self.addSubview(preview)
            self.addSubview(download)
            
            //setLayout()
        }
    }
    
    
    func setLayout(){
        
        self.icon.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(20)
            make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(20)
            make?.width.mas_equalTo()(40)
            make?.height.mas_equalTo()(40)
        }
        
        self.title.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(20)
            make?.left.mas_equalTo()(self.icon.mas_right)?.setOffset(10)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(10)
            make?.height.mas_equalTo()(20)
        }
        
        self.preview.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.title.mas_bottom)?.setOffset(5)
            make?.left.mas_equalTo()(self.icon.mas_right)?.setOffset(10)
            make?.width.mas_equalTo()(80)
            make?.height.mas_equalTo()(40)
        }
        
        self.download.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.title.mas_bottom)?.setOffset(5)
            make?.left.mas_equalTo()(self.preview.mas_right)?.setOffset(10)
            make?.width.mas_equalTo()(80)
            make?.height.mas_equalTo()(40)
        }
    }
}
