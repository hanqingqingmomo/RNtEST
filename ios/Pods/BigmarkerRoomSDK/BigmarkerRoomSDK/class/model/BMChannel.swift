//
//  Channel.swift
//  bigmarker
//
//  Created by hanqing on 8/27/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

//
//  Community.swift
//  bigmarker
//
//  Created by hanqing on 7/2/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import Foundation
class BMChannel: NSObject {
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var member: MemberModel? {
        get {
            if let member = self.dictionary["member"] as? NSDictionary {
                return MemberModel(dictionary: member)
            }
            return nil
        }
    }
    
    var id: String {
        get {
            if let id = self.dictionary["club_id"] as? String {
                return id
            }
            return ""
        }
    }
    
    var logo: String {
        get {
            if let logo = self.dictionary["logo"] as? String {
                return logo
            }
            return ""
        }
    }
    
    
    var backgroundImage: String {
        get {
            if let backgroundImage = self.dictionary["background_image"] as? String {
                return backgroundImage
            }
            return ""
        }
    }
    
    var categories: Array<String>? {
        get {
            if let categories = self.dictionary["categories"] as? Array<String> {
                return categories
            }
            return nil
        }
    }
    
    var reviewsCount: String {
        get {
            if let reviewsCount = self.dictionary["reviews_count"] as? String {
                return reviewsCount
            }
            return "0"
        }
    }
    
    
    var name: String {
        get {
            if let name = self.dictionary["name"] as? String {
                return name
            }
            return ""
        }
    }
    
    var overview: String {
        get {
            if let overview = self.dictionary["overview"] as? String {
                return overview
            }
            return ""
        }
    }
    
    var averageRating: String {
        get {
            if let averageRating = self.dictionary["average_rating"] as? String {
                return averageRating
            }
            return "0"
        }
    }
    
 
}
