//
//  BigRoomPollsViewController.swift
//  bigmarker
//
//  Created by 刘欣 on 12/19/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

private let OpenPollsCellId = "OpenPollsCell"
private let ClosedPollsCellId = "ClosedPollsCell"
private let NoResultCellID = "NoResultCellID"

class BMPollsViewController: BMMsgBaseViewController {
    
    lazy var bigRoomPollsViewModel = BMPollsViewModel()
    var loading: MBProgressHUD!
    var conference: BMConference!
    var admin = false
    var bm:BMRoom!
    var coverBoard : UIView!
    
    
    lazy var statusView: StatusView = { [weak self] in
        var view = StatusView(frame: CGRect(x: 0, y: 0, width: ScreenW, height: 50), titles: ["Open", "Closed"])
        view.type = QAType.Active
        view.delegate = self
        return view
        }()
    
    lazy  var tableView : UITableView = { [weak self] in
        let tableView  = UITableView.init(frame: CGRect.init(x: 0, y: self!.statusView.frame.size.height, width: ScreenW, height: self!.view.frame.height - self!.statusView.frame.height - 155), style: .plain)
        tableView.delegate = self
        tableView.dataSource = self
        tableView.allowsSelection = false
        tableView.separatorStyle = .singleLine
        tableView.tableFooterView = UIView(frame: CGRect.zero)
        tableView.addPullToRefresh(actionHandler: {
            self!.reloadData()
        })
        let bundle =  Bundle(path: Bundle(for: BMPollsViewController.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        let openCell     = UINib(nibName: "OpenPollsCell", bundle: bundle)
        let closeCell    = UINib(nibName: "ClosedPollsCell", bundle: bundle)
        let noResultCell = UINib(nibName: "NoResultTableViewCell", bundle: bundle)
        tableView.register(openCell, forCellReuseIdentifier: OpenPollsCellId)
        tableView.register(closeCell, forCellReuseIdentifier: ClosedPollsCellId)
        tableView.register(noResultCell, forCellReuseIdentifier: NoResultCellID)
        
        tableView.layoutSubviews()
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
        loadData()
    }
    
}

extension BMPollsViewController{
    
    func setupUI(){
        self.view.addSubview(statusView)
        self.view.addSubview(tableView)
    }
    
    func loadData(){
        loading = MBProgressHUD.showAdded(to: self.view, animated: true)
        bigRoomPollsViewModel.requestPollsData(id: conference.obfuscatedId!, successCallback: {
            self.loading.hide(animated: true)
            self.tableView.reloadData()
            if (self.statusView.type == .Active){
                if self.bigRoomPollsViewModel.openPoll.count != 0{

                    self.tableView.scrollToRow(at: NSIndexPath.init(row: self.bigRoomPollsViewModel.openPoll.count - 1, section: 0) as IndexPath, at: .bottom, animated: true)
                }
            }
        
        }) {}
        
    }
    
    func reloadData(){
        bigRoomPollsViewModel.requestPollsData(id: conference.obfuscatedId!, successCallback: {
            self.tableView.pullToRefreshView.stopAnimating()
            self.tableView.reloadData()
            if (self.statusView.type == .Active){
                if self.bigRoomPollsViewModel.openPoll.count != 0{
                    self.tableView.scrollToRow(at: NSIndexPath.init(row: self.bigRoomPollsViewModel.openPoll.count - 1, section: 0) as IndexPath, at: .bottom, animated: true)
                }
            }
            
        }) {
            self.tableView.pullToRefreshView.stopAnimating()
        }
    }
    
}
extension BMPollsViewController : UITableViewDelegate,UITableViewDataSource,SubmitDelegate{
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        if (statusView.type == .Active){
            if bigRoomPollsViewModel.openPoll.count == 0{
                return 1
            }else{
                return bigRoomPollsViewModel.openPoll.count
            }
        }else{
            if bigRoomPollsViewModel.closePoll.count == 0{
                return 1
            }else{
                return bigRoomPollsViewModel.closePoll.count
            }
        }
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        if (statusView.type == .Active){
            
            if bigRoomPollsViewModel.openPoll.count == 0 {
                let cell: NoResultTableViewCell = tableView.dequeueReusableCell(withIdentifier: NoResultCellID, for:indexPath as IndexPath) as! NoResultTableViewCell
                cell.resultImageView.image = UIImage(named: "BMSDK.bundle/iconPolls") 
                cell.infoLabel.text = "When the host posts a poll, people can submit answers here."
                return cell
            }else{
                
                if admin == true {
                    //是管理员
                    let cell : ClosedPollsCell = tableView.dequeueReusableCell(withIdentifier: ClosedPollsCellId, for: indexPath) as! ClosedPollsCell
                    cell.adminDelegate = self
                    cell.setupClosedPollModel(closedPollsModel: bigRoomPollsViewModel.openPoll[indexPath.row],admin: admin,type:QAType.Active)
                    return cell
                    
                }else{
                    //不是管理员
                    let poll = bigRoomPollsViewModel.openPoll[indexPath.row]
                    //判断本人是否已经投票
                    
                    if poll.isSelfVoted(currentUserId: Int(BMCurrentUser.modId())!) {
                        let cell : ClosedPollsCell = tableView.dequeueReusableCell(withIdentifier: ClosedPollsCellId, for: indexPath) as! ClosedPollsCell
                        cell.setupClosedPollModel(closedPollsModel: bigRoomPollsViewModel.openPoll[indexPath.row],admin: admin,type:QAType.Active)

                        return cell
                    }else{
                        let cell : OpenPollsCell = tableView.dequeueReusableCell(withIdentifier: OpenPollsCellId, for: indexPath) as! OpenPollsCell
                        cell.submitDelegate = self
                        cell.pollViewModel = bigRoomPollsViewModel
                        cell.setupUI(pollsModel: poll, indexPath:indexPath as NSIndexPath)

                        return cell
                    }
                }
            }
        }else{
            
            if bigRoomPollsViewModel.closePoll.count == 0 {
                
                let cell: NoResultTableViewCell = tableView.dequeueReusableCell(withIdentifier: NoResultCellID, for:indexPath) as! NoResultTableViewCell
                cell.infoLabel.text = "When the host posts a poll, people can  submit answers here."
                return cell
            }else{
                let cell : ClosedPollsCell = tableView.dequeueReusableCell(withIdentifier: ClosedPollsCellId, for: indexPath) as! ClosedPollsCell
                cell.setupClosedPollModel(closedPollsModel: bigRoomPollsViewModel.closePoll[indexPath.row],admin:admin,type:QAType.Answered)
                return cell
            }
            
        }
    }
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if (statusView.type == .Active){
            if bigRoomPollsViewModel.openPoll.count == 0{
                return 600
            }else{
                return UITableViewAutomaticDimension
            }
            
        }else{
            if bigRoomPollsViewModel.closePoll.count == 0{
                return 600
            }else{
                return UITableViewAutomaticDimension
            }
        }
        
    }
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat{
        return 150
    }
    
    func didRecieveSelectBtnId(model:Poll,chooseArray:NSArray){
        var dict = [NSString:AnyObject]()
        dict["poll_id"]       =  model.obfuscatedId as AnyObject?
        dict["timestamp"]     =  ToolHelper.getCurrentTimeStamp() as AnyObject?
        dict["photo"]         =  conference.currentUserInfo?.photo as AnyObject?
        dict["choose"]        =  NSArray.init(array: chooseArray)
        dict["submit_sid"]    =  bm.socketID as AnyObject?
        dict["poll_question"] =  model.question as AnyObject?
        dict["choice"]        =  model.choiceIdDic
        
        self.bm.pollSubmit(dict)
        self.tableView.reloadData()
    }
    
    
}

extension BMPollsViewController : StatusDelegate{
    
    func qaStatusDelegateTypeChanged(type: QAType) {
        self.tableView.reloadData()
        if (self.statusView.type == .Answered){
            if self.bigRoomPollsViewModel.closePoll.count != 0{
                self.tableView.scrollToRow(at: NSIndexPath.init(row: 0, section: 0) as IndexPath, at: .bottom, animated: true)
            }
        }
    }

}

extension BMPollsViewController: BigRoomPollDelegate,AdminDelegate {
    func bigRoomNotificationDelegatePollReload(message: [NSObject : AnyObject]) {
        
        bigRoomPollsViewModel.requestPollsData(id: conference.obfuscatedId!, successCallback: {
            self.tableView.reloadData()
            if (self.statusView.type == .Active){
                if self.bigRoomPollsViewModel.openPoll.count != 0{
                    self.tableView.scrollToRow(at: NSIndexPath.init(row: self.bigRoomPollsViewModel.openPoll.count - 1, section: 0) as IndexPath, at: .bottom, animated: true)
                }
                
            }

        }) {}
        
    }
    
    func bigRoomNotificationDelegatePollDelete(message:[NSObject : AnyObject]){
         DispatchQueue.main.sync {
            guard let msgDict = message as? NSDictionary else { return }
            guard let obfuscatedId = msgDict["data"] as? String else { return }
            self.bigRoomPollsViewModel.deletePolls(obfuscatedId: obfuscatedId)
            self.tableView.reloadData()
        }
        
    }
    func deletePoll(model:Poll) {
        bigRoomPollsViewModel.requestDeletePollData(pollId: model.obfuscatedId, successCallback: {
            self.bigRoomPollsViewModel.deletePolls(obfuscatedId: model.obfuscatedId)
            self.tableView.reloadData()
            
        }) {}
        
    }
    func closePoll(model:Poll) {
        bigRoomPollsViewModel.requestClosedPollData(pollId: model.obfuscatedId, successCallback: {
            self.bigRoomPollsViewModel.requestPollsData(id: self.conference.obfuscatedId!, successCallback: {
                self.tableView.reloadData()
                }, failCallback: {
            })
        }) { }
        
    }
    
}



