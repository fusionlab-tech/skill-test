// MERN Stack Exam Questions
const mernQuestions = [
    // Basic Questions (3) - Enhanced technical complexity
    {
        question: "What is the output of this code?\n\n<pre><code>const arr = [1, 2, 3];\nconst newArr = arr.map(x => x * 2);\narr.push(4);\nconsole.log(newArr);</code></pre>",
        options: ["[1, 2, 3, 4]", "[2, 4, 6]", "[2, 4, 6, 8]", "[1, 2, 3]"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Consider this code:\n\n<pre><code>let x = 5;\nconst y = x++;\nconsole.log(`x: ${x}, y: ${y}`);</code></pre>\n\nWhat is the output?",
        options: ["x: 5, y: 5", "x: 6, y: 5", "x: 5, y: 6", "x: 6, y: 6"],
        correct: 1,
        level: "basic"
    },
    {
        question: "What happens when you run this code?\n\n<pre><code>try {\n    const obj = null;\n    console.log(obj.property);\n} catch (error) {\n    console.log(error.name);\n}</code></pre>",
        options: ["TypeError", "ReferenceError", "Error", "No error"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - Enhanced complexity
    {
        question: "Consider this MongoDB aggregation pipeline:\n\n<pre><code>const result = await Order.aggregate([\n  { $match: { status: 'completed' } },\n  { $group: { \n    _id: '$customerId', \n    totalSpent: { $sum: '$amount' },\n    orderCount: { $sum: 1 }\n  }},\n  { $sort: { totalSpent: -1 } },\n  { $limit: 10 }\n]);</code></pre>\n\nWhat does this pipeline accomplish?",
        options: ["Finds all completed orders", "Groups orders by customer and calculates totals", "Sorts orders by amount", "Counts total orders"],
        correct: 1,
        level: "middle"
    },
    {
        question: "In this Express.js middleware:\n```javascript\napp.use('/api', (req, res, next) => {\n  req.startTime = Date.now();\n  res.on('finish', () => {\n    const duration = Date.now() - req.startTime;\n    console.log(`${req.method} ${req.path} - ${duration}ms`);\n  });\n  next();\n});\n```\nWhat does this middleware do?",
        options: ["Logs all API requests", "Measures response time for API endpoints", "Blocks slow requests", "Caches API responses"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Given this React component:\n```javascript\nconst UserList = ({ users }) => {\n  const [filteredUsers, setFilteredUsers] = useState(users);\n  \n  useEffect(() => {\n    setFilteredUsers(users);\n  }, [users]);\n  \n  return (\n    <div>\n      {filteredUsers.map(user => (\n        <UserCard key={user.id} user={user} />\n      ))}\n    </div>\n  );\n};\n```\nWhat issue exists with this component?",
        options: ["No issue exists", "Missing dependency in useEffect", "Unnecessary state variable", "Inefficient re-rendering"],
        correct: 2,
        level: "middle"
    },
    
    // Advanced Questions (4) - Enhanced complexity
    {
        question: "Consider this Node.js cluster setup:\n```javascript\nconst cluster = require('cluster');\nconst numCPUs = require('os').cpus().length;\n\nif (cluster.isMaster) {\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n  \n  cluster.on('exit', (worker, code, signal) => {\n    console.log(`Worker ${worker.process.pid} died`);\n    cluster.fork();\n  });\n} else {\n  require('./server.js');\n}\n```\nWhat happens when a worker process crashes?",
        options: ["The application stops", "A new worker is automatically created", "The master process crashes", "The remaining workers handle the load"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "In this MongoDB transaction:\n```javascript\nconst session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Account.updateOne(\n    { _id: fromAccountId },\n    { $inc: { balance: -amount } },\n    { session }\n  );\n  await Account.updateOne(\n    { _id: toAccountId },\n    { $inc: { balance: amount } },\n    { session }\n  );\n  await session.commitTransaction();\n} catch (error) {\n  await session.abortTransaction();\n  throw error;\n} finally {\n  session.endSession();\n}\n```\nWhat is the purpose of the session parameter?",
        options: ["To track user sessions", "To ensure atomic operations", "To improve performance", "To enable caching"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Given this React performance optimization:\n```javascript\nconst ExpensiveComponent = React.memo(({ data, onUpdate }) => {\n  const processedData = useMemo(() => {\n    return data.map(item => ({\n      ...item,\n      processed: heavyComputation(item)\n    }));\n  }, [data]);\n  \n  return (\n    <div>\n      {processedData.map(item => (\n        <DataItem key={item.id} item={item} onUpdate={onUpdate} />\n      ))}\n    </div>\n  );\n});\n```\nWhat is the purpose of React.memo here?",
        options: ["To prevent unnecessary re-renders", "To optimize memory usage", "To enable lazy loading", "To improve bundle size"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this Express.js error handling:\n```javascript\napp.use((err, req, res, next) => {\n  if (err.name === 'ValidationError') {\n    return res.status(400).json({\n      error: 'Validation failed',\n      details: err.details\n    });\n  }\n  \n  if (err.name === 'CastError') {\n    return res.status(400).json({\n      error: 'Invalid ID format'\n    });\n  }\n  \n  console.error(err);\n  res.status(500).json({ error: 'Internal server error' });\n});\n```\nWhat is the purpose of the next parameter?",
        options: ["To pass control to the next middleware", "To handle async errors", "To enable error chaining", "To log error details"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(mernQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for MERN exam
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
    
    mernQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / mernQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${mernQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === mernQuestions[index].correct) {
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
        totalQuestions: mernQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, mernQuestions, currentAnswers, timeLeft);
}
