//
//  AudioViewUI.swift
//  bigmarker
//
//  Created by Han Qing on 30/1/2018.
//  Copyright © 2018 hanqing. All rights reserved.
//


let bgColor = UIColor.init(red: 21/255, green: 26/255, blue: 37/255, alpha: 1)
class AudioViewUI: UIView {
    
    var bm: BMRoom!
    var imageView: UIImageView!
    var title: UILabel!
    var desc: UILabel!
    
    var audioArray = [String]()
    
    lazy private var topView: UIView = { [weak self] in
        let topView = UIView()
        self!.imageView = UIImageView()
        self!.imageView.image = UIImage(named: "BMSDK.bundle/mic")
        self!.imageView.contentMode = UIViewContentMode.scaleAspectFill
        
        self!.title = UILabel()
        self!.title.text = "Audio Conference"
        self!.title.textAlignment = NSTextAlignment.center
        self!.title.textColor = UIColor.white
        self!.title.font = UIFont(name: BMSFUIDisplay_Regular, size: 16)
        
        self!.desc  = UILabel()
        if self!.audioArray.count > 1 {
             self!.desc.text = "\(self!.audioArray.count) participants"
        } else {
             self!.desc.text = "\(self!.audioArray.count) participant"
        }
       
        self!.desc.textAlignment = NSTextAlignment.center
        self!.desc.textColor = UIColor.init(red: 193/255, green: 201/255, blue: 214/255, alpha: 1)
        self!.desc.font =  UIFont(name: BMSFUIDisplay_Regular, size: 16)
        
        self!.addSubview(self!.imageView)
        self!.addSubview(self!.title)
        self!.addSubview(self!.desc)
        return topView
    }()
    
    
    lazy private var collectionView: UICollectionView = { [weak self] in
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        layout.minimumLineSpacing = 20
        layout.minimumInteritemSpacing = 0
        layout.sectionInset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
        layout.itemSize = CGSize(width: 80, height: 100)
        let collectionView = UICollectionView.init(frame: CGRect.zero, collectionViewLayout: layout)
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.bounces = false
        collectionView.isPagingEnabled = true
        collectionView.scrollsToTop = false
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        collectionView.backgroundColor = bgColor
        collectionView.register(AudioViewCell.self, forCellWithReuseIdentifier: "cell")
        return collectionView
        }()
    
    
    init(bm: BMRoom, audioArray: [String]) {
        super.init(frame: CGRect.zero)
        self.backgroundColor = bgColor
        self.bm = bm
        self.audioArray = audioArray
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    func setupUI(){
        self.backgroundColor = UIColor.init(red: 21/255, green: 26/255, blue: 37/255, alpha: 1)
        self.addSubview(topView)
        self.addSubview(collectionView)
        setLayout()
    }
    
    
    
    func setLayout(){
        
        self.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.superview?.mas_bottom)?.setOffset(0)
        }
        
        self.topView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.superview?.mas_top)?.setOffset(0)
            make?.right.mas_equalTo()(self.superview?.mas_right)?.setOffset(0)
            make?.left.mas_equalTo()(self.superview?.mas_left)?.setOffset(0)
            make?.height.mas_equalTo()(200)
        }
        
        self.imageView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.mas_top)?.setOffset(50)
            make?.centerX.mas_equalTo()(self)
            make?.width.mas_equalTo()(20)
            make?.height.mas_equalTo()(30)
        }
        
        self.title.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.imageView.mas_bottom)?.setOffset(20)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.height.mas_equalTo()(30)
        }
        
        self.desc.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.title.mas_bottom)?.setOffset(5)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.height.mas_equalTo()(20)
        }
        
        
        self.collectionView.mas_makeConstraints { (make) in
            make?.top.mas_equalTo()(self.topView.mas_bottom)?.setOffset(0)
            make?.right.mas_equalTo()(self.mas_right)?.setOffset(0)
            make?.left.mas_equalTo()(self.mas_left)?.setOffset(0)
            make?.bottom.mas_equalTo()(self.mas_bottom)?.setOffset(0)
        }
        
    }
    
    
    func getVideoUserInfo(muxerID: String) -> VideoUserInfo{
        let videoUserInfo = VideoUserInfo()
        if let muxerInfo: NSDictionary = bm.muxersInfo[muxerID] as? NSDictionary {
            if let sid: String = muxerInfo["sid"] as? String {
                if let userInfo: NSDictionary = bm.usersInfo[sid] as? NSDictionary {
                    videoUserInfo.userName  = userInfo.value(forKey: "name") as! String!
                    videoUserInfo.avatarUrl = userInfo.value(forKey: "photo") as! String
                }
            }
        }
        return videoUserInfo
    }
    
}


extension AudioViewUI: UICollectionViewDataSource, UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
       return audioArray.count
    }
    
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath as IndexPath) as! AudioViewCell
        let muxerID =   audioArray[indexPath.row] as String
        cell.userInfo = getVideoUserInfo(muxerID: muxerID)
        return cell
    }
    
}

