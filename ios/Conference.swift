//
//  Conference.swift
//  login
//
//  Created by hanqing on 12/11/14.
//  Copyright (c) 2014 hanqing. All rights reserved.
//
import Foundation
import AFNetworking

class Conference: NSObject {
  
  
  var dictionary: NSDictionary
  
  init(dictionary: NSDictionary) {
    self.dictionary = dictionary
  }
  
  
  var recordId: String {
    get {
      if let recordId = self.dictionary["id"] as? String {
        return recordId
      }
      return ""
    }
  }
  
  var conferenceType: String {
    get {
      if let conferenceType = self.dictionary["conference_type"] as? String {
        return conferenceType
      }
      return ""
    }
  }
  
  var isFeature: Bool {
    if conferenceType == "future" {
      return true
    } else {
      return  false
    }
  }
  
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
  
  var purpose: String? {
    get {
      if let purpose = dictionary["purpose"] as? String {
        return purpose
      }
      return nil
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
  
  var imageURL: String? {
    get {
      if let imageURL = self.dictionary["icon_url"] as? String {
        return imageURL
      }
      return nil
    }
  }
  
  var coverUrl: String {
    get {
      if let coverUrl = self.dictionary["cover_url"] as? String {
        return coverUrl
      }
      return ""
    }
  }
  
  var _time = ""
  var time: String? {
    get {
      if _time != "" {
        return _time
      }
      if let time = self.dictionary["time_format"] as? String {
        return time
      }
      return nil
    }
    set(time){
      self._time = time!
    }
  }
  
  var _date_format = ""
  var date_format: String? {
    get {
      if _date_format != "" {
        return _date_format
      }
      if let date = self.dictionary["date_format"] as? String {
        return date.trimmingCharacters(in: CharacterSet.whitespaces)
      }
      return nil
    }
    set(date){
      self._date_format = date!
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
  
  var _conferenceDate = ""
  
  var conferenceDate: String {
    get {
      if _conferenceDate != "" {
        return _conferenceDate
      }
      if let conferenceDate = self.dictionary["conference_date"] as? String {
        _conferenceDate = conferenceDate
        return _conferenceDate
      }
      return _conferenceDate
    }
    
    set(date) {
      self._conferenceDate = date
    }
  }
  
  var conferenceServer: String? {
    get {
      if let conferenceServer = self.dictionary["conference_server"] as? String {
        return conferenceServer
      }
      return ""
    }
  }
  
  var dataKey: String? {
    get {
      if let dataKey = self.dictionary["conference_datakey_for_myowndoctor"] as? String {
        return dataKey
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
  
  
  var price: String? {
    get {
      if let price = self.dictionary["ticket_price"] as? String {
        return price
      }
      return "FREE"
    }
  }
  
  var isFree: Bool {
    if price == "FREE" {
      return true
    } else {
      return  false
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
  
  var inProgress: Bool {
    get {
      if let inProgress = self.dictionary["in_progress"] as? Bool {
        return inProgress
      }
      return false
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
  
  var _displayUserName = ""
  var displayUserName: String {
    get {
      if _displayUserName != "" {
        return _displayUserName
      }
      if let displayUserName = self.dictionary["display_user_name"] as? String {
        return displayUserName.trimmingCharacters(in: CharacterSet.whitespaces)
      }
      return ""
    }
    set(time){
      self._displayUserName = time
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
  
  var confirmed: Bool {
    get {
      if let confirmed = self.dictionary["confirmed"] as? Bool {
        return confirmed
      }
      return true
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
  
  func canManageByUser() -> Bool{
    if self.role == "Organizer"{
      return true
    }else{
      return false
    }
  }
  
  var coverShotName: String {
    get {
      if let coverShotName = self.dictionary["cover_shot_name"] as? String {
        return coverShotName
      }
      return ""
    }
  }
  
  
  class public func requestConferenceData(id: String, dict: NSDictionary, finishedCallback : @escaping (_ conference: Conference?) -> ()){
    
    let manager = AFHTTPRequestOperationManager()
    let params = ["mobile_token":  dict["mobile_token"], "name":dict["userName"],
                  "avatar": dict["avatar"], "role":dict["role"]]
    let urlString = "https://www.bigmarker.com" + "/mobile/api/v1/conferences/myowndoctor/\(id)"
    
    print(params)
    print(urlString)
    
    
    manager.get(urlString, parameters: params,
                success: { (operation: AFHTTPRequestOperation?, responseObject: Any?) in
                  
                  guard let dict = responseObject as? NSDictionary else {
                    finishedCallback(nil)
                    return
                  }
                  
                  guard let conference = dict["conference"] as? NSDictionary else {
                    finishedCallback(nil)
                    return
                  }
                  
                  print(conference)
                  
                  
                  finishedCallback(Conference(dictionary: conference))
                  
                  
    },  failure: { (operation: AFHTTPRequestOperation?, error: Error?) in
      finishedCallback(nil)
    })
    
  }
  
  
}
