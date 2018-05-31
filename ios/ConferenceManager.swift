
import Foundation
import BigmarkerRoomSDK

@objc(ConferenceManager)
class ConferenceManager: RCTEventEmitter {
    
 var viewTag: NSNumber = 0
 var conference: Conference!
 var bmConference: BMConference!
 var bm : BMRoom!
 var bigRoom: BigRoomBase!
// var c : AddRatingViewController!
  
  override func supportedEvents() -> [String]! {
    return ["AddRatingManagerEvent"]
  }
  
  // Dismiss view controller
  @objc func dismissPresentedViewController(_ reactTag: NSNumber) {
//    DispatchQueue.main.async {
//      if let view = self.bridge.uiManager.view(forReactTag: reactTag) {
//        let presentedViewController: UIViewController! = view.reactViewController()
//
//        let vc = BMTabBarController(bm: self.bm, conference: self.conference)
//        print(presentedViewController)
//        self.bm.delegate = vc
//        presentedViewController.present(vc, animated: false, completion: nil)
//        //presentedViewController.view.window?.rootViewController = UINavigationController(rootViewController: vc)
//        //presentedViewController.dismiss(animated: true, completion: nil)
//      }
//    }
  }
    
    @objc func enterConference(_ reactTag: NSNumber, id: NSString) -> Void {
      self.viewTag = reactTag
  
      let params = ["mobile_token":  "81456a4cb4b26b5989f825582ae9166c981fd0ee340bcfd4906ea6cb7625c34d", "userName": "test",
                    "avatar": "https://bigmarker.azureedge.net/assets/bigroom-logo-effa41e1c2117707285643c60b677d29.png", "role": "member" ]
      
      Conference.requestConferenceData(id: "3bc38e15b0dc" as String, dict: params as NSDictionary) { (conference) in
        if conference != nil {
          self.conference = conference
          
          
          print(conference?.dictionary)
          
          self.bmConference = BMConference(dictionary: (conference?.dictionary)!)
          self.bmConference.dataKey = conference?.dataKey
          
          self.bigRoom = BigRoomBase(conference: self.bmConference)
          self.bigRoom.delegate = self
          self.bigRoom.connectServer()
        } else {
          print("error=====================")
        }
        
      }
    }

  
  // Save rating and dismiss the view controller
  @objc func save(_ reactTag: NSNumber, rating: Int, forIdentifier identifier: Int) -> Void {

   
   
    // Send an event back to React Native
     }
}


extension ConferenceManager: BigRoomConnectionProtocol {
    
    func bmRoomDidConnect(bm: BMRoom!) {
          DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: self.viewTag) {
              self.bm = bm
              let presentedViewController: UIViewController! = view.reactViewController()

              let result = ["mod_id": "1111", "api_token": "81456a4cb4b26b5989f825582ae9166c981fd0ee340bcfd4906ea6cb7625c34d",
                            "mod_user_name": "hanqing"] as [String : Any]
              
              BMCurrentUser.saveInfo(responseObject: result as AnyObject?)
              
              
              
              let vc = BMTabBarController(bm: self.bm, conference: self.bmConference)
              self.bm.delegate = vc
              presentedViewController.present(vc, animated: false, completion: nil)
            }
          }
    }
    
    func bmRoomFailedConnect(bm: BMRoom!) {
        DispatchQueue.main.sync{
            let alertView = UIAlertController(title: "Error!", message: "Connection Failed!", preferredStyle: .alert)
            alertView.addAction(UIAlertAction(title: "ok", style: .default, handler: nil))
        }
    }
    
}
