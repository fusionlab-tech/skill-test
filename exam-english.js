// English Language Exam Questions - B2-C1 Level
const englishQuestions = [
    // Basic Questions (3) - B2 Level
    {
        question: "Consider this sentence:\n\"The research findings, which were published last month, have been met with considerable skepticism from the academic community.\"\nWhat type of clause is \"which were published last month\"?",
        options: ["Restrictive relative clause", "Non-restrictive relative clause", "Adverbial clause", "Noun clause"],
        correct: 1,
        level: "basic"
    },
    {
        question: "In the sentence:\n\"Not only did the company exceed its quarterly targets, but it also managed to reduce operational costs by 15%.\"\nWhat grammatical structure is being used?",
        options: ["Inversion with negative adverbial", "Passive voice construction", "Subjunctive mood", "Gerund phrase"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Given this text:\n\"The burgeoning field of artificial intelligence has precipitated unprecedented ethical quandaries that challenge our fundamental understanding of human consciousness and autonomy.\"\nWhat does 'burgeoning' mean in this context?",
        options: ["Declining rapidly", "Growing and developing", "Controversial and disputed", "Technologically advanced"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level
    {
        question: "Analyze this complex sentence:\n\"Had the government implemented the proposed environmental regulations earlier, the current ecological crisis might have been averted, though the economic implications would have been substantial.\"\nWhat conditional structure is used here?",
        options: ["Third conditional with mixed time reference", "Second conditional with past perfect", "Mixed conditional (past perfect + would have)", "Inverted conditional with modal"],
        correct: 2,
        level: "middle"
    },
    {
        question: "Consider this academic passage:\n\"The phenomenon of cognitive dissonance, whereby individuals experience psychological discomfort when their beliefs conflict with their actions, has profound implications for behavioral change interventions.\"\nWhat rhetorical device is 'whereby' functioning as?",
        options: ["A relative pronoun", "A conjunctive adverb", "A subordinating conjunction", "A discourse marker"],
        correct: 2,
        level: "middle"
    },
    {
        question: "In this sentence:\n\"The company's decision to diversify its portfolio, while simultaneously maintaining its core competencies, exemplifies strategic foresight in an increasingly volatile market.\"\nWhat is the function of the infinitive 'to diversify'?",
        options: ["Subject of the sentence", "Object of the preposition", "Modifier of the noun 'decision'", "Complement of the verb 'exemplifies'"],
        correct: 2,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - Audio Listening Comprehension
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
    }
];

let currentAnswers = new Array(englishQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 300; // 300 seconds for language exam
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
