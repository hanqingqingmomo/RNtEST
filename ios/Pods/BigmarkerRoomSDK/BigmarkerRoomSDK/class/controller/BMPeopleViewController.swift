//
//  BMPeopleViewController.swift
//  bigmarker
//
//  Created by hanqing on 2/9/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

private let BMRoomPepleCellID = "bMRoomPepleCellID"


class BMPeopleViewController: UIViewController{
    
    var bm: BMRoom!
    var conference: BMConference!
    var lockStatus = false
    var attendees:  [String]     = []
    var presenters: [String]     = []
    var admins:     [String]     = []
//    var messages: [Message]  = []
    
    lazy var tableView : UITableView = { [weak self] in
        let h = ScreenH - TabbarH - 64
        let frame = CGRect.init(x: 0, y: 0, width: ScreenW, height: h)
        var tableView = UITableView(frame: frame, style: UITableViewStyle.plain)
        tableView.dataSource    =   self
        tableView.delegate      =   self
        tableView.rowHeight = 80
        tableView.sectionHeaderHeight = 40
        tableView.backgroundColor  = UIColor(red: 245/255, green: 247/255, blue: 247/255, alpha: 1)
        tableView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        //tableView.registerNib(UINib(nibName: "BMRoomPeopleCell", bundle: nil), forCellReuseIdentifier: BMRoomPepleCellID)
        
        let bundle =  Bundle(path: Bundle(for: BMChatListViewController.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        let persionNib = UINib(nibName: "BMPersionCell", bundle: bundle)
        let attendeeNib = UINib(nibName: "AttendeeViewLockedCell", bundle: bundle)
        
        tableView.register(UINib(nibName: "BMPersionCell", bundle: bundle), forCellReuseIdentifier: "persionCell")
        tableView.register(UINib(nibName: "AttendeeViewLockedCell", bundle: bundle), forCellReuseIdentifier: "attendeeViewLockedCell")
        return tableView
        }()
    
    init(frame: CGRect, bm: BMRoom, conference: BMConference) {
        super.init(nibName: nil, bundle: nil)
        self.bm = bm
        self.conference = conference
        self.view.frame = frame
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "bigRoomNotificationDelegateMsgAdd"), object: nil)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        //为了刷新消息
        self.tableView.reloadData()
        
        //增加消息的通知
         NotificationCenter.default.addObserver(self, selector: #selector(BMPeopleViewController.PeopleMsgAddNotification), name: NSNotification.Name(rawValue: "PeopleMsgAddNotification"), object: nil)
           //减少消息的通知
        NotificationCenter.default.addObserver(self, selector: #selector(BMPeopleViewController.reducePeopleBadge), name: NSNotification.Name(rawValue: "reducePeopleBadge"), object: nil)
    }
    
}


extension BMPeopleViewController {
    
     func setupUI(){
        self.view.addSubview(tableView)
        loadMembers()
        checkRole()
    }
    
    
    //检查当前用户的角色 和房间权限 是否显示所有用户列表
    func checkRole(){
        if !self.conference.adminRole(){
            if bm.seeallLock != "enable" {
                self.switchLockPeopleList(status: 0)
            }
        } else {
            if bm.seeallLock != "enable" {
                self.switchLockPeopleList(status: 1)
            }
        }
    }
    
    // load members
    func loadMembers(){
       
        for userDic in bm.usersInfo as NSMutableDictionary {
         
            guard let udic  = userDic.value as? NSDictionary else { return }
            guard let role  = udic["role"]  as? String else { return }
            guard let mid   = userDic.key   as? String else { return }
            
            
            if  role == "Organizer" {
                self.admins.append(mid)
            } else if role == "Presenter" {
                self.presenters.append(mid)
            } else {
                self.attendees.append(mid)
            }
            
        }
    }
    
    
    func switchLockPeopleList(status: Int){
        if status == 0 {
            self.lockStatus = true
            self.tableView.reloadData()
        } else {
            self.lockStatus = false
            self.tableView.reloadData()
        }
    }
}


extension BMPeopleViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        var title = ""
        let headerView   = UIView(frame: CGRect(x: 0, y: 0, width: ScreenW, height: 40))
        headerView.backgroundColor = UIColor(red: 245/255, green: 247/255, blue: 247/255, alpha: 1)
        let headerLabel  = UILabel(frame: CGRect(x: 15, y: 15, width: 200, height: 20))
        headerLabel.font = UIFont(name: BMSFUIDisplay_Medium, size: 13)
        
        
        switch section {
        case 0:
            title = "Admins " + "(\(admins.count))"
            break
        case 1:
            title = "Presenters " + "(\(presenters.count))"
            break
        case 2:
            if self.lockStatus == false {
                title = "Attendees " + "(\(attendees.count))"
            } else {
                title = "Attendees "
            }
            break
        default:
            break
        }
        
        headerLabel.text = title
         headerLabel.textColor = UIColor.init(red: 43/255, green: 55/255, blue: 77/255, alpha: 1)
        headerView.addSubview(headerLabel)
        return headerView
    }
    
}

extension BMPeopleViewController: UITableViewDataSource,PrivateChatDelegate {
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        //  判断是否可以查看参加会议的attendees
        if lockStatus == true && indexPath.section == 2 {
            let cell = tableView.dequeueReusableCell(withIdentifier: "attendeeViewLockedCell", for:indexPath) as! AttendeeViewLockedCell
            return cell
        } else {
            let cell = tableView.dequeueReusableCell(withIdentifier: "persionCell", for:indexPath) as! BMPersionCell
            cell.privateChatDelegate = self
            var sid = ""
            switch indexPath.section {
            case 0:
                sid = self.admins[indexPath.row]
                break
            case 1:
                sid = self.presenters[indexPath.row]
                break
            default:
                sid = self.attendees[indexPath.row]
                break
            }
            cell.bmSoketId = self.bm.socketID
  
            cell.userInfo = bm.usersInfo[sid] as? NSDictionary
            cell.selectIndexPath = indexPath as NSIndexPath?
            
            for msg in PeopleMessage.totalMessages {
                
                if msg.toId == self.bm.socketID && msg.sid == sid {
                    cell.badgeLabel.isHidden = false
                    cell.badgeLabel.text = ""
                }
            }
            
            
            return cell
        }
    }
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 3
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return admins.count
        } else if section == 1 {
            return presenters.count
        } else {
            if self.lockStatus == false {
                return attendees.count
            } else {
                return 1
            }
        }
    }
    
    
    func enterPrivateChat(userInfoId:String,selectIndexPath:NSIndexPath){
        let cell = tableView.cellForRow(at: selectIndexPath as IndexPath) as! BMPersionCell
        cell.badgeLabel.text = "0"
        cell.badgeLabel.isHidden = true
        let privateChatController = BMPrivateChatController()
        let transition: CATransition = CATransition()
        let timeFunc : CAMediaTimingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionEaseInEaseOut)
        transition.duration = 0.5
        transition.timingFunction = timeFunc
        transition.type = kCATransitionPush
        transition.subtype = kCATransitionFromRight
        self.view.window!.layer.add(transition, forKey: kCATransition)
        privateChatController.bm = self.bm
        privateChatController.conference = self.conference
        privateChatController.userInfoId = userInfoId
        privateChatController.titleName = cell.userInfo!["name"] as! String
        (self.tabBarController as! BMTabBarController).bmroomChatDelegate = privateChatController
        self.present(privateChatController, animated: false, completion: nil)
    }
    
}


extension BMPeopleViewController: BigRoomUserDelegate {
    
    
    func bigRoomNotificationDelegateUserEnter(user: [NSObject : AnyObject]) {
        DispatchQueue.main.sync {
            let userDict = user as NSDictionary
            guard let sid  = userDict["sid"]  as? String else { return }
            guard let role = userDict["role"] as? String else { return }
            if role == "Organizer" && !self.admins.contains(sid) {
                self.admins.append(sid)
                self.tableView.reloadData()
            } else if role == "Presenter"  && !self.presenters.contains(sid) {
                self.presenters.append(sid)
                self.tableView.reloadData()
            } else if role == "Member" && !self.attendees.contains(sid) {
                self.attendees.append(sid)
                self.tableView.reloadData()
            }
        }
        
    }
    
    
    func PeopleMsgAddNotification(notification:NSNotification){
        
        DispatchQueue.main.sync{
            
            self.tableView.reloadData()
            
            //累加所有的cell的badge
            for cell in self.tableView.visibleCells {
                if let cell1 = cell as? BMPersionCell{
                    var peopleBadgeCount = "0"
                    peopleBadgeCount = String((Int(cell1.badgeLabel.text!) ?? 0) + Int(peopleBadgeCount)! )
                    //发送消息条数改变的通知
                    NotificationCenter.default.post(name: NSNotification.Name(rawValue: "peopleMessageChange"), object: peopleBadgeCount)
                }
            }
        }
    }
    func reducePeopleBadge(){
        //累加所有的cell的badge
        for cell in self.tableView.visibleCells {
            if let cell1 = cell as? BMPersionCell{
                var peopleBadgeCount = "0"
                peopleBadgeCount = String((Int(cell1.badgeLabel.text!) ?? 0) + Int(peopleBadgeCount)! )
                //发送消息条数改变的通知
                NotificationCenter.default.post(name: NSNotification.Name(rawValue: "peopleMessageChange"), object: peopleBadgeCount)
            }
        }
        
    }
    
    
    func bigRoomNotificationDelegateUserLeave(sid: String) {
        DispatchQueue.main.sync{
            if self.admins.contains(sid){
                self.admins.removeObject(object: sid)
                self.tableView.reloadData()
            }
            if self.presenters.contains(sid) {
                self.presenters.removeObject(object: sid)
                self.tableView.reloadData()
            }
            if self.attendees.contains(sid) {
                self.attendees.removeObject(object: sid)
                self.tableView.reloadData()
            }
            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "UserLeaveRoom"), object: sid)
            
        }
    }
    
    func bigRoomNotificationDelegateUserChangeRole(role: String, sid: String) {
        DispatchQueue.main.sync{
            if (role == "Organizer" || role == "Temp-Organizer") && !self.admins.contains(sid) {
                self.admins.append(sid)
                self.presenters.removeObject(object: sid)
                self.attendees.removeObject(object: sid)
            } else if role == "Presenter" && !self.presenters.contains(sid) {
                self.presenters.append(sid)
                self.attendees.removeObject(object: sid)
                self.admins.removeObject(object: sid)
            } else if role == "Member" && !self.attendees.contains(sid) {
                self.attendees.append(sid)
                self.presenters.removeObject(object: sid)
                self.admins.removeObject(object: sid)
            }
            self.tableView.reloadData()
        }
        
    }
    
    
    func bigRoomNotificationDelegateUserLoad() {}
    
    
    func bigRoomNotificationDelegateUserLock(status: Int) {
        DispatchQueue.main.sync{
            if self.bm.seeallLock != "enable" {
                self.switchLockPeopleList(status: status)
            } else {
                self.switchLockPeopleList(status: status)
            }
        }
    }

    
    
    // 改变role 设置member是否可以查看 member list
    private func setMemberRoleToSeeMemberList(status: Int) {
        DispatchQueue.main.sync{
            if self.bm.seeallLock != "enable" {
                self.switchLockPeopleList(status: status)
            }
        }
    }
    
    private func lockAttendeeList(status: String) {
         DispatchQueue.main.sync{
            self.switchLockPeopleList(status: status == "enable" ? 1 : 0)
        }
    }
    
}
