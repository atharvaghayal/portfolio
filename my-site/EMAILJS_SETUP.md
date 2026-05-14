# EmailJS Setup Guide for Portfolio Contact Form

This guide will help you set up EmailJS to send emails from the "Send a Note" contact form on your portfolio.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail** (or your preferred email provider)
4. Follow the instructions to connect your email (atharva160504@gmail.com)
5. Name your service (e.g., "Portfolio Contact") and copy the **Service ID**

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up the template with the following details:

### Template Variables:
- **To Email:** `{{to_email}}` → Will receive at atharva160504@gmail.com
- **Reply To:** `{{reply_to}}` → Visitor's email address
- **From Name:** `{{from_name}}` → Visitor's name
- **Message:** `{{message}}` → Visitor's message

### Professional Email Template Content:

**Subject:**
```
New Portfolio Visitor - Message from {{from_name}}
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #5227ff; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
      .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
      .visitor-info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #5227ff; }
      .message-box { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
      .footer { color: #999; font-size: 12px; margin-top: 20px; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎉 New Portfolio Visitor</h1>
        <p>Someone has reached out through your portfolio site!</p>
      </div>
      
      <div class="content">
        <div class="visitor-info">
          <p><strong>📝 Name:</strong> {{from_name}}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
        </div>
        
        <div class="message-box">
          <p><strong>💬 Message:</strong></p>
          <p>{{message}}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          ✉️ You can reply directly to this email or visit <a href="mailto:{{from_email}}">{{from_email}}</a>
        </p>
      </div>
      
      <div class="footer">
        <p>This email was sent from your portfolio contact form.</p>
      </div>
    </div>
  </body>
</html>
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

## Step 5: Update Environment Variables

Open `.env` in the `my-site` folder and update:

```
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
REACT_APP_ADMIN_EMAIL=atharva160504@gmail.com
```

Replace the placeholders with your actual values from EmailJS.

## Step 6: Install Dependencies

If you haven't already installed the dependencies:

```bash
cd my-site
npm install
```

## Step 7: Test the Form

1. Start your development server: `npm start`
2. Click the **"Send a Note"** button in the footer
3. Fill in the form and submit
4. You should receive a professional email at atharva160504@gmail.com

## What Visitors Will See

- **Loading:** "Sending..." button state while the email is being sent
- **Success:** A confirmation message: "Message received successfully! Thanks for reaching out! I'll get back to you as soon as possible."
- **Error:** If something goes wrong, they'll see an error message and can try again

## Email Template Customization

You can further customize the email template in EmailJS dashboard to:
- Change colors to match your brand
- Add your logo
- Modify the message format
- Add additional fields

## Troubleshooting

- **Email not sending?** Check that all three credentials are correctly copied in the `.env` file
- **Email going to spam?** Configure DKIM and SPF records in your email provider settings
- **Template not working?** Ensure all variable names in the template match: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`, `{{reply_to}}`

## Free Tier Limits

EmailJS free tier includes:
- 200 emails/month
- Unlimited email templates
- 24/7 support

For production sites with higher volume, consider upgrading to a paid plan.
