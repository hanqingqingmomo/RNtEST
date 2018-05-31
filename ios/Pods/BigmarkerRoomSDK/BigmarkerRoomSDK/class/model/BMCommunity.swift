//
//  Community.swift
//  bigmarker
//
//  Created by hanqing on 7/2/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class BMCommunity: NSObject {
    
    var id       = ""
    var name     = ""
    var overview = ""
    var averageRating: Int = 0
    var imageUrl = ""
    var reviewsCount: Int = 0
    
    init(id: String, name: String, overview: String, averageRating: Int, imageUrl: String, reviewsCount:Int) {
        super.init()
        self.id = id
        self.name = name
        self.overview = overview
        self.averageRating = averageRating
        self.imageUrl = imageUrl
        self.reviewsCount = reviewsCount
    }
    
}
