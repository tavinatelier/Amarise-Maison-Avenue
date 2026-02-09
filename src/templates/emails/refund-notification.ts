type RefundStatus = 'initiated' | 'processing' | 'completed';
type RefundReason = 'customer_request' | 'damaged_item' | 'wrong_item' | 'quality_issue' | 'other';

interface RefundItem {
  name: string;
  quantity: number;
  refundAmount: number;
}

interface RefundNotificationData {
  customerName: string;
  orderNumber: string;
  refundId: string;
  status: RefundStatus;
  reason: RefundReason;
  items: RefundItem[];
  subtotal: number;
  shippingRefund: number;
  totalRefund: number;
  paymentMethod: string;
  lastFourDigits?: string;
  estimatedProcessingDays: number;
  refundDate: string;
  originalOrderDate: string;
}

const statusConfig: Record<RefundStatus, { title: string; message: string; icon: string }> = {
  initiated: {
    title: 'Refund Request Received',
    message: 'We\'ve received your refund request and are reviewing it.',
    icon: '📋'
  },
  processing: {
    title: 'Refund Being Processed',
    message: 'Your refund is being processed by our team.',
    icon: '⏳'
  },
  completed: {
    title: 'Refund Complete',
    message: 'Your refund has been successfully processed.',
    icon: '✓'
  }
};

const reasonLabels: Record<RefundReason, string> = {
  customer_request: 'Change of mind',
  damaged_item: 'Item arrived damaged',
  wrong_item: 'Wrong item received',
  quality_issue: 'Quality not as expected',
  other: 'Other reason'
};

export const generateRefundNotificationEmail = (data: RefundNotificationData): string => {
  const config = statusConfig[data.status];
  
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
        <p style="margin: 0 0 4px 0; font-weight: 500; color: #1a1a1a;">${item.name}</p>
        <p style="margin: 0; color: #666; font-size: 14px;">Qty: ${item.quantity}</p>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
        <p style="margin: 0; font-weight: 500; color: #1a1a1a;">€${item.refundAmount.toFixed(2)}</p>
      </td>
    </tr>
  `).join('');

  const paymentInfo = data.lastFourDigits 
    ? `${data.paymentMethod} ending in ${data.lastFourDigits}`
    : data.paymentMethod;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund ${data.status === 'completed' ? 'Confirmation' : 'Update'} - ÉCLAT</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f7f5; -webkit-font-smoothing: antialiased;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f7f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 300; letter-spacing: 4px;">ÉCLAT</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <!-- Status Message -->
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="width: 72px; height: 72px; background-color: ${data.status === 'completed' ? '#e8f5e9' : '#f0ebe3'}; border-radius: 50%; margin: 0 auto 24px; line-height: 72px; font-size: 32px;">
                  ${config.icon}
                </div>
                <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 400; color: #1a1a1a;">${config.title}</h2>
                <p style="margin: 0; color: #666; font-size: 16px;">${config.message}</p>
              </div>
              
              <!-- Refund Summary -->
              <div style="background-color: ${data.status === 'completed' ? '#e8f5e9' : '#f8f7f5'}; border-radius: 8px; padding: 24px; margin-bottom: 32px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Total Refund Amount</p>
                <p style="margin: 0; font-size: 36px; font-weight: 500; color: #1a1a1a;">€${data.totalRefund.toFixed(2)}</p>
              </div>
              
              <!-- Reference Info -->
              <div style="background-color: #f8f7f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 16px;">
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Refund ID</p>
                      <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1a1a1a;">${data.refundId}</p>
                    </td>
                    <td style="padding-bottom: 16px; text-align: right;">
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Original Order</p>
                      <p style="margin: 0; font-size: 16px; color: #1a1a1a;">${data.orderNumber}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Reason</p>
                      <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${reasonLabels[data.reason]}</p>
                    </td>
                    <td style="text-align: right;">
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Request Date</p>
                      <p style="margin: 0; font-size: 14px; color: #1a1a1a;">${data.refundDate}</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Items Being Refunded -->
              <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 1px;">Items Refunded</h3>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                ${itemsHtml}
              </table>
              
              <!-- Totals -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Items Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a;">€${data.subtotal.toFixed(2)}</td>
                </tr>
                ${data.shippingRefund > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #666;">Shipping Refund</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a;">€${data.shippingRefund.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 16px 0 0 0; font-size: 18px; font-weight: 500; color: #1a1a1a; border-top: 2px solid #1a1a1a;">Total Refund</td>
                  <td style="padding: 16px 0 0 0; text-align: right; font-size: 18px; font-weight: 500; color: #1a1a1a; border-top: 2px solid #1a1a1a;">€${data.totalRefund.toFixed(2)}</td>
                </tr>
              </table>
              
              <!-- Payment Info -->
              <div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 1px;">Refund Details</h3>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="color: #666; padding-bottom: 8px;">Refunding to</td>
                    <td style="text-align: right; color: #1a1a1a; padding-bottom: 8px;">${paymentInfo}</td>
                  </tr>
                  <tr>
                    <td style="color: #666;">Processing time</td>
                    <td style="text-align: right; color: #1a1a1a;">${data.estimatedProcessingDays} business days</td>
                  </tr>
                </table>
              </div>
              
              ${data.status !== 'completed' ? `
              <!-- Processing Note -->
              <div style="background-color: #fff8e1; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0; color: #8d6e00; font-size: 14px;">
                  <strong>Please note:</strong> It may take ${data.estimatedProcessingDays} business days for the refund to appear in your account, depending on your financial institution.
                </p>
              </div>
              ` : `
              <!-- Completion Note -->
              <div style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                  <strong>Refund complete!</strong> The refund has been credited to your ${paymentInfo}. Please allow up to ${data.estimatedProcessingDays} business days for it to appear in your account.
                </p>
              </div>
              `}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f7f5; padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
                Questions about your refund? <a href="mailto:care@eclat.com" style="color: #1a1a1a; text-decoration: underline;">Contact us</a>
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                © 2026 ÉCLAT. All rights reserved.<br>
                <a href="#" style="color: #999;">Privacy Policy</a> · <a href="#" style="color: #999;">Terms of Service</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export type { RefundNotificationData, RefundStatus, RefundReason, RefundItem };
