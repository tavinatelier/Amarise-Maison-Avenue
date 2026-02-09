interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderConfirmationData {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  estimatedDelivery: string;
}

export const generateOrderConfirmationEmail = (data: OrderConfirmationData): string => {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="80" style="vertical-align: top;">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" width="64" height="64" style="border-radius: 4px; object-fit: cover;" />` : ''}
            </td>
            <td style="vertical-align: top; padding-left: 16px;">
              <p style="margin: 0 0 4px 0; font-weight: 500; color: #1a1a1a;">${item.name}</p>
              <p style="margin: 0; color: #666; font-size: 14px;">Qty: ${item.quantity}</p>
            </td>
            <td width="100" style="text-align: right; vertical-align: top;">
              <p style="margin: 0; font-weight: 500; color: #1a1a1a;">€${item.price.toFixed(2)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ÉCLAT</title>
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
              <!-- Thank You Message -->
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="width: 64px; height: 64px; background-color: #f0ebe3; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 28px;">✓</span>
                </div>
                <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 400; color: #1a1a1a;">Thank You for Your Order</h2>
                <p style="margin: 0; color: #666; font-size: 16px;">We're preparing your items with care.</p>
              </div>
              
              <!-- Order Info -->
              <div style="background-color: #f8f7f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td>
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
                      <p style="margin: 0; font-size: 18px; font-weight: 500; color: #1a1a1a;">${data.orderNumber}</p>
                    </td>
                    <td style="text-align: right;">
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Order Date</p>
                      <p style="margin: 0; font-size: 16px; color: #1a1a1a;">${data.orderDate}</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Items -->
              <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 1px;">Order Details</h3>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                ${itemsHtml}
              </table>
              
              <!-- Totals -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a;">€${data.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Shipping</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a;">${data.shipping === 0 ? 'Complimentary' : `€${data.shipping.toFixed(2)}`}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Tax</td>
                  <td style="padding: 8px 0; text-align: right; color: #1a1a1a;">€${data.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0 0 0; font-size: 18px; font-weight: 500; color: #1a1a1a; border-top: 2px solid #1a1a1a;">Total</td>
                  <td style="padding: 16px 0 0 0; text-align: right; font-size: 18px; font-weight: 500; color: #1a1a1a; border-top: 2px solid #1a1a1a;">€${data.total.toFixed(2)}</td>
                </tr>
              </table>
              
              <!-- Shipping Address -->
              <div style="background-color: #f8f7f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 1px;">Shipping To</h3>
                <p style="margin: 0; color: #1a1a1a; line-height: 1.6;">
                  ${data.customerName}<br>
                  ${data.shippingAddress.street}<br>
                  ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}<br>
                  ${data.shippingAddress.country}
                </p>
              </div>
              
              <!-- Estimated Delivery -->
              <div style="text-align: center; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Estimated Delivery</p>
                <p style="margin: 0; font-size: 18px; font-weight: 500; color: #1a1a1a;">${data.estimatedDelivery}</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f7f5; padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">
                Questions about your order? <a href="mailto:care@eclat.com" style="color: #1a1a1a; text-decoration: underline;">Contact us</a>
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

export type { OrderConfirmationData, OrderItem };
