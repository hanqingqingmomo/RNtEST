//
//  Handout.swift
//  BigmarkerRoomSDK
//
//  Created by Han Qing on 11/5/2018.
//  Copyright © 2018 bigmarker. All rights reserved.
//

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
class Handout: NSObject {
    
    var dictionary: NSDictionary
    
    init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    

    var id: String {
        get {
            if let id = self.dictionary["obfuscated_id"] as? String {
                return id
            }
            return ""
        }
    }
    
    var icon: String {
        get {
            if let icon = self.dictionary["icon"] as? String {
                return icon
            }
            return ""
        }
    }
    
    
       var title: String {
        get {
            if let title = self.dictionary["file_name"] as? String {
                return title
            }
            return ""
        }
    }
    
    var previewUrl: String {
        get {
            if let previewUrl = self.dictionary["preview_url"] as? String {
                return previewUrl
            }
            return ""
        }
    }
    
    var fileType: String {
        get {
            if let fileType = self.dictionary["file_type"] as? String {
                return fileType
            }
            return ""
        }
    }
    
    var isImage: Bool {
        get {
            return fileType == "image/png"
        }
    }
    
    var url: String {
        get {
            if let url = self.dictionary["url"] as? String {
                return url
            }
            return ""
        }
    }
    
    
    class func requestDatas(id:String,successCallback : @escaping (_ result: [Handout])->(),failCallback : @escaping ()->()){
        
        
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/handouts"
        let params = ["mobile_token":BMCurrentUser.token(),"id":id]
        
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard result is NSDictionary else {
                failCallback()
                return
            }
            
            guard let handouts = result["handouts"] as? NSArray else {
                failCallback()
                return
            }
            
            var result: [Handout] = []
 
            let _ = (handouts as! Array).map({
                (handout: NSDictionary) in
                result.append(Handout(dictionary: handout))
            })
            
            successCallback(result)
        }
        
    }

    
    
    
}

