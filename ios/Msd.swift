import Foundation
import SystemConfiguration

@objc(Msd)
class Msd: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func getBundleIdentifier(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    if let bundleIdentifier = Bundle.main.bundleIdentifier {
      resolve(bundleIdentifier)
    } else {
      reject("E_BUNDLE_ID_NOT_FOUND", "Bundle identifier not found", nil)
    }
  }
  
  @objc
  func isConnectedToInternet(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    var zeroAddress = sockaddr_in()
    zeroAddress.sin_len = UInt8(MemoryLayout.size(ofValue: zeroAddress))
    zeroAddress.sin_family = sa_family_t(AF_INET)
    
    guard let defaultRouteReachability = withUnsafePointer(to: &zeroAddress, {
      $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
        SCNetworkReachabilityCreateWithAddress(nil, $0)
      }
    }) else {
      reject("E_NETWORK_REACHABILITY", "Cannot create network reachability", nil)
      return
    }
    
    var flags: SCNetworkReachabilityFlags = []
    if !SCNetworkReachabilityGetFlags(defaultRouteReachability, &flags) {
      reject("E_NETWORK_REACHABILITY", "Cannot get network reachability flags", nil)
      return
    }
    
    let isReachable = flags.contains(.reachable)
    let needsConnection = flags.contains(.connectionRequired)
    
    resolve(isReachable && !needsConnection)
  }

  @objc
  func setItem(_ key: String, value: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
      do {
          let defaults = UserDefaults.standard
          defaults.set(value, forKey: key)
          try defaults.synchronize()
          resolve(nil)
      } catch {
          reject("E_STORAGE_ERROR", "Failed to save data to storage", error)
      }
  }

  @objc
  func getItem(_ key: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
      let defaults = UserDefaults.standard
      if let value = defaults.string(forKey: key) {
          resolve(value)
      } else {
          resolve(nil)
      }
  }
}

