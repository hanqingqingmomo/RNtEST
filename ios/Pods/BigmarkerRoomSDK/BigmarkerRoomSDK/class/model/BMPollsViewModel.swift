//
//  BigRoomPollsViewModel.swift
//  bigmarker
//
//  Created by 刘欣 on 12/20/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

class BMPollsViewModel {
    
    var openPoll:  [Poll] = []
    var closePoll: [Poll] = []
    
    var newPoll: Poll!

    func requestPollsData(id:String,successCallback : @escaping ()->(),failCallback : @escaping ()->()){
        

        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/polls"
        let params = ["mobile_token":BMCurrentUser.token(),"id":id]

        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard result is NSDictionary else {
                failCallback()
                return
            }
            
            guard let closedPolls = result["closed_polls"] as? NSArray else {
                failCallback()
                return
            }
            
            guard let openedPolls = result["opened_polls"] as? NSArray else {
                failCallback()
                return
            }
            
            self.closePoll = []
            self.openPoll  = []
            
            let _ = (closedPolls as! Array).map({
                (poll: NSDictionary) in
                self.closePoll.append(Poll(dictionary: poll))
            })
            
            let _ = (openedPolls as! Array).map({
                (poll: NSDictionary) in
                self.openPoll.append(Poll(dictionary: poll))
            })
            
            successCallback()
        }
        
    }

    func requestSubmitData(pollId:String,pollChoice:String,successCallback : @escaping ()->(),failCallback : @escaping ()->()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/polls/create"
        
        let params = ["mobile_token":BMCurrentUser.token(),"poll_id":pollId,"choice_ids":pollChoice, "mod_id": BMCurrentUser.modId()]

        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard result is NSDictionary else {
                failCallback()
                return
            }
            let res = result as! NSDictionary
            let status = res.object(forKey: "status") as! Int
            if status == 1{
                let poll = res.object(forKey: "poll") as! NSDictionary
                self.newPoll = Poll.init(dictionary: poll)
                self.updatePolls(pollModel: self.newPoll)
                successCallback()
            }else{
                failCallback()
            }
            
        }
    }
    func requestDeletePollData(pollId:String,successCallback : @escaping ()->(),failCallback : @escaping ()->()){
    
       let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/polls/delete"
        let params = ["mobile_token":BMCurrentUser.token(),"poll_id":pollId]
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            guard result is NSDictionary else {
                failCallback()
                return
            }
            let res = result as! NSDictionary
            let status = res.object(forKey: "status") as! Int
            if status == 1{
//                let poll = res.objectForKey("poll") as! NSDictionary
//                self.newPoll = Poll.init(dictionary: poll)
//                self.updatePolls(self.newPoll)
                successCallback()
            }else{
                failCallback()
            }

        }
    
    
    
    }
    func requestClosedPollData(pollId:String,successCallback : @escaping ()->(),failCallback : @escaping ()->()){
        
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/polls/end"
        let params = ["mobile_token":BMCurrentUser.token(),"poll_id":pollId]
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            guard result is NSDictionary else {
                failCallback()
                return
            }
            let res = result as! NSDictionary
            let status = res.object(forKey: "status") as! Int
            if status == 1{
                successCallback()
            }else{
                failCallback()
            }
            
        }

        
        
    }
    
    
    func updatePolls(pollModel:Poll){
        for (index,_pollModel) in self.openPoll.enumerated() {
            if _pollModel.obfuscatedId == pollModel.obfuscatedId {
                self.openPoll.removeObject(object: _pollModel)
                self.openPoll.insert(pollModel, at: index)
            }
        }
    }
    
    func deletePolls(obfuscatedId:String){
        if let poll = getOpenPollByObfuscatedId(obfuscatedId: obfuscatedId) {
            self.openPoll.removeObject(object: poll)
            
        }
        if let poll = getClosedPollByObfuscatedId(obfuscatedId: obfuscatedId) {
            self.closePoll.removeObject(object: poll)
        }
        
    }
    func getOpenPollByObfuscatedId(obfuscatedId:String)->Poll?{
        for poll in self.openPoll {
            if poll.obfuscatedId == obfuscatedId {
                return poll
            }
        }
        return nil
    }

    func getClosedPollByObfuscatedId(obfuscatedId:String)->Poll?{
        for poll in self.closePoll {
            if poll.obfuscatedId == obfuscatedId {
                return poll
            }
        }
        return nil
    }
    
}
