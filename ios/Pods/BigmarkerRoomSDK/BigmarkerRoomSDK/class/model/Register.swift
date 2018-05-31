//
//  Register.swift
//  bigmarker
//
//  Created by hanqing on 7/2/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class Register: NSObject{

    var name      = ""
    var photo_url = ""
    
    init(name: String, photo_url: String) {
        super.init()
        self.name = name
        self.photo_url = photo_url
    }
}