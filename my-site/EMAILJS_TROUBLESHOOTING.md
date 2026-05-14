# EmailJS Troubleshooting Guide

## Error: "Failed to send message. Please try again later."

This means EmailJS rejected the request. Here's how to debug:

## Step 1: Check Browser Console

1. **Open your browser DevTools** (F12 or right-click → Inspect)
2. Go to the **Console** tab
3. Reload the page
4. Look for logs like:
   - ✓ "EmailJS initialized"
   - Service ID: ✓ Set
   - Template ID: ✓ Set
   - Public Key: ✓ Set

If any show ✗ Missing, the credentials in `.env` are not loaded.

## Step 2: Verify Your .env File

Your current `.env` file contains:
```
REACT_APP_EMAILJS_PUBLIC_KEY=4sDB_I_mvQgG4lQ1_
REACT_APP_EMAILJS_TEMPLATE_ID=template_t0863cr
REACT_APP_EMAILJS_SERVICE_ID=service_u7whm7b
```

**These look incomplete!** The public key should be much longer (typically 30+ characters).

## Step 3: Get Correct Credentials from EmailJS

### To Get Service ID:
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **Email Services** in the left sidebar
3. Click on your service (e.g., "Gmail")
4. Copy the **Service ID** (format: `service_xxxxxxxxxx`)
5. It should be something like: `service_u7whm7b1c2d3e4f5g6h` (longer!)

### To Get Template ID:
1. Click **Email Templates** in the left sidebar
2. Click on your template
3. Copy the **Template ID** (format: `template_xxxxxxxxxx`)
4. Should look like: `template_t0863cr1a2b3c4d5e6f`

### To Get Public Key:
1. Click **Account** in the left sidebar
2. Click **API Keys** tab
3. Copy your **Public Key**
4. **Important:** Public keys are usually 25-40 characters long
5. Should look like: `4sDB_I_mvQgG4lQ1c2d3e4f5g6h7i8j9k0l1m2n3o`

## Step 4: Update .env File

**IMPORTANT:** After editing `.env`, you MUST:
1. **Save the file**
2. **Restart your React development server** (`npm start`)

This is crucial because React needs to reload environment variables!

```env
GENERATE_SOURCEMAP=false

REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_ADMIN_EMAIL=atharva160504@gmail.com
```

## Step 5: Common Issues & Fixes

### Issue: "Failed to send message"
**Possible causes:**
- Credentials are incorrect or incomplete
- Service ID doesn't match your email service
- Template ID doesn't exist
- Public Key is wrong or truncated
- Your EmailJS account's free tier limit (200/month) is exceeded

**Fix:**
1. Double-check all credentials in `.env`
2. Make sure there are NO extra spaces
3. Restart the development server
4. Check EmailJS dashboard → Activity to see if requests are being received

### Issue: "Email service not configured"
**Cause:** One or more credentials are missing from `.env`

**Fix:**
1. Add all four required variables to `.env`
2. Make sure each one has a value (not empty)
3. Restart the server

### Issue: Email never arrives
**Possible causes:**
- EmailJS template variables don't match
- Gmail has blocked the connection
- Email went to spam folder
- Your email service isn't verified in EmailJS

**Fix:**
1. Check spam/promotions folder
2. Verify template has correct variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`
3. Check EmailJS Activity log for any error messages
4. Verify your Gmail is authorized in EmailJS

## Step 6: Test with EmailJS Playground (Optional)

1. Go to [EmailJS Playground](https://www.emailjs.com/docs/examples/browser/)
2. Enter your Service ID, Template ID, and Public Key
3. Try sending a test email
4. This helps isolate if the issue is with your credentials or the React code

## Quick Checklist

- [ ] Went to EmailJS dashboard
- [ ] Copied full Service ID (not truncated)
- [ ] Copied full Template ID (not truncated)
- [ ] Copied full Public Key (30+ characters)
- [ ] Updated all 4 variables in `.env` file
- [ ] Saved `.env` file
- [ ] Stopped development server (Ctrl+C)
- [ ] Restarted with `npm start`
- [ ] Checked browser console for errors
- [ ] Tried sending again

## Still Not Working?

If it's still not working after these steps:

1. **Open browser console** (F12 → Console tab)
2. **Try sending a message**
3. **Look for error details** in the console
4. **Check EmailJS Activity dashboard** for request logs
5. The error message will tell you exactly what's wrong

Share the exact error from the browser console and EmailJS dashboard for more specific help!
