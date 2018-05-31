//
//  CurrentUser.swift
//  bigmarker
//
//  Created by hanqing on 8/17/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import Foundation

open class BMCurrentUser: NSObject {
    
    public class func modUserName() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        if let modUserName = prefs.object(forKey: "MODUSERNAME") as? String {
            return modUserName
        } else {
            return ""
        }
    }
    
    public class func modId() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        if let modId = prefs.object(forKey: "MODID") as? String {
            return modId
        } else {
            return ""
        }
    }
    
    
    public class func name() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        if let username = prefs.object(forKey: "BMUSERNAME") as? String {
            return username
        } else {
            return ""
        }
    }
    
    public class func email() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        if let email = prefs.object(forKey: "BMEMAIL") as? String {
            return email
        } else {
            return ""
        }
    }
    
    public class func token() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        if let token = prefs.object(forKey: "BMTOKEN") {
            return token as! String
        } else {
            return ""
        }
    }
    public class func id() -> Int {
        let prefs:UserDefaults = UserDefaults.standard
        if let id = prefs.object(forKey: "BMUSERID") {
            return id as! Int
        } else {
            return 0
        }
        
    }
    public class func obfuscatedId() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        if let obfuscatedId = prefs.object(forKey: "BMobfuscatedId") {
            return obfuscatedId as! String
        } else {
            return ""
        }
        
    }
    
    public class func timeZone() -> String{
        let systemZone = NSTimeZone.system.identifier
        if UserDefaults.standard.value(forKey: "CurrentTimeZone") == nil {
            UserDefaults.standard.set(systemZone, forKey: "CurrentTimeZone")
        }
        return UserDefaults.standard.value(forKey: "CurrentTimeZone") as! String
    }
    
    public class func avatar() -> String {
        //let prefs:NSUserDefaults = NSUserDefaults.standardUserDefaults()
        return ToolHelper.currentUserAvatarUrl()
        //        let image = UIImage(named: "default_profile_picture")
        //        return image!
    }
    
    public class func clearInfo(){
        let prefs:UserDefaults = UserDefaults.standard
        prefs.removeObject(forKey: "BMUSERNAME")
        //prefs.removeObjectForKey("EMAIL")
        prefs.removeObject(forKey: "BMTOKEN")
        prefs.removeObject(forKey: "BMAVATARURL")
        prefs.removeObject(forKey: "BMISLOGGEDIN")
        prefs.removeObject(forKey: "BMUSERID")
        prefs.removeObject(forKey: "BMobfuscatedId")
        prefs.synchronize()
    }
    
    public class func saveInfo(responseObject: AnyObject!){
        let prefs:UserDefaults = UserDefaults.standard
        prefs.set(responseObject["email"] ?? "", forKey: "BMEMAIL")
        prefs.set(responseObject["username"] ?? "", forKey: "BMUSERNAME")
        prefs.set(responseObject["api_token"] ?? "", forKey: "BMTOKEN")
        prefs.set(responseObject["photo"] ?? "", forKey: "BMAVATARURL")
        prefs.set(1, forKey: "ISLOGGEDIN")
        prefs.set(responseObject["id"] ?? "", forKey: "BMUSERID")
        prefs.set(responseObject["obfuscated_id"] ?? "", forKey: "BMobfuscatedId")
        prefs.set(responseObject["mod_id"] ?? "", forKey: "MODID")
        prefs.set(responseObject["mod_user_name"] ?? "", forKey: "MODUSERNAME")
        
        prefs.synchronize()
    }
    
    
}
