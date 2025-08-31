// Python/Django Exam Questions
const pythonQuestions = [
    // Basic Questions (3)
    {
        question: "What is the correct way to create a function in Python?",
        options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Which of the following is used to create a list in Python?",
        options: ["()", "[]", "{}", "<>"],
        correct: 1,
        level: "basic"
    },
    {
        question: "What is the output of print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'set'>"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3)
    {
        question: "What is a Django model?",
        options: ["A database table", "A Python class that represents a database table", "A URL pattern", "A template file"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the purpose of Django migrations?",
        options: ["To move data between databases", "To track database schema changes", "To backup data", "To optimize queries"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the difference between a tuple and a list in Python?",
        options: ["No difference", "Tuples are immutable, lists are mutable", "Lists are immutable, tuples are mutable", "Tuples are faster than lists"],
        correct: 1,
        level: "middle"
    },
    
    // Advanced Questions (4)
    {
        question: "What is a Django signal?",
        options: ["A database trigger", "A way to execute code when certain actions occur", "A URL redirect", "A template tag"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "What is the purpose of Django's select_related()?",
        options: ["To select specific fields", "To optimize foreign key queries", "To filter results", "To order results"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "What is a Python decorator?",
        options: ["A function that modifies another function", "A class attribute", "A module import", "A variable type"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "What is the purpose of Django's middleware?",
        options: ["To handle database connections", "To process requests and responses", "To manage templates", "To handle forms"],
        correct: 1,
        level: "advanced"
    }
];

let currentAnswers = new Array(pythonQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 100; // 100 seconds
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
    
    pythonQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / pythonQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${pythonQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === pythonQuestions[index].correct) {
            score++;
        }
    });
    return score;
}

function sendResults(score, percentage) {
    const candidateInfo = JSON.parse(localStorage.getItem('candidateInfo'));
    
    const emailBody = `
Candidate Information:
Name: ${candidateInfo.name}
Email: ${candidateInfo.email}
Address: ${candidateInfo.street}, ${candidateInfo.state}, ${candidateInfo.country}
Phone: ${candidateInfo.phone}
Skill Tested: Python/Django

Exam Results:
Score: ${score}/${pythonQuestions.length} (${percentage}%)
Time Remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}

Question Details:
${pythonQuestions.map((q, index) => {
    const userAnswer = currentAnswers[index];
    const isCorrect = userAnswer === q.correct;
    return `Q${index + 1} (${q.level}): ${isCorrect ? 'Correct' : 'Incorrect'} - User selected: ${userAnswer >= 0 ? q.options[userAnswer] : 'No answer'} | Correct: ${q.options[q.correct]}`;
}).join('\n')}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:nathanfielder0530@gmail.com?subject=Python/Django Skill Test Results - ${candidateInfo.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.open(mailtoLink);
}
