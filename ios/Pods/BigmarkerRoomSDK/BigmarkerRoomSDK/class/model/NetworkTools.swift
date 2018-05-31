

import UIKit

enum MethodType {
    case GET
    case POST
    case PUT
}

class NetworkTools {
    
    class func requestDatas(type : MethodType, URLString : String, parameters : NSDictionary?, finishedCallback : @escaping (_ result : AnyObject) -> ()) {
        
        let manager = AFHTTPRequestOperationManager()
        
        
        switch type {
        case MethodType.PUT:
            
   
            manager.put(URLString, parameters: parameters,  success: { (operation: AFHTTPRequestOperation!,
                responseObject: Any) in
                finishedCallback(responseObject as AnyObject)
            },
                        failure: { (operation: AFHTTPRequestOperation?,
                            error: Error!) in
                            finishedCallback(error as AnyObject )
            })
            break
        case MethodType.POST:
            manager.post(URLString, parameters: parameters,  success: { (operation: AFHTTPRequestOperation!,
                responseObject: Any) in
                finishedCallback(responseObject  as AnyObject)
            },
                         failure: { (operation: AFHTTPRequestOperation?,
                            error: Error) in
                            finishedCallback(error as AnyObject)
            })
            break
        default:
            manager.get(URLString, parameters: parameters,  success: { (operation: AFHTTPRequestOperation!,
                responseObject: Any) in
                finishedCallback(responseObject  as AnyObject)
            },
                        failure: { (operation: AFHTTPRequestOperation?,
                            error: Error!) in
                            finishedCallback(error as AnyObject)
            })
            break
        }
        
        
        
    }

    
    
    class func requestDataa(type : MethodType, URLString : String, parameters : NSDictionary?,
                           finishedCallback : @escaping (_ result : AnyObject) -> ()) {
        switch type {
        case MethodType.PUT:
                        break
        case MethodType.POST:
            
            break
        default:
//            let str = "Hello, playground"
//            print(str)
            let url = URL(string: URLString)
            let session = URLSession.shared
            let task = session.dataTask(with: url!) { (data, response, error) in
                guard error == nil else {
                    finishedCallback(error as AnyObject)
                    return
                }
                guard let data = data else {
                    print("Data is empty")
                    finishedCallback(error as AnyObject)
                    return
                }
                let result = try! JSONSerialization.jsonObject(with: data, options: [])
                //print(result)
                finishedCallback(result as AnyObject)
            
            }
            task.resume()
            break
        }
        
        
    }
    
    
    
}
