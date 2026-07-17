# EmailJS Troubleshooting Reference

Common integration issues and debug workflow for EmailJS form submissions.

## 1. Credentials Verification

If messages fail to send, ensure your public key and IDs are complete.
Incomplete or placeholder keys will reject requests.

Check current credentials configuration in `.env`:
- **REACT_APP_EMAILJS_PUBLIC_KEY:** Typically 25-40 character string.
- **REACT_APP_EMAILJS_TEMPLATE_ID:** Double check matches EmailJS template list.
- **REACT_APP_EMAILJS_SERVICE_ID:** Double check matches EmailJS service list.

> **Crucial:** Always restart your local server after modifying `.env` values.

## 2. Browser Console Debugging

Open DevTools (F12) to inspect active request states:
- Verify variables loaded on page initialize.
- Inspect JSON response payloads from `https://api.emailjs.com/api/v1.0/email/send`.
- Check if template parameters (name, email, message) are correctly assigned.

## 3. Account Tier Limits
- The EmailJS Free Tier allows up to **200 emails per month**. Check your account dashboard to verify your quota has not been exceeded.
