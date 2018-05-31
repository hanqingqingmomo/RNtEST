//
//  NoticeView.swift
//  bigmarker
//
//  Created by hanqing on 8/5/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

class NoticeView: UIView {
    
    var titleLabel: UILabel!

    init(frame: CGRect, title: String) {
       super.init(frame: frame)
       self.frame = frame
       titleLabel = UILabel(frame: CGRect(x: 10, y: 5, width: ScreenW, height: 10))
       titleLabel.textColor = UIColor.white
       titleLabel.textAlignment = NSTextAlignment.center
       titleLabel.text = title
       titleLabel.font = UIFont(name: BMGTRegular, size: 13)
       self.addSubview(titleLabel)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
     

}
