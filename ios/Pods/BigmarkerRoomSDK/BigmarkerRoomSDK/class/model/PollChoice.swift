//
//  PollChoice.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation
class PollChoice: NSObject {
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var id: Int {
        get {
            if let id = self.dictionary["id"] as? Int {
                return id
            }
            return 0
        }
    }
    
    var count: Int {
        get {
            if let count = self.dictionary["count"] as? Int {
                return count
            }
            return 0
        }
    }
    
    var votePercent: String {
        get {
            if let votePercent = self.dictionary["vote_percent"] as? String {
                return votePercent
            }
            return "0%"
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
    
    var choice: String {
        get {
            if let choice = self.dictionary["choice"] as? String {
                return choice
            }
            return ""
        }
    }
    
    var answers: [PollAnswer]? {
        get {
            if let answerArray = self.dictionary["answers"] as? NSArray {
                var answers: [PollAnswer] = []
                for answer  in answerArray {
                    answers.append(PollAnswer.init(dictionary: answer as! NSDictionary))
                }
                return answers
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
}