// React Native Exam Questions
const reactNativeQuestions = [
    // Basic Questions (3)
    {
        question: "What is React Native?",
        options: ["A web framework", "A mobile app development framework", "A database", "A programming language"],
        correct: 1,
        level: "basic"
    },
    {
        question: "What is the purpose of the 'View' component in React Native?",
        options: ["To display text", "To create a container", "To handle touch events", "To make network requests"],
        correct: 1,
        level: "basic"
    },
    {
        question: "What is the purpose of the 'Text' component in React Native?",
        options: ["To create a container", "To display text", "To handle touch events", "To make network requests"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3)
    {
        question: "What is the purpose of the 'useState' hook in React Native?",
        options: ["To manage component state", "To handle side effects", "To make API calls", "To handle navigation"],
        correct: 0,
        level: "middle"
    },
    {
        question: "What is the purpose of the 'useEffect' hook in React Native?",
        options: ["To manage component state", "To handle side effects", "To make API calls", "To handle navigation"],
        correct: 1,
        level: "middle"
    },
    {
        question: "What is the purpose of the 'TouchableOpacity' component in React Native?",
        options: ["To display text", "To create a container", "To handle touch events", "To make network requests"],
        correct: 2,
        level: "middle"
    },
    
    // Advanced Questions (4)
    {
        question: "What is the purpose of the 'useNavigation' hook in React Native?",
        options: ["To manage component state", "To handle side effects", "To handle navigation", "To make API calls"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "What is the purpose of the 'AsyncStorage' in React Native?",
        options: ["To store data locally", "To make network requests", "To handle navigation", "To manage state"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "What is the purpose of the 'FlatList' component in React Native?",
        options: ["To display text", "To create a container", "To display lists efficiently", "To handle touch events"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "What is the purpose of the 'useCallback' hook in React Native?",
        options: ["To manage component state", "To handle side effects", "To optimize performance", "To handle navigation"],
        correct: 2,
        level: "advanced"
    }
];

let currentAnswers = new Array(reactNativeQuestions.length).fill(-1);
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
    
    reactNativeQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / reactNativeQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${reactNativeQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === reactNativeQuestions[index].correct) {
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
Skill Tested: React Native

Exam Results:
Score: ${score}/${reactNativeQuestions.length} (${percentage}%)
Time Remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}

Question Details:
${reactNativeQuestions.map((q, index) => {
    const userAnswer = currentAnswers[index];
    const isCorrect = userAnswer === q.correct;
    return `Q${index + 1} (${q.level}): ${isCorrect ? 'Correct' : 'Incorrect'} - User selected: ${userAnswer >= 0 ? q.options[userAnswer] : 'No answer'} | Correct: ${q.options[q.correct]}`;
}).join('\n')}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:nathanfielder0530@gmail.com?subject=React Native Skill Test Results - ${candidateInfo.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.open(mailtoLink);
}
