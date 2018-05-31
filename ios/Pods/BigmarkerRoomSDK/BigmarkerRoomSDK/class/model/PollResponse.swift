//
//  PollResponse.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation
class PollResponse: NSObject {
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
    
    var pollId: String {
        get {
            if let pollId = self.dictionary["poll_id"] as? String {
                return pollId
            }
            return ""
        }
    }
    
    var radioSelection: String {
        get {
            if let radioSelection = self.dictionary["radio_selection"] as? String {
                return radioSelection
            }
            return ""
        }
    }
    
    var memberId: Int {
        get {
            if let memberId = self.dictionary["member_id"] as? Int {
                return memberId
            }
            return 0
        }
    }
    
    var modId: Int {
        get {
            if let modId = self.dictionary["mod_id"] as? Int {
                return modId
            }
            return 0
        }
    }
    
    var source: String {
        get {
            if let source = self.dictionary["source"] as? String {
                return source
            }
            return ""
        }
    }

}
