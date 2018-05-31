//
//  Member.swift
//  bigmarker
//
//  Created by hanqing on 3/2/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation

class BMMember: NSObject {
    
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var sid: String? {
        get {
            if let sid = self.dictionary["sid"] as? String {
                return sid
            }
            return nil
        }
    }
    
    var name: String? {
        get {
            if let name = self.dictionary["username"] as? String {
                return name
            }
            return nil
        }
    }
    
    var photo: String? {
        get {
            if let photo = self.dictionary["photo"] as? String {
                return photo
            }
            return nil
        }
    }
    
    var room_id: String? {
        get {
            if let room_id = self.dictionary["room_id"] as? String {
                return room_id
            }
            return nil
        }
    }
    
    var role: String? {
        get {
            if let role = self.dictionary["role"] as? String {
                return role
            }
            return nil
        }
    }
    
}
