//
//  BMRoomChatMsgCell.swift
//  bigmarker
//
//  Created by Han Qing on 10/11/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

class BMRoomChatMsgCell: UITableViewCell {

    @IBOutlet weak var avatarImageVIew: UIImageView!
    @IBOutlet weak var userName: UILabel!
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var contentLabel: UILabel!
    
    var usersInfo: NSMutableDictionary!
 
    var message : Message? {
        didSet {
            
            self.userName.text = message?.userName
            self.timeLabel.text = message?.formatTime
            var url: URL!
            if (message!.avatarUrl!.range(of: "assets") != nil) {
                url = URL(string: BMSERVICE_API_DOMAIN + message!.avatarUrl!)
            } else {
                url = URL(string: message!.avatarUrl!)
            }
            self.avatarImageVIew.sd_setImage(with: url, placeholderImage: UIImage(named: "BMSDK.bundle/default_profile_picture"))
            self.avatarImageVIew.layer.cornerRadius = 3

            
            var newContent = message!.content!.trimmingCharacters(in: NSCharacterSet.whitespacesAndNewlines)
            
            if Regex("(@[a-z|0-9]*)").test(input: newContent) {
                let matches = ToolHelper.matchesForRegexInText(regex: "(@[a-z|0-9]*)", text: newContent)
                for match in matches {
                    let id = String(match.characters.dropFirst())
                    for (_, v_) in self.usersInfo {
                        let v = v_ as! NSDictionary
                        if v["id"] as? String == id {

                            if let name = v["name"] as? String {
                                newContent.replacingOccurrences(of: match, with: "@\(name)")
                            }
                        }
                    }
                }
            }
            
            newContent = newContent.replacingOccurrences(of: "&nbsp;", with: "")
            let values = ToolHelper.convertEmoji(msg: &newContent)
            self.contentLabel.text = ToolHelper.clearHtml(str: newContent)
            
            for value in values {
                let index = value.0
                let image = value.1
                
                let string  = NSMutableAttributedString(attributedString: self.contentLabel.attributedText!)
                let textAttachment       = NSTextAttachment()
                textAttachment.image     = UIImage(named: image)
                
                let textAttachmentString = NSAttributedString(attachment: textAttachment)
                string.insert(textAttachmentString, at: index)
                self.contentLabel.attributedText = string
            }

        }
    }
}
