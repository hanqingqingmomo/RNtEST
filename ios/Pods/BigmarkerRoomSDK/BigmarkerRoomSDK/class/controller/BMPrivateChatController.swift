//
//  BMPrivateChatController
//  bigmarker
//
//  Created by 刘欣 on 17/4/19.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

private let ChatCellID = "chatCellID"
private let messageInputViewH:CGFloat = 50
private let count  = 5

class BMPrivateChatController: UIViewController {

    var messages: [Message]  = []
    var refreshButton: UIButton!
    var loading: MBProgressHUD!
    var lastCount : Int!
    var userInfoId = ""
    var conference: BMConference!
    
    //0 代表重新加载  1 代表加载之前的消息
    var loadStatus = 0
    var originMessageViewFrame: CGRect!
    var originTableViewFrame:   CGRect!
    var tmpMessageViewFrame:    CGRect!

    var bm: BMRoom!
    var titleName : String!
    
     lazy var navView: UIView = { [weak self] in
        var titleLabel:UILabel!
        var gobackButton: UIButton!
        let navView = UIView(frame: CGRect(x: 0, y: 0, width: BMScreenW, height: 64))
        
        let x = navView.frame.width / 2 - 100
        titleLabel = UILabel(frame: CGRect(x: x, y: 25, width: 200, height: 30))
        titleLabel.text = self!.titleName
        titleLabel.textAlignment = NSTextAlignment.center
        titleLabel.minimumScaleFactor = 0.5
        titleLabel.adjustsFontSizeToFitWidth = true
        titleLabel.textAlignment = NSTextAlignment.left
        titleLabel.font = UIFont(name: BMSFUIDisplay_Bold, size: 20)
        titleLabel.textColor = UIColor.white
        
        gobackButton = UIButton(frame: CGRect(x: 0, y: 25, width: 40, height: 30))
        gobackButton.isUserInteractionEnabled = true
        gobackButton.setImage(UIImage(named: "BMSDK.bundle/arrow-left"), for: UIControlState.normal)
        gobackButton.addTarget(self!, action: #selector(quiteRoom), for: UIControlEvents.touchUpInside)
        gobackButton.contentMode = UIViewContentMode.scaleAspectFit
        
        navView.addSubview(titleLabel)
        navView.addSubview(gobackButton)
        navView.backgroundColor = UIColor.init(red: 38/255, green: 48/255, blue: 68/255, alpha: 1)
        return navView
        }()
    
    lazy  var tableView : UITableView = { [weak self] in
        let h: CGFloat = ScreenH  - messageInputViewH - 64
        let frame = CGRect.init(x: 0, y: 64, width: ScreenW, height: h)
        var tableView = UITableView(frame: frame, style: UITableViewStyle.plain)
        tableView.dataSource    =   self
        tableView.delegate      =   self
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.estimatedRowHeight = 80
        
        tableView.backgroundColor = UIColor.white
        tableView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        
        

        let bundle =  Bundle(path: Bundle(for: BMPrivateChatController.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        let chatNib = UINib(nibName: "BMRoomChatMsgCell", bundle: bundle)
        let noChatNib = UINib(nibName: "NoChatCell", bundle: bundle)
        tableView.register(chatNib, forCellReuseIdentifier: ChatCellID)
        tableView.register(noChatNib, forCellReuseIdentifier: "noChatCell")
        
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(cancelKeyboard))
        tableView.addGestureRecognizer(tap)
        //tableView.layoutSubviews()
        return tableView
        }()
    
    
    lazy var messageInputView: MessageInputView = { [weak self] in
        let messageInputView = MessageInputView.inputView()
        let y : CGFloat = (self?.tableView.frame.origin.y)! + (self?.tableView.frame.size.height)!
        messageInputView.frame = CGRect.init(x: 0, y: y, width: ScreenW, height: messageInputViewH)
        messageInputView.inputTextView.enablesReturnKeyAutomatically = true
        messageInputView.inputTextView.delegate = self
        return messageInputView
        }()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadMessages()
        self.view.backgroundColor = UIColor(red: 77/255, green: 84/255, blue: 97/255, alpha: 1)
        tableView.separatorStyle = .none
        tableView.allowsSelection = false
        
        
        self.view.addSubview(tableView)
        self.view.addSubview(messageInputView)
        self.view.addSubview(navView)
        
        self.originMessageViewFrame = self.messageInputView.frame
        self.tmpMessageViewFrame    = self.messageInputView.frame
        self.originTableViewFrame   = self.tableView.frame
        
        if messages.count != 0 {
            tableView.scrollToRow(at: NSIndexPath(row: messages.count - 1, section: 0) as IndexPath, at: .top, animated: true)
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        checkChatLock()
        
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(textDidChanged), name: NSNotification.Name.UITextViewTextDidChange, object: nil)
         NotificationCenter.default.addObserver(self, selector: #selector(userLeaveRoom), name: NSNotification.Name(rawValue: "UserLeaveRoom"), object: nil)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(true)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name.UITextViewTextDidChange, object: nil)
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "UserLeaveRoom"), object: nil)
    }
    
   
    @objc func quiteRoom(){
        if PeopleMessage.totalMessages.count != 0 {
            for msg in PeopleMessage.totalMessages {
                if msg.sid == self.userInfoId || msg.sid == self.bm.socketID {
                    PeopleMessage.totalMessages.removeObject(object: msg)

                }
            }
        }
        //改变peopleBadge的通知
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "reducePeopleBadge"), object: nil)
        let transition: CATransition = CATransition()
        let timeFunc : CAMediaTimingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionEaseInEaseOut)
        transition.duration = 0.5
        transition.timingFunction = timeFunc
        transition.type = kCATransitionPush
        transition.subtype = kCATransitionFromLeft
        self.view.window!.layer.add(transition, forKey: kCATransition)
        self.dismiss(animated: true, completion: nil)
    }
    
}


extension BMPrivateChatController {
    
   @objc func textDidChanged(notification:NSNotification) {
        if  messageInputView.inputTextView.text != "Type your message here..." {
            self.messageInputView.inputTextView.textColor = UIColor.black
        }
    }
    
    func loadMessages(){
        
        if PeopleMessage.bigTotalMessages.count != 0 {
            for msg in PeopleMessage.bigTotalMessages {
                if (msg.sid == self.userInfoId && msg.toId == self.bm.socketID) || (msg.sid == self.bm.socketID && msg.toId == self.userInfoId) {
                    self.messages.append(msg)
                }
            }
        self.tableView.reloadData()
    }
}

    
    func checkChatLock() {
        if let status = bm.chatLock {
            if !self.conference.adminRole() {
                if status != "enable" {
                    self.swicthLockChat(status: 0)
                }
            } else {
                if status != "enable" {
                    self.swicthLockChat(status: 0)
                }
            }
        }
    }
    
    func checkRepeatMessage(msg: Message) -> Bool{
        for m in self.messages {
            if m.id == msg.id {
                return true
            }
        }
        return false
    }
    
    
    func swicthLockChat(status: Int){
        if status == 1 {
            self.unlock()
        } else {
            self.lock()
        }
    }
    
    
    func lock(){
        self.messageInputView.inputTextView.text = "Attendee chat disabled"
        self.messageInputView.inputTextView.textColor = UIColor.lightGray
        self.messageInputView.inputTextView.isEditable = false
    }
    
    func unlock(){
        self.messageInputView.inputTextView.isEditable = true
        self.messageInputView.inputTextView.text = "Type your message here..."
    }
    
    
    func trimmingCharacters() -> String{
        return self.messageInputView.inputTextView.text.trimmingCharacters(in: NSCharacterSet.whitespacesAndNewlines)
    }
    
    
    func setUpRefreshView(){
        let view = UIView(frame: CGRect(x: 0, y: 64, width: BMScreenW, height: 53))
        view.backgroundColor = UIColor.white
        refreshButton = UIButton(frame: CGRect(x: 10, y: 10, width: BMScreenW-20, height: 35))
        refreshButton.layer.cornerRadius = 2.0
        refreshButton.backgroundColor = UIColor(red: 234/255, green: 237/255, blue: 240/255, alpha: 1)
        refreshButton.setTitleColor(UIColor(red: 137/255, green: 150/255, blue: 177/255, alpha: 1), for: UIControlState.normal)
        refreshButton.setTitle("REFRESH CHAT", for: UIControlState.normal)
        refreshButton.titleLabel?.font = UIFont(name: BMGTBold, size: 14)
        refreshButton.addTarget(self, action: #selector(refreshChat), for: UIControlEvents.touchUpInside)
        view.addSubview(refreshButton)
        self.view.addSubview(view)
    }
    
  @objc  func refreshChat(sender: AnyObject) {
        self.refreshButton.setTitle("REFRESHING...", for: UIControlState.normal)
        self.refreshButton.isEnabled = false
        //bm.syncChatMessages()
    }
    
    
   @objc func cancelKeyboard(sender: UITapGestureRecognizer) {
        self.messageInputView.inputTextView.resignFirstResponder()
    }
    
    func sendMessage(){
        
        //if AFNetworkReachabilityManager.shared().isReachable {
            if trimmingCharacters() != "" {
                bm.sendPrivateChatMessage(trimmingCharacters(), toUser: self.userInfoId)
                self.messageInputView.inputTextView.text = "Type your message here..."
                self.messageInputView.inputTextView.textColor = UIColor.lightGray
                self.messageInputView.inputTextView.resignFirstResponder()
                self.tableView.frame = originTableViewFrame
                self.messageInputView.frame = originMessageViewFrame
            }
        //}
    }
    

    
    
}

extension BMPrivateChatController : UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        lastCount = messages.count
        if messages.count == 0 {
            return 1
        } else {
              return messages.count
        }
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if messages.count == 0 {
            let cell = tableView.dequeueReusableCell(withIdentifier: "noChatCell", for:indexPath) as! NoChatCell
            return cell
        } else {
            let cell = tableView.dequeueReusableCell(withIdentifier: ChatCellID, for:indexPath) as! BMRoomChatMsgCell
            cell.usersInfo = bm.usersInfo
            cell.message = messages[indexPath.row]
            return cell
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if messages.count == 0 {
            return self.tableView.frame.height
            
        } else {
            return 80
        }
    }
    
}

extension BMPrivateChatController : UITextViewDelegate {
    
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        if (text ==  "\n") {
            sendMessage()
            return false
        }
        return true
    }
    
    
   @objc func keyboardWillShow(notification:NSNotification){
        
        if self.messageInputView.inputTextView.text == "Type your message here..." {
            self.messageInputView.inputTextView.text = ""
        }
        
        let userInfo      = notification.userInfo!
        let keyboardFrame = (userInfo[UIKeyboardFrameEndUserInfoKey] as! NSValue).cgRectValue
        
        if keyboardFrame.height > 0  {
            UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
                
                let h: CGFloat = BMScreenH  - messageInputViewH - 64
                self.tableView.frame = CGRect.init(x: 0, y: -keyboardFrame.height + 64, width: ScreenW, height: h)
                let y : CGFloat = (self.tableView.frame.origin.y) + (self.tableView.frame.size.height)
                self.messageInputView.frame = CGRect.init(x: 0, y: y, width: BMScreenW, height: messageInputViewH)
                
                
            }, completion: nil)
            
        }

        
    }
    
    
  @objc  func keyboardWillHide(notification:NSNotification){
        
        if self.messageInputView.inputTextView.text == "" {
            self.messageInputView.inputTextView.text = "Type your message here..."
        }
        
        UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
            let h: CGFloat = ScreenH  - messageInputViewH - 64
            self.tableView.frame = CGRect.init(x: 0, y:  64, width: ScreenW, height: h)
            let y : CGFloat = (self.tableView.frame.origin.y) + (self.tableView.frame.size.height)
            self.messageInputView.frame = CGRect.init(x: 0, y: y, width: ScreenW, height: messageInputViewH)
            

            }, completion: nil)
        
    }

    
}

extension BMPrivateChatController: BigRoomChatDelegate{
    
    func bigRoomNotificationDelegateMsgAdd(message: [NSObject : AnyObject]) {
       DispatchQueue.main.sync{
            let msgDict =  message as NSDictionary
            guard let sid     = msgDict["sid"]   as? String else { return }
            guard let toId    = msgDict["to_id"] as? String else { return }
            if toId == "" {
                
            }else{
            if sid == self.userInfoId || sid == self.bm.socketID {
                let msg = Message(dictionary: message as NSDictionary)
                self.messages.append(msg)
                if !self.checkRepeatMessage(msg: msg){
                    self.messages.append(msg)
                }
                self.messages.sort(by: { $0.time! < $1.time!})
                self.tableView.reloadData()
                self.tableView.scrollToRow(at: NSIndexPath.init(row: self.messages.count - 1, section: 0) as IndexPath, at: UITableViewScrollPosition.bottom, animated: false)
                
             }
            }
        }
    }
  @objc  func userLeaveRoom(notification:NSNotification){
        let sid = notification.object as! String
        if sid == self.userInfoId {
            self.quiteRoom()
        }
        
    }
    
    
    func bigRoomNotificationDelegateMsgDel(message: [NSObject : AnyObject]) {
      DispatchQueue.main.sync{
            let msgDict   =  message as NSDictionary
            guard let time = msgDict["data"] as? String else { return }
            for msg in self.messages {
                if let msgTime = msg.time {
                    if "\(msgTime)" == time {
                        if self.messages.contains(msg){
                            self.messages.removeObject(object: msg)
                            if self.messages.count > 0 {
                                self.tableView.reloadData()
                                self.tableView.scrollToRow(at: NSIndexPath.init(row: self.messages.count - 1, section: 0) as IndexPath, at: UITableViewScrollPosition.bottom, animated: false)
                            } else {
                                self.tableView.reloadData()
                            }
                        }
                    }
                }
            }
        }
    }
    
    func bigRoomNotificationDelegateMsgChangeRole(status: Int) {
        DispatchQueue.main.sync{
            if self.bm.chatLock != "enable" {
                self.swicthLockChat(status: status)
            }
        }
    }
    
    func bigRoomNotificationDelegateMsgLock(status: Int) {
        DispatchQueue.main.sync{
            self.swicthLockChat(status: status)
        }
    }
    
    func bigRoomNotificationDelegateMsgLoad(messages: [NSObject : AnyObject]) {
        if self.loadStatus == 0 {
            self.loadChats(messages: messages)
        } else {
            self.didLoadPreMessages(messages: messages)
        }
    }
    
    
}

extension BMPrivateChatController {
    
     func loadChats(messages: [NSObject : AnyObject]){
        DispatchQueue.main.sync{
            
            for messaegInfo in messages {
                let info = messaegInfo as (NSObject, AnyObject)
                guard let dic = info.1 as? NSDictionary else { return }
                let msg = Message(dictionary: dic)
                if !self.checkRepeatMessage(msg: msg){
                    self.messages.append(msg)
                }
            }
            
            if !self.messages.isEmpty{
                self.messages.sort(by: { $0.time! < $1.time!})
                self.tableView.reloadData()
               self.tableView.scrollToRow(at: NSIndexPath.init(row: self.lastCount - count, section: 0) as IndexPath, at: UITableViewScrollPosition.bottom, animated: false)
            }
            
        }
    }
    
    func didLoadPreMessages(messages: [NSObject : AnyObject]){
        
        DispatchQueue.main.sync{
            self.tableView.pullToRefreshView.stopAnimating()
            let count = self.messages.count
            if count > 0 {
                for messaegInfo  in messages {
                    let info = messaegInfo as (NSObject, AnyObject)
                    let msg = Message(dictionary: info.1 as! NSDictionary)
                    if !self.checkRepeatMessage(msg: msg){
                        self.messages.append(msg)
                    }
                }
                self.messages.sort(by: { $0.time! < $1.time!})
                self.tableView.reloadData()
                self.tableView.scrollToRow(at: NSIndexPath.init(row: self.lastCount - count, section: 0) as IndexPath, at: UITableViewScrollPosition.top, animated: false)
            }
        }
        
    }
    
}




