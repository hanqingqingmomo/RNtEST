//
//  BigRoomQAViewController.swift
//  bigmarker
//
//  Created by Han Qing on 13/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

enum QAType {
    case Active
    case Answered
}

private let QACellID       = "QACellID"
private let NoResultCellID = "NoResultCellID"
private let messageInputViewH:CGFloat = 50
private let textColor      = UIColor.init(red: 113/255, green: 126/255, blue: 148/255, alpha: 1)
private let inputViewColor = UIColor.init(red: 244/255, green: 246/255, blue: 248/255, alpha: 1)

class BMQAViewController: BMMsgBaseViewController {
    
    var loading: MBProgressHUD!
    lazy var questionViewModel = BMQAViewModel()
    var conference: BMConference!
    var bm:BMRoom!
    
    var originMessageViewFrame: CGRect!
    var originTableViewFrame:   CGRect!
    var tmpMessageViewFrame:    CGRect!
    var coverBoard : UIView!
    var enbaleQA = ""
    
    
    init(frame: CGRect, bm: BMRoom, conference: BMConference) {
        super.init(nibName: nil, bundle: nil)
        self.bm = bm
        self.conference = conference
        self.view.frame = frame
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
  
    lazy var statusView: StatusView = { [weak self] in
        var view = StatusView(frame: CGRect(x: 0, y: 0, width: ScreenW, height: messageInputViewH), titles: ["Active Questions", "Answered"])
        view.type = QAType.Active
        view.delegate = self
        return view
    }()
    
    
    lazy  var tableView : UITableView = { [weak self] in
        let h: CGFloat = self!.view.frame.height - messageInputViewH - self!.statusView.frame.height
        //let h: CGFloat = ScreenH  - TabbarH - messageInputViewH - 64 - messageInputViewH
        let frame = CGRect.init(x: 0, y: messageInputViewH, width: ScreenW, height: h)
        let tableView = UITableView.init(frame: frame, style: .plain)
        tableView.dataSource    =   self
        tableView.delegate      =   self
        tableView.backgroundColor = UIColor.white
        tableView.separatorStyle = UITableViewCellSeparatorStyle.none
//        tableView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        
        let bundle =  Bundle(path: Bundle(for: BMQAViewController.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        let qaCell     = UINib(nibName: "QATableViewCell", bundle: bundle)
        let noResultCell = UINib(nibName: "NoResultTableViewCell", bundle: bundle)
        tableView.register(qaCell, forCellReuseIdentifier: QACellID)
        tableView.register(noResultCell, forCellReuseIdentifier: NoResultCellID)
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(cancelKeyboard))
        tableView.addGestureRecognizer(tap)
        tableView.addPullToRefresh(actionHandler: {
            self!.reloadData()
        })
        tableView.layoutSubviews()
        return tableView
        }()
    
     lazy var messageInputView: MessageInputView = { [weak self] in
        let messageInputView = MessageInputView.inputView()
        let y: CGFloat =  ScreenH - TabbarH - 164
        messageInputView.backgroundColor = inputViewColor
        messageInputView.frame = CGRect.init(x: 0, y: y, width: ScreenW, height: messageInputViewH)
        messageInputView.inputTextView.text = "Post a question..."
        messageInputView.inputTextView.font = UIFont(name: BMSFUIDisplay_Regular, size: 15)
        messageInputView.inputTextView.enablesReturnKeyAutomatically = true
        messageInputView.inputTextView.delegate = self
        return messageInputView
        }()
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.originMessageViewFrame = self.messageInputView.frame
        self.tmpMessageViewFrame    = self.messageInputView.frame
        self.originTableViewFrame   = self.tableView.frame
    
        setupUI()
        loadData()
        
       
    }
    
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)

        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
         NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
         NotificationCenter.default.addObserver(self, selector: #selector(textDidChanged), name: NSNotification.Name.UITextViewTextDidChange, object: nil)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UITextViewTextDidChange, object: nil)
    }
    
    
    
}

extension BMQAViewController {
    
    func setupUI(){
        self.view.backgroundColor = UIColor.white
        self.view.addSubview(statusView)
        self.view.addSubview(tableView)
        self.view.addSubview(messageInputView)
        
        self.coverBoard = UIView(frame:CGRect(x: self.tableView.frame.origin.x, y: self.tableView.frame.origin.y, width: self.tableView.frame.width, height: self.tableView.frame.height + 30))
        self.coverBoard.backgroundColor = UIColor.white
        self.view.addSubview(self.coverBoard)
        
        let alertLabel = UILabel(frame: CGRect(x: 0, y: 0, width: ScreenW, height: 50))
        alertLabel.center = self.coverBoard.center
        alertLabel.textColor = UIColor.gray
        alertLabel.textAlignment = .center
        alertLabel.text = "Q&A is disabled"
        self.coverBoard.addSubview(alertLabel)
        
        if bm.enableQA == "disable" {
            self.coverBoard.isHidden = false
        }  else{
            self.coverBoard.isHidden = true
        }
        
        if bm.viewQA == "disable"{
            if self.conference.adminRole(){
                self.coverBoard.isHidden = true
            }else{
                self.coverBoard.isHidden = false
            }
            
        }else{
            self.coverBoard.isHidden = true
        }
    }
    
    func reloadData(){
        self.questionViewModel.requestQAData(id:self.conference!.obfuscatedId!, page: 1, count: 100, successCallback: {
            self.tableView.pullToRefreshView.stopAnimating()
            self.tableView.reloadData()
        }) {
            self.tableView.pullToRefreshView.stopAnimating()
        }
    }
    
     func loadData(){
        loading = MBProgressHUD.showAdded(to: self.view, animated: true)
        loading.label.text = "Loading..."
 
        self.questionViewModel.requestQAData(id:self.conference!.obfuscatedId!, page: 1, count: 100, successCallback: {
             self.loading.hide(animated: true)
             self.tableView.reloadData()
        }) {
             self.loading.hide(animated: true)
        }
    }
    
  @objc  func cancelKeyboard(sender: UITapGestureRecognizer) {
        self.messageInputView.inputTextView.resignFirstResponder()
    }
    
}

extension BMQAViewController: StatusDelegate {
    
    func qaStatusDelegateTypeChanged(type: QAType) {
        self.tableView.reloadData()
    }
}


extension BMQAViewController: UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        DispatchQueue.main.async(execute: {
            
            let v1 = UIView.init(frame: self.view.frame)
            v1.backgroundColor = UIColor.black
            self.view.addSubview(v1)
            
        })
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        
            if self.statusView.type == QAType.Active {
                if self.questionViewModel.activedQuestions.count  == 0 {
                    return 1
                } else {
                    return self.questionViewModel.activedQuestions.count
                }
                
            } else {
                if self.questionViewModel.answeredQuestions.count == 0 {
                    return 1
                } else {
                    return self.questionViewModel.answeredQuestions.count
                }
            }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        if self.statusView.type == QAType.Active{
            if self.questionViewModel.activedQuestions.count == 0 {
                let cell: NoResultTableViewCell = tableView.dequeueReusableCell(withIdentifier: NoResultCellID, for:indexPath) as! NoResultTableViewCell
                
                cell.infoLabel.text = "When people ask questions, others can upvote them so the best rise to the top"
                return cell
            } else {
                let cell: QATableViewCell = tableView.dequeueReusableCell(withIdentifier: QACellID, for:indexPath) as! QATableViewCell
                cell.delegate = self
                cell.questionViewModel = self.questionViewModel
                cell.question = self.questionViewModel.activedQuestions[indexPath.row]
                return cell
            }
           
        } else {
            if questionViewModel.answeredQuestions.count == 0 {
                let cell: NoResultTableViewCell = tableView.dequeueReusableCell(withIdentifier: NoResultCellID, for:indexPath) as! NoResultTableViewCell
                cell.infoLabel.text = "When people ask questions, others can upvote them so the best rise to the top."
                return cell
            } else {
                let cell: QATableViewCell = tableView.dequeueReusableCell(withIdentifier: QACellID, for:indexPath) as! QATableViewCell
                cell.delegate = self
                cell.questionViewModel = self.questionViewModel
                cell.question = self.questionViewModel.answeredQuestions[indexPath.row]
                return cell
            }
                    }
        
    }
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {

        if self.statusView.type == QAType.Active{
            if self.questionViewModel.activedQuestions.count == 0 {
               return 500
            } else {
                return UITableViewAutomaticDimension
            }
            
        } else {
            if questionViewModel.answeredQuestions.count == 0 {
                return 500
            } else {
                return UITableViewAutomaticDimension
            }
        }
    }
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat{
        return 80
    }

}


extension BMQAViewController: BigRoomQADelegate {
    
    func bigRoomNotificationDelegateQALock(message:[NSObject : AnyObject]){
        
//        let data = message["data"] as? String
        
         DispatchQueue.main.sync {
            
        if (self.bm.enableQA == "enable" && self.bm.viewQA == "enable") || (self.bm.viewQA == "disable" && self.conference.adminRole()){
            
          self.coverBoard.isHidden = true
                
        }else{
          self.coverBoard.isHidden = false
            
            }
        }
        
    }
    
    
    func bigRoomNotificationDelegateQANew(message: [NSObject : AnyObject]) {
       DispatchQueue.main.sync {
            guard let msgDict = message as? NSDictionary else { return }
            guard let data = msgDict["data"] as? NSDictionary else { return }
            let qa = QA.init(dictionary: data)
            self.questionViewModel.questions.append(qa)
            if qa.answered {
                self.questionViewModel.answeredQuestions.append(qa)
            } else {
                self.questionViewModel.activedQuestions.append(qa)
            }
            self.tableView.reloadData()
      
            if self.tableView.numberOfRows(inSection: 0) > (self.questionViewModel.activedQuestions.count - 1) {
                 self.tableView.scrollToRow(at: NSIndexPath.init(row: self.questionViewModel.activedQuestions.count - 1, section: 0) as IndexPath, at: .bottom, animated: false)
            }
           
        }
    }
    
    func bigRoomNotificationDelegateQAVote(message: [NSObject : AnyObject]) {
       DispatchQueue.main.sync {
        self.questionViewModel.requestQAData(id:self.conference!.obfuscatedId!, page: 1, count: 100, successCallback: {
            self.tableView.reloadData()
        }) {}
        
        
        }
    }
    
    func bigRoomNotificationDelegateQAAnswered(message: [NSObject : AnyObject]) {
       DispatchQueue.main.sync {
        self.questionViewModel.requestQAData(id:self.conference!.obfuscatedId!, page: 1, count: 100, successCallback: {
            self.tableView.reloadData()
        }) {}
        }
    }
    
    func bigRoomNotificationDelegateQADelete(message: [NSObject : AnyObject]) {
         DispatchQueue.main.sync {
            self.questionViewModel.requestQAData(id:self.conference!.obfuscatedId!, page: 1, count: 100, successCallback: {
                self.tableView.reloadData()
            }) {}
        }
    }
    
}

extension BMQAViewController: QATableViewCellDelegate {
     func deleteQA(id: String) {
        DispatchQueue.main.sync {
            self.bm.deleteQA(id)
            self.tableView.reloadData()
        }
     }
    
     func voteQA(qa: QA) {
       // DispatchQueue.main.sync {
            self.bm.voteQA(["obfuscated_id": qa.obfuscatedId, "vote_count": qa.voteCount])
            self.tableView.reloadData()
        //}
     }
    
    func answeredQA(id: String) {
         DispatchQueue.main.sync {
            self.bm.answeredQA(id)
            self.tableView.reloadData()
        }
    }
    
    func sendMessage() {
        if trimmingCharacters() != "" {
            loading = MBProgressHUD.showAdded(to: self.view, animated: true)
            self.questionViewModel.newQA(id: conference.obfuscatedId!, content: trimmingCharacters(), finishedCallback: { (result) in
                self.loading.hide(true)
                guard let status = result["status"] as? Bool  else { return }
                if status {
                    guard let data = result["data"] as? NSDictionary else { return }
    
                    if BMCurrentUser.modId() != "" {
                        let mutableData = data.mutableCopy() as! NSMutableDictionary
                         mutableData.setValue(BMCurrentUser.modUserName(), forKey: "user_name")
                        self.bm.newQA(mutableData as [NSObject : AnyObject])
                    } else {
                        self.bm.newQA(data as [NSObject : AnyObject])
                    }
                    
                    self.tableView.reloadData()
                }
            })
            self.messageInputView.inputTextView.text = "Post a question..."
            self.messageInputView.inputTextView.resignFirstResponder()
            self.messageInputView.frame = self.originMessageViewFrame
        }
    }
    
    func trimmingCharacters() -> String{
        return  self.messageInputView.inputTextView.text.trimmingCharacters(in: NSCharacterSet.whitespacesAndNewlines)
    }
}


extension BMQAViewController: UITextViewDelegate {
    
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        
        if (text ==  "\n") {
            sendMessage()
            return false
        }
        return true
    }
    
  @objc  func textDidChanged(notification:NSNotification) {
        
//        if  messageInputView.inputTextView.text != "Post a question..." {
//            self.messageInputView.inputTextView.textColor = inputViewColor
//        }
        
        let fixedWidth = messageInputView.inputTextView.frame.size.width
        messageInputView.inputTextView.sizeThatFits(CGSize(width: fixedWidth, height: CGFloat.greatestFiniteMagnitude))
        let newSize = messageInputView.inputTextView.sizeThatFits(CGSize(width: fixedWidth, height: CGFloat.greatestFiniteMagnitude))
        var newFrame = messageInputView.inputTextView.frame
        newFrame.size = CGSize(width: max(newSize.width, fixedWidth), height: newSize.height)
        
        messageInputView.inputTextView.frame = newFrame
        messageInputView.inputTextView.isScrollEnabled = false
        
        let offset = messageInputView.inputTextView.frame.height - (self.messageInputView.frame.height - 20)
        
        if offset > 4 {
            let h = self.messageInputView.inputTextView!.frame.height  + 33
            let y = self.messageInputView.frame.origin.y - 18
            UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
                let frame = CGRect.init(origin: CGPoint.init(x: 0, y: y), size: CGSize.init(width: ScreenW, height: h))
                self.messageInputView.frame = frame
                }, completion: nil)
            
            self.tmpMessageViewFrame = self.messageInputView.frame
        }
        
    }
    
    
  @objc  func keyboardWillShow(notification:NSNotification){
        
        if self.messageInputView.inputTextView.text == "Post a question..." {
            self.messageInputView.inputTextView.text = ""
        }
        
        let userInfo      = notification.userInfo!
        let keyboardFrame = (userInfo[UIKeyboardFrameEndUserInfoKey] as! NSValue).cgRectValue
        
        if keyboardFrame.height > 0  {
            UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
               let y: CGFloat =  keyboardFrame.origin.y - 50 - TabbarH - 60
                self.messageInputView.frame = CGRect.init(x: 0, y: y, width: ScreenW, height: messageInputViewH)
                }, completion: nil)
        }
        
    }
    
    
   @objc func keyboardWillHide(notification:NSNotification){
        
        if self.messageInputView.inputTextView.text == "" {
            self.messageInputView.inputTextView.text = "Post a question..."
        }
        
        UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
            self.messageInputView.frame = self.originMessageViewFrame
            }, completion: nil)
        
    }


    
}



