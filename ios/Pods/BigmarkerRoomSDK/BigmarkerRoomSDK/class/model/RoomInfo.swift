//
//  RoomInfo.swift
//  bigmarker
//
//  Created by hanqing on 7/13/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class RoomInfo: NSObject{
    var id   = ""
    var name = ""
    var startTime = ""
    var endTime   = ""
    
    init(id: String, name: String) {
        super.init()
        self.id = id
        self.name = name
    }
}