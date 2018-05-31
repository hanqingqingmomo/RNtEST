//
//  BigRoomChatListViewController.swift
//  bigmarker
//
//  Created by hanqing on 1/7/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

class Regex {
    let internalExpression: NSRegularExpression
    let pattern: String
    
    init(_ pattern: String) {
        self.pattern = pattern
        self.internalExpression = try! NSRegularExpression(pattern: pattern, options: .caseInsensitive)
    }
    
    func test(input: String) -> Bool {
        let matches = self.internalExpression.matches(in: input, options: [], range:NSMakeRange(0, input.characters.count))
        return matches.count > 0
    }
}


private let ChatCellID = "chatCellID"
private let messageInputViewH:CGFloat = 50
private let count  = 50
private let titleViewH: CGFloat = 40

class BMChatListViewController: UIViewController {
    
    var bm: BMRoom!
    var conference: BMConference!
    var messages: [Message]  = []
    var refreshButton: UIButton!
    var loading: MBProgressHUD!
    var lastCount : Int!
    
    //0 代表重新加载  1 代表加载之前的消息
    var loadStatus = 0
    var originMessageViewFrame: CGRect!
    var originTableViewFrame:   CGRect!
    var tmpMessageViewFrame:    CGRect!
    
    init(frame: CGRect, bm: BMRoom, conference: BMConference) {
        super.init(nibName: nil, bundle: nil)
        self.bm = bm
        self.conference = conference
        self.view.frame = frame
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    

    func quiteRoom(){
        let vc = self.tabBarController?.viewControllers![0] as? BMVideoViewController
        vc!.quiteRoom()
    }
    
    lazy  var tableView : UITableView = { [weak self] in
        let h: CGFloat = ScreenH  - TabbarH - messageInputViewH - 64 - messageInputViewH
        let frame = CGRect.init(x: 0, y: 0, width: ScreenW, height: h)
        var tableView = UITableView(frame: frame, style: UITableViewStyle.plain)
        tableView.dataSource    =   self
        tableView.delegate      =   self
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.estimatedRowHeight = 80
        
        tableView.backgroundColor = UIColor.white
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        
        let bundle =  Bundle(path: Bundle(for: BMChatListViewController.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        let chatNib = UINib(nibName: "BMRoomChatMsgCell", bundle: bundle)
        let noChatNib = UINib(nibName: "NoChatCell", bundle: bundle)
        tableView.register(chatNib, forCellReuseIdentifier: ChatCellID)
        tableView.register(noChatNib, forCellReuseIdentifier: "noChatCell")
        let tap = UITapGestureRecognizer(target: self, action: #selector(cancelKeyboard))
        tableView.addGestureRecognizer(tap)
        tableView.separatorStyle = .none
        tableView.allowsSelection = false
        tableView.addPullToRefresh(actionHandler: {
            self?.getPreMessages()
        })
        tableView.showsInfiniteScrolling = false
        return tableView
        }()
    
     lazy var messageInputView: MessageInputView = { [weak self] in
        let messageInputView = MessageInputView.inputView()
        let y: CGFloat =  BMScreenH - BMTabbarH - 164
        messageInputView.frame = CGRect.init(x: 0, y: y, width: BMScreenW, height: messageInputViewH)
        messageInputView.inputTextView.enablesReturnKeyAutomatically = true
        messageInputView.inputTextView.delegate = self
        return messageInputView
        }()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
  
        setupUI()
        loadMessages()
        
        self.originMessageViewFrame = self.messageInputView.frame
        self.tmpMessageViewFrame    = self.messageInputView.frame
        self.originTableViewFrame   = self.tableView.frame
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)
        checkChatLock()
        
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

extension BMChatListViewController {
    
    func setupUI(){
        self.view.addSubview(tableView)
        self.view.addSubview(messageInputView)
    }
    
    func loadMessages(){
        self.loadStatus = 0
        loading = MBProgressHUD.showAdded(to: self.view, animated: true)
        loading.labelText = "Loading..."
        
        let data: [NSObject : AnyObject] = ["load_count" as NSObject: count as AnyObject, "end_index" as NSObject: "-1" as AnyObject, "first_msg_id" as NSObject: "0" as AnyObject]
        bm.syncChatMessages(data)
        
    }
    
    func getPreMessages(){
        self.loadStatus = 1
        if messages.count > 0 {
            let msg = messages.first
            let datas: [NSObject : AnyObject] = ["load_count" as NSObject: count as AnyObject, "end_index" as NSObject: "-1" as AnyObject, "first_msg_id" as NSObject: String(msg!.time!) as AnyObject]
            self.bm.syncChatMessages(datas)
            
        }else{
            self.tableView.pullToRefreshView.stopAnimating()
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
                    self.swicthLockChat(status: 1)
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
        return (self.messageInputView.inputTextView.text as NSString).trimmingCharacters(in: NSCharacterSet.whitespacesAndNewlines)
    }
    
    
    func setUpRefreshView(){
        let view = UIView(frame: CGRect(x: 0, y: 64, width: BMScreenH, height: 53))
        view.backgroundColor = UIColor.white
        refreshButton = UIButton(frame: CGRect(x: 10, y: 10, width: BMScreenH-20, height: 35))
        refreshButton.layer.cornerRadius = 2.0
        refreshButton.backgroundColor = UIColor(red: 234/255, green: 237/255, blue: 240/255, alpha: 1)
        refreshButton.setTitleColor(UIColor(red: 137/255, green: 150/255, blue: 177/255, alpha: 1), for: UIControlState.normal)
        refreshButton.setTitle("REFRESH CHAT", for: UIControlState.normal)
        refreshButton.titleLabel?.font =  UIFont(name: BMGTBold, size: 14)
        refreshButton.addTarget(self, action: #selector(refreshChat), for: UIControlEvents.touchUpInside)
        view.addSubview(refreshButton)
        self.view.addSubview(view)
    }
    
    func refreshChat(sender: AnyObject) {
        self.refreshButton.setTitle("REFRESHING...", for: UIControlState.normal)
        self.refreshButton.isEnabled = false
        //bm.syncChatMessages()
    }
    
    func cancelKeyboard(sender: UITapGestureRecognizer) {
        self.messageInputView.inputTextView.resignFirstResponder()
    }
    
    func sendMessage(){
        //if AFNetworkReachabilityManager.shared().isReachable {
        if trimmingCharacters() != "" {
            bm.sendChatMessage(trimmingCharacters(), toUser: "")
            self.messageInputView.inputTextView.text = "Type your message here..."
            self.messageInputView.inputTextView.resignFirstResponder()
            self.tableView.frame = originTableViewFrame
            self.messageInputView.frame = originMessageViewFrame
        }
        //}
    }


}



extension BMChatListViewController: UITableViewDataSource, UITableViewDelegate {
    
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

extension BMChatListViewController: UITextViewDelegate {
    
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        if (text ==  "\n") {
            sendMessage()
            return false
        }
        return true
    }
    
    func textDidChanged(notification:NSNotification) {
        
        //        if  messageInputView.inputTextView.text != "Type your message here..." {
        //            self.messageInputView.inputTextView.textColor = UIColor.blackColor()
        //        }
        
        let fixedWidth = messageInputView.inputTextView.frame.size.width
        messageInputView.inputTextView.sizeThatFits(CGSize(width: fixedWidth, height: CGFloat.greatestFiniteMagnitude))
        let newSize = messageInputView.inputTextView.sizeThatFits(CGSize(width: fixedWidth, height: CGFloat.greatestFiniteMagnitude))
        var newFrame = messageInputView.inputTextView.frame
        newFrame.size = CGSize(width: max(newSize.width, fixedWidth), height: newSize.height)
        
        messageInputView.inputTextView.frame = newFrame
        messageInputView.inputTextView.isScrollEnabled = false
        
        let offset = messageInputView.inputTextView.frame.height - (self.messageInputView.frame.height - 20)
        
        if offset > 3 {
            let h = self.messageInputView.inputTextView!.frame.height + 30
            let y = self.messageInputView.frame.origin.y - 15
            UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
                let frame = CGRect.init(origin: CGPoint.init(x: 0, y: y), size: CGSize.init(width: ScreenW, height: h))
                self.messageInputView.frame = frame
            }, completion: nil)
            
            self.tmpMessageViewFrame = self.messageInputView.frame
        }
        
    }
    
    func keyboardWillShow(notification:NSNotification){
        
        if self.messageInputView.inputTextView.text == "Type your message here..." {
            self.messageInputView.inputTextView.text = ""
        }
        
        let userInfo      = notification.userInfo!
        let keyboardFrame = (userInfo[UIKeyboardFrameEndUserInfoKey] as! NSValue).cgRectValue
        
        if keyboardFrame.height > 0  {
            UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
                    self.view.frame = CGRect.init(x: 0.0, y: -keyboardFrame.height + 50, width: self.view.frame.size.width, height: self.view.frame.size.height)
            }, completion: nil)
        }
        
    }
    
    
    func keyboardWillHide(notification:NSNotification){
        
        if self.messageInputView.inputTextView.text == "" {
            self.messageInputView.inputTextView.text = "Type your message here..."
        }
        
        UIView.animate(withDuration: 0.25, delay: 0, options: UIViewAnimationOptions.curveLinear, animations: { () -> Void in
              self.view.frame = CGRect.init(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height)
            self.tableView.frame = CGRect.init(x: 0, y: self.tableView.frame.origin.y, width: ScreenW, height: self.view.frame.height - self.tmpMessageViewFrame.height - TabbarH)
            //size = CGSize.init(width: ScreenW, height: self.view.frame.height - self.navView.frame.height - self.originMessageViewFrame.height)
        }, completion: nil)
        
    }
    
}


extension BMChatListViewController: BigRoomChatDelegate{
    
    func bigRoomNotificationDelegateMsgAdd(message: [NSObject : AnyObject]) {
        DispatchQueue.main.sync {
            let msgDict =  message as NSDictionary
            guard let toId = msgDict["to_id"] as? String else { return }
            if toId == "" {
                let msg = Message(dictionary: msgDict)
                self.messages.append(msg)
                if !self.checkRepeatMessage(msg: msg){
                    self.messages.append(msg)
                }
                self.messages.sort(by: { $0.time! < $1.time!})
                self.tableView.reloadData()
                
                self.tableView.scrollToRow(at: NSIndexPath(row: self.messages.count - 1, section: 0) as IndexPath, at: UITableViewScrollPosition.bottom, animated: false)
                
            }
        }
    }
    
    
    func bigRoomNotificationDelegateMsgDel(message: [NSObject : AnyObject]) {
        DispatchQueue.main.sync{
            let msgDict =  message as NSDictionary
            guard let time = msgDict["data"] as? String else { return }
            for msg in self.messages {
                if let msgTime = msg.time {
                    if "\(msgTime)" == time {
                        if self.messages.contains(msg){
                            self.messages.removeObject(object: msg)
                            if self.messages.count > 0 {
                                self.tableView.reloadData()
                                self.tableView.scrollToRow(at: NSIndexPath(row: self.messages.count - 1, section: 0) as IndexPath, at: UITableViewScrollPosition.bottom, animated: false)
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


extension BMChatListViewController {
    
    
    func loadChats(messages: [NSObject : AnyObject]){
        DispatchQueue.main.sync{
            self.loading.hide(true)
            
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
                self.tableView.scrollToRow(at: NSIndexPath(row: self.messages.count - 1, section: 0) as IndexPath, at: UITableViewScrollPosition.bottom, animated: false)
            }
            
        }
    }
    
    
    func didLoadPreMessages(messages: [NSObject : AnyObject]){
        
        DispatchQueue.main.sync {
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
                self.tableView.scrollToRow(at: NSIndexPath(row: self.lastCount - count, section: 0) as IndexPath, at: UITableViewScrollPosition.top, animated: false)
            }
        }
        
    }
    
}

