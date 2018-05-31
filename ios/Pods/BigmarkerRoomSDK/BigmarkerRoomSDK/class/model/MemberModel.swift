//
//  MemberModel.swift
//  bigmarker
//
//  Created by 刘欣 on 17/3/17.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class MemberModel: NSObject {

    var dictionary : NSDictionary
    
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

    var obfuscatedId: String {
        get {
            if let obfuscatedId = self.dictionary["obfuscated_id"] as? String {
                return obfuscatedId
            }
            return ""
        }
    }

    
    
    
}
