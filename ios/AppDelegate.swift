/*
 * Copyright (c) 2016 Razeware LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  var window: UIWindow?
  var bridge: RCTBridge!
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    AppCenterReactNativePush.register()
    AppCenterReactNativeCrashes.registerWithAutomaticProcessing()
    AppCenterReactNativeAnalytics.register(withInitiallyEnabled: true)
    AppCenterReactNative.register()
    
    let jsCodeLocation: NSURL!
    
    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)! as NSURL
    
     let rootView = RCTRootView(bundleURL:jsCodeLocation as URL?, moduleName: "app", initialProperties: nil, launchOptions:launchOptions)
    
     rootView?.backgroundColor = UIColor.white //init(red: 1.0f, green: 1.0f, blue: 1.0f, alpha: 1)
     self.window = UIWindow(frame: UIScreen.main.bounds)
     let rootViewController = UIViewController()
     rootViewController.view = rootView
     self.window!.rootViewController = rootViewController
     self.window!.makeKeyAndVisible()
    
  
    //SplashScreen.show()
    FBSDKApplicationDelegate.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions)
    
    return true
  }
  
  
  // Required to register for notifications
  func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
     RCTPushNotificationManager.didRegister(notificationSettings)
  }
  
  // Required for the register event.
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
     RCTPushNotificationManager.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
  }
  
  // Required for the notification event. You must call the completion handler after handling the remote notification.
  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    RCTPushNotificationManager.didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
  }
  
  // Required for the registrationError event.
  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    RCTPushNotificationManager.didFailToRegisterForRemoteNotificationsWithError(error)
  }
  
  // Required for the localNotification event.
  func application(_ application: UIApplication, didReceive notification: UILocalNotification) {
    RCTPushNotificationManager.didReceive(notification)
  }
  
}


