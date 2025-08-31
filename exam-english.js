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
    
    // Advanced Questions (4) - C1 Level
    {
        question: "Examine this sophisticated construction:\n\"Were it not for the unprecedented technological advances of the past decade, the current paradigm shift in educational methodology would scarcely be conceivable, let alone implementable.\"\nWhat grammatical features make this sentence particularly complex?",
        options: ["Inverted subjunctive, multiple modal verbs, and nominalization", "Passive voice, relative clauses, and participle phrases", "Conditional clauses, infinitive constructions, and gerunds", "Subjunctive mood, inversion, and complex adverbial phrases"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this academic discourse:\n\"The epistemological foundations upon which contemporary scientific inquiry is predicated necessitate a fundamental reassessment of methodological approaches, particularly in light of emerging interdisciplinary paradigms that challenge traditional disciplinary boundaries.\"\nWhat is the primary rhetorical function of this sentence?",
        options: ["To present a hypothesis", "To establish theoretical framework", "To critique existing methodology", "To propose a solution"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Analyze this complex sentence structure:\n\"Notwithstanding the considerable challenges inherent in implementing such a comprehensive reform agenda, the potential benefits—ranging from enhanced efficiency and improved outcomes to greater stakeholder satisfaction—far outweigh the associated costs and risks.\"\nWhat is the function of the dash-enclosed phrase?",
        options: ["Parenthetical explanation", "Appositive phrase", "Non-restrictive modifier", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "In this sophisticated construction:\n\"The extent to which these theoretical propositions can be operationalized in practical contexts depends not merely on their inherent validity, but also on the degree to which institutional frameworks and stakeholder interests align with the underlying principles.\"\nWhat grammatical structure creates the complexity?",
        options: ["Multiple embedded clauses and parallel structure", "Passive voice and modal verbs", "Infinitive phrases and gerunds", "Relative clauses and participle constructions"],
        correct: 0,
        level: "advanced"
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
