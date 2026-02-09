type ShippingStatus = 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered';

interface ShippingUpdateData {
  customerName: string;
  orderNumber: string;
  status: ShippingStatus;
  trackingNumber: string;
  carrier: string;
  trackingUrl: string;
  estimatedDelivery: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
  }>;
}

const statusConfig: Record<ShippingStatus, { title: string; message: string; icon: string }> = {
  shipped: {
    title: 'Your Order Has Shipped',
    message: 'Your order is on its way to you.',
    icon: '📦'
  },
  in_transit: {
    title: 'Your Order Is In Transit',
    message: 'Your package is making its way to you.',
    icon: '🚚'
  },
  out_for_delivery: {
    title: 'Out for Delivery',
    message: 'Your package will arrive today.',
    icon: '🏠'
  },
  delivered: {
    title: 'Your Order Has Been Delivered',
    message: 'Your package has arrived at its destination.',
    icon: '✨'
  }
};

export const generateShippingUpdateEmail = (data: ShippingUpdateData): string => {
  const config = statusConfig[data.status];
  
  const itemsList = data.items.map(item => 
    `<li style="margin-bottom: 4px; color: #666;">${item.name} × ${item.quantity}</li>`
  ).join('');

  const progressSteps = [
    { status: 'shipped', label: 'Shipped' },
    { status: 'in_transit', label: 'In Transit' },
    { status: 'out_for_delivery', label: 'Out for Delivery' },
    { status: 'delivered', label: 'Delivered' }
  ];

  const currentIndex = progressSteps.findIndex(s => s.status === data.status);
  
  const progressHtml = progressSteps.map((step, index) => {
    const isActive = index <= currentIndex;
    const isCurrent = index === currentIndex;
    return `
      <td style="text-align: center; width: 25%;">
        <div style="width: 24px; height: 24px; border-radius: 50%; margin: 0 auto 8px; background-color: ${isActive ? '#1a1a1a' : '#e5e5e5'}; color: ${isActive ? '#fff' : '#999'}; font-size: 12px; line-height: 24px;">
          ${isActive ? '✓' : index + 1}
        </div>
        <p style="margin: 0; font-size: 11px; color: ${isCurrent ? '#1a1a1a' : '#999'}; font-weight: ${isCurrent ? '500' : '400'};">${step.label}</p>
      </td>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipping Update - ÉCLAT</title>
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
                <div style="width: 72px; height: 72px; background-color: #f0ebe3; border-radius: 50%; margin: 0 auto 24px; line-height: 72px; font-size: 32px;">
                  ${config.icon}
                </div>
                <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 400; color: #1a1a1a;">${config.title}</h2>
                <p style="margin: 0; color: #666; font-size: 16px;">${config.message}</p>
              </div>
              
              <!-- Progress Tracker -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                <tr>
                  ${progressHtml}
                </tr>
              </table>
              
              <!-- Tracking Info -->
              <div style="background-color: #f8f7f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td>
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
                      <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500; color: #1a1a1a;">${data.orderNumber}</p>
                      
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
                      <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500; color: #1a1a1a;">${data.trackingNumber}</p>
                      
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Carrier</p>
                      <p style="margin: 0; font-size: 16px; color: #1a1a1a;">${data.carrier}</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Track Button -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${data.trackingUrl}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 4px; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">
                  Track Your Package
                </a>
              </div>
              
              <!-- Delivery Info -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td style="width: 50%; padding-right: 16px; vertical-align: top;">
                    <div style="background-color: #f8f7f5; border-radius: 8px; padding: 20px;">
                      <p style="margin: 0 0 8px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Estimated Delivery</p>
                      <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1a1a1a;">${data.estimatedDelivery}</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding-left: 16px; vertical-align: top;">
                    <div style="background-color: #f8f7f5; border-radius: 8px; padding: 20px;">
                      <p style="margin: 0 0 8px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Shipping To</p>
                      <p style="margin: 0; font-size: 14px; color: #1a1a1a; line-height: 1.5;">
                        ${data.shippingAddress.city}, ${data.shippingAddress.country}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Items in Shipment -->
              <div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 1px;">Items in This Shipment</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  ${itemsList}
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f7f5; padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
                Need help with your delivery? <a href="mailto:care@eclat.com" style="color: #1a1a1a; text-decoration: underline;">Contact us</a>
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

export type { ShippingUpdateData, ShippingStatus };
