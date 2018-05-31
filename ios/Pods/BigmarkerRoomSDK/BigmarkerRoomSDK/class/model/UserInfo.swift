//
//  UserInfo.swift
//  bigmarker
//
//  Created by hanqing on 7/13/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class UserInfo: NSObject {
    
    var id    = ""
    var name  = ""
    var bio   = ""
    var photo = ""
    var role  = ""
    
    init(id: String, name: String, bio: String, photo: String, role: String) {
        super.init()
        self.id    = id
        self.name  = name
        self.bio   = bio
        self.photo = photo
        self.role  = role
    }
    
    
}