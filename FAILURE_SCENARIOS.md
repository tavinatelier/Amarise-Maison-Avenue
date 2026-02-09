# AMARISÉ Failure Scenarios

## Overview

This document defines every failure scenario and the EXACT behavior required. Backend engineers implement these responses. Frontend displays appropriate UI states. No interpretation needed.

---

## 1. Payment Failures

### 1.1 Card Declined

```yaml
Trigger: Payment provider returns "card_declined"
User Message: "Your card was declined. Please try a different payment method."
UI State: Show payment form with error banner
Actions:
  - Log failure event
  - Increment retry counter
  - Keep cart intact
  - Do NOT send email
Recovery: Customer retries or changes card
```

### 1.2 Insufficient Funds

```yaml
Trigger: Payment provider returns "insufficient_funds"
User Message: "Your payment could not be processed. Please check your available balance."
UI State: Show payment form with error banner
Actions:
  - Log failure event
  - Keep cart intact
Recovery: Customer retries after funding account
```

### 1.3 Expired Card

```yaml
Trigger: Payment provider returns "expired_card"
User Message: "Your card has expired. Please use a different card."
UI State: Show payment form, highlight expiry field
Actions:
  - Log failure event
  - Keep cart intact
Recovery: Customer enters new card
```

### 1.4 Payment Timeout

```yaml
Trigger: No response from payment provider within 30 seconds
User Message: "We're having trouble processing your payment. Please try again."
UI State: Show payment form with error banner
Actions:
  - Log timeout event
  - Do NOT assume failure (may have succeeded)
  - Check order status before allowing retry
  - If payment succeeded → redirect to confirmation
Recovery: Customer retries or checks email
```

### 1.5 3D Secure Failed

```yaml
Trigger: Customer fails 3DS authentication
User Message: "Your bank authentication was unsuccessful. Please try again or use a different card."
UI State: Show payment form with error banner
Actions:
  - Log 3DS failure
  - Keep cart intact
Recovery: Customer retries with correct credentials
```

### 1.6 Duplicate Payment Attempt

```yaml
Trigger: Second payment attempted for same order
User Message: "This order has already been processed. Check your email for confirmation."
UI State: Redirect to order status page
Actions:
  - Log duplicate attempt
  - Show existing order details
  - Do NOT process new payment
Recovery: None needed, order already successful
```

---

## 2. Inventory Failures

### 2.1 Stock Depleted During Checkout

```yaml
Trigger: Stock reaches 0 while customer is in checkout
User Message: "We're sorry, [Product Name] just sold out."
UI State: 
  - Checkout blocked
  - Product shown with "Sold Out" badge
  - Suggest removal from cart
Actions:
  - Release any reservations
  - Log missed sale event
  - Offer waitlist signup
Recovery: Customer removes item, continues with remaining items
```

### 2.2 Partial Stock Available

```yaml
Trigger: Customer wants 3, only 2 available
User Message: "Only 2 of [Product Name] are available. Would you like to continue with 2?"
UI State:
  - Quantity auto-adjusted to max available
  - Price recalculated
  - Customer can proceed or remove
Actions:
  - Log partial availability event
Recovery: Customer accepts reduced quantity or removes
```

### 2.3 Inventory Sync Conflict

```yaml
Trigger: CMS shows "in stock" but inventory system shows 0
User Message: "This item is currently unavailable. We'll notify you when it's back."
UI State: Show "Unavailable" badge, offer waitlist
Actions:
  - Log sync conflict
  - Alert admin for investigation
  - Prevent purchase
Resolution: Inventory system is source of truth for purchasability
```

---

## 3. Shipping Failures

### 3.1 Unsupported Country

```yaml
Trigger: Customer selects country not in SUPPORTED_REGIONS
User Message: "We don't ship to [Country] yet. Join our waitlist to be notified when we do."
UI State:
  - Checkout paused at shipping step
  - Waitlist email field shown
  - No error styling, calm messaging
Actions:
  - Log unsupported country request
  - Collect email for region expansion
  - Keep cart intact (customer may use different address)
Recovery: Customer enters supported address or joins waitlist
```

### 3.2 Address Validation Failed

```yaml
Trigger: Address API returns "undeliverable"
User Message: "We couldn't verify this address. Please check and try again."
UI State:
  - Highlight address fields
  - Suggest corrections if available
Actions:
  - Log validation failure
Recovery: Customer corrects address
```

### 3.3 Shipping Rate Unavailable

```yaml
Trigger: Carrier API returns no rates
User Message: "Shipping options are temporarily unavailable. Please try again shortly."
UI State:
  - Show loading state briefly
  - Then show error with retry button
Actions:
  - Log carrier API failure
  - Alert admin
  - Retry automatically once
Recovery: Customer retries or waits
```

---

## 4. Product Failures

### 4.1 Product Disabled While In Cart

```yaml
Trigger: Admin disables product that exists in customer cart
User Message: None (graceful degradation)
UI State:
  - Cart shows product with "No longer available" badge
  - Quantity controls disabled
  - Price shown but greyed
  - Checkout blocked until removed
Actions:
  - Log cart impact event
  - Track for analytics (lost revenue)
Recovery: Customer removes item from cart
```

### 4.2 Product Archived

```yaml
Trigger: Customer navigates to archived product URL
User Message: "This piece is from a past collection."
UI State:
  - Redirect to archive page
  - Show product in "past collection" context
  - No purchase option
  - Show similar current products
Actions:
  - Log archive page view
Recovery: Customer browses current collection
```

### 4.3 Product Not Found

```yaml
Trigger: Customer navigates to non-existent product URL
User Message: "We couldn't find what you're looking for."
UI State:
  - Branded 404 page
  - Suggest popular products
  - Search functionality
Actions:
  - Log 404 event with URL
Recovery: Customer navigates elsewhere
```

---

## 5. Checkout Failures

### 5.1 Session Expired

```yaml
Trigger: Checkout session older than 30 minutes
User Message: "Your session has expired. Please review your cart and try again."
UI State:
  - Redirect to cart page
  - Cart contents preserved
  - Customer re-enters checkout
Actions:
  - Log session expiry
  - Release any inventory reservations
Recovery: Customer restarts checkout
```

### 5.2 Cart Empty at Checkout

```yaml
Trigger: Customer reaches checkout with empty cart
User Message: "Your ritual is empty."
UI State:
  - Redirect to collection page
  - Show empty cart message
Actions:
  - Log empty cart checkout attempt
Recovery: Customer adds products
```

### 5.3 Price Changed During Checkout

```yaml
Trigger: Product price updated while customer in checkout
User Message: None (silent update)
UI State:
  - Totals reflect new price
  - No disruption
Actions:
  - Log price change event
  - Use NEW price (current is always authoritative)
Recovery: None needed
```

---

## 6. Order Failures

### 6.1 Order Creation Failed

```yaml
Trigger: Database error when creating order
User Message: "We couldn't complete your order. Your payment has not been charged."
UI State:
  - Error page
  - Retry button
  - Support contact
Actions:
  - Log critical error
  - Alert engineering
  - Verify no payment was taken
Recovery: Customer retries, or contacts support
```

### 6.2 Fulfillment Impossible

```yaml
Trigger: Order paid but cannot be fulfilled (inventory error)
User Message: Email: "We're unable to fulfill your order. A full refund has been issued."
UI State: Order status shows "Refunded"
Actions:
  - Auto-refund triggered
  - Alert admin
  - Log fulfillment failure
Recovery: Automatic refund processed
```

### 6.3 Tracking Number Invalid

```yaml
Trigger: Carrier rejects tracking number
User Message: Email: "Your order is on its way. Tracking information will be updated shortly."
UI State: Order status shows "Shipped" (no tracking link)
Actions:
  - Log tracking error
  - Admin manually fixes
Recovery: Admin updates with correct tracking
```

---

## 7. Account Failures

### 7.1 Login Failed

```yaml
Trigger: Invalid credentials
User Message: "Email or password is incorrect."
UI State:
  - Login form with error
  - Forgot password link highlighted
Actions:
  - Log failed login
  - Increment lockout counter
  - After 5 failures: temporary lockout (15 min)
Recovery: Customer retries or resets password
```

### 7.2 Account Locked

```yaml
Trigger: Too many failed login attempts
User Message: "Your account is temporarily locked. Please try again in 15 minutes or reset your password."
UI State:
  - Login disabled
  - Reset password link prominent
Actions:
  - Log account lockout
  - Send security notification email
Recovery: Wait or reset password
```

---

## 8. System Failures

### 8.1 API Timeout

```yaml
Trigger: Backend API doesn't respond within 10 seconds
User Message: "Something went wrong. Please refresh and try again."
UI State:
  - Error component shown
  - Retry button available
Actions:
  - Log timeout with endpoint
  - Alert if repeated
Recovery: Customer refreshes or retries
```

### 8.2 Maintenance Mode

```yaml
Trigger: COMMERCE_CONTROLS.maintenanceMode = true
User Message: "We're making things even more beautiful. Back shortly."
UI State:
  - Maintenance page
  - Estimated return time if known
  - Email signup for notification
Actions:
  - All commerce functions disabled
  - Browsing still allowed if configured
Recovery: Admin disables maintenance mode
```

---

## 9. Webhook Failures

### 9.1 Duplicate Webhook

```yaml
Trigger: Same webhook event received twice
Behavior: Ignore second occurrence
Actions:
  - Log duplicate
  - Check idempotency key
  - Do NOT process again
```

### 9.2 Webhook Signature Invalid

```yaml
Trigger: Webhook signature verification fails
Behavior: Reject webhook, return 401
Actions:
  - Log security event
  - Alert admin
  - Do NOT process
```

### 9.3 Webhook Processing Failed

```yaml
Trigger: Error while processing valid webhook
Behavior: Return 500, provider will retry
Actions:
  - Log error
  - Implement exponential backoff
  - Alert after 3 consecutive failures
```

---

## Failure Response Summary Table

| Category | Scenario | User Sees | System Does |
|----------|----------|-----------|-------------|
| Payment | Declined | Error banner | Log, allow retry |
| Payment | Timeout | Error banner | Check status first |
| Inventory | Sold out | "Sold Out" badge | Block checkout |
| Inventory | Partial | Quantity adjusted | Recalculate total |
| Shipping | Unsupported | Waitlist prompt | Collect email |
| Product | Disabled | Greyed card | Block purchase |
| Product | Archived | Archive page | Suggest alternatives |
| Checkout | Expired | Back to cart | Release reservations |
| Order | Failed | Error page | Alert engineering |
| System | Timeout | Retry prompt | Log and alert |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-02 | Platform Team | Initial failure scenarios |
