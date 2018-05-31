//
//  BMHandoutsController.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 9/5/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

import UIKit

let handoutCell = "handoutCell"
let noHandoutCell = "nohandoutCell"

class BMHandoutsController: BMMsgBaseViewController {
    
    var loading: MBProgressHUD!
    var conference: BMConference!
    var handouts: [Handout] = []
    var bm: BMRoom!
    
    
    init(frame: CGRect, bm: BMRoom, conference: BMConference) {
        super.init(nibName: nil, bundle: nil)
        self.bm = bm
        self.conference = conference
        self.view.frame = frame
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    lazy  var tableView : UITableView = { [weak self] in
        let h     = (ScreenH - TabbarH - 64)
        let frame = CGRect(x: 0, y: 0, width: ScreenW, height: h)
        let tableView = UITableView(frame: frame, style: .plain)
        tableView.dataSource    =   self
        tableView.delegate      =   self
        tableView.backgroundColor = UIColor.white
        tableView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        tableView.allowsSelection = false
        tableView.separatorStyle = .none
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        tableView.register(HandoutCell.self, forCellReuseIdentifier: handoutCell)
        tableView.register(NoHandoutsCell.self, forCellReuseIdentifier: noHandoutCell)
        
        tableView.addPullToRefresh(actionHandler: {
            self?.reloadData()
        })
        tableView.showsInfiniteScrolling = false
        
        tableView.layoutSubviews()
        return tableView
        }()
    

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        loadData()
    }
    
    
    func setupUI(){
        self.view.addSubview(self.tableView)
    }
    
    func reloadData(){
            Handout.requestDatas(id: conference.recordId!, successCallback: { (result: [Handout]) in
               self.tableView.pullToRefreshView.stopAnimating()
                self.handouts = result
                self.tableView.reloadData()
            }) {
                self.tableView.pullToRefreshView.stopAnimating()
            }
    }
    
    func loadData(){
        loading = MBProgressHUD.showAdded(to: self.view, animated: true)
        loading.labelText = "Loading..."
        Handout.requestDatas(id: conference.recordId!, successCallback: { (result: [Handout]) in
           self.loading.hide(animated: true)
           self.handouts = result
           self.tableView.reloadData()
        }) { 
           self.loading.hide(animated: true)
        }
    }
    
    
   @objc func preView(sender: UITapGestureRecognizer){
        let index = sender.view?.tag
       // if self.handouts[index!] {
            let  vc = BMHandoutController(frame: CGRect.zero, handout: self.handouts[index!])
            self.present(vc, animated: false, completion: nil)
        //}
    }

}

extension BMHandoutsController: BigRoomHandoutDelegate {
    func bigRoomNotificationDelegateHandoutSwitch(message: [NSObject : AnyObject]) {
        Handout.requestDatas(id: conference.recordId!, successCallback: { (result: [Handout]) in
            self.handouts = result
            self.tableView.reloadData()
        }) {}
    }
}

extension BMHandoutsController: UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if self.handouts.count == 0 {
            return 1
        } else {
           return self.handouts.count
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        if self.handouts.count == 0 {
           let cell = tableView.dequeueReusableCell(withIdentifier: noHandoutCell, for: indexPath as IndexPath) as! NoHandoutsCell
            cell.setupUI()
            return cell
        }
    
        let cell = tableView.dequeueReusableCell(withIdentifier: handoutCell, for: indexPath as IndexPath) as! HandoutCell
        cell.handout = self.handouts[indexPath.row]
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(preView(sender:)))
        cell.preview.tag = indexPath.row
        cell.preview.isUserInteractionEnabled = true
        cell.preview.addGestureRecognizer(tap)
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if self.handouts.count == 0 {
            return 400
        } else {
            return 80
        }
    }
    
}



extension BMHandoutsController: BMNavViewDelegate{
    func quiteRoomNotification() {
        let vc = self.tabBarController?.viewControllers![0] as? BMVideoViewController
        vc!.quiteRoom()
        
    }
    
    func audioOnlyNotification(status: Bool) {
        let vc = self.tabBarController?.viewControllers![0] as? BMVideoViewController
        vc?.audioOnly = status
        vc?.reloadView()
    }
}
