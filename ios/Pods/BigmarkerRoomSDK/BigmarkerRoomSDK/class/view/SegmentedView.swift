//
//  ClubSegmentedView.swift
//  bigmarker
//
//  Created by hanqing on 8/24/16.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

protocol SwitchSegmentNotification {
    func notifySwitchSegment(index: Int)
}

class SegmentedView: UIView {
    
    var selectedSegmentIndex = 0
    var segmentedControl: HMSegmentedControl!
    var switchSegmentDelegate: SwitchSegmentNotification?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.frame = frame
        self.prepareSegmentControl()
        self.setupBottomLineToSegmentedControl()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func prepareSegmentControl(){
        segmentedControl = HMSegmentedControl(sectionTitles: ["Chat", "People",])
        segmentedControl.frame = CGRect(x: self.bounds.origin.x, y: self.bounds.origin.y, width: self.frame.width, height:  self.frame.height)
        segmentedControl.selectionStyle = HMSegmentedControlSelectionStyle.fullWidthStripe;
        segmentedControl.selectionIndicatorHeight = 5.0
        
        segmentedControl.titleTextAttributes  = [NSForegroundColorAttributeName:UIColor(red: 162/255.0, green: 171/255.0, blue: 187/255.0, alpha: 1.0), NSFontAttributeName: UIFont(name: BMGTBold, size: 12)!]
        
        segmentedControl.selectedTitleTextAttributes = [NSForegroundColorAttributeName:UIColor(red: 43/255.0, green: 55/255.0, blue: 77/255.0, alpha: 1.0), NSFontAttributeName: UIFont(name: BMGTBold, size: 12)!]
        
        segmentedControl.selectionIndicatorColor = UIColor(red: 16/255.0, green: 137/255.0, blue: 245/255.0, alpha: 1.0)
        segmentedControl.selectionIndicatorLocation = HMSegmentedControlSelectionIndicatorLocation.down;
        segmentedControl.selectedSegmentIndex = 0
        self.selectedSegmentIndex = segmentedControl.selectedSegmentIndex
        segmentedControl.addTarget(self, action:  #selector(segmentedChangedValue), for: UIControlEvents.valueChanged)
        
        self.addSubview(segmentedControl)
    }
    
    func setupBottomLineToSegmentedControl(){
        let boder: CALayer = CALayer()
        boder.backgroundColor = UIColor(red: 241/255, green: 243/255, blue: 245/255, alpha: 1).cgColor
        boder.frame = CGRect(x: 0, y: self.frame.height - 1, width: self.frame.width, height: 1)
        self.layer.addSublayer(boder)
    }
    
    func segmentedChangedValue(segmentedControl: HMSegmentedControl) {
        self.switchSegmentDelegate?.notifySwitchSegment(index: segmentedControl.selectedSegmentIndex)
    }

}
