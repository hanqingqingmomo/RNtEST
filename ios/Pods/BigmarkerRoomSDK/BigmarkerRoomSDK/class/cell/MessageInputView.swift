//
//  MessageInputView.swift
//  bigmarker
//
//  Created by Han Qing on 14/11/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

class MessageInputView: UIView {

    @IBOutlet weak var inputTextView: UITextView!
   
    override func awakeFromNib() {
        super.awakeFromNib()
        //autoresizingMask = .none
    }

}



extension MessageInputView {
    
    private func setupUI(){
        self.inputTextView.layer.cornerRadius = 5
    }
    
    class func inputView() -> MessageInputView {
       let bundle =  Bundle(path: Bundle(for: MessageInputView.classForCoder()).path(forResource: "BMSDK", ofType: "bundle")!)
        return bundle!.loadNibNamed("MessageInputView", owner: nil, options: nil)!.first as! MessageInputView
    }
}
