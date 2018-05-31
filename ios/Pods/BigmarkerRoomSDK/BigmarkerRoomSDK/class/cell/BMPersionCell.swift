//
//  BMPersionCell.swift
//  bigmarker
//
//  Created by Han Qing on 7/12/2017.
//  Copyright © 2017 hanqing. All rights reserved.

import UIKit

protocol PrivateChatDelegate : class {
    func enterPrivateChat(userInfoId:String,selectIndexPath:NSIndexPath)
}


class BMPersionCell: UITableViewCell {
    
    @IBOutlet weak var chatButton: UIButton!
    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var badgeLabel: UILabel!

    var privateChatDelegate : PrivateChatDelegate!
    var userInfoId : String!
    var bmSoketId : String!
    var selectIndexPath : NSIndexPath!
    
    var userInfo : NSDictionary? {
        didSet {
            let name = userInfo!["name"] as? String ?? ""
            nameLabel.text = name
            nameLabel.font = UIFont(name: BMSFUIDisplay_Regular, size: 15)
            self.userInfoId = userInfo!["sid"] as? String ?? ""
            let imgUrl = userInfo!["photo"] as? String ?? ""
            if (imgUrl.range(of: "assets") != nil) {
                avatarImageView.sd_setImage(with: URL(string: BMSERVICE_API_DOMAIN + imgUrl), placeholderImage: UIImage(named: "BMSDK.bundle/default_profile_picture"))
            } else {
                avatarImageView.sd_setImage(with:  URL(string: imgUrl), placeholderImage: UIImage(named: "BMSDK.bundle/default_profile_picture"))
            }
            
            avatarImageView.layer.cornerRadius = 3
            avatarImageView.clipsToBounds = true
            
            self.chatButton.addTarget(self, action: #selector(chatBtnClick), for: .touchUpInside)
            if self.userInfoId == self.bmSoketId {
                self.chatButton.isHidden = true
            }else{
                self.chatButton.isHidden = false
            }
            
            self.badgeLabel.text = "0"
            self.badgeLabel.isHidden = true
            self.badgeLabel.textAlignment = .center
            self.badgeLabel.textColor = UIColor.white
            self.badgeLabel.clipsToBounds = true
            self.badgeLabel.layer.cornerRadius = self.badgeLabel.frame.width/2
            
        }
    }
    func chatBtnClick(){
        self.privateChatDelegate.enterPrivateChat(userInfoId: self.userInfoId,selectIndexPath: self.selectIndexPath)
    }
    
}

