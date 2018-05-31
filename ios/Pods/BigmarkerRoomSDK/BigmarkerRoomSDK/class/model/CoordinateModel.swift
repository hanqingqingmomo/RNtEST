//
//  CoordinateModel.swift
//  bigmarker
//
//  Created by 刘欣 on 2017/8/10.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class CoordinateModel: NSObject {

    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    
    var drawer: String{
        get {
            if let drawer = self.dictionary["drawer"] as? String{
                return drawer
            }
            return ""
        }
    }
    
    var whiteboard: NSDictionary {
        get {
            var dict = [NSString: AnyObject]()
            dict = self.dictionary["whiteboard"] as! NSDictionary as! [NSString : AnyObject]
            return  dict as NSDictionary
        }
    }
    
    var webWidth: Float {
        get {
            if let webWidth = whiteboard["width"] as? Float {
                return webWidth
            }
            return 0
        }
    }
    
    var webHeight: Float {
        get {
            if let webHeight = whiteboard["height"] as? Float {
                return webHeight
            }
            return 0
        }
    }
    
    var offset: NSDictionary {
        get {
            var dict = [NSString: AnyObject]()
            dict = self.dictionary["offset"] as! NSDictionary as! [NSString : AnyObject]
            return  dict as NSDictionary
        }
    }
    
    var offsetLeft: Float {
        get {
            if let offsetLeft = offset["left"] as? Float {
                return offsetLeft
            }
            return 0
        }
    }
    
    
    var offsetTop: Float {
        get {
            if let offsetTop = offset["top"] as? Float {
                return offsetTop
            }
            return 0
        }
    }
    
    var dataX: Float {
        get {
            if let x = self.dictionary["x"] as? Float {
                return x
            }
            return 0
        }
    }
    var dataY: Float {
        get {
            if let y = self.dictionary["y"] as? Float {
                return y
            }
            return 0
        }
    }
    var saveHistory: Bool {
        get {
            if let saveHistory = self.dictionary["saveHistory"] as? Bool {
                return saveHistory
            }
            return false
        }
    }
    
    

    
}
