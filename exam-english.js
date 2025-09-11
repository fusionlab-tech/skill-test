// English Language Exam Questions - B2-C1 Level (20 Questions Total)
const englishQuestions = [
    // Basic Questions (5) - B2 Level - Professional Communication
    {
        question: "You're writing a professional email to a client about a project delay. Which sentence best maintains a professional tone while being honest about the situation?\n\n<pre><code>\"I'm really sorry, but we messed up the timeline and won't be able to deliver on time.\"\n\n\"Due to unforeseen technical challenges, we need to extend the project deadline by two weeks.\"\n\n\"The project is delayed because our team didn't work hard enough.\"\n\n\"We can't finish the project on time, but it's not our fault.\"</code></pre>",
        options: ["First option - direct and honest", "Second option - professional and explanatory", "Third option - takes responsibility", "Fourth option - avoids blame"],
        correct: 1,
        level: "basic"
    },
    {
        question: "You're presenting quarterly results to senior management. Which opening statement best establishes credibility and sets the right tone?\n\n<pre><code>\"So, I guess we did okay this quarter...\"\n\n\"I'm going to talk about our quarterly performance now.\"\n\n\"Our Q3 results demonstrate strong growth across all key metrics.\"\n\n\"Well, here are the numbers, but I'm not sure what they mean.\"</code></pre>",
        options: ["First option - modest and humble", "Second option - clear and direct", "Third option - confident and data-driven", "Fourth option - honest about uncertainty"],
        correct: 2,
        level: "basic"
    },
    {
        question: "You're responding to a customer complaint about a product defect. Which response best balances empathy with professionalism?\n\n<pre><code>\"We're really sorry about this issue. We understand how frustrating this must be for you, and we're committed to resolving it quickly. Please contact our support team at your earliest convenience.\"\n\n\"This is a known issue that affects some customers. We're working on a fix.\"\n\n\"I'm sorry you're having problems. Can you try turning it off and on again?\"\n\n\"We apologize for any inconvenience. Please return the product for a full refund.\"</code></pre>",
        options: ["First option - empathetic and solution-focused", "Second option - technical and informative", "Third option - casual and helpful", "Fourth option - direct and refund-focused"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Choose the correct sentence structure for a formal business report:\n\n<pre><code>A) The company's profits have increased significantly during the last quarter.\n\nB) The company's profits have increased significantly during the last quarter, which is good.\n\nC) The company's profits have increased significantly during the last quarter, and this is really great news.\n\nD) The company's profits have increased significantly during the last quarter, which shows that our strategy is working well.</code></pre>",
        options: ["Option A - concise and professional", "Option B - adds unnecessary commentary", "Option C - too informal for business report", "Option D - provides context but may be too wordy"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Which sentence demonstrates the most effective use of active voice in a professional context?\n\n<pre><code>A) The meeting was scheduled by the project manager for next Tuesday.\n\nB) The project manager scheduled the meeting for next Tuesday.\n\nC) It was decided by the project manager that the meeting should be scheduled for next Tuesday.\n\nD) The meeting scheduling was done by the project manager for next Tuesday.</code></pre>",
        options: ["Option A - passive voice", "Option B - clear active voice", "Option C - unnecessarily complex", "Option D - awkward construction"],
        correct: 1,
        level: "basic"
    },
    
    // Intermediate Questions (5) - B2+ Level - Complex Professional Scenarios
    {
        question: "You're negotiating a contract with a potential business partner. The other party has proposed terms that are unfavorable to your company. Which approach best maintains the relationship while protecting your interests?\n\n<pre><code>\"These terms are completely unacceptable. We need to start over.\"\n\n\"I appreciate your proposal. While we see value in this partnership, we have some concerns about the current terms that we'd like to discuss.\"\n\n\"We can't accept these terms, but maybe we can work something out.\"\n\n\"Let me think about it and get back to you.\"</code></pre>",
        options: ["First option - direct and firm", "Second option - diplomatic and collaborative", "Third option - vague but open", "Fourth option - non-committal"],
        correct: 1,
        level: "middle"
    },
    {
        question: "You're leading a team meeting where you need to address declining performance. Which approach best motivates improvement while maintaining team morale?\n\n<pre><code>\"Our performance has been terrible lately, and we need to do better.\"\n\n\"I've noticed some challenges in our recent performance. Let's work together to identify solutions and get back on track.\"\n\n\"Everyone needs to work harder, or there will be consequences.\"\n\n\"I'm disappointed in the team's recent results. We need to improve immediately.\"</code></pre>",
        options: ["First option - direct and honest", "Second option - collaborative and solution-focused", "Third option - threatening and demanding", "Fourth option - disappointed but firm"],
        correct: 1,
        level: "middle"
    },
    {
        question: "You're writing a proposal for a new project that requires significant investment. Which opening best captures attention and establishes the value proposition?\n\n<pre><code>\"We need to invest in this project because it's important.\"\n\n\"This proposal outlines a strategic initiative that could increase revenue by 25% while reducing operational costs.\"\n\n\"I think we should do this project. It seems like a good idea.\"\n\n\"The following document describes a project that we should consider implementing.\"</code></pre>",
        options: ["First option - simple and direct", "Second option - data-driven and compelling", "Third option - casual and opinion-based", "Fourth option - formal and neutral"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Read the following passage and identify the main idea:\n\n<pre><code>\"The digital transformation of businesses has accelerated dramatically in recent years, driven primarily by the global pandemic and evolving consumer expectations. Companies that have successfully adapted to this new landscape share common characteristics: they prioritize customer experience, invest heavily in technology infrastructure, and maintain flexible operational models. However, the transition is not without challenges, including cybersecurity concerns, employee training requirements, and the need for significant capital investment.\"</code></pre>\n\nWhat is the main idea of this passage?",
        options: ["Digital transformation is easy for most companies", "Successful digital transformation requires specific strategies and faces challenges", "The pandemic was the only driver of digital transformation", "Technology infrastructure is the most important factor"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Which sentence demonstrates the most sophisticated use of business vocabulary?\n\n<pre><code>A) The company made a lot of money this year.\n\nB) The company generated substantial revenue this year.\n\nC) The company got a lot of money this year.\n\nD) The company earned a big amount of money this year.</code></pre>",
        options: ["Option A - too informal", "Option B - professional and precise", "Option C - too casual", "Option D - awkward phrasing"],
        correct: 1,
        level: "middle"
    },
    
    // Advanced Questions (5) - C1 Level - Audio Listening Comprehension
    {
        question: "Listen to the audio and answer the question: What is the speaker's main argument about artificial intelligence in healthcare?",
        audioSrc: "audio/english_ai_healthcare.mp3",
        options: ["AI will completely replace human doctors within a decade", "AI should be used as a complementary tool to enhance medical diagnosis", "AI poses significant risks that outweigh its benefits in medicine", "AI is only suitable for administrative tasks in healthcare"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    {
        question: "Listen to the audio and identify the speaker's tone and purpose: What is the speaker's attitude toward the proposed environmental policy?",
        audioSrc: "audio/english_environmental_policy.mp3",
        options: ["Skeptical but open to compromise", "Strongly supportive with reservations", "Completely opposed to any changes", "Neutral and analytical"],
        correct: 0,
        level: "advanced",
        audioType: true
    },
    {
        question: "Listen to the audio and answer: What specific recommendation does the speaker make regarding urban planning?",
        audioSrc: "audio/english_urban_planning.mp3",
        options: ["Increase parking spaces in city centers", "Implement more green spaces and pedestrian zones", "Build taller skyscrapers to accommodate population growth", "Reduce public transportation funding"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    {
        question: "Listen to the audio and determine: What is the underlying assumption in the speaker's argument about education reform?",
        audioSrc: "audio/english_education_reform.mp3",
        options: ["Traditional teaching methods are completely ineffective", "Technology alone can solve educational challenges", "Student engagement is the primary indicator of learning success", "Standardized testing accurately measures student achievement"],
        correct: 2,
        level: "advanced",
        audioType: true
    },
    {
        question: "Listen to the audio and identify the speaker's main concern: What is the primary issue raised about remote work policies?",
        audioSrc: "audio/english_ai_healthcare.mp3", // Reusing audio for variety
        options: ["Lack of technological infrastructure", "Decreased team collaboration and communication", "Increased productivity and job satisfaction", "Reduced operational costs"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    
    // Advanced Grammar and Vocabulary (5) - C1 Level - Complex Language Use
    {
        question: "Choose the sentence that best demonstrates advanced conditional grammar:\n\n<pre><code>A) If we had invested earlier, we would have seen better returns.\n\nB) If we invest earlier, we will see better returns.\n\nC) If we would have invested earlier, we would see better returns.\n\nD) If we had invested earlier, we will see better returns.</code></pre>",
        options: ["Option A - correct third conditional", "Option B - first conditional (different meaning)", "Option C - incorrect mixed conditional", "Option D - incorrect tense mixing"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Which sentence demonstrates the most sophisticated use of subjunctive mood?\n\n<pre><code>A) I suggest that he should attend the meeting.\n\nB) I suggest that he attend the meeting.\n\nC) I suggest him to attend the meeting.\n\nD) I suggest that he attends the meeting.</code></pre>",
        options: ["Option A - should is unnecessary", "Option B - correct subjunctive", "Option C - incorrect structure", "Option D - indicative mood"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Read the following complex sentence and identify the grammatical error:\n\n<pre><code>\"The company, which has been operating for over 50 years and has established itself as a leader in the industry, despite facing numerous challenges throughout its history, continues to innovate and expand its market presence.\"</code></pre>",
        options: ["Missing comma after 'industry'", "Incorrect use of 'despite'", "Sentence is too long and needs restructuring", "No grammatical error"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "Which sentence demonstrates the most effective use of parallel structure?\n\n<pre><code>A) The manager is responsible for planning, organizing, and to coordinate the project.\n\nB) The manager is responsible for planning, organizing, and coordinating the project.\n\nC) The manager is responsible for planning, to organize, and coordinating the project.\n\nD) The manager is responsible for planning, organizing, and coordination of the project.</code></pre>",
        options: ["Option A - inconsistent verb forms", "Option B - correct parallel structure", "Option C - mixed verb forms", "Option D - mixed verb and noun forms"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Choose the most appropriate word to complete this sophisticated business sentence:\n\n<pre><code>\"The board's decision to _____ the merger was met with mixed reactions from stakeholders, who had been anticipating a different outcome.\"</code></pre>",
        options: ["postpone", "defer", "adjourn", "suspend"],
        correct: 1,
        level: "advanced"
    }
];

let currentAnswers = new Array(englishQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 600; // 600 seconds (10 minutes) for comprehensive English exam with audio
let timerInterval;

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const submitBtn = document.getElementById('submitBtn');
    const backToHome = document.getElementById('backToHome');
    
    startBtn.addEventListener('click', startExam);
    submitBtn.addEventListener('click', submitExam);
    backToHome.addEventListener('click', () => window.location.href = 'index.html');
    
    // Check if candidate info exists
    const candidateInfo = localStorage.getItem('candidateInfo');
    if (!candidateInfo) {
        window.location.href = 'index.html';
    }
});

function startExam() {
    examStarted = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('examContent').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'block';
    
    renderQuestions();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function renderQuestions() {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';
    
    englishQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const levelBadge = document.createElement('span');
        levelBadge.style.cssText = 'background: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 10px; display: inline-block;';
        levelBadge.textContent = q.level.toUpperCase();
        
        // Check if this is an audio question
        if (q.audioType) {
            questionDiv.innerHTML = `
                ${levelBadge.outerHTML}
                <h3>Question ${index + 1}: ${q.question}</h3>
                <div class="audio-player">
                    <audio controls>
                        <source src="${q.audioSrc}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p class="audio-note"><em>Listen to the audio before answering the question.</em></p>
                </div>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <div class="option" data-question="${index}" data-option="${optIndex}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            questionDiv.innerHTML = `
                ${levelBadge.outerHTML}
                <h3>Question ${index + 1}: ${q.question}</h3>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <div class="option" data-question="${index}" data-option="${optIndex}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        questionsContainer.appendChild(questionDiv);
    });
    
    // Add click handlers for options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const questionIndex = parseInt(this.dataset.question);
            const optionIndex = parseInt(this.dataset.option);
            
            // Remove previous selection for this question
            document.querySelectorAll(`[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select current option
            this.classList.add('selected');
            currentAnswers[questionIndex] = optionIndex;
        });
    });
}

function submitExam() {
    clearInterval(timerInterval);
    
    const score = calculateScore();
    const percentage = Math.round((score / englishQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${englishQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === englishQuestions[index].correct) {
            score++;
        }
    });
    return score;
}

function sendResults(score, percentage) {
    const candidateInfo = JSON.parse(localStorage.getItem('candidateInfo'));
    
    // Prepare exam results
    const examResults = {
        score: score,
        totalQuestions: englishQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, englishQuestions, currentAnswers, timeLeft);
}
