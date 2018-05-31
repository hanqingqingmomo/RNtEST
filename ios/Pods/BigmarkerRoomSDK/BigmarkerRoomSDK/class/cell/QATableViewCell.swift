//
//  QATableViewCell.swift
//  bigmarker
//
//  Created by Han Qing on 14/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

@objc protocol QATableViewCellDelegate{
    @objc optional func deleteQA(id: String)
    @objc optional func voteQA(qa: QA)
    @objc optional func answeredQA(id: String)
}


class QATableViewCell: UITableViewCell {

    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var questionLabel: UILabel!
    @IBOutlet weak var numberLabel: UILabel!
    @IBOutlet weak var voteImageView: UIImageView!

    var questionViewModel: BMQAViewModel!
    var delegate: QATableViewCellDelegate!
    var question: QA? {
        didSet{
           setupUI()
        }
    }
    
    func setupUI(){
        
        if question!.answered {
            self.avatarImageView.image = UIImage(named: "BMSDK.bundle/answered_check")
        } else {
            var url: URL!
            if BMCurrentUser.modId() != "" {
                if (BMCurrentUser.avatar().range(of: "assets") != nil) {
                    url = URL(string: BMSERVICE_API_DOMAIN + BMCurrentUser.avatar())
                } else {
                    url = URL(string: BMCurrentUser.avatar())
                }
            }else {
                if (question!.userAvatar.range(of: "assets") != nil) {
                    url = URL(string: BMSERVICE_API_DOMAIN + question!.userAvatar)
                } else {
                    url = URL(string: question!.userAvatar)
                }
            }
          self.avatarImageView.sd_setImage(with: url, placeholderImage: UIImage(named: "BMSDK.bundle/default_profile_picture"))
            
        }
        self.avatarImageView.contentMode = UIViewContentMode.scaleAspectFill
        self.avatarImageView.layer.cornerRadius = 2
        self.avatarImageView.clipsToBounds = true
        self.usernameLabel.text = question!.userName
        self.timeLabel.text     = question!.time
        self.questionLabel.text = question!.content
        self.numberLabel.text   =  "\(question!.voteCount)"
        
        self.voteImageView.isUserInteractionEnabled = true
        let tap = UITapGestureRecognizer(target: self, action: #selector(vote))
        self.voteImageView.addGestureRecognizer(tap)
        
        if question!.voted {
            self.voteImageView.image = UIImage(named: "BMSDK.bundle/poll_voted")
            self.numberLabel.textColor = UIColor.init(red: 0/255, green: 191/255, blue: 130/255, alpha: 1)
        } else {
            self.voteImageView.image = UIImage(named: "BMSDK.bundle/poll_unvoted")
            self.numberLabel.textColor = UIColor.gray
        }
        
    }
    

    
    @IBAction func deleteAnswer(sender: AnyObject) {
       self.questionViewModel.delete(id: question!.obfuscatedId) { (result) in
            guard let status = result["status"] as? Bool else { return }
            if status {
                self.questionViewModel.deleteQA(obfuscatedId: self.question!.obfuscatedId)
                self.delegate.deleteQA!(id: self.question!.obfuscatedId)
            }
        }
    }
    
    @IBAction func markerAnswer(sender: AnyObject) {
        self.questionViewModel.markAnswered(id: question!.obfuscatedId) { (result) in
            
            guard let status = result["status"] as? Bool else { return }
            guard let qa     = result["qa"]     as? QA else { return }
            if status {
                self.questionViewModel.updateQAAnswer(qa: qa)
                self.delegate.answeredQA!(id: self.question!.obfuscatedId)
            }
        }
       
    }
    
  @objc  func vote(tap: UITapGestureRecognizer){
         self.questionViewModel.vote(id: question!.obfuscatedId) { (result) in
            guard let status = result["status"] as? Bool else { return }
            if status {
                if let qa = self.questionViewModel.getQAByObfuscatedId(obfuscatedId: self.question!.obfuscatedId){
                    self.delegate.voteQA!(qa: qa)
                }
            }
        }
        
    }
}
