// Email Utility for Skill Test Platform
// This file provides a centralized email sending solution using EmailJS

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "pT4qeVdM8rKuP1eA7", // Replace with your actual EmailJS public key
    SERVICE_ID: "service_mps3bzd", // Replace with your actual EmailJS service ID
    TEMPLATE_ID: "template_c4rdgkl" // Replace with your actual EmailJS template ID
};

// Initialize EmailJS
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        return true;
    }
    return false;
}

// Send exam results via EmailJS
function sendExamResults(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
    // Initialize EmailJS
    if (!initializeEmailJS()) {
        console.error('EmailJS not available');
        return sendResultsFallback(candidateInfo, examResults, questions, currentAnswers, timeLeft);
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
    
    // Send email using EmailJS
    return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            return { success: true, message: 'Exam results have been sent successfully!' };
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            return { success: false, error: error, message: 'Email sending failed. Using fallback method.' };
        });
}

// Fallback email method using mailto
function sendResultsFallback(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
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
function handleEmailSending(candidateInfo, examResults, questions, currentAnswers, timeLeft) {
    // First try EmailJS
    sendExamResults(candidateInfo, examResults, questions, currentAnswers, timeLeft)
        .then(result => {
            if (result.success) {
                alert(result.message);
            } else {
                // If EmailJS fails, show fallback options
                const fallbackMessage = `Email sending failed. Please copy and paste the following results manually:\n\n${formatEmailBody(candidateInfo, examResults, questions, currentAnswers, timeLeft)}`;
                alert(fallbackMessage);
                
                // Offer fallback email option
                if (confirm('Would you like to try opening your email client as a fallback?')) {
                    const fallbackResult = sendResultsFallback(candidateInfo, examResults, questions, currentAnswers, timeLeft);
                    if (!fallbackResult.success) {
                        alert('Fallback email also failed. Please copy the results manually.');
                    }
                }
            }
        })
        .catch(error => {
            console.error('Email handling error:', error);
            alert('Email sending encountered an error. Please copy the results manually.');
        });
}
