#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "BMRoom.h"
#import "MQTTKit.h"
#import <CWStatusBarNotification/CWStatusBarNotification.h>
#import <SVPullToRefresh/SVPullToRefresh.h>
#import <MBProgressHUD/MBProgressHUD.h>
#import <SDWebImage/UIImageView+WebCache.h>
#import <HMSegmentedControl/HMSegmentedControl.h>
#import <Masonry/Masonry.h>
#import <AFNetworking/AFNetworking.h>
#import "PopoverView.h"
#import "YTPlayerView.h"

FOUNDATION_EXPORT double BigmarkerRoomSDKVersionNumber;
FOUNDATION_EXPORT const unsigned char BigmarkerRoomSDKVersionString[];

