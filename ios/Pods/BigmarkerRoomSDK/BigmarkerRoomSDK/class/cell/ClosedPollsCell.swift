//
//  QAClosedPollsCell.swift
//  bigmarker
//
//  Created by 刘欣 on 12/21/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

protocol AdminDelegate{
    func closePoll(model:Poll)
    func deletePoll(model:Poll)
}

class ClosedPollsCell: UITableViewCell {

    @IBOutlet weak var questionLabel: UILabel!
    
    @IBOutlet weak var middleView: UIView!
    
    @IBOutlet weak var middleViewContraint: NSLayoutConstraint!
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var responseCountLabel: UILabel!
    var progressView : UIProgressView!
    var loading: MBProgressHUD!
    var closePollBtn : UIButton!
    var adminView : UIView!
    var deletePollBtn : UIButton!
    var adminDelegate : AdminDelegate!

    var separateLine : UILabel!
    @IBOutlet weak var bottomView: UIView!
    var pollModel : Poll!
    override func awakeFromNib() {
        super.awakeFromNib()
        
        adminView = UIView.init(frame: CGRect.init(x: 0, y: 0, width: 200, height: 30))
        bottomView.addSubview(adminView)
        
        closePollBtn = UIButton.init(frame: CGRect.init(x: 0, y: 5, width: 80, height: 20))
        closePollBtn.setTitle("CLOSE POLL", for: .normal)
        closePollBtn.setTitleColor(UIColor.blue, for: .normal)
        closePollBtn.titleLabel?.font = UIFont(name: BMGTRegular, size: 12.0)
        closePollBtn.addTarget(self, action: #selector(ClosedPollsCell.closePollBtnClick), for: .touchUpInside)
        adminView.addSubview(closePollBtn)
        
        separateLine = UILabel.init(frame: CGRect.init(x: closePollBtn.frame.size.width, y: 5, width: 1, height: 20))
        separateLine.backgroundColor = UIColor.gray
        adminView.addSubview(separateLine)
        
        deletePollBtn = UIButton.init(frame: CGRect.init(x: separateLine.frame.origin.x + 1, y: closePollBtn.frame.origin.y, width: 50, height: 20))
        deletePollBtn.setTitle("DELETE", for: .normal)
        deletePollBtn.setTitleColor(UIColor.gray, for: .normal)
        deletePollBtn.titleLabel?.font = UIFont(name: BMGTRegular, size: 12.0)
        deletePollBtn.addTarget(self, action: #selector(ClosedPollsCell.deletePollBtnClick), for: .touchUpInside)
        adminView.addSubview(deletePollBtn)
        
    }
   @objc func closePollBtnClick(){
        self.adminDelegate.closePoll(model: pollModel)
    }
   @objc func deletePollBtnClick(){
        self.adminDelegate.deletePoll(model: pollModel)
    }
    
    func setupClosedPollModel(closedPollsModel:Poll,admin:Bool,type:QAType){
        pollModel = closedPollsModel
        let subView: Array =  middleView.subviews
        
        for subView: UIView in subView
        {
            subView.removeFromSuperview()
            
        }

        let letterArr = ["a","b","c","d","e","f"]
        let progressColorArr = [UIColor.init(red: 85/255.0, green: 168/255.0, blue: 245/255.0, alpha: 1.0),UIColor.init(red: 188/255.0, green: 60/255.0, blue: 119/255.0, alpha: 1.0),UIColor.init(red: 38/255.0, green: 193/255.0, blue: 163/255.0, alpha: 1.0),UIColor.init(red: 237/255.0, green: 151/255.0, blue: 97/255.0, alpha: 1.0),UIColor.init(red: 56/255.0, green: 54/255.0, blue: 185/255.0, alpha: 1.0),UIColor.init(red: 235/255.0, green: 97/255.0, blue: 97/255.0, alpha: 1.0)]
        
        //问题的高度
        
        questionLabel.text = closedPollsModel.question
        //判断左侧日期该如何显示
        
        if closedPollsModel.voteTime == "" {
            timeLabel.isHidden = true
            if admin == true {
                adminView.isHidden = false
            }else{
                adminView.isHidden = true
            }
        }else{
            adminView.isHidden = true
            timeLabel.isHidden = false
            timeLabel.text = "You voted at \(closedPollsModel.voteTime)"
        }
        
        if closedPollsModel.responses?.count == 0 {
            responseCountLabel.text = "0 Response"
        }else{
            let str : String = String(closedPollsModel.responses!.count)
            responseCountLabel.text = "\(str) Responses"

        }
        if admin == true && type != QAType.Active{
            closePollBtn.isHidden = true
            separateLine.isHidden = true
//            deletePollBtn.frame = CGRectMake(0, 5, 80, 20)
        }else{
            closePollBtn.isHidden = false
            separateLine.isHidden = false

        }
        var totalHeight:CGFloat = 0.0
        let arr: [PollChoice] = closedPollsModel.choices!
        let space = 15
        
        if arr.count == 0 {
            return
        }else{
        
        for i in (0...arr.count - 1) {
            let choiceModel = arr[i]
            //选项
            let selectLabel = UILabel.init(frame: CGRect.init(x: 0, y:totalHeight + 5 , width: 15 , height: 15))
            selectLabel.text = letterArr[i]
            selectLabel.font = UIFont(name: BMGTRegular, size: 12.0)
            selectLabel.textColor = UIColor.init(red: 76/255.0, green: 76/255.0, blue: 96/255.0, alpha: 1.0)
            middleView.addSubview(selectLabel)
            
            //answerLabel的高度
            let answerLabelHeight = getLabelHeight(answerLabelText: choiceModel.choice, font: UIFont(name: BMGTRegular, size: 12.0)!, width: ScreenW - 100)
            let answerLabel = UILabel.init(frame: CGRect.init(x: 20, y: totalHeight + 5, width: ScreenW - 100, height: answerLabelHeight))
            answerLabel.font = UIFont(name: BMGTRegular, size: 12.0)
            answerLabel.textColor = UIColor.init(red: 76/255.0, green: 76/255.0, blue: 96/255.0, alpha: 1.0)
            answerLabel.numberOfLines = 0
            answerLabel.text = choiceModel.choice
            middleView.addSubview(answerLabel)
            totalHeight =  answerLabelHeight + totalHeight + 5
            
            //进度条answerLabel.frame.origin.y + answerLabel.frame.size.height + 5
            progressView = UIProgressView(progressViewStyle: UIProgressViewStyle.bar)
            progressView.frame = CGRect(x: 20, y:totalHeight + 10 , width: ScreenW - 50, height: 0.5)
            progressView.trackTintColor = UIColor.init(red: 233/255.0, green: 236/255.0, blue: 239/255.0, alpha: 1.0)
            progressView.tintColor = progressColorArr[i]
            let flVal = (choiceModel.votePercent as NSString).floatValue
            progressView.setProgress(flVal/100, animated: false)
            middleView.addSubview(progressView)
            totalHeight = 0.5 + 15 + totalHeight
            
            
            //判断是不是自己选择过的
            let checkLb: UILabel = UILabel.init(frame: CGRect(x: ScreenW - 70 - 25, y: answerLabel.frame.origin.y - 2, width: 25, height: 25))
            checkLb.textAlignment = .right
            checkLb.text = "√"
            checkLb.textColor = progressColorArr[i]

            
            let arr =  choiceModel.responses
            var isSele: Bool = false
            for responses: PollResponse in arr! {
                
                if responses.memberId == BMCurrentUser.id()
                {
                    isSele = true
                }
            }
            if isSele {
                
                checkLb.isHidden = false

            }else{
                checkLb.isHidden = true
            }

            middleView.addSubview(checkLb)
        
            //投票数和百分比
            let voteCount = UILabel.init(frame: CGRect.init(x: ScreenW - 125, y: answerLabel.frame.origin.y + 2, width: 100, height: 15))
            voteCount.text = "\(choiceModel.count)[\(choiceModel.votePercent)]"
            voteCount.textColor = progressColorArr[i]
            voteCount.font = UIFont(name: BMGTRegular, size: 12.0)
            voteCount.textAlignment = .right
            middleView.addSubview(voteCount)
            
            
        }
           middleViewContraint.constant = totalHeight
        }
    }
    //根据label的宽度，文字大小计算高度
    func getLabelHeight(answerLabelText:String,font:UIFont,width:CGFloat)->CGFloat{
        
        let size = CGSize(width: width, height: 900)
        let dic = NSDictionary(object: font, forKey: NSFontAttributeName as NSCopying)
        let strSize = answerLabelText.boundingRect(with: size, options: .usesLineFragmentOrigin, attributes: dic as? [String : AnyObject], context: nil).size
        return strSize.height
    }

    
}
