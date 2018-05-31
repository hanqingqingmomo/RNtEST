//
//  BMMsgBaseViewController.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 19/3/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit

class BMMsgBaseViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

extension BMMsgBaseViewController: BigRoomChatDelegate, BigRoomUserDelegate{
    func bigRoomNotificationDelegateUserEnter(user: [NSObject : AnyObject]) {}
    func bigRoomNotificationDelegateUserLeave(sid: String) {}
    func bigRoomNotificationDelegateUserChangeRole(role: String, sid: String) {}
    func bigRoomNotificationDelegateUserLoad() {}
    func bigRoomNotificationDelegateUserLock(status: Int) {}
    
    
    func bigRoomNotificationDelegateMsgAdd(message: [NSObject : AnyObject]){}
    func bigRoomNotificationDelegateMsgDel(message: [NSObject : AnyObject]){}
    func bigRoomNotificationDelegateMsgLoad(messages: [NSObject : AnyObject]){}
    func bigRoomNotificationDelegateMsgLock(status: Int){}
    func bigRoomNotificationDelegateMsgChangeRole(status: Int){}

}
