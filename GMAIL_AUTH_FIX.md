# 🔴 Gmail Authentication Fix Guide

## Current Issue
**Error**: `"Gmail_API: Request had insufficient authentication scopes"`
**Status Code**: 412
**Problem**: Gmail service doesn't have proper permissions to send emails

## ✅ What This Means
- **EmailJS is working correctly**
- **Your credentials are valid**
- **The issue is Gmail permissions, not code**
- **This is a common EmailJS configuration issue**

## 🔧 How to Fix

### **Step 1: Go to EmailJS Dashboard**
1. Open: https://dashboard.emailjs.com/
2. Sign in to your account
3. Navigate to **"Email Services"**

### **Step 2: Find Your Gmail Service**
1. Look for service ID: `service_mps3bzd`
2. Click **"Edit"** or **"Reconnect"**
3. You'll see your current Gmail connection

### **Step 3: Re-authenticate with Gmail**
1. Click **"Reconnect"** or **"Edit"**
2. Choose **"Gmail"** as email provider
3. Click **"Connect Account"**
4. **IMPORTANT**: When Gmail asks for permissions, ensure you grant:
   - ✅ **Send emails**
   - ✅ **Read emails** (if prompted)
   - ✅ **Manage emails** (if prompted)
   - ✅ **Compose emails**

### **Step 4: Verify Permissions**
1. After reconnecting, check the service status
2. Ensure it shows **"Connected"** or **"Active"**
3. Test the service if EmailJS provides a test option

## 🚨 Common Permission Issues

### **Insufficient Scopes Error**
- **Cause**: Gmail didn't grant enough permissions
- **Solution**: Re-authenticate and ensure ALL permissions are granted

### **Service Not Connected**
- **Cause**: Gmail connection was lost
- **Solution**: Reconnect the service

### **Rate Limiting**
- **Cause**: Too many emails sent
- **Solution**: Wait or upgrade EmailJS plan

## 🔄 Alternative Solutions

### **Option 1: Create New Gmail Service**
1. Delete current Gmail service
2. Create new Gmail service
3. Ensure proper permissions during setup

### **Option 2: Use Different Email Provider**
1. **Outlook/Hotmail**: Often more reliable
2. **Yahoo Mail**: Good alternative
3. **Custom SMTP**: Most reliable but complex

### **Option 3: Contact EmailJS Support**
- Email: support@emailjs.com
- Include error: `412 - Gmail_API: Request had insufficient authentication scopes`

## 🧪 Testing the Fix

### **After Fixing Permissions**
1. Go back to `test-email.html`
2. Click **"Test EmailJS"**
3. Check for success message
4. Verify email received

### **If Still Failing**
1. Check EmailJS dashboard for service status
2. Try creating a new Gmail service
3. Test with different email provider

## 📱 Mobile/App Authentication

### **Gmail App Users**
- Use Gmail app for authentication
- Ensure app has latest updates
- Grant all requested permissions

### **2FA Users**
- Use app passwords if needed
- Ensure 2FA is properly configured
- Try authenticating in incognito mode

## 🔒 Security Notes

### **What's Safe to Share**
- ✅ Service ID (public)
- ✅ Template ID (public)
- ✅ Public Key (public)

### **What's NOT Safe to Share**
- ❌ Gmail password
- ❌ App passwords
- ❌ Private keys

## 📋 Checklist

- [ ] EmailJS dashboard accessed
- [ ] Gmail service found (`service_mps3bzd`)
- [ ] Service reconnected/reauthenticated
- [ ] All permissions granted (Send, Read, Manage)
- [ ] Service shows "Connected" status
- [ ] Test email sent successfully
- [ ] Email received in inbox

## 🆘 Still Having Issues?

### **Contact Information**
- **EmailJS Support**: support@emailjs.com
- **Gmail Support**: https://support.google.com/mail/
- **Issue Reference**: `412 - Gmail_API: Request had insufficient authentication scopes`

### **What to Include**
- Error message and status code
- EmailJS service ID
- Steps you've already tried
- Screenshots of permission screens

## 🎯 Quick Fix Summary

1. **Go to EmailJS Dashboard**
2. **Find Gmail service** (`service_mps3bzd`)
3. **Click "Reconnect"**
4. **Grant ALL permissions** when prompted
5. **Test with test-email.html**

This should resolve the authentication issue and get your emails working properly!
