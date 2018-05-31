//
//  ToolHelper.swift
//  bigmarker
//
//  Created by hanqing on 12/28/14.
//  Copyright (c) 2014 hanqing. All rights reserved.
//
import EventKit
import UIKit
class ToolHelper {
    
   class func convertEmoji( msg: inout String) -> Dictionary<Int, String>{
        
        var values: Dictionary<Int, String> = [:]
//        var images: Array<String> = []
//        if Regex("(<img.*?>)").test(input: msg) {
//            let matches = matchesForRegexInText(regex: "(<img.*?>)", text: msg)
//            
//            for match in matches {
//                var emojiName = ""
//                
//                // 得到emoji名称
//                var s = matchesForRegexInText(regex: "/(.*png)", text: match)
//                if !s.isEmpty{
//                    let s1 = s[0] as String
//                    let news = s1.characters.split {$0 == "/"}.map { String($0) }
//                    emojiName = news.last!
//                    images.append(emojiName)
//                }
//                
//                
//                print(emojiName)
//                print(values)
//                
//                //计算emoji位置
//                while (msg.range(of: match) != nil) {
//                    let index = msg.range(of: match)?.lowerBound
//                    msg = msg.replacingCharacters(in: msg.range(of: match)!, with: "")
//                    values[Int("\(index!)")!] = emojiName
//                }
//            }
//        }
    
        return values
    }
    
    
    class func getCurrentTimeStamp()->Int{
        let now = NSDate()
        let timeInterval:TimeInterval = now.timeIntervalSince1970
        let timeStamp = Int(timeInterval)
        return timeStamp
    }
    
    class func matchesForRegexInText(regex: String!, text: String!) -> [String] {
        
        let regex = try! NSRegularExpression(pattern: regex,
                                             options: [])
        let nsString = text as NSString
        let results = regex.matches(in: text,
                                            options: [], range: NSMakeRange(0, nsString.length))
        
        return results.map { nsString.substring(with: $0.range)}
    }
    
   class func uniq<S : Sequence, T : Hashable>(source: S) -> [T] where S.Iterator.Element == T {
        var buffer = [T]()
        var added = Set<T>()
        for elem in source {
            if !added.contains(elem) {
                buffer.append(elem)
                added.insert(elem)
            }
        }
        return buffer
    }
    
    class func checkNetworkAvailable() {
        
//        AFNetworkReachabilityManager.sharedManager().startMonitoring()
//        
//        AFNetworkReachabilityManager.sharedManager().setReachabilityStatusChangeBlock { (status: AFNetworkReachabilityStatus) -> Void in
//            switch status.hashValue{
//            case AFNetworkReachabilityStatus.NotReachable.hashValue:
//                NSNotificationCenter.defaultCenter().postNotificationName("NetworkIsReachable", object: nil)
//                break
//            case AFNetworkReachabilityStatus.ReachableViaWiFi.hashValue, AFNetworkReachabilityStatus.ReachableViaWWAN.hashValue:
//                break
//            default:
//                NSNotificationCenter.defaultCenter().postNotificationName("NetworkIsUnReachable", object: nil)
//                break
//            }
//        }

    }
    
    class func showAlertViewAboutNetwork(view: UIView, msg: String = "Internet connection not available") {
        //if  !AFNetworkReachabilityManager.sharedManager().reachable {
            let hud = MBProgressHUD.showAdded(to: view, animated: true)
            //hud.mode = MBProgressHUDModeText
            hud.margin = 20
            hud.labelText = msg
            hud.labelFont = UIFont(name: "BMSFUIDisplay_Regular", size: 15)!
            hud.hide(true, afterDelay: 3)
        //}
    }
    
    class func showAlertView(view: UIView, msg: String = "") {
        let hud = MBProgressHUD.showAdded(to: view, animated: true)
        //hud.mode = MBProgressHUDModeText
        hud.margin = 20
        hud.labelText = msg
        hud.labelFont = UIFont(name: "BMSFUIDisplay_Regular", size: 15)!
        hud.hide(true, afterDelay: 3)
    }
    

    
    class func createUIActivityIndicatorView() -> UIActivityIndicatorView {
        let loadIndicator = createUIActivityIndicatorView()
        loadIndicator.activityIndicatorViewStyle = .gray
        loadIndicator.center = CGPoint(x: 150, y: 85)
        return loadIndicator
    }
    
    class func currentUsername() -> String {
        let prefs:UserDefaults = UserDefaults.standard
        return prefs.object(forKey: "USERNAME") as! String
    }
    
    
    class func currentUserAvatar() -> UIImage{
        let prefs:UserDefaults = UserDefaults.standard
        //return currentUserDefaultAvatar()

        let url = NSURL(string:  prefs.object(forKey: "AVATARURL")as! String )
        let data = NSData(contentsOf: url! as URL)
        if data == nil {
            return currentUserDefaultAvatar()
        }
        let image = UIImage(data: data! as Data)
        if image != nil {
            return  image!
        } else {
            return currentUserDefaultAvatar()
        }
    }
    
    class func currentUserAvatarUrl() ->String {
        let prefs:UserDefaults = UserDefaults.standard
        
        if let avatar = prefs.object(forKey: "AVATARURL") as? String{
            return avatar
        } else {
            return ""
        }
    }
    
    class func currentUserDefaultAvatar() -> UIImage{
        return UIImage(named: "BMSDK.bundle/default_profile_picture")!
    }
    
    // asyn fetch
    class func fetchRemoteImage(url: String) -> UIImage{
        let url   = NSURL(string:  url)
        let data  = NSData(contentsOf: url! as URL)
 
        if data == nil {
            return currentUserDefaultAvatar()
        }
        
        let image = UIImage(data: data! as Data)
        if image != nil {
            return  image!
        } else {
            return currentUserDefaultAvatar()
        }
    }
    
    class func clearHtml(str: String) -> String{
        let regex:NSRegularExpression  = try! NSRegularExpression(
            pattern: "<.*?>",
            options: NSRegularExpression.Options.caseInsensitive)
        
        let range = NSMakeRange(0, str.characters.count)
        let htmlLessString :String = regex.stringByReplacingMatches(in: str,
            options: NSRegularExpression.MatchingOptions(),
            range:range ,
            withTemplate: "")
        return htmlLessString
    }
    
    class func decodeHtml(encodedString: String) -> String {
        let encodedData = encodedString.data(using: String.Encoding.utf8)!
        let attributedOptions : [String: AnyObject] = [
            NSDocumentTypeDocumentAttribute: NSHTMLTextDocumentType as AnyObject,
            NSCharacterEncodingDocumentAttribute: String.Encoding.utf8 as AnyObject
        ]
        let attributedString = try! NSAttributedString(data: encodedData, options: attributedOptions, documentAttributes: nil)
        let decodedString = attributedString.string
        return decodedString
    }
    
    
//    class func clearFackbookToken(){
//        FBSDKAccessToken.setCurrentAccessToken(nil)
//    }
//    
//    class func clearLinkedinToken(){
//        LISDKSessionManager.clearSession()
//    }
    
    class func heightForView(text:String, font:UIFont, width:CGFloat) -> CGFloat{
        let label:UILabel = UILabel(frame: CGRect.init(x: 0, y: 0, width: width, height: CGFloat.greatestFiniteMagnitude))
        label.numberOfLines = 0
        label.lineBreakMode = NSLineBreakMode.byWordWrapping
        label.font = font
        label.text = text
        
        label.sizeToFit()
        return label.frame.height
    }
    
    
    class func convertDateFormater(dateString: String) -> NSDate? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"//this your string date format
        dateFormatter.timeZone = NSTimeZone(name: "UTC") as TimeZone!
        return dateFormatter.date(from: dateString) as NSDate?
    }
    
}
