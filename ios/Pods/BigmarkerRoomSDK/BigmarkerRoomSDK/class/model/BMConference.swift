//
//  Conference.swift
//  login
//
//  Created by hanqing on 12/11/14.
//  Copyright (c) 2014 hanqing. All rights reserved.
//
import Foundation

public class BMConference: NSObject {
    
    
    var dictionary: NSDictionary
    
    public init(dictionary: NSDictionary) {
        self.dictionary = dictionary
    }
    
    var currentUserInfo: UserInfo? {
        get {
            if let userInfo = self.dictionary["user_info"] as? NSDictionary {
                //print("===========================")
                let id      = userInfo["id"] as? String ?? ""
                let name    = userInfo["name"] as? String ?? ""
                let bio     = userInfo["bio"] as? String ?? ""
                let photo   = userInfo["photo"] as? String ?? ""
                let role    = userInfo["role"] as? String ?? ""
                return UserInfo(id: id, name: name, bio: bio, photo: photo, role: role)
            }
            return nil
        }
    }
    
    var roomInfo: RoomInfo? {
        get {
            if let roomInfo = self.dictionary["room_info"] as? NSDictionary {
                let id        = roomInfo["id"] as? String ?? ""
                let name      = roomInfo["name"] as? String ?? ""
                //                var startTime = roomInfo["start_time"] as! String
                //                var endtime   = roomInfo["end_time"] as! String
                return RoomInfo(id: id, name: name)
            }
            return nil
        }
    }
    
    var community: BMCommunity? {
        get {
            if let communityInfo = self.dictionary["community"] as? NSDictionary {
                let id = communityInfo["id"] as? String ?? ""
                let name = communityInfo["name"] as? String ?? ""
                let overview = communityInfo["overview"] as? String ?? ""
                let averageRating = communityInfo["average_rating"] as? Int ?? 0
                let reviewsCount  = communityInfo["reviews_count"] as? Int ?? 0
                let imageUrl = communityInfo["image_url"] as? String ?? ""
                return BMCommunity(id: id, name: name, overview: overview, averageRating: averageRating, imageUrl: imageUrl, reviewsCount: reviewsCount)
            }
            return nil
        }
    }
    
    var channel: BMChannel? {
        get {
            if let channel = self.dictionary["channel"] as? NSDictionary {
                return BMChannel(dictionary: channel)
            }
            return nil
        }
    }
    
    var registers: Array<Register>? {
        get {
            var registersArray: Array<Register> = []
            if let registers_info = self.dictionary["registers_info"] as? NSArray {
                for fi  in registers_info {
                    let fiDict = fi as! NSDictionary
                    let name      = fiDict["name"] as! String
                    let photo_url = fiDict["photo_url"] as! String
                    let register = Register(name: name, photo_url: photo_url)
                    registersArray.append(register)
                }
                return registersArray
            }
            return nil
        }
    }
    
    var presenters: Array<Presenter>? {
        get {
            var presentersArray: Array<Presenter> = []
            if let registers_info = self.dictionary["featured_presenters_info"] as? NSArray {
                for fi  in registers_info {
                    let fiDict = fi as! NSDictionary
                    let name      = fiDict["name"] as? String ?? ""
                    let photo_url = fiDict["photo_url"] as? String ?? ""
                    let detail = fiDict["detail"] as? String ?? ""
                    let presenter = Presenter(name: name, photo_url: photo_url, detail: detail)
                    presentersArray.append(presenter)
                }
                return presentersArray
            }
            return nil
        }
    }
    
    
    public var recordId: String? {
        get {
            if let recordId = self.dictionary["id"] as? String {
                return recordId
            }
            return nil
        }
    }
    
    var startTimeZone: Int? {
        get {
            if let startTime = self.dictionary["start_time_timestamp"] as? Int {
                return startTime
            }
            return nil
        }
    }
    var endTimeZone: Int? {
        get {
            if let endTime = self.dictionary["end_time_timestamp"] as? Int {
                return endTime
            }
            return nil
        }
    }
    
    //    var conferenceType: String {
    //        get {
    //            if let conferenceType = self.dictionary["conference_type"] as? String {
    //                return conferenceType
    //            }
    //            return ""
    //        }
    //    }
    
    var duration : String {
        get {
            if let duration = self.dictionary["duration"] as? String {
                return duration
            }
            return ""
        }
    }
    
    //    var isFeature: Bool {
    //        if conferenceType == "future" {
    //            return true
    //        } else {
    //            return  false
    //        }
    //    }
    
    var twilioPassword: String {
        get {
            if let twilioPassword = self.dictionary["twilio_password"] as? String {
                return twilioPassword
            }
            return ""
        }
    }
    
    var twilioUsername: String {
        get {
            if let twilioUsername = self.dictionary["twilio_username"] as? String {
                return twilioUsername
            }
            return ""
        }
    }
    
    var title: String? {
        get {
            if let title = dictionary["title"] as? String {
                return title
            }
            return nil
        }
    }
    
    var purpose: String {
        get {
            if let purpose = dictionary["purpose"] as? String {
                return purpose
            }
            return ""
        }
    }
    
    var communityName: String? {
        get {
            if let communityName = self.dictionary["community_name"] as? String {
                return communityName
            }
            return nil
        }
    }
    
    
    var startTime: String? {
        get {
            if let startTime = self.dictionary["start_time_format"] as? String {
                return startTime
            }
            return nil
        }
    }
    
    var timeZone: String? {
        get{
            if let timeZone = self.dictionary["time_zone"] as? String{
                return timeZone
            }
            return nil
        }
    }
    
    var imageURL: String? {
        get {
            if let imageURL = self.dictionary["icon_url"] as? String {
                return imageURL
            }
            return nil
        }
    }
    
    var time: String? {
        get {
            if let time = self.dictionary["time_format"] as? String {
                return time
            }
            return nil
        }
    }
    
    var date: String? {
        get {
            if let date = self.dictionary["date_format"] as? String {
                return date
            }
            return nil
        }
    }
    
    
    var backgroundImage: String? {
        get {
            if let backgroundImage = self.dictionary["background_image"] as? String {
                return backgroundImage
            }
            return nil
        }
    }
    
    var topics: [String]? {
        get {
            if let agenda = self.dictionary["agenda"] as? NSDictionary {
                let topics = agenda["topics"] as? [String]
                return topics
            }
            return nil
        }
    }
    
    var categories: [String]? {
        get {
            if let categories = self.dictionary["agenda"] as? NSDictionary {
                let categories = categories["categories"] as? [String] ?? []
                return categories
            }
            return nil
        }
    }
    
    
    var conferenceDate: String? {
        get {
            if let conferenceDate = self.dictionary["conference_date"] as? String {
                return conferenceDate
            }
            return nil
        }
    }
    
    var conferenceServer: String? {
        get {
            if let conferenceServer = self.dictionary["conference_server"] as? String {
                return conferenceServer
            }
            return nil
        }
    }
    
    public var _dataKey = ""
    public var dataKey: String? {
        get {
            if _dataKey != "" {
                return _dataKey
            }
            
            if let dataKey = self.dictionary["conference_datakey"] as? String {
                return dataKey
            }
            return nil
        }
        set(dataKey){
            self._dataKey = dataKey!
        }
    }
    
    
    var dataKeyUser: String? {
        get {
            if let dataKeyUser = self.dictionary["conference_datakey_user"] as? String {
                return dataKeyUser
            }
            return nil
        }
    }
    
    var userID: String? {
        get {
            if let userID = self.dictionary["user_id"] as? String {
                return userID
            }
            return nil
        }
    }
    
    var userName: String? {
        get {
            if let userName = self.dictionary["user_name"] as? String {
                return userName
            }
            return nil
        }
    }
    
    var mcuID: String? {
        get {
            if let mcuID = self.dictionary["conference_obfuscated_id"] as? String {
                return mcuID
            }
            return nil
        }
    }
    
    var obfuscatedId: String? {
        get {
            if let obfuscatedId = self.dictionary["conference_obfuscated_id"] as? String {
                return obfuscatedId
            }
            return nil
        }
    }
    
    
    var price: String? {
        get {
            if let price = self.dictionary["ticket_price"] as? String {
                return price
            }
            return "FREE"
        }
    }
    
    var rate: Int {
        get {
            if let rate = self.dictionary["rating_average"] as? Int {
                return rate
            }
            return 0
        }
    }
    
    var totalReviews: String {
        get {
            if let totalReview = self.dictionary["total_reviews"] as? String {
                return totalReview
            }
            return ""
        }
    }
    
    var registeredMembers: Int {
        get {
            if let registeredMembers = self.dictionary["registered_members"] as? Int {
                return registeredMembers
            }
            return 0
        }
    }
    
    var role: String {
        get {
            if let role = self.dictionary["role"] as? String {
                return role
            }
            return "Member"
        }
    }
    
    
    var allowEntering: Bool {
        get {
            if let allowEntering = self.dictionary["allow_entering_now"] as? Bool {
                return allowEntering
            }
            return false
        }
    }
    
    var ended: Bool {
        get {
            if let ended = self.dictionary["ended"] as? Bool {
                return ended
            }
            return false
        }
    }
    var feature: Bool {
        get {
            if let feature = self.dictionary["feature"] as? Bool {
                return feature
            }
            return false
        }
    }
    
    
    var recordingIsProcessing: Bool {
        get {
            if let recordingIsProcessing = self.dictionary["recording_is_processing"] as? Bool {
                return recordingIsProcessing
            }
            return false
        }
    }
    
    var hasRecorded: Bool {
        get {
            if let hasRecorded = self.dictionary["has_recorded"] as? Bool {
                return hasRecorded
            }
            return false
        }
    }
    
    var canViewRecording: Bool {
        get {
            if let canViewRecording = self.dictionary["can_view_recording"] as? Bool {
                return canViewRecording
            }
            return false
        }
    }
    
    var canNotViewRecordingTitle: String {
        get {
            if let canNotViewrecordingTitle = self.dictionary["can_not_view_recording_title"] as? String {
                return canNotViewrecordingTitle
            }
            return ""
        }
    }
    
    var recordingPrice: String {
        get {
            if let recordingPrice = self.dictionary["recording_price"] as? String {
                return recordingPrice
            }
            return ""
        }
    }
    
    var recordingUrl: String {
        get {
            if let recordingUrl = self.dictionary["recording_url"] as? String {
                return recordingUrl
            }
            return ""
        }
    }
    
    var needToEnterPassword: Bool {
        get {
            if let needToEnterPassword = self.dictionary["need_to_enter_password"] as? Bool {
                return needToEnterPassword
            }
            return false
        }
    }
    
    var needToPayToEnter: Bool {
        get {
            if let needToPayToEnter = self.dictionary["need_to_pay_to_enter"] as? Bool {
                return needToPayToEnter
            }
            return false
        }
    }
    
    var needToRegisterToEnter: Bool {
        get {
            return !alreadyRegistered && !inProgress && !ended && (isFree || isChipIn)
        }
    }
    
    var inProgress: Bool {
        get {
            if let inProgress = self.dictionary["in_progress"] as? Bool {
                return inProgress
            }
            return false
        }
    }
    
    var isFree: Bool {
        get {
            if let isFree = self.dictionary["is_free"] as? Bool {
                return isFree
            }
            return false
        }
    }
    
    var conferenceUrl: String {
        get {
            if let conferenceUrl = self.dictionary["conference_address"] as? String {
                return conferenceUrl
            }
            return ""
        }
    }
    
    var isChipIn: Bool {
        get {
            if let isChipIn = self.dictionary["is_chip_in"] as? Bool {
                return isChipIn
            }
            return false
        }
    }
    
    var alreadyRegistered: Bool {
        get {
            if let alreadyRegistered = self.dictionary["already_registered"] as? Bool {
                return alreadyRegistered
            }
            return false
        }
    }
    
    var showRegisterStatusButton: Bool {
        get {
            return self.alreadyRegistered && !self.inProgress && !self.ended
        }
    }
    
    var canRegister : Bool{
        get {
            if let canRegister = self.dictionary["can_register"] as? Bool {
                return canRegister
            }
            return false
        }
    }
    
    var canManageConference: Bool {
        get {
            if let canManageConference = self.dictionary["can_manage_conference"] as? Bool {
                return canManageConference
            }
            return false
        }
    }
    
    func canManageByUser() -> Bool{
        if self.role == "Organizer"{
            return true
        }else{
            return false
        }
    }
    
    
    var displayTime: String {
        get {
            if self.displayTime1 != "" && self.displayTime1 != "" {
                return "\(self.displayTime1)\n\n\(self.displayTime2)"
            } else if self.displayTime1 != "" && self.displayTime1 == "" {
                return self.displayTime1
            } else if self.displayTime1 == "" && self.displayTime1 != "" {
                return self.displayTime2
            } else {
                return ""
            }
        }
    }
    
    
    var displayTime3: String {
        get {
            if let displayTime3 = self.dictionary["date_with_week_short_month_no_year"] as? String {
                return displayTime3
            }
            return ""
        }
    }
    
    var displayTime1: String {
        get {
            if let displayTime1 = self.dictionary["display_time1"] as? String {
                return displayTime1
            }
            return ""
        }
    }
    
    var displayTime2: String {
        get {
            if let displayTime2 = self.dictionary["display_time2"] as? String {
                return displayTime2
            }
            return ""
        }
    }
    
    var displayTime4: String {
        get {
            if let displayTime4 = self.dictionary["display_time4"] as? String {
                return displayTime4
            }
            return ""
        }
    }
    
    var calendarDesc: String {
        get {
            if let calendarInfo = self.dictionary["calendar_info"] as? NSDictionary {
                return calendarInfo["desc"] as! String
            }
            return ""
        }
    }
    
    var calendarStartTime: NSDate? {
        get {
            if let calendarStartTime = self.dictionary["calendar_info"] as? NSDictionary {
                let dateString = calendarStartTime["start_time"] as! String
                return ToolHelper.convertDateFormater(dateString: dateString)
            }
            return nil
        }
    }
    
    var calendarEndTime: NSDate? {
        get {
            if let calendarStartTime = self.dictionary["calendar_info"] as? NSDictionary {
                let dateString = calendarStartTime["end_time"] as! String
                return ToolHelper.convertDateFormater(dateString: dateString)
            }
            return nil
        }
    }
    
    var tmpRole = "Member"
    
    func isAdmin() -> Bool{
        return self.role == "Organizer"
    }
    
    func isTmpAdmin() -> Bool {
        return  tmpRole == "Admin"
    }
    
    func adminRole() -> Bool{
        return isAdmin() || isTmpAdmin()
    }
    
    
    class public func requestConferenceData(id: String, token: String, finishedCallback : @escaping (_ conference: BMConference?) -> ()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/conferences/\(id)?mobile_token=\(token)"
        //f75f6f7ddb80ed15100f26fed2afc37c5db24a75078e781895b4c04a2d440856
        //2d4f759e712412097a0e1f03c5aaea623a57ad750b3fc0b17ebd63d25ae1f54e
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: nil) { (result) in
            
            guard let dict = result as? NSDictionary else {
                finishedCallback(nil)
                return
            }
            
            guard let conference = dict.value(forKey: "conference") as? NSDictionary else {
                finishedCallback(nil)
                return
            }
            
            finishedCallback(BMConference(dictionary: conference))
        }
    }
    
    
    
    
}
