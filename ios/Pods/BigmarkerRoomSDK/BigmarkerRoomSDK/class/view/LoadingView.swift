//
//  LoadingView.swift
//  bigmarker
//
//  Created by hanqing on 5/23/15.
//  Copyright (c) 2015 hanqing. All rights reserved.
//

import UIKit

class LoadingView: UIView {

    var titleLable:  UILabel!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.frame = frame
        titleLable = UILabel()
        titleLable.text = "loading..."
        titleLable.textColor = UIColor.gray
        titleLable.translatesAutoresizingMaskIntoConstraints = false
        self.addSubview(titleLable)
        addConstraintsToView()
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func addConstraintsToView(){
        
        let title_constraints_x = NSLayoutConstraint(item: titleLable, attribute: NSLayoutAttribute.centerX, relatedBy: NSLayoutRelation.equal, toItem: self, attribute: NSLayoutAttribute.centerX, multiplier: 1, constant: 0)
        let title_constraints_y = NSLayoutConstraint(item: titleLable, attribute: NSLayoutAttribute.centerY, relatedBy: NSLayoutRelation.equal, toItem: self, attribute: NSLayoutAttribute.centerY, multiplier: 1, constant: 0)
                
        self.addConstraint(title_constraints_x)
        self.addConstraint(title_constraints_y)
    }
    
}
