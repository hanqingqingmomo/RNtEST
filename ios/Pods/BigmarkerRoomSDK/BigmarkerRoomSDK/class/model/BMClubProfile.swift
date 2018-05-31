//
//  ClubProfile.swift
//  bigmarker
//
//  Created by hanqing on 8/26/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation

class BMClubProfile: NSObject {

    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }

    var title: String {
        get {
            if let title = self.dictionary["title"] as? String {
                return title
            }
            return ""
        }
    }
    
    var bio: String {
        get {
            if let bio = self.dictionary["bio"] as? String {
                return bio
            }
            return ""
        }
    }
    
    var member: BMMember? {
        get {
            if let memberInfo = self.dictionary["member"] as? NSDictionary {
                return BMMember(dictionary: memberInfo)
            }
            return nil
        }
    }
    
    var photoUrl: String {
        get {
            if let photoUrl = self.dictionary["photo_url"] as? String {
                return photoUrl
            }
            return ""
        }
    }
    
    var name: String? {
        get {
            if let name = self.dictionary["name"] as? String {
                return name
            }
            return nil
        }
    }
    
}
