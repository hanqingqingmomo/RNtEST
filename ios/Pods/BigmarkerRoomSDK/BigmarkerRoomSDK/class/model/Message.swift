//
//  Message.swift
//  bigmarker
//
//  Created by hanqing on 2/11/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class Message: NSObject {
    
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var id: String? {
        get {
            if let id = self.dictionary["_id"] as? String {
                return id
            }
            return nil
        }
    }
    
    var sid: String? {
        get {
            if let sid = self.dictionary["sid"] as? String {
                return sid
            }
            return nil
        }
    }
    
    var toId: String? {
        get {
            if let toId = self.dictionary["to_id"] as? String {
                return toId
            }
            return nil
        }
    }
    
    var userName: String? {
        get {
            if let userName = self.dictionary["name"] as? String {
                return userName
            }
            return nil
        }
    }
    
    var avatarUrl: String? {
        get {
            if let avatarUrl = dictionary["photo"] as? String {
                return avatarUrl
            }
            return nil
        }
    }
    
    var content: String? {
        get {
            if let content = self.dictionary["content"] as? String {
                return content
            }
            return nil
        }
    }
    
    
    var time: Int64? {
        get {
            if let time = self.dictionary["timestamp"] as? NSNumber {
                return  time.int64Value
            }
            return nil
        }
    }
    
    
    var formatTime: String? {
        get {
            if let time = self.dictionary["timestamp"] as? NSNumber {
                return ""
                let myDataSource: NSString = "\(time)" as NSString
                let date = NSDate(timeIntervalSince1970: myDataSource.doubleValue/1000)
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "hh:mm:ss a"
                dateFormatter.timeZone = NSTimeZone() as TimeZone!
                return dateFormatter.string(from: date as Date)
            }
            return nil
        }
    }
    
    var conference_type: String? {
        get {
            if let type = self.dictionary["type"] as? String {
                return type
            }
            return nil
        }
    }
    
    
}
