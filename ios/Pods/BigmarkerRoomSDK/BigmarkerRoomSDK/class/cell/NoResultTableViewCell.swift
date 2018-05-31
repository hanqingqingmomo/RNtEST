//
//  NoResultTableViewCell.swift
//  bigmarker
//
//  Created by Han Qing on 21/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit

class NoResultTableViewCell: UITableViewCell {

    @IBOutlet weak var resultImageView: UIImageView!
    @IBOutlet weak var infoLabel: UILabel!
  
    override func awakeFromNib() {
        super.awakeFromNib()
        //autoresizingMask = .none
    }
}
