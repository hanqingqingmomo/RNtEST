//
//  Poll.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation
class Poll: NSObject {
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var id: String {
        get {
            if let id = self.dictionary["id"] as? String {
                return id
            }
            return ""
        }
    }
    
    var cluId: String {
        get {
            if let cluId = self.dictionary["club_id"] as? String {
                return cluId
            }
            return ""
        }
    }
    
    var question: String {
        get {
            if let question = self.dictionary["question"] as? String {
                return question
            }
            return ""
        }
    }
    
    var clubProfileId: String {
        get {
            if let clubProfileId = self.dictionary["club_profile_id"] as? String {
                return clubProfileId
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
    
    var closeDate: String {
        get {
            if let closeDate = self.dictionary["close_date"] as? String {
                return closeDate
            }
            return ""
        }
    }
    
    var endPoll: Bool {
        get {
            if let endPoll = self.dictionary["end_Poll"] as? Bool {
                return endPoll
            }
            return false
        }
    }
    
    var randomId: String {
        get {
            if let randomId = self.dictionary["random_id"] as? String {
                return randomId
            }
            return ""
        }
    }
    
    var obfuscatedId: String {
        get {
            if let obfuscatedId = self.dictionary["obfuscated_id"] as? String {
                return obfuscatedId
            }
            return ""
        }
    }
    var voteTime: String {
        get {
            if let voteTime = self.dictionary["vote_time"] as? String {
                return voteTime
            }
            return ""
        }
    }
    var choices: [PollChoice]?  {
        get {
            if let choiceArray = self.dictionary["choices"] as? NSArray {
                var choices: [PollChoice] = []
                for choice  in choiceArray {
                    choices.append(PollChoice.init(dictionary: choice as! NSDictionary))
                }
                return choices
            }
            return nil
        }
    }
    
    var responses: [PollResponse]?  {
        get {
            if let responseArray = self.dictionary["responses"] as? NSArray {
                var responses: [PollResponse] = []
                for response  in responseArray {
                    responses.append(PollResponse.init(dictionary: response as! NSDictionary))
                }
                return responses
            }
            return nil
        }
    }
    

    var singleAnswer: Bool {
      return self.selectionMethod == "single"
    }
    
    var choiceIdDic: NSDictionary {
         get {
            let dict = [NSString: AnyObject]()
            guard let choices = self.choices else { return dict as NSDictionary }
            for (_, choice) in choices.enumerated() {
                var params = [NSString: AnyObject]()
                params["choice_id"] = choice.id as AnyObject?
                params["value"]     = choice.choice as AnyObject?
                //dict["\(index)"] = params
            }
            return  dict as NSDictionary
        }
    }
    

    func isSelfVoted(currentUserId: Int) -> Bool{
        
        if BMCurrentUser.modId() != "" {
            for response in self.responses! {
                if response.modId == currentUserId {
                    return true
                }
            }
        } else {
            for response in self.responses! {
                if response.memberId == currentUserId {
                    return true
                }
            }
        }
        
        return false
    }
     
    
}
