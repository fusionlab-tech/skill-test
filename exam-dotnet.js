// .NET Exam Questions
const dotnetQuestions = [
    // Basic Questions (3) - Enhanced technical complexity
    {
        question: "What is the output of this code?\n```csharp\nstring str = \"Hello\";\nstr += \" World\";\nConsole.WriteLine(str);\nConsole.WriteLine(str.GetHashCode());\n```",
        options: ["Hello World\\nSame hash code", "Hello World\\nDifferent hash code", "Hello\\nSame hash code", "Error"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Consider this code:\n```csharp\nint[] numbers = { 1, 2, 3, 4, 5 };\nvar result = numbers.Where(n => n > 2).ToList();\nnumbers[0] = 10;\nConsole.WriteLine(result[0]);\n```\nWhat is the output?",
        options: ["1", "3", "10", "Error"],
        correct: 1,
        level: "basic"
    },
    {
        question: "What happens when you run this code?\n```csharp\ntry {\n    object obj = null;\n    string str = obj.ToString();\n} catch (Exception ex) {\n    Console.WriteLine(ex.GetType().Name);\n}\n```",
        options: ["NullReferenceException", "InvalidOperationException", "ArgumentException", "No exception"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - Enhanced complexity
    {
        question: "Consider this ASP.NET Core middleware pipeline:\n```csharp\napp.UseExceptionHandler(\"/Error\");\napp.UseHttpsRedirection();\napp.UseStaticFiles();\napp.UseRouting();\napp.UseAuthentication();\napp.UseAuthorization();\napp.UseEndpoints(endpoints => {\n    endpoints.MapControllers();\n});\n```\nWhat happens if an exception occurs in UseStaticFiles()?",
        options: ["The exception is logged and ignored", "The request continues to the next middleware", "The exception handler middleware catches it", "The application crashes"],
        correct: 2,
        level: "middle"
    },
    {
        question: "In this Entity Framework query:\n```csharp\nvar users = context.Users\n    .Include(u => u.Orders)\n    .ThenInclude(o => o.OrderItems)\n    .Where(u => u.IsActive)\n    .ToList();\n```\nWhat is the potential performance issue?",
        options: ["The query will be slow", "N+1 query problem", "Too many includes", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "Given this dependency injection setup:\n```csharp\nservices.AddScoped<IDataService, DataService>();\nservices.AddSingleton<ICacheService, CacheService>();\nservices.AddTransient<IEmailService, EmailService>();\n```\nWhat is the lifetime of IEmailService?",
        options: ["One instance per request", "One instance per application", "New instance every time", "One instance per session"],
        correct: 2,
        level: "middle"
    },
    
    // Advanced Questions (4) - Enhanced complexity
    {
        question: "Consider this async method:\n```csharp\npublic async Task<IActionResult> ProcessDataAsync()\n{\n    using var scope = serviceProvider.CreateScope();\n    var service = scope.ServiceProvider.GetRequiredService<IDataService>();\n    var result = await service.ProcessAsync();\n    return Ok(result);\n}\n```\nWhat issue exists with this implementation?",
        options: ["Service scope is not disposed properly", "The service is resolved incorrectly", "The method should be synchronous", "No issue exists"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "In this configuration pattern:\n```csharp\npublic class AppSettings\n{\n    public string ConnectionString { get; set; } = string.Empty;\n    public int Timeout { get; set; } = 30;\n}\n\nservices.Configure<AppSettings>(configuration.GetSection(\"App\"));\n```\nWhat is the purpose of the default values?",
        options: ["To provide fallback values", "To make properties required", "To improve performance", "To enable validation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Given this logging configuration:\n```csharp\nLog.Logger = new LoggerConfiguration()\n    .WriteTo.Console()\n    .WriteTo.File(\"logs/app.txt\", rollingInterval: RollingInterval.Day)\n    .CreateLogger();\n```\nWhat happens when the application runs for multiple days?",
        options: ["Logs are overwritten", "New log files are created daily", "Logs are compressed", "Logs are deleted after 24 hours"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Consider this health check:\n```csharp\nservices.AddHealthChecks()\n    .AddCheck<DatabaseHealthCheck>(\"database\")\n    .AddCheck<ExternalApiHealthCheck>(\"api\");\n```\nWhat is the purpose of the string parameters?",
        options: ["To identify the health check", "To set the check interval", "To configure the timeout", "To enable caching"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(dotnetQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 300; // 300 seconds for .NET exam
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
    
    // Prepare exam results
    const examResults = {
        score: score,
        totalQuestions: dotnetQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, dotnetQuestions, currentAnswers, timeLeft);
}
