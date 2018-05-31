//
//  WhiteboardDrawModel.swift
//  bigmarker
//
//  Created by 刘欣 on 2017/8/10.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class WhiteboardDrawModel: NSObject {

    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var max : Int {
        get {
            if let max = self.dictionary["max"] as? Int {
                return max
            }
            return 0
        }
    }
    
    var pointColorArr: NSArray {
        get {
//            if let pointColor = self.dictionary["pointColor"] as? String {
//                let rang1 =  pointColor.range(of: "(")
//                let range2 = pointColor.range(of: "(")
//                let range = Range<String.Index>(start: (rang1?.endIndex)!,end: (range2?.startIndex)!)
//                let pointStr = pointColor.substringWithRange(range)
//                let pointColorArr = pointStr.componentsSeparatedByString(", ")
//                return pointColorArr
//            }
            return ["","","",""]
        }
    }
    
    var red: CGFloat {
        
        get {
            var redFloat : CGFloat = 0
            if let red = pointColorArr[0] as? String {
                if let doubleValue = Double(red)
                {
                    redFloat = CGFloat(doubleValue)
                }
                
                return redFloat
            }
            return 0.0
        }
    }
    var green: CGFloat {
        get {
            var greenFloat : CGFloat = 0
            if let green = pointColorArr[1] as? String {
                
                if let doubleValue = Double(green)
                {
                    greenFloat = CGFloat(doubleValue)
                }
                return greenFloat
            }
            return 0.0
        }
    }
    
    var blue: CGFloat {
        get {
            
            var blueFloat : CGFloat = 0
            if let blue = pointColorArr[2] as? String {
                if let doubleValue = Double(blue)
                {
                    blueFloat = CGFloat(doubleValue)
                }
                return blueFloat
            }
            return 0.0
        }
    }
    
    var pointSize : String {
        get {
            if let pointSize = self.dictionary["pointSize"] as? String {
                return pointSize
            }
            if let pointSize = self.dictionary["pointSize"] as? NSNumber {
                return pointSize.stringValue
            }
            return "0"
        }
    }
    
    var position : Int {
        get {
            if let position = self.dictionary["position"] as? Int {
                return position
            }
            return 0
        }
    }
    
    var size: NSDictionary {
        get {
            var dict = [NSString: AnyObject]()
            dict = self.dictionary["size"] as! NSDictionary as! [NSString : AnyObject]
            return  dict as NSDictionary
        }
    }
    
    var phoneWidth: Float {
        get {
            if let phoneWidth = size["width"] as? Float {
                return phoneWidth
            }
            return 0
        }
    }
    
    var phoneHeight: Float {
        get {
            if let phoneHeight = size["height"] as? Float {
                return phoneHeight
            }
            return 0
        }
    }
    
    
    
    var value : String {
        get {
            if let value1 = self.dictionary["value"] as? String {
                let substringArray = value1.components(separatedBy: ",")
                let value2 = substringArray.last
                return value2!
            }
            return ""
        }
    }
    
    var whId : String {
        get {
            if let whId = self.dictionary["whId"] as? String {
                return whId
            }
            return ""
        }
    }
    
    var whIndex : Int {
        get {
            if let whIndex = self.dictionary["whIndex"] as? Int {
                return whIndex
            }
            return 0
        }
    }
    var clear : Int {
        get {
            if let clear = self.dictionary["clear"] as? Int {
                return clear
            }
            return 0
        }
    }

    
}
