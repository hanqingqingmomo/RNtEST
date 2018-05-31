//
//  ArrayExt.swift
//  bigmarker
//
//  Created by hanqing on 4/28/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation

extension Array {
    mutating func removeObject<U: Equatable>(object: U) {
        var index: Int?
        for (idx, objectToCompare) in self.enumerated() {
            if let to = objectToCompare as? U {
                if object == to {
                    index = idx
                }
            }
        }
        
        if(index != nil) {
            self.remove(at: index!)
        }
    }
    
    func ref (i:Int) -> Element? {
        return 0 <= i && i < count ? self[i] : nil
    }
}
