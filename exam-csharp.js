// C# Exam Questions
const csharpQuestions = [
    // Basic Questions (3) - Enhanced technical complexity
    {
        question: "What is the output of this code?\n```csharp\nint x = 5;\nint y = x++;\nConsole.WriteLine($\"x: {x}, y: {y}\");\n```",
        options: ["x: 5, y: 5", "x: 6, y: 5", "x: 5, y: 6", "x: 6, y: 6"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Consider this code:\n```csharp\nstring str1 = \"Hello\";\nstring str2 = \"Hello\";\nbool result1 = str1 == str2;\nbool result2 = ReferenceEquals(str1, str2);\n```\nWhat are the values of result1 and result2?",
        options: ["true, true", "true, false", "false, true", "false, false"],
        correct: 0,
        level: "basic"
    },
    {
        question: "What happens when you run this code?\n```csharp\ntry {\n    int[] arr = new int[5];\n    arr[10] = 20;\n} catch (Exception ex) {\n    Console.WriteLine(ex.GetType().Name);\n}\n```",
        options: ["IndexOutOfRangeException", "ArrayTypeMismatchException", "ArgumentException", "OutOfMemoryException"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - Enhanced complexity
    {
        question: "Consider the following code:\n```csharp\npublic class DataProcessor<T> where T : class, new()\n{\n    private readonly T _data;\n    public DataProcessor() => _data = new T();\n}\n```\nWhat constraint does this generic class enforce?",
        options: ["T must be a reference type with a parameterless constructor", "T must be a value type", "T must implement IEnumerable", "T must inherit from DataProcessor"],
        correct: 0,
        level: "middle"
    },
    {
        question: "In the following async method:\n```csharp\npublic async Task<string> ProcessDataAsync()\n{\n    var result = await GetDataAsync();\n    return result.Process();\n}\n```\nWhat happens if GetDataAsync() throws an exception?",
        options: ["The exception is automatically caught and logged", "The exception is wrapped in an AggregateException", "The exception propagates to the caller", "The method returns null"],
        correct: 2,
        level: "middle"
    },
    {
        question: "Given this LINQ query:\n```csharp\nvar result = items\n    .Where(x => x.IsActive)\n    .Select(x => new { x.Id, x.Name })\n    .ToList();\n```\nWhen is the query actually executed?",
        options: ["Immediately when the query is defined", "When ToList() is called", "When the result is first accessed", "When the items collection changes"],
        correct: 1,
        level: "middle"
    },
    
    // Advanced Questions (4) - Enhanced complexity
    {
        question: "Consider this code:\n```csharp\npublic class Cache<T>\n{\n    private readonly ConcurrentDictionary<string, T> _cache = new();\n    \n    public T GetOrAdd(string key, Func<string, T> factory)\n    {\n        return _cache.GetOrAdd(key, factory);\n    }\n}\n```\nWhat potential issue exists with this implementation?",
        options: ["The factory delegate might be called multiple times for the same key", "The cache is not thread-safe", "The factory delegate is never called", "The cache will grow indefinitely"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "In this pattern:\n```csharp\npublic class ServiceLocator\n{\n    private static readonly Dictionary<Type, object> _services = new();\n    \n    public static void Register<T>(T service) => _services[typeof(T)] = service;\n    public static T Resolve<T>() => (T)_services[typeof(T)];\n}\n```\nWhat design principle does this violate?",
        options: ["Single Responsibility Principle", "Dependency Inversion Principle", "Open/Closed Principle", "Interface Segregation Principle"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Given this expression tree:\n```csharp\nExpression<Func<Person, bool>> filter = p => p.Age > 18 && p.IsActive;\n```\nWhat is the primary use case for expression trees in C#?",
        options: ["Runtime code generation", "Compile-time optimization", "LINQ to SQL translation", "Reflection-based property access"],
        correct: 2,
        level: "advanced"
    },
    {
        question: "Consider this memory management scenario:\n```csharp\npublic class ResourceManager : IDisposable\n{\n    private bool _disposed = false;\n    private readonly UnmanagedResource _resource;\n    \n    protected virtual void Dispose(bool disposing)\n    {\n        if (!_disposed)\n        {\n            if (disposing)\n            {\n                _resource?.Dispose();\n            }\n            _disposed = true;\n        }\n    }\n}\n```\nWhat is the purpose of the disposing parameter?",
        options: ["To prevent double disposal", "To distinguish between finalizer and Dispose calls", "To track disposal order", "To enable partial disposal"],
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
    
    // Prepare exam results
    const examResults = {
        score: score,
        totalQuestions: csharpQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, csharpQuestions, currentAnswers, timeLeft);
}
