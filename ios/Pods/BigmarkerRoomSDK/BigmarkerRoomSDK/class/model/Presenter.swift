//
//  Presenter.swift
//  bigmarker
//
//  Created by hanqing on 7/2/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class Presenter: NSObject{
    
    var name: String?
    var photo_url: String?
    var detail: String?
    
    init(name: String, photo_url: String, detail: String) {
        super.init()
        self.name = name
        self.photo_url = photo_url
        self.detail = detail
    }
}