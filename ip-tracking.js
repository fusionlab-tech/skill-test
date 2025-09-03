// IP Address Tracking Script
// This script tracks visitor IP addresses and sends them to the specified email

// Function to get visitor's IP address
async function getVisitorIP() {
    try {
        // Using a free IP detection service
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        // Fallback to another service
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data.ip;
        } catch (fallbackError) {
            console.error('Fallback IP service also failed:', fallbackError);
            return 'Unknown';
        }
    }
}

// Function to get current date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
}

// Function to get additional visitor information
function getVisitorInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direct visit',
        url: window.location.href
    };
}

// Function to send IP tracking data via email
async function sendIPTrackingData(ip, dateTime, visitorInfo) {
    try {
        // Initialize EmailJS (if not already done)
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded');
            return;
        }

        // EmailJS configuration
        const serviceID = 'service_5upnax4'; // Your EmailJS service ID
        const templateID = 'template_dr210cj'; // Template for IP tracking
        const publicKey = 'pT4qeVdM8rKuP1eA7'; // Your EmailJS public key

        // Prepare email data
        const emailData = {
            to_email: 'nathanfielder0530@gmail.com',
            from_name: 'Skill Test IP Tracker',
            subject: 'New Visitor IP Address',
            ip_address: ip,
            visit_date: dateTime,
            user_agent: visitorInfo.userAgent,
            language: visitorInfo.language,
            platform: visitorInfo.platform,
            screen_resolution: visitorInfo.screenResolution,
            timezone: visitorInfo.timezone,
            referrer: visitorInfo.referrer,
            page_url: visitorInfo.url,
            message: `New visitor detected!\n\nIP Address: ${ip}\nVisit Date/Time: ${dateTime}\nUser Agent: ${visitorInfo.userAgent}\nLanguage: ${visitorInfo.language}\nPlatform: ${visitorInfo.platform}\nScreen Resolution: ${visitorInfo.screenResolution}\nTimezone: ${visitorInfo.timezone}\nReferrer: ${visitorInfo.referrer}\nPage URL: ${visitorInfo.url}`
        };

        // Send email
        const response = await emailjs.send(serviceID, templateID, emailData, publicKey);
        console.log('IP tracking email sent successfully:', response);
        
        // Store in localStorage to avoid duplicate sends
        const trackingKey = `ip_tracked_${ip}_${new Date().toDateString()}`;
        localStorage.setItem(trackingKey, 'true');
        
    } catch (error) {
        console.error('Error sending IP tracking email:', error);
        
        // Fallback: Store data locally for manual review
        const trackingData = {
            ip: ip,
            dateTime: dateTime,
            visitorInfo: visitorInfo,
            timestamp: Date.now()
        };
        
        const existingData = JSON.parse(localStorage.getItem('ip_tracking_data') || '[]');
        existingData.push(trackingData);
        localStorage.setItem('ip_tracking_data', JSON.stringify(existingData));
        
        console.log('IP tracking data stored locally:', trackingData);
    }
}

// Function to check if IP was already tracked today
function wasIPTrackedToday(ip) {
    const trackingKey = `ip_tracked_${ip}_${new Date().toDateString()}`;
    return localStorage.getItem(trackingKey) === 'true';
}

// Main function to track visitor
async function trackVisitor() {
    try {
        // Get visitor IP
        const ip = await getVisitorIP();
        
        // Check if this IP was already tracked today
        if (wasIPTrackedToday(ip)) {
            console.log('IP already tracked today:', ip);
            return;
        }
        
        // Get current date/time
        const dateTime = getCurrentDateTime();
        
        // Get additional visitor info
        const visitorInfo = getVisitorInfo();
        
        // Send tracking data
        await sendIPTrackingData(ip, dateTime, visitorInfo);
        
        console.log('Visitor tracked:', { ip, dateTime, visitorInfo });
        
    } catch (error) {
        console.error('Error tracking visitor:', error);
    }
}

// Function to manually send stored tracking data
function sendStoredTrackingData() {
    const storedData = JSON.parse(localStorage.getItem('ip_tracking_data') || '[]');
    
    if (storedData.length > 0) {
        console.log('Found stored tracking data:', storedData);
        
        // Send each stored entry
        storedData.forEach(async (data) => {
            try {
                await sendIPTrackingData(data.ip, data.dateTime, data.visitorInfo);
            } catch (error) {
                console.error('Error sending stored data:', error);
            }
        });
        
        // Clear stored data after sending
        localStorage.removeItem('ip_tracking_data');
    }
}

// Initialize tracking when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the page to fully load
    setTimeout(() => {
        trackVisitor();
    }, 1000);
    
    // Also try to send any stored data
    sendStoredTrackingData();
});

// Export functions for manual use
window.trackVisitor = trackVisitor;
window.sendStoredTrackingData = sendStoredTrackingData;
