# EmailJS Contact Form Setup

Developer reference for configuring EmailJS integration on the portfolio site.

## 1. Credentials Checklist

Sign in to your [EmailJS Dashboard](https://www.emailjs.com/) and collect:
- **Service ID:** From **Email Services** (e.g., your connected Gmail service)
- **Template ID:** From **Email Templates** (create/design template for messages)
- **Public Key:** From **Account > API Keys**
- **Admin Email:** The destination address (`atharva160504@gmail.com`)

## 2. Environment Configuration

Add these configuration keys to your `.env` file in the project root:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
REACT_APP_ADMIN_EMAIL=atharva160504@gmail.com
```

> **Note:** Restart your local development server after editing `.env` to load the variables.

## 3. Email Template Variables

Configure your template body to capture these parameters sent from the form:
- **Subject:** `New Portfolio Visitor - Message from {{from_name}}`
- **Reply To:** `{{reply_to}}` (Sender's email)
- **Parameters:**
  - `{{from_name}}` - Visitor's name
  - `{{from_email}}` - Visitor's email
  - `{{message}}` - Visitor's message
