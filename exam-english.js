// English Language Exam Questions - B2-C1 Level (10 Questions Total)
const englishQuestions = [
    // Basic Questions (3) - B2 Level - Professional Communication
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
    
    // Intermediate Questions (2) - B2+ Level - Complex Professional Scenarios
    {
        question: "You're negotiating a contract with a potential business partner. The other party has proposed terms that are unfavorable to your company. Which approach best maintains the relationship while protecting your interests?\n\n<pre><code>\"These terms are completely unacceptable. We need to start over.\"\n\n\"I appreciate your proposal. While we see value in this partnership, we have some concerns about the current terms that we'd like to discuss.\"\n\n\"We can't accept these terms, but maybe we can work something out.\"\n\n\"Let me think about it and get back to you.\"</code></pre>",
        options: ["First option - direct and firm", "Second option - diplomatic and collaborative", "Third option - vague but open", "Fourth option - non-committal"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Read the following passage and identify the main idea:\n\n<pre><code>\"The digital transformation of businesses has accelerated dramatically in recent years, driven primarily by the global pandemic and evolving consumer expectations. Companies that have successfully adapted to this new landscape share common characteristics: they prioritize customer experience, invest heavily in technology infrastructure, and maintain flexible operational models. However, the transition is not without challenges, including cybersecurity concerns, employee training requirements, and the need for significant capital investment.\"</code></pre>\n\nWhat is the main idea of this passage?",
        options: ["Digital transformation is easy for most companies", "Successful digital transformation requires specific strategies and faces challenges", "The pandemic was the only driver of digital transformation", "Technology infrastructure is the most important factor"],
        correct: 1,
        level: "middle"
    },
    
    // Audio Questions (3) - C1 Level - Listening Comprehension
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
    
    // Advanced Grammar and Vocabulary (2) - C1 Level - Complex Language Use
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
    }
];

// Deduplicate audio questions by audioSrc while preserving order
const seenAudioSrc = new Set();
const dedupedEnglishQuestions = englishQuestions.filter(q => {
    if (!q.audioType) return true;
    if (seenAudioSrc.has(q.audioSrc)) return false;
    seenAudioSrc.add(q.audioSrc);
    return true;
});

let currentAnswers = new Array(dedupedEnglishQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds (6 minutes 40 seconds) for English exam with audio
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
    
    dedupedEnglishQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / dedupedEnglishQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${dedupedEnglishQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === dedupedEnglishQuestions[index].correct) {
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
        totalQuestions: dedupedEnglishQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, dedupedEnglishQuestions, currentAnswers, timeLeft);
}
