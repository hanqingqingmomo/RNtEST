//
//  QAOpenPollsCell.swift
//  bigmarker
//
//  Created by 刘欣 on 12/19/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

protocol SubmitDelegate {
    func didRecieveSelectBtnId(model:Poll,chooseArray:NSArray)
}

class OpenPollsCell: UITableViewCell {
    
    @IBOutlet weak var questionLabel: UILabel!
    @IBOutlet weak var middleView: UIView!
    @IBOutlet weak var submitBtn: UIButton!
    @IBOutlet weak var middleViewConstraint: NSLayoutConstraint!
    var admin = false
    var submitDelegate : SubmitDelegate?
    var answerView : UIView!
    var answerLabel : UILabel!
    var buttonArray = [UIButton]()
    var isSingle : String!
    var answerArr : NSArray!
    var indexPath : NSIndexPath!
    var loading: MBProgressHUD!

    var pollViewModel : BMPollsViewModel!
    var pollModel : Poll!
    override func awakeFromNib() {
        super.awakeFromNib()
    }
}

extension OpenPollsCell{
    
    func setupUI(pollsModel:Poll,indexPath:NSIndexPath){
        self.pollModel = pollsModel
        self.indexPath = indexPath
        isSingle = pollsModel.selectionMethod
        //问题的高度
        questionLabel.text = pollsModel.question
        
        let subView: Array =  middleView.subviews
        
        for subView: UIView in subView
        {
            subView.removeFromSuperview()
            
        }
        
        //答案的高度
        buttonArray.removeAll()
        answerArr = pollsModel.choices as NSArray!
        var totalHeight: CGFloat = 0.0
        let space: CGFloat = 20.0
        for i in 0...(answerArr.count - 1){
            let pollChoiceModel = answerArr[i] as! PollChoice
            let answerLabelHeight = getLabelHeight(answerLabelText: pollChoiceModel.choice, font: UIFont(name: BMGTRegular, size: 12.0)!, width: ScreenW - 50) + 10
            let answerView = UIView(frame: CGRect(x: 0, y: totalHeight + (space * CGFloat(i)), width: ScreenW, height: answerLabelHeight))
            let tap = UITapGestureRecognizer(target: self, action: #selector(answerViewTap))
            answerView.addGestureRecognizer(tap)
            middleView.addSubview(answerView)
            
            let answerLabel = setupAnswerLabel(anserLabelFrame: CGRect(x: 30, y: 0, width: 50, height: answerLabelHeight), content:pollChoiceModel.choice)
            answerView.addSubview(answerLabel)
            
            let answerButton = setupAnswerButton(answerButtonFrame: CGRect(x: 0, y: 5, width: 14, height: 14),index: i)
            answerView.addSubview(answerButton)
            buttonArray.append(answerButton)
            
            totalHeight = answerLabelHeight + totalHeight
        }
        
        
        middleViewConstraint.constant = totalHeight + (CGFloat(answerArr.count - 1) * space)
        
        submitBtn.clipsToBounds = true
        submitBtn.layer.cornerRadius = 3
        submitBtn.setTitleColor(UIColor.white, for: .normal)
        submitBtn.backgroundColor = UIColor(red: 46/256.0, green: 195/256.0, blue: 166/256.0, alpha: 1.0)
    }
    //根据label的宽度，文字大小计算高度
    func getLabelHeight(answerLabelText:String,font:UIFont,width:CGFloat)->CGFloat{
        
        let size = CGSize(width: width, height: 900)
        let dic = NSDictionary(object: font, forKey: NSFontAttributeName as NSCopying)
        let strSize = answerLabelText.boundingRect(with: size, options: .usesLineFragmentOrigin, attributes: dic as? [String : AnyObject], context: nil).size
        return strSize.height
    }
    
    //创建label
    func setupAnswerLabel(anserLabelFrame:CGRect,content:String)->UILabel{
        let label = UILabel.init(frame: anserLabelFrame)
        label.text = content
        label.numberOfLines = 0
        label.font = UIFont(name: BMGTRegular, size: 12.0)!
        label.textColor = UIColor(red: 130/255.0, green: 138/255.0, blue: 153/255.0, alpha: 1.0)
        return label
    }
    
    //创建button
    func setupAnswerButton(answerButtonFrame:CGRect,index:Int)->UIButton{
        let button = UIButton.init(frame: answerButtonFrame)
        if isSingle == "multi" {
            button.setImage(UIImage(named: "BMSDK.bundle/multiUnSelect"), for: .normal)
            button.setImage(UIImage(named: "BMSDK.bundle/multiSelect"), for: .selected)
        }else{
            button.setImage(UIImage(named: "BMSDK.bundle/QAPollsUnselectedBtn"), for: .normal)
            button.setImage(UIImage(named: "BMSDK.bundle/QAPollsSelectedBtn"), for: .selected)
        }
        
        button.tag = 1000 + index
        button.addTarget(self, action: #selector(btnClick), for:.touchUpInside)
        return button
    }
    //点击answerView
    func answerViewTap(tap:UITapGestureRecognizer){
        
        let btn = tap.view?.subviews[1] as! UIButton
        btnClick(button: btn)
        
    }
    
    
    //点击button

    func btnClick(button:UIButton){
        
        if isSingle == "multi" {
            if button.isSelected {
                button.isSelected = false
            }else{
                button.isSelected = true
            }
        }else {
            for btn in buttonArray {
                if btn == button {
                    btn.isSelected = true
                }else{
                    btn.isSelected = false
                }
            }
        }
    }
    
    @IBAction func submitBtnClick(sender: AnyObject) {
        var arr = [Int]()
        var pollchoice = ""
        for btn in buttonArray{
            if btn.isSelected == true {
                let pollChoiceModel = answerArr[btn.tag - 1000] as! PollChoice
                
                arr.append(pollChoiceModel.id)
            }
        }
        
        var strArr = [String]()
        for id in arr {
            let strId : String = String(id)
            strArr.append(strId)
            
        }
        pollchoice = (strArr as NSArray).componentsJoined(by: ",")
        
        if pollchoice == "" {
            

        }else{
            let window = UIApplication.shared.keyWindow
            loading = MBProgressHUD.showAdded(to: window!, animated: true)
            self.pollViewModel.requestSubmitData(pollId: pollModel.obfuscatedId, pollChoice: pollchoice, successCallback: {
                self.loading.hide(true)
                self.submitDelegate?.didRecieveSelectBtnId(model: self.pollModel,chooseArray: strArr as NSArray)
                
            }) {
                
            }
            
        }
        
    }
    
}
