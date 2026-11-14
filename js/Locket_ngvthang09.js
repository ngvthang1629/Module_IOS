/********************************^------------------------------
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?([^/]+)?$) url script-response-body https://raw.githubusercontent.com/ngvthang1629/Module_IOS/main/js/Locket_ngvthang09.js
^https:\/\/firebaseremoteconfig\.googleapis\.com\/v1\/projects\/.* url script-response-body https://raw.githubusercontent.com/ngvthang1629/Module_IOS/main/js/Locket_ngvthang09.js

[mitm]
hostname = api.revenuecat.com, firebaseremoteconfig.googleapis.com
--------------------------------^------------------------------*/

const nt = $response.body ? JSON.parse($response.body) : {};

if (typeof nt === "object" && nt !== null) {
  // Cấu hình mở khóa cho RevenueCat (Locket Gold)
  if ($request.url.includes("revenuecat.com")) {
    nt.subscriber = nt.subscriber || {};
    nt.subscriber.subscriptions = nt.subscriber.subscriptions || {};
    nt.subscriber.entitlements = nt.subscriber.entitlements || {};
    
    const expiryDate = "2099-09-09T09:09:09Z";
    const purchaseDate = "2023-09-09T09:09:09Z";
    
    // Thiết lập gói Pro/Gold
    const entitlementData = {
      is_sandbox: false,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      period_type: "normal",
      expires_date: expiryDate,
      grace_period_expires_date: null,
      unsubscribe_detected_at: null,
      original_purchase_date: purchaseDate,
      purchase_date: purchaseDate,
      store: "app_store",
      product_identifier: "com.locket.premium.yearly"
    };

    nt.subscriber.entitlements["Pro"] = entitlementData;
    nt.subscriber.entitlements["gold"] = entitlementData;
    
    nt.subscriber.subscriptions["com.locket.premium.yearly"] = {
      is_sandbox: false,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      period_type: "normal",
      expires_date: expiryDate,
      grace_period_expires_date: null,
      unsubscribe_detected_at: null,
      original_purchase_date: purchaseDate,
      purchase_date: purchaseDate,
      store: "app_store"
    };
  }
}

$done({ body: JSON.stringify(nt) });
