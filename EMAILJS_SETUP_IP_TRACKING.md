# EmailJS Setup for IP Tracking

## Overview
This document explains how to set up EmailJS to receive IP tracking emails for visitors to your skill test platform.

## EmailJS Configuration

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_skilltest`)

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use the following template:

**Template ID**: `template_ip_tracking`

**Subject**: `New Visitor IP Address - {{subject}}`

**Content**:
```
New visitor detected on your skill test platform!

Visitor Information:
- IP Address: {{ip_address}}
- Visit Date/Time: {{visit_date}}
- User Agent: {{user_agent}}
- Language: {{language}}
- Platform: {{platform}}
- Screen Resolution: {{screen_resolution}}
- Timezone: {{timezone}}
- Referrer: {{referrer}}
- Page URL: {{page_url}}

Message:
{{message}}

---
This email was sent automatically by your skill test platform.
```

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `YOUR_EMAILJS_PUBLIC_KEY`)

### 5. Update Configuration
Update the following values in `ip-tracking.js`:

```javascript
const serviceID = 'service_skilltest'; // Replace with your service ID
const templateID = 'template_ip_tracking'; // Replace with your template ID
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your public key
```

## Features

### IP Tracking Features:
- **Automatic IP Detection**: Uses multiple IP detection services for reliability
- **Duplicate Prevention**: Tracks only once per IP per day
- **Rich Visitor Data**: Captures IP, date/time, user agent, language, platform, screen resolution, timezone, referrer, and page URL
- **Email Notifications**: Sends detailed visitor information to your email
- **Fallback Storage**: Stores data locally if email fails
- **Manual Retry**: Function to resend stored data

### Data Collected:
- IP Address
- Visit Date/Time
- User Agent (browser/device info)
- Language preference
- Platform (Windows, Mac, etc.)
- Screen Resolution
- Timezone
- Referrer (where they came from)
- Page URL

### Privacy Considerations:
- Only tracks IP addresses and basic browser information
- No personal data is collected
- Data is only sent to your specified email
- Local storage is used for fallback and duplicate prevention

## Testing

### Manual Testing:
1. Open browser console on index.html
2. Run: `trackVisitor()` to manually trigger tracking
3. Run: `sendStoredTrackingData()` to send any stored data

### Verification:
- Check your email for IP tracking notifications
- Check browser console for any errors
- Verify that duplicate visits from same IP are not tracked multiple times per day

## Troubleshooting

### Common Issues:
1. **EmailJS not loaded**: Ensure EmailJS script is loaded before ip-tracking.js
2. **CORS errors**: IP detection services may be blocked by some browsers
3. **Email not received**: Check spam folder, verify EmailJS configuration
4. **Duplicate emails**: System prevents duplicates per IP per day

### Debug Mode:
Open browser console to see detailed logging of the tracking process.

## Security Notes:
- IP addresses are considered personal data in some jurisdictions
- Ensure compliance with local privacy laws
- Consider adding a privacy notice to your website
- The system only tracks basic technical information, not personal user data
