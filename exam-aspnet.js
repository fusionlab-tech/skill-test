// ASP.NET Programming Exam Questions - B2-C1 Level
const aspnetQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a REST API for an e-commerce application using ASP.NET Core. Users report that when they make concurrent requests to update product inventory, the stock levels sometimes show incorrect values. Here's the current implementation:\n\n<pre><code>[ApiController]\n[Route(\"api/[controller]\")]\npublic class ProductsController : ControllerBase\n{\n    private readonly ApplicationDbContext _context;\n    \n    [HttpPut(\"{id}/inventory\")]\n    public async Task&lt;IActionResult&gt; UpdateInventory(int id, [FromBody] InventoryUpdateRequest request)\n    {\n        var product = await _context.Products.FindAsync(id);\n        if (product == null)\n            return NotFound();\n        \n        product.Stock -= request.Quantity;\n        await _context.SaveChangesAsync();\n        \n        return Ok(product);\n    }\n}</code></pre>\n\nWhat's causing the inventory synchronization issues?",
        options: ["Race condition in concurrent inventory updates", "Missing transaction management", "No validation for negative stock values", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a user authentication system for a banking application using ASP.NET Core Identity. The system needs to handle JWT tokens, but users report that they get logged out unexpectedly and sometimes see other users' data. Here's the current implementation:\n\n<pre><code>[ApiController]\n[Route(\"api/[controller]\")]\npublic class AuthController : ControllerBase\n{\n    private readonly UserManager&lt;ApplicationUser&gt; _userManager;\n    private readonly SignInManager&lt;ApplicationUser&gt; _signInManager;\n    \n    [HttpPost(\"login\")]\n    public async Task&lt;IActionResult&gt; Login([FromBody] LoginRequest request)\n    {\n        var user = await _userManager.FindByNameAsync(request.Username);\n        if (user != null &amp;&amp; await _userManager.CheckPasswordAsync(user, request.Password))\n        {\n            var token = GenerateJwtToken(user);\n            return Ok(new { token });\n        }\n        return Unauthorized();\n    }\n    \n    [HttpGet(\"profile\")]\n    public async Task&lt;IActionResult&gt; GetProfile()\n    {\n        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;\n        var user = await _userManager.FindByIdAsync(userId);\n        return Ok(user);\n    }\n}</code></pre>\n\nWhat's causing the authentication and data isolation issues?",
        options: ["No token validation and expiration handling", "Missing user context management", "No proper session management", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a file upload service for a document management system using ASP.NET Core. Users report that large files fail to upload and sometimes the upload process gets stuck. Here's the current implementation:\n\n<pre><code>[ApiController]\n[Route(\"api/[controller]\")]\npublic class FilesController : ControllerBase\n{\n    [HttpPost(\"upload\")]\n    public async Task&lt;IActionResult&gt; UploadFile(IFormFile file)\n    {\n        if (file == null || file.Length == 0)\n            return BadRequest(\"File is empty\");\n        \n        var fileName = file.FileName;\n        var filePath = Path.Combine(\"uploads\", fileName);\n        \n        using (var stream = new FileStream(filePath, FileMode.Create))\n        {\n            await file.CopyToAsync(stream);\n        }\n        \n        return Ok(\"File uploaded successfully\");\n    }\n}</code></pre>\n\nWhat's causing the file upload issues?",
        options: ["No file size limits and timeout handling", "Missing progress tracking and chunked upload", "No proper error handling and validation", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a microservices architecture for a travel booking system using ASP.NET Core. The system needs to handle distributed transactions between booking, payment, and notification services. You're experiencing data consistency issues and partial failures. Here's the current implementation:\n\n<pre><code>[ApiController]\n[Route(\"api/[controller]\")]\npublic class BookingsController : ControllerBase\n{\n    private readonly ApplicationDbContext _context;\n    private readonly IPaymentService _paymentService;\n    private readonly INotificationService _notificationService;\n    \n    [HttpPost]\n    public async Task&lt;IActionResult&gt; CreateBooking([FromBody] BookingRequest request)\n    {\n        using var transaction = await _context.Database.BeginTransactionAsync();\n        try\n        {\n            // Create booking\n            var booking = new Booking(request);\n            _context.Bookings.Add(booking);\n            await _context.SaveChangesAsync();\n            \n            // Process payment\n            var paymentResult = await _paymentService.ProcessPaymentAsync(request.PaymentInfo);\n            \n            // Send notification\n            await _notificationService.SendConfirmationAsync(booking.Id);\n            \n            await transaction.CommitAsync();\n            return Ok(booking);\n        }\n        catch (Exception ex)\n        {\n            await transaction.RollbackAsync();\n            return StatusCode(500, \"Booking failed\");\n        }\n    }\n}</code></pre>\n\nWhat's causing the distributed transaction and consistency issues?",
        options: ["No distributed transaction management", "Missing compensation patterns for failures", "No proper error handling and rollback", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a caching system for a high-traffic e-commerce application using ASP.NET Core with Redis. The system needs to handle product catalog, user sessions, and real-time inventory updates. You're experiencing cache invalidation issues and stale data problems. Here's the current implementation:\n\n<pre><code>[ApiController]\n[Route(\"api/[controller]\")]\npublic class ProductsController : ControllerBase\n{\n    private readonly IMemoryCache _cache;\n    private readonly IDistributedCache _distributedCache;\n    private readonly ApplicationDbContext _context;\n    \n    [HttpGet(\"{id}\")]\n    public async Task&lt;IActionResult&gt; GetProduct(int id)\n    {\n        var cacheKey = $\"product_{id}\";\n        \n        if (!_cache.TryGetValue(cacheKey, out Product product))\n        {\n            product = await _context.Products.FindAsync(id);\n            if (product != null)\n            {\n                _cache.Set(cacheKey, product, TimeSpan.FromMinutes(30));\n            }\n        }\n        \n        return Ok(product);\n    }\n    \n    [HttpPut(\"{id}\")]\n    public async Task&lt;IActionResult&gt; UpdateProduct(int id, [FromBody] Product product)\n    {\n        _context.Products.Update(product);\n        await _context.SaveChangesAsync();\n        \n        // Invalidate cache\n        _cache.Remove($\"product_{id}\");\n        \n        return Ok(product);\n    }\n}</code></pre>\n\nWhat's causing the cache invalidation and data consistency issues?",
        options: ["Incomplete cache invalidation strategy", "Missing cache warming and preloading", "No cache versioning and TTL management", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a real-time notification system for a social media application using ASP.NET Core SignalR. The system needs to handle WebSocket connections, message broadcasting, and user presence tracking. You're experiencing connection drops and message delivery failures. Here's the current implementation:\n\n<pre><code>public class NotificationHub : Hub\n{\n    private readonly IUserService _userService;\n    private static readonly ConcurrentDictionary&lt;string, string&gt; _userConnections = new();\n    \n    public override async Task OnConnectedAsync()\n    {\n        var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;\n        if (userId != null)\n        {\n            _userConnections[userId] = Context.ConnectionId;\n            await Groups.AddToGroupAsync(Context.ConnectionId, userId);\n        }\n        await base.OnConnectedAsync();\n    }\n    \n    public override async Task OnDisconnectedAsync(Exception exception)\n    {\n        var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;\n        if (userId != null)\n        {\n            _userConnections.TryRemove(userId, out _);\n        }\n        await base.OnDisconnectedAsync(exception);\n    }\n    \n    public async Task SendMessage(string recipientId, string message)\n    {\n        await Clients.Group(recipientId).SendAsync(\"ReceiveMessage\", message);\n    }\n}</code></pre>\n\nWhat's causing the connection and message delivery issues?",
        options: ["No connection health monitoring and reconnection logic", "Missing message queuing and retry mechanisms", "No proper session management and cleanup", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a sophisticated event-driven architecture for a financial trading platform using ASP.NET Core with MediatR. The system needs to handle high-frequency trading events, order processing, and risk management with strict latency requirements. You're experiencing performance bottlenecks and event ordering issues. Here's the current implementation:\n\n<pre><code>public class OrderProcessingHandler : IRequestHandler&lt;ProcessOrderCommand, OrderResult&gt;\n{\n    private readonly ApplicationDbContext _context;\n    private readonly IMediator _mediator;\n    private readonly IRiskService _riskService;\n    \n    public async Task&lt;OrderResult&gt; Handle(ProcessOrderCommand request, CancellationToken cancellationToken)\n    {\n        try\n        {\n            // Process order\n            var order = new Order(request.OrderData);\n            _context.Orders.Add(order);\n            await _context.SaveChangesAsync(cancellationToken);\n            \n            // Risk assessment\n            var riskAssessment = await _riskService.AssessRiskAsync(order);\n            \n            if (riskAssessment.IsApproved)\n            {\n                order.Status = OrderStatus.Approved;\n                await _context.SaveChangesAsync(cancellationToken);\n                \n                // Publish event\n                await _mediator.Publish(new OrderApprovedEvent(order), cancellationToken);\n            }\n            else\n            {\n                order.Status = OrderStatus.Rejected;\n                await _context.SaveChangesAsync(cancellationToken);\n            }\n            \n            return new OrderResult { Order = order, Success = true };\n        }\n        catch (Exception ex)\n        {\n            _logger.LogError(ex, \"Order processing failed\");\n            return new OrderResult { Success = false, Error = ex.Message };\n        }\n    }\n}</code></pre>\n\nWhat advanced ASP.NET patterns and potential issues are demonstrated here?",
        options: ["Event-driven architecture with MediatR, potential race conditions and ordering issues", "Proper use of CQRS pattern with MediatR", "Efficient order processing with risk management", "No issues - sophisticated trading system implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated security and compliance framework for a healthcare application using ASP.NET Core. The system needs to handle HIPAA compliance, audit logging, and data encryption with role-based access control. You're experiencing security vulnerabilities and compliance gaps. Here's the current implementation:\n\n<pre><code>[ApiController]\n[Route(\"api/[controller]\")]\n[Authorize(Roles = \"HealthcareWorker\")]\npublic class PatientsController : ControllerBase\n{\n    private readonly ApplicationDbContext _context;\n    private readonly IAuditService _auditService;\n    private readonly IEncryptionService _encryptionService;\n    \n    [HttpGet(\"{id}\")]\n    [Authorize(Policy = \"PatientReadPolicy\")]\n    public async Task&lt;IActionResult&gt; GetPatient(int id)\n    {\n        var patient = await _context.Patients.FindAsync(id);\n        if (patient == null)\n            return NotFound();\n        \n        // Log access\n        await _auditService.LogAccessAsync(\n            User.Identity.Name,\n            \"PATIENT_READ\",\n            id,\n            HttpContext.Connection.RemoteIpAddress?.ToString()\n        );\n        \n        return Ok(patient);\n    }\n    \n    [HttpPost]\n    [Authorize(Roles = \"Doctor\")]\n    public async Task&lt;IActionResult&gt; CreatePatient([FromBody] Patient patient)\n    {\n        // Encrypt sensitive data\n        patient.SSN = _encryptionService.Encrypt(patient.SSN);\n        \n        _context.Patients.Add(patient);\n        await _context.SaveChangesAsync();\n        \n        // Log creation\n        await _auditService.LogAccessAsync(\n            User.Identity.Name,\n            \"PATIENT_CREATE\",\n            patient.Id,\n            HttpContext.Connection.RemoteIpAddress?.ToString()\n        );\n        \n        return Ok(patient);\n    }\n}</code></pre>\n\nWhat advanced security patterns and potential issues are demonstrated here?",
        options: ["HIPAA compliance with audit logging, potential data exposure in logs", "Proper role-based access control with policy-based authorization", "Data encryption for sensitive information", "No issues - sophisticated healthcare security implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated monitoring and observability system for a microservices architecture using ASP.NET Core with OpenTelemetry. The system needs to handle distributed tracing, metrics collection, and alerting across multiple services. You're experiencing performance overhead and incomplete observability data. Here's the current implementation:\n\n<pre><code>public class CustomMetricsMiddleware\n{\n    private readonly RequestDelegate _next;\n    private readonly IMeterFactory _meterFactory;\n    private readonly Counter&lt;long&gt; _requestCounter;\n    private readonly Histogram&lt;double&gt; _requestDuration;\n    \n    public CustomMetricsMiddleware(RequestDelegate next, IMeterFactory meterFactory)\n    {\n        _next = next;\n        _meterFactory = meterFactory;\n        \n        var meter = _meterFactory.Create(\"aspnetcore.requests\");\n        _requestCounter = meter.CreateCounter&lt;long&gt;(\"http_requests_total\");\n        _requestDuration = meter.CreateHistogram&lt;double&gt;(\"http_request_duration_seconds\");\n    }\n    \n    public async Task InvokeAsync(HttpContext context)\n    {\n        var stopwatch = Stopwatch.StartNew();\n        \n        try\n        {\n            await _next(context);\n        }\n        finally\n        {\n            stopwatch.Stop();\n            \n            var tags = new TagList\n            {\n                { \"method\", context.Request.Method },\n                { \"endpoint\", context.Request.Path },\n                { \"status_code\", context.Response.StatusCode.ToString() }\n            };\n            \n            _requestCounter.Add(1, tags);\n            _requestDuration.Record(stopwatch.Elapsed.TotalSeconds, tags);\n        }\n    }\n}</code></pre>\n\nWhat performance and observability issues exist in this implementation?",
        options: ["Metrics collection overhead affects application performance", "Missing distributed tracing correlation", "Incomplete error tracking and alerting", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated data processing pipeline for a real-time analytics platform using ASP.NET Core with background services. The system needs to handle stream processing, data transformation, and real-time aggregations with high throughput requirements. You're experiencing data loss and processing delays. Here's the current implementation:\n\n<pre><code>public class StreamProcessingService : BackgroundService\n{\n    private readonly IServiceProvider _serviceProvider;\n    private readonly ILogger&lt;StreamProcessingService&gt; _logger;\n    private readonly ConcurrentDictionary&lt;string, Aggregation&gt; _pendingAggregations = new();\n    \n    protected override async Task ExecuteAsync(CancellationToken stoppingToken)\n    {\n        while (!stoppingToken.IsCancellationRequested)\n        {\n            try\n            {\n                using var scope = _serviceProvider.CreateScope();\n                var context = scope.ServiceProvider.GetRequiredService&lt;ApplicationDbContext&gt;();\n                \n                // Process events from queue\n                var events = await GetEventsFromQueueAsync();\n                \n                foreach (var eventData in events)\n                {\n                    var processedEvent = TransformEvent(eventData);\n                    UpdateAggregations(processedEvent);\n                    \n                    // Store in database\n                    context.ProcessedEvents.Add(processedEvent);\n                }\n                \n                await context.SaveChangesAsync(stoppingToken);\n                \n                // Flush aggregations every 5 seconds\n                await FlushAggregationsAsync(context, stoppingToken);\n                \n                await Task.Delay(1000, stoppingToken);\n            }\n            catch (Exception ex)\n            {\n                _logger.LogError(ex, \"Stream processing failed\");\n                await Task.Delay(5000, stoppingToken);\n            }\n        }\n    }\n    \n    private void UpdateAggregations(ProcessedEvent eventData)\n    {\n        var key = $\"{eventData.UserId}_{eventData.EventType}\";\n        _pendingAggregations.AddOrUpdate(key, \n            new Aggregation(eventData.UserId, eventData.EventType),\n            (k, v) =&gt; {\n                v.IncrementCount();\n                v.UpdateTimestamp(eventData.Timestamp);\n                return v;\n            });\n    }\n}</code></pre>\n\nWhat sophisticated ASP.NET patterns and potential issues are demonstrated here?",
        options: ["Background service with stream processing, potential data loss and memory issues", "Proper use of background services with dependency injection", "Efficient real-time aggregation with scheduled flushing", "No issues - optimal stream processing implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(aspnetQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for ASP.NET exam
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
    
    aspnetQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / aspnetQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${aspnetQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === aspnetQuestions[index].correct) {
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
        totalQuestions: aspnetQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, aspnetQuestions, currentAnswers, timeLeft);
}
