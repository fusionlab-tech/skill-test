// Golang Programming Exam Questions - B2-C1 Level
const golangQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "Consider this Go code:\n\n<pre><code>func processData(data []int) []int {\n    result := make([]int, 0, len(data))\n    for _, v := range data {\n        if v > 0 {\n            result = append(result, v*2)\n        }\n    }\n    return result\n}</code></pre>\n\nWhat is the time complexity of this function and why is the capacity pre-allocated?",
        options: ["O(n²) - for nested operations", "O(n) - linear iteration with pre-allocated capacity to avoid slice reallocation", "O(log n) - logarithmic growth due to append operations", "O(1) - constant time due to pre-allocation"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Analyze this Go code:\n\n<pre><code>func main() {\n    var wg sync.WaitGroup\n    ch := make(chan int, 1)\n    \n    wg.Add(1)\n    go func() {\n        defer wg.Done()\n        ch <- 42\n    }()\n    \n    wg.Wait()\n    close(ch)\n    fmt.Println(<-ch)\n}</code></pre>\n\nWhat potential issue exists in this code?",
        options: ["Deadlock due to unbuffered channel", "Race condition on channel access", "Reading from closed channel will panic", "No issues - code is correct"],
        correct: 2,
        level: "basic"
    },
    {
        question: "Examine this Go code:\n\n<pre><code>type Config struct {\n    Host string\n    Port int\n    Timeout time.Duration\n}\n\nfunc NewConfig() *Config {\n    return &Config{\n        Host: \"localhost\",\n        Port: 8080,\n        Timeout: 30 * time.Second,\n    }\n}</code></pre>\n\nWhat is the memory allocation pattern here and why is it used?",
        options: ["Stack allocation for small structs", "Heap allocation with pointer return for potential nil checks and method receivers", "Global variable allocation", "Register allocation for performance"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "Consider this Go code:\n\n<pre><code>func processItems(items []Item) error {\n    var mu sync.RWMutex\n    var results []Result\n    \n    for i := 0; i < len(items); i += 10 {\n        end := i + 10\n        if end > len(items) {\n            end = len(items)\n        }\n        \n        batch := items[i:end]\n        go func(batch []Item) {\n            for _, item := range batch {\n                result := processItem(item)\n                mu.Lock()\n                results = append(results, result)\n                mu.Unlock()\n            }\n        }(batch)\n    }\n    \n    return nil\n}</code></pre>\n\nWhat performance issue exists in this concurrent code?",
        options: ["Excessive goroutine creation", "Lock contention due to frequent mutex operations", "Memory leak from unbounded slice growth", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "Analyze this Go code:\n```go\nfunc (db *Database) Query(ctx context.Context, query string) (*Result, error) {\n    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)\n    defer cancel()\n    \n    select {\n    case <-ctx.Done():\n        return nil, ctx.Err()\n    case result := <-db.queryChan:\n        return result, nil\n    default:\n        return db.executeQuery(query)\n    }\n}\n```\nWhat is the issue with this context handling?",
        options: ["Context cancellation is ignored", "Default case bypasses context cancellation", "Context timeout is too short", "No issue - proper context handling"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Examine this Go code:\n```go\ntype Cache struct {\n    data map[string]interface{}\n    mu   sync.RWMutex\n}\n\nfunc (c *Cache) Get(key string) (interface{}, bool) {\n    c.mu.RLock()\n    defer c.mu.RUnlock()\n    \n    value, exists := c.data[key]\n    return value, exists\n}\n\nfunc (c *Cache) Set(key string, value interface{}) {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    \n    c.data[key] = value\n}\n```\nWhat potential issue exists in this cache implementation?",
        options: ["Memory leak from unbounded map growth", "Race condition on map access", "Deadlock potential", "No issues - thread-safe implementation"],
        correct: 0,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "Consider this sophisticated Go code:\n```go\nfunc (s *Service) ProcessWithRetry(ctx context.Context, req Request) (*Response, error) {\n    var lastErr error\n    backoff := time.Millisecond\n    \n    for attempt := 0; attempt < s.maxRetries; attempt++ {\n        select {\n        case <-ctx.Done():\n            return nil, ctx.Err()\n        default:\n        }\n        \n        resp, err := s.process(ctx, req)\n        if err == nil {\n            return resp, nil\n        }\n        \n        lastErr = err\n        if !isRetryableError(err) {\n            break\n        }\n        \n        timer := time.NewTimer(backoff)\n        select {\n        case <-timer.C:\n            backoff = time.Duration(float64(backoff) * s.backoffMultiplier)\n        case <-ctx.Done():\n            timer.Stop()\n            return nil, ctx.Err()\n        }\n    }\n    \n    return nil, fmt.Errorf(\"max retries exceeded: %w\", lastErr)\n}\n```\nWhat advanced Go patterns and potential issues are demonstrated here?",
        options: ["Exponential backoff, context cancellation, and potential goroutine leak from timer", "Circuit breaker pattern with proper cleanup", "Retry mechanism with exponential backoff and proper context handling", "Rate limiting with exponential backoff"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Analyze this complex Go code:\n```go\ntype WorkerPool struct {\n    workers    int\n    tasks     chan Task\n    results   chan Result\n    wg        sync.WaitGroup\n    ctx       context.Context\n    cancel    context.CancelFunc\n}\n\nfunc (wp *WorkerPool) Start() {\n    for i := 0; i < wp.workers; i++ {\n        wp.wg.Add(1)\n        go wp.worker()\n    }\n}\n\nfunc (wp *WorkerPool) worker() {\n    defer wp.wg.Done()\n    \n    for {\n        select {\n        case task, ok := <-wp.tasks:\n            if !ok {\n                return\n            }\n            result := processTask(task)\n            select {\n            case wp.results <- result:\n            case <-wp.ctx.Done():\n                return\n            }\n        case <-wp.ctx.Done():\n            return\n        }\n    }\n}\n```\nWhat sophisticated concurrency patterns and potential issues are demonstrated?",
        options: ["Worker pool with graceful shutdown, potential deadlock on channel operations", "Producer-consumer pattern with proper context cancellation", "Work-stealing algorithm with channel-based communication", "All of the above with potential channel blocking issues"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "Examine this advanced Go code:\n```go\ntype Metrics struct {\n    mu       sync.RWMutex\n    counters map[string]int64\n    gauges   map[string]float64\n    histograms map[string][]float64\n}\n\nfunc (m *Metrics) RecordHistogram(name string, value float64) {\n    m.mu.Lock()\n    defer m.mu.Unlock()\n    \n    if m.histograms[name] == nil {\n        m.histograms[name] = make([]float64, 0, 1000)\n    }\n    \n    m.histograms[name] = append(m.histograms[name], value)\n    \n    if len(m.histograms[name]) > 10000 {\n        m.histograms[name] = m.histograms[name][len(m.histograms[name])-10000:]\n    }\n}\n```\nWhat performance and memory management issues exist in this metrics implementation?",
        options: ["Memory leak from unbounded slice growth, lock contention, and inefficient memory usage", "Proper memory management with bounded growth", "Efficient lock-free implementation", "No issues - optimal implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this sophisticated Go code:\n```go\nfunc (db *Database) TransactionalQuery(ctx context.Context, queries []Query) ([]Result, error) {\n    tx, err := db.BeginTx(ctx, &sql.TxOptions{\n        Isolation: sql.LevelSerializable,\n        ReadOnly:  false,\n    })\n    if err != nil {\n        return nil, fmt.Errorf(\"failed to begin transaction: %w\", err)\n    }\n    \n    defer func() {\n        if p := recover(); p != nil {\n            tx.Rollback()\n            panic(p)\n        }\n    }()\n    \n    var results []Result\n    for _, query := range queries {\n        result, err := tx.ExecContext(ctx, query.SQL, query.Args...)\n        if err != nil {\n            tx.Rollback()\n            return nil, fmt.Errorf(\"query failed: %w\", err)\n        }\n        results = append(results, Result{Query: query, Result: result})\n    }\n    \n    if err := tx.Commit(); err != nil {\n        tx.Rollback()\n        return nil, fmt.Errorf(\"commit failed: %w\", err)\n    }\n    \n    return results, nil\n}\n```\nWhat advanced Go patterns and potential issues are demonstrated here?",
        options: ["Transaction management with panic recovery, proper error handling, and potential resource leaks", "Simple transaction wrapper with basic error handling", "Connection pooling with transaction support", "No issues - proper transaction handling"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(golangQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Golang exam
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
    
    golangQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / golangQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${golangQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === golangQuestions[index].correct) {
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
        totalQuestions: golangQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, golangQuestions, currentAnswers, timeLeft);
}
