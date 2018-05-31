//
//  DrawPositionModel.swift
//  bigmarker
//
//  Created by 刘欣 on 2017/8/10.
//  Copyright © 2017年 hanqing. All rights reserved.
//

import UIKit

class DrawPositionModel: NSObject {

    
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
    
    
    var pointSize: String {
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
    
    var pointColorArr: NSArray {
        get {
//            if let pointColor = self.dictionary["pointColor"] as? String {
//                let rang1 = pointColor.range(of: "(")
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
    

    
}
