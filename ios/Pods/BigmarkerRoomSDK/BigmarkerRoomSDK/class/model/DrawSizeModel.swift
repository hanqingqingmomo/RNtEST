//
//  DrawSizeModel.swift
//  bigmarker
//
//  Created by 刘欣 on 2017/8/10.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class DrawSizeModel: NSObject {

    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var value: String {
        get {
            if let value = self.dictionary["value"] as? String{
                return value
            }
            if let pointSize = self.dictionary["value"] as? NSNumber {
                return pointSize.stringValue
            }
            return "0"
        }
    }
    
    var drawer: String{
        get {
            if let drawer = self.dictionary["drawer"] as? String{
                return drawer
            }
            return ""
        }
    }
    

    
}
