// .NET Exam Questions
const dotnetQuestions = [
    // Basic Questions (3)
    {
        question: "What is the base class for all .NET types?",
        options: ["System.Object", "System.Base", "System.Type", "System.Root"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Which keyword is used to declare a constant in C#?",
        options: ["const", "final", "static", "readonly"],
        correct: 0,
        level: "basic"
    },
    {
        question: "What is the purpose of the 'using' statement in C#?",
        options: ["Import namespaces", "Dispose resources automatically", "Include files", "Define classes"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3)
    {
        question: "What is the difference between '==' and 'Equals()' in C#?",
        options: ["No difference", "== compares references, Equals() compares values", "== compares values, Equals() compares references", "== is faster than Equals()"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the purpose of the 'virtual' keyword in C#?",
        options: ["Make a method private", "Allow method overriding", "Make a method static", "Prevent inheritance"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the difference between 'ref' and 'out' parameters?",
        options: ["No difference", "ref requires initialization, out doesn't", "out requires initialization, ref doesn't", "ref is for input, out is for output"],
        correct: 1,
        level: "middle"
    },
    
    // Advanced Questions (4)
    {
        question: "What is the purpose of the 'async' and 'await' keywords?",
        options: ["Synchronous programming", "Asynchronous programming", "Parallel programming", "Functional programming"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "What is the difference between 'StringBuilder' and 'String'?",
        options: ["No difference", "StringBuilder is immutable, String is mutable", "StringBuilder is mutable, String is immutable", "StringBuilder is faster for concatenation"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "What is the purpose of the 'yield' keyword in C#?",
        options: ["Return values", "Implement iterators", "Handle exceptions", "Define properties"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "What is the difference between 'Task' and 'Thread'?",
        options: ["No difference", "Task is higher-level abstraction", "Thread is higher-level abstraction", "Task is for UI, Thread is for background"],
        correct: 1,
        level: "advanced"
    }
];

let currentAnswers = new Array(dotnetQuestions.length).fill(-1);
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
    
    dotnetQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / dotnetQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${dotnetQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === dotnetQuestions[index].correct) {
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
Skill Tested: .NET

Exam Results:
Score: ${score}/${dotnetQuestions.length} (${percentage}%)
Time Remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}

Question Details:
${dotnetQuestions.map((q, index) => {
    const userAnswer = currentAnswers[index];
    const isCorrect = userAnswer === q.correct;
    return `Q${index + 1} (${q.level}): ${isCorrect ? 'Correct' : 'Incorrect'} - User selected: ${userAnswer >= 0 ? q.options[userAnswer] : 'No answer'} | Correct: ${q.options[q.correct]}`;
}).join('\n')}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:nathanfielder0530@gmail.com?subject=.NET Skill Test Results - ${candidateInfo.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.open(mailtoLink);
}
