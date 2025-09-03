// Python/Django Programming Exam Questions - B2-C1 Level
const pythonQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a user authentication system for a Django e-commerce application. Users report that they sometimes get logged out unexpectedly and see other users' data. Here's the current implementation:\n\n<pre><code>def login_user(request):\n    if request.method == 'POST':\n        username = request.POST.get('username')\n        password = request.POST.get('password')\n        \n        user = authenticate(username=username, password=password)\n        if user:\n            login(request, user)\n            return redirect('dashboard')\n        else:\n            return render(request, 'login.html', {'error': 'Invalid credentials'})\n    \n    return render(request, 'login.html')\n\ndef get_user_profile(request, user_id):\n    user = User.objects.get(id=user_id)\n    return render(request, 'profile.html', {'user': user})</code></pre>\n\nWhat's causing the authentication and data isolation issues?",
        options: ["No session management and user context validation", "Missing CSRF protection and input validation", "No proper error handling and user authorization", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a file upload system for a document management application. Users report that large files fail to upload and sometimes the upload process gets stuck. Here's the current implementation:\n\n<pre><code>def upload_document(request):\n    if request.method == 'POST':\n        file = request.FILES.get('document')\n        if file:\n            # Save file to disk\n            with open(f'uploads/{file.name}', 'wb+') as destination:\n                for chunk in file.chunks():\n                    destination.write(chunk)\n            \n            # Save file info to database\n            Document.objects.create(\n                name=file.name,\n                size=file.size,\n                uploaded_by=request.user\n            )\n            return JsonResponse({'status': 'success'})\n    \n    return render(request, 'upload.html')</code></pre>\n\nWhat's causing the file upload issues?",
        options: ["No file size limits and timeout handling", "Missing progress tracking and chunked upload", "No proper error handling and validation", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a shopping cart system for an e-commerce website. Users report that cart items sometimes disappear or get duplicated when they add/remove items quickly. Here's the current implementation:\n\n<pre><code>def add_to_cart(request, product_id):\n    product = get_object_or_404(Product, id=product_id)\n    cart = request.session.get('cart', [])\n    \n    # Check if item already exists\n    for item in cart:\n        if item['product_id'] == product_id:\n            item['quantity'] += 1\n            break\n    else:\n        cart.append({\n            'product_id': product_id,\n            'name': product.name,\n            'price': float(product.price),\n            'quantity': 1\n        })\n    \n    request.session['cart'] = cart\n    return JsonResponse({'status': 'success'})</code></pre>\n\nWhat's causing the cart synchronization issues?",
        options: ["Race condition in concurrent cart updates", "Missing transaction management", "No proper session handling", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a microservices architecture for a travel booking system using Django. The system needs to handle distributed transactions between booking, payment, and notification services. You're experiencing data consistency issues and partial failures. Here's the current implementation:\n\n<pre><code>@transaction.atomic\ndef create_booking(request):\n    try:\n        # Create booking\n        booking = Booking.objects.create(\n            customer=request.user,\n            destination=request.POST.get('destination'),\n            total_amount=request.POST.get('amount')\n        )\n        \n        # Process payment via external service\n        payment_result = payment_service.process_payment(\n            amount=booking.total_amount,\n            customer_id=request.user.id\n        )\n        \n        # Send confirmation email\n        notification_service.send_confirmation(\n            email=request.user.email,\n            booking_id=booking.id\n        )\n        \n        return JsonResponse({'booking_id': booking.id})\n    except Exception as e:\n        return JsonResponse({'error': str(e)}, status=500)</code></pre>\n\nWhat's causing the distributed transaction and consistency issues?",
        options: ["No distributed transaction management", "Missing compensation patterns for failures", "No proper error handling and rollback", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a caching system for a high-traffic e-commerce application using Django with Redis. The system needs to handle product catalog, user sessions, and real-time inventory updates. You're experiencing cache invalidation issues and stale data problems. Here's the current implementation:\n\n<pre><code>def get_product(request, product_id):\n    cache_key = f'product_{product_id}'\n    \n    # Try to get from cache\n    product = cache.get(cache_key)\n    if product is None:\n        product = Product.objects.select_related('category').get(id=product_id)\n        cache.set(cache_key, product, 3600)  # Cache for 1 hour\n    \n    return render(request, 'product.html', {'product': product})\n\ndef update_product(request, product_id):\n    product = Product.objects.get(id=product_id)\n    product.name = request.POST.get('name')\n    product.price = request.POST.get('price')\n    product.save()\n    \n    # Invalidate cache\n    cache.delete(f'product_{product_id}')\n    \n    return JsonResponse({'status': 'success'})</code></pre>\n\nWhat's causing the cache invalidation and data consistency issues?",
        options: ["Incomplete cache invalidation strategy", "Missing cache warming and preloading", "No cache versioning and TTL management", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a real-time notification system for a social media application using Django with WebSocket support. The system needs to handle user connections, message broadcasting, and presence tracking. You're experiencing connection drops and message delivery failures. Here's the current implementation:\n\n<pre><code>class NotificationConsumer(AsyncWebsocketConsumer):\n    async def connect(self):\n        self.user = self.scope['user']\n        self.room_name = f'user_{self.user.id}'\n        \n        await self.channel_layer.group_add(\n            self.room_name,\n            self.channel_name\n        )\n        await self.accept()\n    \n    async def disconnect(self, close_code):\n        await self.channel_layer.group_discard(\n            self.room_name,\n            self.channel_name\n        )\n    \n    async def send_notification(self, event):\n        await self.send(text_data=json.dumps({\n            'type': 'notification',\n            'message': event['message']\n        }))</code></pre>\n\nWhat's causing the connection and message delivery issues?",
        options: ["No connection health monitoring and reconnection logic", "Missing message queuing and retry mechanisms", "No proper session management and cleanup", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a sophisticated event-driven architecture for a financial trading platform using Django with Celery. The system needs to handle high-frequency trading events, order processing, and risk management with strict latency requirements. You're experiencing performance bottlenecks and event ordering issues. Here's the current implementation:\n\n<pre><code>@shared_task\ndef process_order(order_data):\n    try:\n        # Process order\n        order = Order.objects.create(\n            symbol=order_data['symbol'],\n            quantity=order_data['quantity'],\n            price=order_data['price'],\n            user_id=order_data['user_id']\n        )\n        \n        # Risk assessment\n        risk_result = risk_service.assess_risk(order)\n        \n        if risk_result.is_approved:\n            order.status = 'APPROVED'\n            order.save()\n            \n            # Publish order approved event\n            order_approved.delay(order.id)\n        else:\n            order.status = 'REJECTED'\n            order.save()\n        \n        return {'order_id': order.id, 'status': order.status}\n    except Exception as e:\n        logger.error(f'Order processing failed: {e}')\n        return {'error': str(e)}</code></pre>\n\nWhat advanced Django patterns and potential issues are demonstrated here?",
        options: ["Event-driven architecture with Celery, potential race conditions and ordering issues", "Proper use of async task processing with Celery", "Efficient order processing with risk management", "No issues - sophisticated trading system implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated security and compliance framework for a healthcare application using Django. The system needs to handle HIPAA compliance, audit logging, and data encryption with role-based access control. You're experiencing security vulnerabilities and compliance gaps. Here's the current implementation:\n\n<pre><code>@login_required\n@permission_required('healthcare.view_patient')\ndef get_patient(request, patient_id):\n    patient = get_object_or_404(Patient, id=patient_id)\n    \n    # Log access\n    AuditLog.objects.create(\n        user=request.user,\n        action='PATIENT_READ',\n        resource_id=patient_id,\n        ip_address=request.META.get('REMOTE_ADDR'),\n        timestamp=timezone.now()\n    )\n    \n    return render(request, 'patient.html', {'patient': patient})\n\n@login_required\n@permission_required('healthcare.add_patient')\ndef create_patient(request):\n    if request.method == 'POST':\n        # Encrypt sensitive data\n        ssn = encryption_service.encrypt(request.POST.get('ssn'))\n        \n        patient = Patient.objects.create(\n            name=request.POST.get('name'),\n            ssn=ssn,\n            created_by=request.user\n        )\n        \n        # Log creation\n        AuditLog.objects.create(\n            user=request.user,\n            action='PATIENT_CREATE',\n            resource_id=patient.id,\n            ip_address=request.META.get('REMOTE_ADDR'),\n            timestamp=timezone.now()\n        )\n        \n        return JsonResponse({'patient_id': patient.id})\n    \n    return render(request, 'create_patient.html')</code></pre>\n\nWhat advanced security patterns and potential issues are demonstrated here?",
        options: ["HIPAA compliance with audit logging, potential data exposure in logs", "Proper role-based access control with permission decorators", "Data encryption for sensitive information", "No issues - sophisticated healthcare security implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated monitoring and observability system for a microservices architecture using Django with custom middleware. The system needs to handle distributed tracing, metrics collection, and alerting across multiple services. You're experiencing performance overhead and incomplete observability data. Here's the current implementation:\n\n<pre><code>class MetricsMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n        self.request_count = 0\n        self.response_times = []\n    \n    def __call__(self, request):\n        start_time = time.time()\n        \n        # Increment request counter\n        self.request_count += 1\n        \n        # Process request\n        response = self.get_response(request)\n        \n        # Calculate response time\n        response_time = time.time() - start_time\n        self.response_times.append(response_time)\n        \n        # Log metrics\n        logger.info(f'Request: {request.method} {request.path} - '\n                   f'Status: {response.status_code} - '\n                   f'Time: {response_time:.3f}s')\n        \n        return response\n    \n    def get_metrics(self):\n        return {\n            'total_requests': self.request_count,\n            'avg_response_time': sum(self.response_times) / len(self.response_times) if self.response_times else 0,\n            'max_response_time': max(self.response_times) if self.response_times else 0\n        }</code></pre>\n\nWhat performance and observability issues exist in this implementation?",
        options: ["Metrics collection overhead affects application performance", "Missing distributed tracing correlation", "Incomplete error tracking and alerting", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated data processing pipeline for a real-time analytics platform using Django with background tasks. The system needs to handle stream processing, data transformation, and real-time aggregations with high throughput requirements. You're experiencing data loss and processing delays. Here's the current implementation:\n\n<pre><code>@shared_task\ndef process_analytics_data(event_data):\n    try:\n        # Transform event data\n        processed_event = transform_event(event_data)\n        \n        # Update aggregations\n        update_aggregations(processed_event)\n        \n        # Store in database\n        AnalyticsEvent.objects.create(\n            user_id=processed_event['user_id'],\n            event_type=processed_event['event_type'],\n            timestamp=processed_event['timestamp'],\n            data=processed_event['data']\n        )\n        \n        # Publish to downstream systems\n        publish_to_downstream.delay(processed_event)\n        \n    except Exception as e:\n        logger.error(f'Analytics processing failed: {e}')\n        # Send to dead letter queue\n        send_to_dead_letter.delay(event_data, str(e))\n\ndef update_aggregations(event):\n    # Update in-memory aggregations\n    key = f\"{event['user_id']}_{event['event_type']}\"\n    if key not in pending_aggregations:\n        pending_aggregations[key] = {\n            'user_id': event['user_id'],\n            'event_type': event['event_type'],\n            'count': 0,\n            'last_updated': event['timestamp']\n        }\n    \n    pending_aggregations[key]['count'] += 1\n    pending_aggregations[key]['last_updated'] = event['timestamp']</code></pre>\n\nWhat sophisticated Django patterns and potential issues are demonstrated here?",
        options: ["Background task processing with Celery, potential data loss and memory issues", "Proper event-driven architecture with error handling", "Efficient real-time aggregation with in-memory processing", "No issues - optimal analytics processing implementation"],
        correct: 0,
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
