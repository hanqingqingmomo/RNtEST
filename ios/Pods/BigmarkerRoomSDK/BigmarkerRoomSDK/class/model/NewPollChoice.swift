//
//  NewPollChoice.swift
//  bigmarker
//
//  Created by 刘欣 on 17/4/17.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class NewPollChoice: NSObject {

    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var choice: String {
        get {
            if let choice = self.dictionary["value"] as? String {
                return choice
            }
            return ""
        }
    }

    var choiceId: String {
//        get {
//            if let choiceId = self.dictionary["choice_id"] as? String {
//                return choiceId
//            }
//            return ""
//        }
        get {
            if let choiceId = self.dictionary["choice_id"] as? NSNumber {
                return choiceId.stringValue
            }else if let choiceId = self.dictionary["choice_id"] as? String {
                return choiceId
            }
            return ""
        }

       
    }
    
}
