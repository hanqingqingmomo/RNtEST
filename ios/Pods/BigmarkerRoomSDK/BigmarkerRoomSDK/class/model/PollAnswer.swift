//
//  PollAnswer.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation
class PollAnswer: NSObject {
    
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
    
    var pollResponseId: String {
        get {
            if let pollResponseId = self.dictionary["poll_response_id"] as? String {
                return pollResponseId
            }
            return ""
        }
    }
    
    var pollChoiceId: String {
        get {
            if let pollChoiceId = self.dictionary["poll_choice_id"] as? String {
                return pollChoiceId
            }
            return ""
        }
    }

}