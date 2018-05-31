//
//  NewPoll.swift
//  bigmarker
//
//  Created by 刘欣 on 17/4/17.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class NewPoll: NSObject {

    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var pollQuestion: String {
        get {
            if let pollQuestion = self.dictionary["poll_question"] as? String {
                return pollQuestion
            }
            return ""
        }
    }
    var pollId: String {
        get {
            if let pollId = self.dictionary["poll_id"] as? String {
                return pollId
            }
            return ""
        }
    }

    var selectionMethod: String {
        get {
            if let selectionMethod = self.dictionary["selection_method"] as? String {
                return selectionMethod
            }
            return ""
        }
    }
    var timestamp: String {
        get {
            if let timestamp = self.dictionary["timestamp"] as? String {
                return timestamp
            }
            return ""
        }
    }
    var photo: String {
        get {
            if let timestamp = self.dictionary["photo"] as? String {
                return photo
            }
            return ""
        }
    }
    
    
    var choices: [NewPollChoice]?  {
        get {
            if let choiceDic = self.dictionary["choice"] as? NSDictionary {
                var choices: [NewPollChoice] = []
                
                let sortedKeys = (choiceDic.allKeys as! [String]).sorted(by: <)
                
                for (_, key) in sortedKeys.enumerated(){
                    if let poll = choiceDic[key] as? NSDictionary {
                        choices.append(NewPollChoice.init(dictionary: poll))
                    }
                }
                return choices
            }
            return nil
        }
    }

    var choiceIdDic : NSDictionary {
        
        let choiceDic = self.dictionary["choice"] as? NSDictionary
         return choiceDic!
        
    }
    
    
}
