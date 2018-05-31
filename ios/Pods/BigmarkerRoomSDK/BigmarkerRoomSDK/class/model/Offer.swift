//
//  QA.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation
class Offer: NSObject {
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    
    var offerId: String {
        get {
            if let id = self.dictionary["id"] as? Int {
                return String(id)
            }
            return ""
        }
    }
    
    var isVertical: Bool {
        return self.style == "vertical"
    }
    
    var isCustom: Bool {
        return self.style == "custom"
    }
    
    var style: String {
        get {
            if let style = self.dictionary["style"] as? String {
                return style
            }
            return ""
        }
    }
    
    var teaser: String {
        get {
            if let teaser = self.dictionary["teaser"] as? String {
                return teaser
            }
            return ""
        }
    }
    
    var headline: String {
        get {
            if let headline = self.dictionary["headline"] as? String {
                return headline
            }
            return ""
        }
    }
    

    
    var normalPrice: String {
        get {
            if let normalPrice = self.dictionary["normal_price"] as? String {
                return normalPrice
            }
            return ""
        }
    }
    
    var discountedPrice: String {
        get {
            if let discountedPrice = self.dictionary["discounted_price"] as? String {
                return discountedPrice
            }
            return ""
        }
    }
    
    var buttonText: String {
        get {
            if let buttonText = self.dictionary["button_text"] as? String {
                return buttonText
            }
            return ""
        }
    }
    
    var buttonLink: String {
        get {
            if let buttonLink = self.dictionary["button_link"] as? String {
                return buttonLink
            }
            return ""
        }
    }
    
    var imageUrl: String {
        get {
            if let imageUrl = self.dictionary["image_url"] as? String {
                return imageUrl
            }
            return ""
        }
    }
    
    var bgColor: String {
        get {
            if let bgColor = self.dictionary["background_color"] as? String {
                return bgColor
            }
            return ""
        }
    }
    
    var buttonColor: String {
        get {
            if let buttonColor = self.dictionary["button_color"] as? String {
                return buttonColor
            }
            return ""
        }
    }
    
    var buttonTextColor: String {
        get {
            if let buttonColor = self.dictionary["button_text_color"] as? String {
                return buttonColor
            }
            return ""
        }
    }
    
    class func requestDatas(id:String,successCallback : @escaping (_ result: Offer)->(),failCallback : @escaping ()->()){
        
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/offers/\(id)"
        let params = ["mobile_token":BMCurrentUser.token()]
        
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
        
            guard let offer = result["offer"] as? NSDictionary else {
                failCallback()
                return
            }
            
            successCallback(Offer(dictionary: offer))
        }
    
    }
}
