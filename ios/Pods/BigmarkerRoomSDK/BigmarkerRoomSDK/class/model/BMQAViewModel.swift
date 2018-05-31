//
//  QAViewModel.swift
//  bigmarker
//
//  Created by Han Qing on 19/12/2016.
//  Copyright © 2016 hanqing. All rights reserved.
//

import UIKit
public class BMQAViewModel {
    
    var questions: [QA] = []
    var activedQuestions: [QA] = []
    var answeredQuestions:[QA] = []
    
}


extension BMQAViewModel {
    
    func newQA(id: String, content: String, finishedCallback : @escaping (_ result: AnyObject) -> ()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/questions/new"
        let params = ["mobile_token": BMCurrentUser.token(), "id": id, "content": content, "mod_user_name": BMCurrentUser.modUserName()] as [String : Any]
        

        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard (result["question"] as? NSDictionary) != nil else {
                finishedCallback(["status": false] as AnyObject)
                return
            }
            
            guard let data = result["data"] as? NSDictionary else {
                finishedCallback(["status": false] as AnyObject)
                return
            }
            
            //self.addQA(QA(dictionary: dict))
            
            finishedCallback(["status": true, "data": data] as AnyObject)
        }
    }
    
    func markAnswered(id: String,  finishedCallback : @escaping (_ result: AnyObject) -> ()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/questions/answered"
        let params = ["mobile_token": BMCurrentUser.token(), "qa_id": id]
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard let status = result["status"] as? Int else {
                finishedCallback(["status": false] as AnyObject)
                return
            }
            
            guard let dict = result["question"] as? NSDictionary else {
                finishedCallback(["status": false] as AnyObject)
                return
            }
 
            finishedCallback(["status": status == 1 ? true : false, "qa": QA(dictionary: dict)] as AnyObject)
        }
    }
    
    func delete(id: String,  finishedCallback : @escaping (_ result: AnyObject) -> ()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/questions/delete"
        let params = ["mobile_token": BMCurrentUser.token(), "qa_id": id]

        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
        
            guard let status = result["status"] as? Int else {
                finishedCallback(false as AnyObject)
                return
            }
           finishedCallback((status == 1 ? true : false) as AnyObject)
        }
    }
    
    func vote(id: String,  finishedCallback : @escaping (_ result: AnyObject) -> ()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/questions/vote"
        let params = ["mobile_token": BMCurrentUser.token(), "qa_id": id]
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard let status = result["status"] as? Int else {
                finishedCallback(["status": false] as AnyObject)
                return
            }
            
            guard let questions = result["questions"] as? NSArray else {
                finishedCallback(["status": false] as AnyObject)
                return
            }
            
            
            self.questions         = []
            self.answeredQuestions = []
            self.activedQuestions  = []
            
            let qas = (questions as! Array).map({
                (question: NSDictionary) -> QA in
                
                let qa = QA(dictionary: question)
                
                if question["answered"] as! Bool {
                    self.answeredQuestions.append(qa)
                } else {
                    self.activedQuestions.append(qa)
                }
                
                return qa
            })
            
            self.questions = qas
            finishedCallback(["status": status == 1 ? true : false] as AnyObject)
        }
    }
    
    
    func requestQAData(id: String, page: Int = 1, count: Int = 100,successCallback : @escaping ()->(),failCallback : @escaping ()->()){
        let urlString = BMSERVICE_API_DOMAIN + "/mobile/api/v1/questions"
        let params = ["mobile_token": BMCurrentUser.token(), "id": id, "page": page, "page_count": count] as [String : Any]
        
        NetworkTools.requestDatas(type: .GET, URLString: urlString, parameters: params as NSDictionary) { (result) in
            
            guard let dict = result as? NSDictionary else {
                failCallback()
                return
            }
            
            guard let questions = dict.value(forKey: "questions") as? NSArray else {
                failCallback()
                return
            }
            
            self.questions         = []
            self.answeredQuestions = []
            self.activedQuestions  = []
            
            let qas = (questions as! Array).map({
                (question: NSDictionary) -> QA in
                
                let qa = QA(dictionary: question)
                
                if question["answered"] as! Bool {
                    self.answeredQuestions.append(qa)
                } else {
                    self.activedQuestions.append(qa)
                }
                
                return qa
            })
            
            self.questions = qas
            
            successCallback()
        }
        
    }

    
    func getQAByObfuscatedId(obfuscatedId: String) -> QA? {
        for qa in self.questions {
            if qa.obfuscatedId == obfuscatedId {
                return qa
            }
        }
        return nil
    }
    
    func updateQAVoteCount(obfuscatedId: String, voteCount: Int){
        for qa in self.activedQuestions {
         
            if qa.obfuscatedId == obfuscatedId {
               qa.voteCount = voteCount
            }
        }
        
        for qa in self.answeredQuestions {
            if qa.obfuscatedId == obfuscatedId {
                qa.voteCount = voteCount
            }
        }
    }
    
    func updateQAAnswer(obfuscatedId: String){
        for qa in self.activedQuestions {
            if qa.obfuscatedId == obfuscatedId {
                qa.answered = true
                self.activedQuestions.removeObject(object: qa)
                self.answeredQuestions.append(qa)
            }
        }
        
        for qa in self.questions {
            if qa.obfuscatedId == obfuscatedId {
               qa.answered = true
            }
        }
        
    }
    
    func addQA(qa: QA){
      self.activedQuestions.append(qa)
      self.questions.append(qa)
    }
    
    func updateQAAnswer(qa: QA){
        for _qa in self.activedQuestions {
            if _qa.obfuscatedId == qa.obfuscatedId {
              self.activedQuestions.removeObject(object: _qa)
                if qa.answered {
                    self.answeredQuestions.append(qa)
                }
            }
        }
    }
    
    func updateQA(qa: QA){
        for (index, _qa) in self.activedQuestions.enumerated() {
            if _qa.obfuscatedId == qa.obfuscatedId {
                self.activedQuestions.removeObject(object: _qa)
                self.activedQuestions.insert(qa, at: index)
            }
        }
        
        for (index, _qa) in self.answeredQuestions.enumerated() {
            if _qa.obfuscatedId == qa.obfuscatedId {
                self.answeredQuestions.removeObject(object: _qa)
                self.answeredQuestions.insert(qa, at: index)
            }
        }
    }
    
    func deleteQA(obfuscatedId: String){
        if let qa = getQAByObfuscatedId(obfuscatedId: obfuscatedId) {
            self.questions.removeObject(object: qa)
            self.activedQuestions.removeObject(object: qa)
            self.answeredQuestions.removeObject(object: qa)
        }
    }
    
}
