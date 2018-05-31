//
//  QAStatusView.swift
//  bigmarker
//
//  Created by Han Qing on 15/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

protocol StatusDelegate : class {
    func qaStatusDelegateTypeChanged(type: QAType)
}

private let normalColor   = UIColor(red: 113/255, green: 126/255, blue: 148/255, alpha: 1)
private let selectedColor = UIColor(red: 43/255, green: 55/255, blue:77/255, alpha: 1)


private let boderNormalColor   = UIColor(red: 223/255, green: 225/255, blue: 228/255, alpha: 1)
private let boderSelectedColor = UIColor(red: 16/255, green: 137/255, blue: 245/255, alpha: 1)

class StatusView: UIView {
    
    weak var delegate: StatusDelegate?
    var titles: [String] = []
    var activeButton: UIButton!
    var answerButton: UIButton!
    var type = QAType.Active {
        didSet {
            if self.type == QAType.Active {
                activeButton.setTitle(titles[0], for: UIControlState.normal)
                activeButton.setTitleColor(selectedColor, for: UIControlState.normal)
                activeButton.layer.borderColor = boderSelectedColor.cgColor
                activeButton.layer.borderWidth = 1
                
                answerButton.setTitle(titles[1], for: UIControlState.normal)
                answerButton.setTitleColor(normalColor, for: UIControlState.normal)
                answerButton.layer.borderColor = boderNormalColor.cgColor
                answerButton.layer.borderWidth = 1
            } else {
                activeButton.setTitle(titles[0], for: UIControlState.normal)
                activeButton.setTitleColor(normalColor, for: UIControlState.normal)
                activeButton.layer.borderColor = boderNormalColor.cgColor
                activeButton.layer.borderWidth = 1
                
                answerButton.setTitle(titles[1], for: UIControlState.normal)
                answerButton.setTitleColor(selectedColor, for: UIControlState.normal)
                answerButton.layer.borderColor = boderSelectedColor.cgColor
                answerButton.layer.borderWidth = 1
            }
        }
    }

    init(frame: CGRect, titles: [String]) {
        self.titles = titles
        super.init(frame: frame)
        self.setupUI()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupUI(){
        self.backgroundColor = UIColor.white
        let buttonH:CGFloat = 35
        let buttonW:CGFloat = (self.frame.width - 30) / 2
        let buttonY:CGFloat =  (self.frame.height - buttonH) / 2
        
        activeButton   = UIButton(frame:  CGRect(x: 15, y: buttonY, width: buttonW, height: buttonH))
        answerButton   = UIButton(frame:  CGRect(x: buttonW + 15, y: buttonY, width: buttonW, height: buttonH))
        
        activeButton.titleLabel?.font = UIFont(name: BMSFUIDisplay_Medium, size: 15.0)
        
        activeButton.roundCorners(corners: [.topLeft, .bottomLeft], radius: 2)
        answerButton.titleLabel?.font = UIFont(name: BMSFUIDisplay_Medium, size: 15.0)
        answerButton.roundCorners(corners: [.topRight, .bottomRight], radius: 2)
        activeButton.addTarget(self, action: #selector(switchQAType), for: UIControlEvents.touchUpInside)
        answerButton.addTarget(self, action: #selector(switchQAType), for: UIControlEvents.touchUpInside)
        self.addSubview(activeButton)
        self.addSubview(answerButton)
    }
    
    @objc private func switchQAType(sender: AnyObject){
        if self.type == QAType.Active {
            self.type = QAType.Answered
        } else {
            self.type = QAType.Active
        }
        self.delegate?.qaStatusDelegateTypeChanged(type: self.type)
    }
    

}


extension UIView {
    
    func roundCorners(corners:UIRectCorner, radius: CGFloat) {
        let path = UIBezierPath(roundedRect: self.bounds, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
        let mask = CAShapeLayer()
        mask.path = path.cgPath
        self.layer.mask = mask
    }
    
}
