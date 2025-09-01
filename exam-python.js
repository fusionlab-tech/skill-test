// Python/Django Exam Questions
const pythonQuestions = [
    // Basic Questions (3) - Enhanced technical complexity
    {
        question: "What is the output of this code?\n```python\nx = [1, 2, 3]\ny = x\nx.append(4)\nprint(y)\n```",
        options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "Error"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Consider this code:\n```python\ndef func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))\n```\nWhat is the output?",
        options: ["[1]\\n[2]", "[1]\\n[1, 2]", "[1]\\n[2, 1]", "Error"],
        correct: 1,
        level: "basic"
    },
    {
        question: "What happens when you run this code?\n```python\ntry:\n    x = 10 / 0\n    print(x)\nexcept ZeroDivisionError:\n    print('Division by zero')\nexcept Exception as e:\n    print(f'Error: {e}')\n```",
        options: ["10", "Division by zero", "Error: division by zero", "Infinity"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3) - Enhanced complexity
    {
        question: "Consider this Django model:\n```python\nclass Order(models.Model):\n    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)\n    items = models.ManyToManyField(Product, through='OrderItem')\n    total = models.DecimalField(max_digits=10, decimal_places=2)\n    \n    def save(self, *args, **kwargs):\n        if not self.pk:\n            self.total = sum(item.price for item in self.items.all())\n        super().save(*args, **kwargs)\n```\nWhat issue exists with this save method?",
        options: ["The total calculation will always be 0", "The total calculation happens before items are saved", "The method will cause infinite recursion", "The total field should be auto-calculated"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Given this Python code:\n```python\ndef process_data(data_list):\n    result = []\n    for item in data_list:\n        if item > 0:\n            result.append(item * 2)\n    return result\n\n# Using list comprehension\nresult = [item * 2 for item in data_list if item > 0]\n```\nWhat is the time complexity difference between these approaches?",
        options: ["List comprehension is O(n²), loop is O(n)", "Both are O(n), but list comprehension is faster", "Loop is O(n²), list comprehension is O(n)", "Both are O(n) with similar performance"],
        correct: 3,
        level: "middle"
    },
    {
        question: "In this Django view:\n```python\n@login_required\ndef user_profile(request, user_id):\n    user = get_object_or_404(User, id=user_id)\n    if request.user != user:\n        return HttpResponseForbidden()\n    return render(request, 'profile.html', {'user': user})\n```\nWhat security concern exists?",
        options: ["No security concern", "Users can access other users' profiles", "The view doesn't check permissions", "The user_id parameter is not validated"],
        correct: 1,
        level: "middle"
    },
    
    // Advanced Questions (4) - Enhanced complexity
    {
        question: "Consider this Django ORM query:\n```python\norders = Order.objects.select_related('customer')\\\n    .prefetch_related('items')\\\n    .filter(status='pending')\\\n    .annotate(\n        total_items=Count('items'),\n        avg_price=Avg('items__price')\n    )\n```\nHow many database queries will this generate?",
        options: ["1 query", "2 queries", "3 queries", "4+ queries"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "Given this Python metaclass:\n```python\nclass Singleton(type):\n    _instances = {}\n    \n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass Database(metaclass=Singleton):\n    pass\n```\nWhat potential issue exists with this implementation?",
        options: ["Memory leaks if instances are large", "Not thread-safe", "Cannot be inherited", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "In this Django middleware:\n```python\nclass RateLimitMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n        self.rate_limits = {}\n    \n    def __call__(self, request):\n        ip = request.META.get('REMOTE_ADDR')\n        if self.is_rate_limited(ip):\n            return HttpResponseTooManyRequests()\n        return self.get_response(request)\n```\nWhat is the main issue with this implementation?",
        options: ["No cleanup of old rate limit data", "IP addresses can be spoofed", "The rate limit logic is missing", "It doesn't handle proxy headers"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this async Python code:\n```python\nasync def fetch_data(urls):\n    tasks = [fetch_url(url) for url in urls]\n    results = await asyncio.gather(*tasks, return_exceptions=True)\n    return [r for r in results if not isinstance(r, Exception)]\n```\nWhat happens if one of the fetch_url calls raises an exception?",
        options: ["The entire function fails", "The exception is logged and ignored", "The exception is returned in results", "The function waits for all tasks to complete"],
        correct: 2,
        level: "advanced"
    }
];

let currentAnswers = new Array(pythonQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Python exam
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
    
    // Prepare exam results
    const examResults = {
        score: score,
        totalQuestions: pythonQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, pythonQuestions, currentAnswers, timeLeft);
}
