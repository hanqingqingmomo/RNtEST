//
//  NewPollView.swift
//  bigmarker
//
//  Created by 刘欣 on 17/4/17.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

protocol SubmitNewPollDelegate {
    func didRecieveSelectBtnWithId(model:NewPoll,chooseArray:NSArray)
}

class NewPollView: UIView {

    var newPollModel : NewPoll!
    var totalView : UIView!
    var isSingle : String!
    var answerView : UIView!
    var answerLabel : UILabel!
    var buttonArray = [UIButton]()
    var answerArr : NSArray!
    var middleView : UIView!
    var submitBtn: UIButton!
    var doLaterBtn: UIButton!
    var submitNewPollDelegate : SubmitNewPollDelegate?
    var loading: MBProgressHUD!
    var pollViewModel = BMPollsViewModel()
    

    
    init(frame: CGRect,newPoll:NewPoll) {
        self.newPollModel = newPoll
        super.init(frame: frame)
        setupUI()
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func setupUI(){
        self.backgroundColor = UIColor(red: 45/255, green: 58/255, blue: 77/255, alpha: 1)
        //self.alpha = 1.0
        
        self.totalView = UIView.init(frame: CGRect(x: 10, y: 20, width: BMScreenW - 20, height: BMScreenH/5*4))
         self.totalView.center = self.center
        totalView.backgroundColor = UIColor.white
        self.addSubview(self.totalView)
        
        //Poll文字
        let questionLabelHeight = getLabelHeight(answerLabelText: newPollModel.pollQuestion, font: UIFont(name: BMGTRegular, size: 15.0)!, width: totalView.frame.size.width) + 5
        let titleLabel = UILabel(frame: CGRect.init(x: 15, y: 20, width: totalView.frame.size.width - 30, height: questionLabelHeight))
        titleLabel.text = newPollModel.pollQuestion
        titleLabel.numberOfLines = 3
        titleLabel.lineBreakMode = .byWordWrapping
        titleLabel.textColor = UIColor(red: 43/255.0, green: 55/255.0, blue: 77/255.0, alpha: 1.0)
        //titleLabel.backgroundColor = UIColor(red: 241/255.0, green: 243/255.0, blue: 245/255.0, alpha: 1.0)
        titleLabel.textAlignment = .left
        self.totalView.addSubview(titleLabel)
        
        isSingle = newPollModel.selectionMethod
        //问题的高度
        let questionLabelWidth = titleLabel.frame.size.width - 20
        //let questionLabelHeight = getLabelHeight(answerLabelText: newPollModel.pollQuestion, font: UIFont(name: BMGTRegular, size: 15.0)!, width: questionLabelWidth) + 5
        let questionLabel = UILabel.init(frame: CGRect.init(x: 10, y: titleLabel.frame.size.height + 10, width: questionLabelWidth, height: 20))
//        questionLabel.text = newPollModel.pollQuestion
//        questionLabel.textColor = UIColor.black
        self.totalView.addSubview(questionLabel)
        
        //答案的高度
        
        answerArr = newPollModel.choices as NSArray!
        var totalHeight:CGFloat = 0.0
        let space = 20
        middleView = UIView()
        middleView.backgroundColor = UIColor.white
        buttonArray.removeAll()
        let subView: Array =  middleView.subviews
        
        for subView: UIView in subView
        {
            subView.removeFromSuperview()
            
        }

        
        for i in 0...(answerArr.count - 1){
            let newPollChoice = answerArr[i] as! NewPollChoice
            let answerLabelHeight = getLabelHeight(answerLabelText: newPollChoice.choice, font: UIFont(name: BMGTRegular, size: 16.0)!, width: BMScreenW - 60) + 10
            let answerView = UIView(frame: CGRect(x: 0, y: totalHeight + CGFloat(space * i), width: BMScreenW, height: answerLabelHeight))
            let tap = UITapGestureRecognizer(target: self, action: #selector(answerViewTap))
            answerView.addGestureRecognizer(tap)
            middleView.addSubview(answerView)
            
            let answerLabel = setupAnswerLabel(anserLabelFrame: CGRect.init(x: 30, y: 0, width: BMScreenW - 60, height: answerLabelHeight), content:newPollChoice.choice)
            answerLabel.textColor = UIColor(red: 43/255, green: 43/255, blue: 43/255, alpha: 1)
            answerView.addSubview(answerLabel)
            
            let answerButton = setupAnswerButton(answerButtonFrame: CGRect.init(x: 0, y: 10, width: 14, height: 14),index: i)
            answerView.addSubview(answerButton)
            buttonArray.append(answerButton)
            
            totalHeight = answerLabelHeight + totalHeight

        }
        
       middleView.frame =  CGRect(x: questionLabel.frame.origin.x, y: questionLabel.frame.origin.y + questionLabel.frame.size.height + 10, width: questionLabel.frame.size.width, height: totalHeight + CGFloat((answerArr.count) * space))
       self.totalView.addSubview(middleView)
       
        submitBtn = UIButton.init(frame: CGRect.init(x: 10, y: middleView.frame.origin.y + middleView.frame.size.height + 10, width: 80, height: 40))
        submitBtn.backgroundColor = UIColor(red: 31/255.0, green: 196/255.0, blue: 166/255.0, alpha: 1.0)
        submitBtn.clipsToBounds = true
        submitBtn.layer.cornerRadius = 3
        submitBtn.setTitle("Submit", for: .normal)
        submitBtn.setTitleColor(UIColor.white, for: .normal)

        submitBtn.addTarget(self, action: #selector(submitBtnClick), for: .touchUpInside)
        self.totalView.addSubview(submitBtn)
        

        doLaterBtn = UIButton.init(frame: CGRect.init(x: 100, y: middleView.frame.origin.y + middleView.frame.size.height + 10, width: 120, height: 40))
        doLaterBtn.backgroundColor = UIColor(red: 253/255.0, green: 254/255.0, blue: 254/255.0, alpha: 1.0)
        doLaterBtn.clipsToBounds = true
        doLaterBtn.layer.cornerRadius = 3
        doLaterBtn.setTitle("Do It Later", for: .normal)
        doLaterBtn.setTitleColor(UIColor(red: 76/255.0, green: 88/255.0, blue: 110/255.0, alpha: 1.0), for: .normal)
        doLaterBtn.layer.borderWidth = 1.0
        doLaterBtn.layer.borderColor = UIColor(red: 223/255.0, green: 225/255.0, blue: 228/255.0, alpha: 1.0).cgColor

        doLaterBtn.addTarget(self, action: #selector(doItLaterBtnClick), for: .touchUpInside)
        self.totalView.addSubview(doLaterBtn)

        

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
        label.font = UIFont.init(name: BMGTRegular, size: 15.0)
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
        
        button.tag = 2000 + index
        button.addTarget(self, action: #selector(NewPollView.btnClick), for:.touchUpInside)
        return button
    }

    //点击answerView
  @objc  func answerViewTap(tap:UITapGestureRecognizer){
        
        let btn = tap.view?.subviews[1] as! UIButton
        btnClick(button: btn)
        
    }
    
    
    //点击button

  @objc  func btnClick(button:UIButton){
        
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
    
  @objc  func doItLaterBtnClick(sender: AnyObject){
        self.removeFromSuperview()
    }

   @objc func submitBtnClick(sender: AnyObject){
        
        var arr = [String]()
        var pollchoice = ""
        for btn in buttonArray{
            if btn.isSelected == true {
                let pollChoiceModel = answerArr[btn.tag - 2000] as! NewPollChoice
                arr.append(pollChoiceModel.choiceId)
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
            self.pollViewModel.requestSubmitData(pollId: newPollModel.pollId, pollChoice: pollchoice, successCallback: {
                self.loading.hide(true)
                self.submitNewPollDelegate?.didRecieveSelectBtnWithId(model: self.newPollModel, chooseArray: strArr as NSArray)
            }) {}
        }
    }
    
}
