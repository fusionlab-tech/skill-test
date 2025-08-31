// C# Exam Questions
const csharpQuestions = [
    // Basic Questions (3)
    {
        question: "What is the correct way to declare a variable in C#?",
        options: ["var x = 10;", "int x = 10;", "variable x = 10;", "let x = 10;"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Which keyword is used to create a class in C#?",
        options: ["class", "struct", "interface", "object"],
        correct: 0,
        level: "basic"
    },
    {
        question: "What is the purpose of the 'public' keyword in C#?",
        options: ["Make a member private", "Make a member accessible from anywhere", "Make a member static", "Make a member final"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3)
    {
        question: "What is the difference between 'string' and 'String' in C#?",
        options: ["No difference", "string is alias for String", "String is alias for string", "string is faster than String"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the purpose of the 'sealed' keyword in C#?",
        options: ["Make a class abstract", "Prevent inheritance", "Make a method virtual", "Make a class static"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the difference between 'var' and explicit type declaration?",
        options: ["No difference", "var is always object type", "var infers type at compile time", "var is slower"],
        correct: 2,
        level: "middle"
    },
    
    // Advanced Questions (4)
    {
        question: "What is the purpose of the 'yield return' statement in C#?",
        options: ["Return multiple values", "Implement iterator pattern", "Handle exceptions", "Define properties"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "What is the difference between 'Task' and 'ValueTask'?",
        options: ["No difference", "ValueTask is for value types", "ValueTask avoids allocations", "Task is faster"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "What is the purpose of the 'record' keyword in C# 9.0?",
        options: ["Create immutable classes", "Define interfaces", "Create structs", "Define enums"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "What is the purpose of the 'init' keyword in C# 9.0?",
        options: ["Initialize variables", "Set properties only during construction", "Make properties readonly", "Define constructors"],
        correct: 1,
        level: "advanced"
    }
];

let currentAnswers = new Array(csharpQuestions.length).fill(-1);
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
    
    csharpQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / csharpQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${csharpQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === csharpQuestions[index].correct) {
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
Skill Tested: C#

Exam Results:
Score: ${score}/${csharpQuestions.length} (${percentage}%)
Time Remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}

Question Details:
${csharpQuestions.map((q, index) => {
    const userAnswer = currentAnswers[index];
    const isCorrect = userAnswer === q.correct;
    return `Q${index + 1} (${q.level}): ${isCorrect ? 'Correct' : 'Incorrect'} - User selected: ${userAnswer >= 0 ? q.options[userAnswer] : 'No answer'} | Correct: ${q.options[q.correct]}`;
}).join('\n')}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:nathanfielder0530@gmail.com?subject=C# Skill Test Results - ${candidateInfo.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.open(mailtoLink);
}
