/**
 * NEWSLETTER SIGNUP EMAIL TEMPLATE
 * BACKEND HANDOFF: Replace with real email service (SendGrid, Resend, etc.)
 */

export interface NewsletterSignupData {
  email: string;
  firstName?: string;
  preferredLanguage?: string;
}

export function generateNewsletterSignupEmail(data: NewsletterSignupData): string {
  const name = data.firstName || "there";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome to AMARISÉ</title></head>
<body style="font-family: 'Cormorant Garamond', Georgia, serif; background: #FAFAF8; padding: 40px; color: #2C2C2C;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; padding: 48px;">
    <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 6px; text-align: center; margin-bottom: 32px;">AMARISÉ</h1>
    <p style="font-size: 16px; line-height: 1.8;">Dear ${name},</p>
    <p style="font-size: 16px; line-height: 1.8;">Welcome to the AMARISÉ world. You'll be among the first to discover new collections, exclusive previews, and editorial stories from the maison.</p>
    <p style="font-size: 16px; line-height: 1.8;">We believe luxury is quiet, intentional, and deeply personal. Our newsletter reflects that philosophy.</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://amarisemaisonavenue.com" style="display: inline-block; padding: 14px 40px; background: #2C2C2C; color: #FAFAF8; text-decoration: none; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Explore the Maison</a>
    </div>
    <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
      You're receiving this because ${data.email} was subscribed to AMARISÉ updates.<br>
      <a href="https://amarisemaisonavenue.com/email-preferences" style="color: #999;">Manage preferences</a> · 
      <a href="https://amarisemaisonavenue.com/email-preferences" style="color: #999;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>`;
}
