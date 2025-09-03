// Spring Boot Programming Exam Questions - B2-C1 Level
const springbootQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a REST API for an e-commerce application. Users report that when they make concurrent requests to update product inventory, the stock levels sometimes show incorrect values. Here's the current implementation:\n\n<pre><code>@RestController\n@RequestMapping(\"/api/products\")\npublic class ProductController {\n    \n    @Autowired\n    private ProductService productService;\n    \n    @PutMapping(\"/{id}/inventory\")\n    public ResponseEntity&lt;Product&gt; updateInventory(\n            @PathVariable Long id,\n            @RequestBody InventoryUpdateRequest request) {\n        \n        Product product = productService.findById(id);\n        product.setStock(product.getStock() - request.getQuantity());\n        productService.save(product);\n        \n        return ResponseEntity.ok(product);\n    }\n}</code></pre>\n\nWhat's causing the inventory synchronization issues?",
        options: ["Race condition in concurrent inventory updates", "Missing transaction management", "No validation for negative stock values", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a user authentication system for a banking application. The system needs to handle JWT tokens, but users report that they get logged out unexpectedly and sometimes see other users' data. Here's the current implementation:\n\n<pre><code>@Service\npublic class AuthService {\n    \n    @Autowired\n    private UserRepository userRepository;\n    \n    public String login(String username, String password) {\n        User user = userRepository.findByUsername(username);\n        \n        if (user != null &amp;&amp; passwordEncoder.matches(password, user.getPassword())) {\n            return jwtUtil.generateToken(user);\n        }\n        throw new AuthenticationException(\"Invalid credentials\");\n    }\n    \n    public User getCurrentUser(String token) {\n        String username = jwtUtil.extractUsername(token);\n        return userRepository.findByUsername(username);\n    }\n}</code></pre>\n\nWhat's causing the authentication and data isolation issues?",
        options: ["No token validation and expiration handling", "Missing user context management", "No proper session management", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a file upload service for a document management system. Users report that large files fail to upload and sometimes the upload process gets stuck. Here's the current implementation:\n\n<pre><code>@RestController\n@RequestMapping(\"/api/files\")\npublic class FileController {\n    \n    @PostMapping(\"/upload\")\n    public ResponseEntity&lt;String&gt; uploadFile(@RequestParam(\"file\") MultipartFile file) {\n        try {\n            if (file.isEmpty()) {\n                return ResponseEntity.badRequest().body(\"File is empty\");\n            }\n            \n            String fileName = file.getOriginalFilename();\n            Path filePath = Paths.get(\"/uploads/\" + fileName);\n            \n            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);\n            \n            return ResponseEntity.ok(\"File uploaded successfully\");\n        } catch (IOException e) {\n            return ResponseEntity.status(500).body(\"Upload failed\");\n        }\n    }\n}</code></pre>\n\nWhat's causing the file upload issues?",
        options: ["No file size limits and timeout handling", "Missing progress tracking and chunked upload", "No proper error handling and validation", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a microservices architecture for a travel booking system. The system needs to handle distributed transactions between booking, payment, and notification services. You're experiencing data consistency issues and partial failures. Here's the current implementation:\n\n<pre><code>@Service\n@Transactional\npublic class BookingService {\n    \n    @Autowired\n    private BookingRepository bookingRepository;\n    \n    @Autowired\n    private PaymentServiceClient paymentService;\n    \n    @Autowired\n    private NotificationServiceClient notificationService;\n    \n    public Booking createBooking(BookingRequest request) {\n        try {\n            // Create booking\n            Booking booking = new Booking(request);\n            booking = bookingRepository.save(booking);\n            \n            // Process payment\n            PaymentResult payment = paymentService.processPayment(request.getPaymentInfo());\n            \n            // Send notification\n            notificationService.sendConfirmation(booking.getId());\n            \n            return booking;\n        } catch (Exception e) {\n            // Rollback booking if payment fails\n            throw new BookingException(\"Booking failed\", e);\n        }\n    }\n}</code></pre>\n\nWhat's causing the distributed transaction and consistency issues?",
        options: ["No distributed transaction management", "Missing compensation patterns for failures", "No proper error handling and rollback", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a caching system for a high-traffic e-commerce application. The system needs to handle product catalog, user sessions, and real-time inventory updates. You're experiencing cache invalidation issues and stale data problems. Here's the current implementation:\n\n<pre><code>@Service\npublic class ProductService {\n    \n    @Autowired\n    private ProductRepository productRepository;\n    \n    @Cacheable(value = \"products\", key = \"#id\")\n    public Product findById(Long id) {\n        return productRepository.findById(id).orElse(null);\n    }\n    \n    @CacheEvict(value = \"products\", key = \"#product.id\")\n    public Product updateProduct(Product product) {\n        return productRepository.save(product);\n    }\n    \n    @Cacheable(value = \"products\", key = \"#category\")\n    public List&lt;Product&gt; findByCategory(String category) {\n        return productRepository.findByCategory(category);\n    }\n}</code></pre>\n\nWhat's causing the cache invalidation and data consistency issues?",
        options: ["Incomplete cache invalidation strategy", "Missing cache warming and preloading", "No cache versioning and TTL management", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a real-time notification system for a social media application. The system needs to handle WebSocket connections, message broadcasting, and user presence tracking. You're experiencing connection drops and message delivery failures. Here's the current implementation:\n\n<pre><code>@Controller\npublic class NotificationController {\n    \n    private final SimpMessagingTemplate messagingTemplate;\n    private final Map&lt;String, String&gt; userSessions = new ConcurrentHashMap&lt;&gt;();\n    \n    @MessageMapping(\"/send\")\n    public void sendMessage(@Payload Message message) {\n        messagingTemplate.convertAndSendToUser(\n            message.getRecipientId(),\n            \"/queue/notifications\",\n            message\n        );\n    }\n    \n    @EventListener\n    public void handleSessionConnect(SessionConnectedEvent event) {\n        String sessionId = event.getMessage().getHeaders().get(\"simpSessionId\").toString();\n        String userId = extractUserIdFromSession(sessionId);\n        userSessions.put(userId, sessionId);\n    }\n    \n    @EventListener\n    public void handleSessionDisconnect(SessionDisconnectEvent event) {\n        String sessionId = event.getSessionId();\n        userSessions.entrySet().removeIf(entry -&gt; entry.getValue().equals(sessionId));\n    }\n}</code></pre>\n\nWhat's causing the connection and message delivery issues?",
        options: ["No connection health monitoring and reconnection logic", "Missing message queuing and retry mechanisms", "No proper session management and cleanup", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a sophisticated event-driven architecture for a financial trading platform. The system needs to handle high-frequency trading events, order processing, and risk management with strict latency requirements. You're experiencing performance bottlenecks and event ordering issues. Here's the current implementation:\n\n<pre><code>@Service\npublic class TradingService {\n    \n    @Autowired\n    private OrderRepository orderRepository;\n    \n    @Autowired\n    private RiskService riskService;\n    \n    @EventListener\n    @Async\n    public void handleOrderEvent(OrderEvent event) {\n        try {\n            // Process order\n            Order order = processOrder(event.getOrderData());\n            \n            // Risk check\n            RiskAssessment risk = riskService.assessRisk(order);\n            \n            if (risk.isApproved()) {\n                order.setStatus(OrderStatus.APPROVED);\n                orderRepository.save(order);\n                \n                // Publish order approved event\n                applicationEventPublisher.publishEvent(new OrderApprovedEvent(order));\n            } else {\n                order.setStatus(OrderStatus.REJECTED);\n                orderRepository.save(order);\n            }\n        } catch (Exception e) {\n            log.error(\"Order processing failed\", e);\n        }\n    }\n    \n    @EventListener\n    @Async\n    public void handleMarketDataEvent(MarketDataEvent event) {\n        // Update market data cache\n        marketDataCache.update(event.getSymbol(), event.getPrice());\n    }\n}</code></pre>\n\nWhat advanced Spring Boot patterns and potential issues are demonstrated here?",
        options: ["Event-driven architecture with async processing, potential race conditions and ordering issues", "Proper use of Spring events and async processing", "Efficient order processing with risk management", "No issues - sophisticated trading system implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated security and compliance framework for a healthcare application. The system needs to handle HIPAA compliance, audit logging, and data encryption with role-based access control. You're experiencing security vulnerabilities and compliance gaps. Here's the current implementation:\n\n<pre><code>@RestController\n@RequestMapping(\"/api/patients\")\n@PreAuthorize(\"hasRole('HEALTHCARE_WORKER')\")\npublic class PatientController {\n    \n    @Autowired\n    private PatientService patientService;\n    \n    @GetMapping(\"/{id}\")\n    @PreAuthorize(\"hasPermission(#id, 'PATIENT', 'READ')\")\n    public ResponseEntity&lt;Patient&gt; getPatient(@PathVariable Long id) {\n        Patient patient = patientService.findById(id);\n        \n        // Log access\n        auditService.logAccess(\n            SecurityContextHolder.getContext().getAuthentication().getName(),\n            \"PATIENT_READ\",\n            id\n        );\n        \n        return ResponseEntity.ok(patient);\n    }\n    \n    @PostMapping\n    @PreAuthorize(\"hasRole('DOCTOR')\")\n    public ResponseEntity&lt;Patient&gt; createPatient(@RequestBody @Valid Patient patient) {\n        // Encrypt sensitive data\n        patient.setSsn(encryptionService.encrypt(patient.getSsn()));\n        \n        Patient savedPatient = patientService.save(patient);\n        \n        // Log creation\n        auditService.logAccess(\n            SecurityContextHolder.getContext().getAuthentication().getName(),\n            \"PATIENT_CREATE\",\n            savedPatient.getId()\n        );\n        \n        return ResponseEntity.ok(savedPatient);\n    }\n}</code></pre>\n\nWhat advanced security patterns and potential issues are demonstrated here?",
        options: ["HIPAA compliance with audit logging, potential data exposure in logs", "Proper role-based access control with method-level security", "Data encryption for sensitive information", "No issues - sophisticated healthcare security implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated monitoring and observability system for a microservices architecture. The system needs to handle distributed tracing, metrics collection, and alerting across multiple services. You're experiencing performance overhead and incomplete observability data. Here's the current implementation:\n\n<pre><code>@Component\npublic class CustomMetricsCollector {\n    \n    private final MeterRegistry meterRegistry;\n    private final Counter requestCounter;\n    private final Timer requestTimer;\n    \n    public CustomMetricsCollector(MeterRegistry meterRegistry) {\n        this.meterRegistry = meterRegistry;\n        this.requestCounter = Counter.builder(\"http_requests_total\")\n            .description(\"Total HTTP requests\")\n            .register(meterRegistry);\n        this.requestTimer = Timer.builder(\"http_request_duration\")\n            .description(\"HTTP request duration\")\n            .register(meterRegistry);\n    }\n    \n    @EventListener\n    public void handleRequest(RequestEvent event) {\n        requestCounter.increment(\n            Tags.of(\n                \"method\", event.getMethod(),\n                \"endpoint\", event.getEndpoint(),\n                \"status\", String.valueOf(event.getStatus())\n            )\n        );\n        \n        requestTimer.record(event.getDuration(), TimeUnit.MILLISECONDS);\n    }\n    \n    @Scheduled(fixedRate = 60000)\n    public void collectSystemMetrics() {\n        // Collect JVM metrics\n        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();\n        Gauge.builder(\"jvm_memory_used\")\n            .description(\"JVM memory used\")\n            .register(meterRegistry, memoryBean, bean -&gt; bean.getHeapMemoryUsage().getUsed());\n        \n        // Collect custom business metrics\n        collectBusinessMetrics();\n    }\n}</code></pre>\n\nWhat performance and observability issues exist in this implementation?",
        options: ["Metrics collection overhead affects application performance", "Missing distributed tracing correlation", "Incomplete error tracking and alerting", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated data processing pipeline for a real-time analytics platform. The system needs to handle stream processing, data transformation, and real-time aggregations with high throughput requirements. You're experiencing data loss and processing delays. Here's the current implementation:\n\n<pre><code>@Service\npublic class StreamProcessingService {\n    \n    @Autowired\n    private KafkaTemplate&lt;String, String&gt; kafkaTemplate;\n    \n    @KafkaListener(topics = \"user-events\", groupId = \"analytics-group\")\n    public void processUserEvent(String eventData) {\n        try {\n            UserEvent event = objectMapper.readValue(eventData, UserEvent.class);\n            \n            // Transform event\n            ProcessedEvent processedEvent = transformEvent(event);\n            \n            // Calculate aggregations\n            updateAggregations(processedEvent);\n            \n            // Store in database\n            eventRepository.save(processedEvent);\n            \n            // Publish to downstream systems\n            kafkaTemplate.send(\"processed-events\", processedEvent);\n            \n        } catch (Exception e) {\n            log.error(\"Event processing failed\", e);\n            // Send to dead letter queue\n            kafkaTemplate.send(\"failed-events\", eventData);\n        }\n    }\n    \n    @Scheduled(fixedRate = 5000)\n    public void flushAggregations() {\n        // Flush aggregated data to database\n        aggregationRepository.saveAll(pendingAggregations);\n        pendingAggregations.clear();\n    }\n    \n    private void updateAggregations(ProcessedEvent event) {\n        // Update in-memory aggregations\n        String key = event.getUserId() + \"_\" + event.getEventType();\n        pendingAggregations.compute(key, (k, v) -&gt; {\n            if (v == null) {\n                v = new Aggregation(event.getUserId(), event.getEventType());\n            }\n            v.incrementCount();\n            v.updateTimestamp(event.getTimestamp());\n            return v;\n        });\n    }\n}</code></pre>\n\nWhat sophisticated Spring Boot patterns and potential issues are demonstrated here?",
        options: ["Stream processing with Kafka integration, potential data loss and memory issues", "Proper event-driven architecture with error handling", "Efficient real-time aggregation with scheduled flushing", "No issues - optimal stream processing implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(springbootQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Spring Boot exam
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
    
    springbootQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / springbootQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${springbootQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === springbootQuestions[index].correct) {
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
        totalQuestions: springbootQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, springbootQuestions, currentAnswers, timeLeft);
}
