// Email Utility for Skill Test Platform
// This file provides a centralized email sending solution using EmailJS

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "pT4qeVdM8rKuP1eA7",
    SERVICE_ID: "service_5upnax4", // Gmail service - needs proper authentication
    TEMPLATE_ID: "template_c4rdgkl"
};

// Alternative EmailJS services (if Gmail fails)
const ALTERNATIVE_SERVICES = [
    {
        name: "Gmail (Current)",
        serviceId: "service_mps3bzd",
        templateId: "template_c4rdgkl"
    },
    {
        name: "Outlook",
        serviceId: "service_outlook", // You'll need to create this
        templateId: "template_c4rdgkl"
    },
    {
        name: "Yahoo",
        serviceId: "service_yahoo", // You'll need to create this
        templateId: "template_c4rdgkl"
    }
];

// Wait for EmailJS to be available
function waitForEmailJS(maxWaitTime = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        const checkEmailJS = () => {
            if (typeof emailjs !== 'undefined') {
                console.log('EmailJS library found after waiting');
                resolve(true);
            } else if (Date.now() - startTime > maxWaitTime) {
                console.error('EmailJS library not loaded within timeout');
                reject(new Error('EmailJS library not loaded'));
            } else {
                setTimeout(checkEmailJS, 100);
            }
        };
        
        checkEmailJS();
    });
}

// Initialize EmailJS
async function initializeEmailJS() {
    try {
        console.log('Waiting for EmailJS library...');
        await waitForEmailJS();
        
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized successfully with key:', EMAILJS_CONFIG.PUBLIC_KEY);
            return true;
        } else {
            console.error('EmailJS library not loaded');
            return false;
        }
    } catch (error) {
        console.error('Error initializing EmailJS:', error);
        return false;
    }
}

// Send exam results via EmailJS with service fallback
async function sendExamResults(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
    console.log('Attempting to send email via EmailJS...');
    
    // Initialize EmailJS
    if (!(await initializeEmailJS())) {
        console.error('EmailJS initialization failed');
        throw new Error('EmailJS not available');
    }

    // Prepare email body
    const emailBody = formatEmailBody(candidateInfo, examResults, questions, currentAnswers, timeLeft);
    
    // EmailJS template parameters
    const templateParams = {
        to_email: "nathanfielder0530@gmail.com",
        to_name: "Nathan Fielder",
        from_name: candidateInfo.name,
        from_email: candidateInfo.email,
        subject: `${candidateInfo.skill} Skill Test Results - ${candidateInfo.name}`,
        message: emailBody,
        candidate_name: candidateInfo.name,
        candidate_email: candidateInfo.email,
        candidate_address: `${candidateInfo.street}, ${candidateInfo.state}, ${candidateInfo.country}`,
        candidate_phone: candidateInfo.phone,
        skill_tested: candidateInfo.skill,
        score: `${examResults.score}/${examResults.totalQuestions}`,
        percentage: `${examResults.percentage}%`,
        time_remaining: `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`,
        question_details: formatQuestionDetails(questions, currentAnswers)
    };
    
    console.log('Sending email with parameters:', templateParams);
    console.log('Using Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('Using Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    
    // Try to send email with current service
    try {
        const response = await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);
        console.log('Email sent successfully:', response);
        return { success: true, message: 'Exam results have been sent successfully!' };
    } catch (error) {
        console.error('EmailJS sending failed:', error);
        
        // Check if it's an authentication issue
        if (error.status === 412 && error.text && error.text.includes('insufficient authentication scopes')) {
            console.error('Gmail authentication issue detected');
            return { 
                success: false, 
                error: error, 
                message: 'Gmail authentication issue. Please check EmailJS service permissions.',
                authIssue: true
            };
        }
        
        return { 
            success: false, 
            error: error, 
            message: 'EmailJS failed. Using fallback method.' 
        };
    }
}

// Fallback email method using mailto
function sendResultsFallback(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
    console.log('Using fallback mailto method...');
    const emailBody = formatEmailBody(candidateInfo, examResults, questions, currentAnswers, timeLeft);
    const mailtoLink = `mailto:nathanfielder0530@gmail.com?subject=${candidateInfo.skill} Skill Test Results - ${candidateInfo.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Try to open default email client
    try {
        window.open(mailtoLink);
        return { success: true, message: 'Opened email client with results.' };
    } catch (error) {
        console.error('Fallback email failed:', error);
        return { success: false, error: error, message: 'Email client could not be opened.' };
    }
}

// Format email body
function formatEmailBody(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
    return `
Candidate Information:
Name: ${candidateInfo.name}
Email: ${candidateInfo.email}
Address: ${candidateInfo.street}, ${candidateInfo.state}, ${candidateInfo.country}
Phone: ${candidateInfo.phone}
Skill Tested: ${candidateInfo.skill}

Exam Results:
Score: ${examResults.score}/${examResults.totalQuestions} (${examResults.percentage}%)
Time Remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}

Question Details:
${formatQuestionDetails(questions, currentAnswers)}
    `;
}

// Format question details
function formatQuestionDetails(questions, currentAnswers) {
    return questions.map((q, index) => {
        const userAnswer = currentAnswers[index];
        const isCorrect = userAnswer === q.correct;
        return `Q${index + 1} (${q.level}): ${isCorrect ? 'Correct' : 'Incorrect'} - User selected: ${userAnswer >= 0 ? q.options[userAnswer] : 'No answer'} | Correct: ${q.options[q.correct]}`;
    }).join('\n');
}

// Handle email sending with user feedback
async function handleEmailSending(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
    console.log('Starting email sending process...');
    
    try {
        // First try EmailJS
        const result = await sendExamResults(candidateInfo, examResults, questions, currentAnswers, timeLeft);
        
        if (result.success) {
            console.log('EmailJS succeeded:', result.message);
            alert(result.message);
        } else {
            console.log('EmailJS failed, showing fallback options');
            
            // Special handling for authentication issues
            if (result.authIssue) {
                const authMessage = `Gmail authentication issue detected!\n\nTo fix this:\n1. Go to EmailJS Dashboard\n2. Reconnect your Gmail service\n3. Ensure you grant 'Send emails' permission\n\nFor now, using fallback method.`;
                alert(authMessage);
            }
            
            // If EmailJS fails, show fallback options
            const fallbackMessage = `EmailJS failed. Please copy and paste the following results manually:\n\n${formatEmailBody(candidateInfo, examResults, questions, currentAnswers, timeLeft)}`;
            alert(fallbackMessage);
            
            // Offer fallback email option
            if (confirm('Would you like to try opening your email client as a fallback?')) {
                const fallbackResult = sendResultsFallback(candidateInfo, examResults, questions, currentAnswers, timeLeft);
                if (!fallbackResult.success) {
                    alert('Fallback email also failed. Please copy the results manually.');
                }
            }
        }
    } catch (error) {
        console.error('Email handling error:', error);
        alert('Email sending encountered an error. Please copy the results manually.');
    }
}
