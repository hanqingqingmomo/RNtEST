//
//  QA.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation
class QA: NSObject {
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var id: String {
        get {
            if let id = self.dictionary["id"] as? String {
                return id
            }
            if let userId = self.dictionary["user_id"] as? String {
                return userId
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
    
    var content: String {
        get {
            if let content = self.dictionary["content"] as? String {
                return content
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
    
    private var _answered = -1
    var answered: Bool {
        get {
            
            if _answered != -1 {
                return _answered == 1
            }
            
            if let answered = self.dictionary["answered"] as? Bool {
                return answered
            }
            if let answered = self.dictionary["answered"] as? Int {
                return  answered == 1
            }
            return false
        }
        
        set(status) {
            if status {
                _answered = 1
            } else {
                _answered = 0
            }
        }
    }
    
    var conferenceId: String {
        get {
            if let conferenceId = self.dictionary["conference_id"] as? String {
                return conferenceId
            }
            return ""
        }
    }
    
    var userName: String {
        get {
            if BMCurrentUser.modId() == "" {
                if let userName = self.dictionary["user_name"] as? String {
                    return userName
                }
            } else {
                if let modUserName = self.dictionary["mod_user_name"] as? String {
                    return modUserName
                } else if let userName = self.dictionary["user_name"] as? String {
                    return userName
                }
            }
            return ""
        }
    }
    
    var time: String {
        get {
            if let time = self.dictionary["time"] as? String {
                return time
            }
            if let createdAt = self.dictionary["created_at"] as? String {
                return createdAt
            }
            return ""
        }
    }
    
    var userAvatar: String {
        get {
            if let userAvatar = self.dictionary["user_avatar"] as? String {
                return userAvatar
            }
            if let avatar = self.dictionary["avatar"] as? String {
                return avatar
            }
            return ""
        }
    }
    
    private var _voteCount = -1
    var voteCount: Int {
        get {
            if _voteCount != -1 {
                return _voteCount
            }
            
            if let voteCount = self.dictionary["vote_count"] as? Int {
                _voteCount = voteCount
                return _voteCount
            }
            return 0
        }
        
        set(count) {
          _voteCount = count
        }
    }
    
    
    var voted: Bool {
       return voteCount > 0
    }
    
    var userId: String {
        get {
            if let userId = self.dictionary["user_id"] as? String {
                return userId
            }
            return ""
        }
    }
    
    var userEmail: String {
        get {
            if let userEmail = self.dictionary["user_email"] as? String {
                return userEmail
            }
            return ""
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
    
}
