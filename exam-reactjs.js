// React.js Programming Exam Questions - B2-C1 Level
const reactjsQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a real-time chat application. Users report that messages sometimes appear in the wrong order or get duplicated when they send messages quickly. Here's the current implementation:\n\n<pre><code>function ChatRoom({ roomId }) {\n    const [messages, setMessages] = useState([]);\n    const [isConnected, setIsConnected] = useState(false);\n    \n    useEffect(() =&gt; {\n        const socket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);\n        \n        socket.onopen = () =&gt; setIsConnected(true);\n        socket.onclose = () =&gt; setIsConnected(false);\n        \n        socket.onmessage = (event) =&gt; {\n            const newMessage = JSON.parse(event.data);\n            setMessages(prev =&gt; [...prev, newMessage]);\n        };\n        \n        return () =&gt; socket.close();\n    }, [roomId]);\n    \n    const sendMessage = (text) =&gt; {\n        if (isConnected) {\n            socket.send(JSON.stringify({ text, timestamp: Date.now() }));\n        }\n    };\n    \n    return (\n        &lt;div&gt;\n            {messages.map(msg =&gt; (\n                &lt;Message key={msg.timestamp} message={msg} /&gt;\n            ))}\n            &lt;MessageInput onSend={sendMessage} /&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the message ordering and duplication issues?",
        options: ["Socket reference not accessible in sendMessage function", "Missing message deduplication logic", "No proper message sorting by timestamp", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a dashboard that displays live data from multiple APIs. The dashboard updates every 5 seconds, but users complain about flickering and inconsistent data display. Here's the current implementation:\n\n<pre><code>function Dashboard() {\n    const [data, setData] = useState({});\n    const [loading, setLoading] = useState(true);\n    \n    useEffect(() =&gt; {\n        const fetchData = async () =&gt; {\n            setLoading(true);\n            try {\n                const [users, orders, revenue] = await Promise.all([\n                    fetch('/api/users').then(r =&gt; r.json()),\n                    fetch('/api/orders').then(r =&gt; r.json()),\n                    fetch('/api/revenue').then(r =&gt; r.json())\n                ]);\n                \n                setData({ users, orders, revenue });\n                setLoading(false);\n            } catch (error) {\n                setLoading(false);\n            }\n        };\n        \n        fetchData();\n        const interval = setInterval(fetchData, 5000);\n        return () =&gt; clearInterval(interval);\n    }, []);\n    \n    if (loading) return &lt;Spinner /&gt;;\n    \n    return (\n        &lt;div&gt;\n            &lt;UserStats data={data.users} /&gt;\n            &lt;OrderStats data={data.orders} /&gt;\n            &lt;RevenueStats data={data.revenue} /&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the flickering and data inconsistency?",
        options: ["Loading state resets on every data fetch", "No error handling for partial API failures", "Missing data validation and fallbacks", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a file upload component for a document management system. Users report that when they upload multiple files, some files get lost and the progress indicators show incorrect values. Here's the current implementation:\n\n<pre><code>function FileUpload() {\n    const [files, setFiles] = useState([]);\n    const [uploading, setUploading] = useState(false);\n    \n    const handleFileSelect = (event) =&gt; {\n        const newFiles = Array.from(event.target.files);\n        setFiles(prev =&gt; [...prev, ...newFiles]);\n    };\n    \n    const uploadFiles = async () =&gt; {\n        setUploading(true);\n        \n        for (const file of files) {\n            const formData = new FormData();\n            formData.append('file', file);\n            \n            try {\n                await fetch('/api/upload', {\n                    method: 'POST',\n                    body: formData\n                });\n            } catch (error) {\n                console.error('Upload failed:', error);\n            }\n        }\n        \n        setUploading(false);\n        setFiles([]);\n    };\n    \n    return (\n        &lt;div&gt;\n            &lt;input type=\"file\" multiple onChange={handleFileSelect} /&gt;\n            {files.map((file, index) =&gt; (\n                &lt;FileItem key={index} file={file} /&gt;\n            ))}\n            &lt;button onClick={uploadFiles} disabled={uploading}&gt;\n                {uploading ? 'Uploading...' : 'Upload Files'}\n            &lt;/button&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the file loss and incorrect progress indicators?",
        options: ["No individual file progress tracking", "Missing error handling for failed uploads", "Files array cleared before all uploads complete", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a complex form with dynamic fields that can be added/removed by users. The form has validation rules that depend on other fields, but you're experiencing validation issues and performance problems. Here's the current implementation:\n\n<pre><code>function DynamicForm() {\n    const [fields, setFields] = useState([{ id: 1, type: 'text', value: '', required: true }]);\n    const [errors, setErrors] = useState({});\n    \n    const addField = () =&gt; {\n        const newField = {\n            id: Date.now(),\n            type: 'text',\n            value: '',\n            required: Math.random() &gt; 0.5\n        };\n        setFields(prev =&gt; [...prev, newField]);\n    };\n    \n    const removeField = (id) =&gt; {\n        setFields(prev =&gt; prev.filter(field =&gt; field.id !== id));\n    };\n    \n    const updateField = (id, value) =&gt; {\n        setFields(prev =&gt; prev.map(field =&gt;\n            field.id === id ? { ...field, value } : field\n        ));\n        \n        // Validate all fields\n        const newErrors = {};\n        fields.forEach(field =&gt; {\n            if (field.required &amp;&amp; !field.value) {\n                newErrors[field.id] = 'This field is required';\n            }\n        });\n        setErrors(newErrors);\n    };\n    \n    return (\n        &lt;form&gt;\n            {fields.map(field =&gt; (\n                &lt;div key={field.id}&gt;\n                    &lt;input\n                        type={field.type}\n                        value={field.value}\n                        onChange={(e) =&gt; updateField(field.id, e.target.value)}\n                    /&gt;\n                    {errors[field.id] &amp;&amp; &lt;span&gt;{errors[field.id]}&lt;/span&gt;}\n                    &lt;button type=\"button\" onClick={() =&gt; removeField(field.id)}&gt;\n                        Remove\n                    &lt;/button&gt;\n                &lt;/div&gt;\n            ))}\n            &lt;button type=\"button\" onClick={addField}&gt;Add Field&lt;/button&gt;\n        &lt;/form&gt;\n    );\n}</code></pre>\n\nWhat's causing the validation and performance issues?",
        options: ["Validation runs on every field update", "Stale closure in updateField function", "Missing memoization for field components", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a data table with sorting, filtering, and pagination. The table displays 10,000+ rows, but users complain about slow performance when interacting with it. Here's the current implementation:\n\n<pre><code>function DataTable({ data }) {\n    const [sortBy, setSortBy] = useState(null);\n    const [sortOrder, setSortOrder] = useState('asc');\n    const [filter, setFilter] = useState('');\n    const [currentPage, setCurrentPage] = useState(1);\n    const [pageSize] = useState(50);\n    \n    const processedData = data\n        .filter(item =&gt; item.name.toLowerCase().includes(filter.toLowerCase()))\n        .sort((a, b) =&gt; {\n            if (!sortBy) return 0;\n            const aVal = a[sortBy];\n            const bVal = b[sortBy];\n            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;\n        })\n        .slice((currentPage - 1) * pageSize, currentPage * pageSize);\n    \n    const handleSort = (column) =&gt; {\n        if (sortBy === column) {\n            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');\n        } else {\n            setSortBy(column);\n            setSortOrder('asc');\n        }\n    };\n    \n    return (\n        &lt;div&gt;\n            &lt;input\n                type=\"text\"\n                placeholder=\"Filter...\"\n                value={filter}\n                onChange={(e) =&gt; setFilter(e.target.value)}\n            /&gt;\n            &lt;table&gt;\n                &lt;thead&gt;\n                    &lt;tr&gt;\n                        &lt;th onClick={() =&gt; handleSort('name')}&gt;Name&lt;/th&gt;\n                        &lt;th onClick={() =&gt; handleSort('age')}&gt;Age&lt;/th&gt;\n                        &lt;th onClick={() =&gt; handleSort('salary')}&gt;Salary&lt;/th&gt;\n                    &lt;/tr&gt;\n                &lt;/thead&gt;\n                &lt;tbody&gt;\n                    {processedData.map(item =&gt; (\n                        &lt;tr key={item.id}&gt;\n                            &lt;td&gt;{item.name}&lt;/td&gt;\n                            &lt;td&gt;{item.age}&lt;/td&gt;\n                            &lt;td&gt;{item.salary}&lt;/td&gt;\n                        &lt;/tr&gt;\n                    ))}\n                &lt;/tbody&gt;\n            &lt;/table&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the performance issues?",
        options: ["Data processing runs on every render", "No memoization for expensive operations", "Missing virtualization for large datasets", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a notification system that shows real-time updates to users. The notifications should auto-dismiss after 5 seconds, but you're experiencing memory leaks and notifications that don't disappear. Here's the current implementation:\n\n<pre><code>function NotificationSystem() {\n    const [notifications, setNotifications] = useState([]);\n    \n    const addNotification = (message, type = 'info') =&gt; {\n        const id = Date.now();\n        const notification = { id, message, type };\n        \n        setNotifications(prev =&gt; [...prev, notification]);\n        \n        setTimeout(() =&gt; {\n            setNotifications(prev =&gt; prev.filter(n =&gt; n.id !== id));\n        }, 5000);\n    };\n    \n    const removeNotification = (id) =&gt; {\n        setNotifications(prev =&gt; prev.filter(n =&gt; n.id !== id));\n    };\n    \n    useEffect(() =&gt; {\n        // Simulate incoming notifications\n        const interval = setInterval(() =&gt; {\n            addNotification(`New update ${Date.now()}`, 'success');\n        }, 10000);\n        \n        return () =&gt; clearInterval(interval);\n    }, []);\n    \n    return (\n        &lt;div className=\"notification-container\"&gt;\n            {notifications.map(notification =&gt; (\n                &lt;div key={notification.id} className={`notification ${notification.type}`}&gt;\n                    {notification.message}\n                    &lt;button onClick={() =&gt; removeNotification(notification.id)}&gt;\n                        ×\n                    &lt;/button&gt;\n                &lt;/div&gt;\n            ))}\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the memory leaks and notification issues?",
        options: ["setTimeout references not cleared on component unmount", "Notifications array grows indefinitely", "Missing cleanup for interval timers", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a sophisticated state management system for a complex e-commerce application. The system needs to handle user authentication, shopping cart, wishlist, and order history with real-time updates. You're experiencing state synchronization issues and performance problems. Here's the current implementation:\n\n<pre><code>function useAppState() {\n    const [user, setUser] = useState(null);\n    const [cart, setCart] = useState([]);\n    const [wishlist, setWishlist] = useState([]);\n    const [orders, setOrders] = useState([]);\n    const [loading, setLoading] = useState(false);\n    \n    const addToCart = useCallback((product) =&gt; {\n        setCart(prev =&gt; {\n            const existing = prev.find(item =&gt; item.id === product.id);\n            if (existing) {\n                return prev.map(item =&gt;\n                    item.id === product.id\n                        ? { ...item, quantity: item.quantity + 1 }\n                        : item\n                );\n            }\n            return [...prev, { ...product, quantity: 1 }];\n        });\n    }, []);\n    \n    const removeFromCart = useCallback((productId) =&gt; {\n        setCart(prev =&gt; prev.filter(item =&gt; item.id !== productId));\n    }, []);\n    \n    const addToWishlist = useCallback((product) =&gt; {\n        setWishlist(prev =&gt; [...prev, product]);\n    }, []);\n    \n    const placeOrder = useCallback(async () =&gt; {\n        setLoading(true);\n        try {\n            const order = await createOrder(cart);\n            setOrders(prev =&gt; [...prev, order]);\n            setCart([]);\n        } catch (error) {\n            console.error('Order failed:', error);\n        } finally {\n            setLoading(false);\n        }\n    }, [cart]);\n    \n    return {\n        user, setUser,\n        cart, addToCart, removeFromCart,\n        wishlist, addToWishlist,\n        orders, placeOrder,\n        loading\n    };\n}</code></pre>\n\nWhat advanced React patterns and potential issues are demonstrated here?",
        options: ["Complex state management without proper separation, potential race conditions", "Proper use of useCallback for performance optimization", "Efficient state updates with immutable patterns", "No issues - sophisticated state management"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated caching and synchronization system for a collaborative document editor. Multiple users can edit documents simultaneously, and changes need to be synchronized in real-time. You're experiencing data conflicts and performance issues. Here's the current implementation:\n\n<pre><code>function useDocumentSync(documentId) {\n    const [document, setDocument] = useState(null);\n    const [pendingChanges, setPendingChanges] = useState([]);\n    const [isConnected, setIsConnected] = useState(false);\n    const socketRef = useRef(null);\n    \n    useEffect(() =&gt; {\n        const socket = new WebSocket(`ws://localhost:8080/docs/${documentId}`);\n        socketRef.current = socket;\n        \n        socket.onopen = () =&gt; setIsConnected(true);\n        socket.onclose = () =&gt; setIsConnected(false);\n        \n        socket.onmessage = (event) =&gt; {\n            const { type, data } = JSON.parse(event.data);\n            \n            switch (type) {\n                case 'document_update':\n                    setDocument(data);\n                    break;\n                case 'change_conflict':\n                    handleConflict(data);\n                    break;\n            }\n        };\n        \n        return () =&gt; socket.close();\n    }, [documentId]);\n    \n    const applyChange = useCallback((change) =&gt; {\n        setPendingChanges(prev =&gt; [...prev, change]);\n        \n        if (socketRef.current &amp;&amp; isConnected) {\n            socketRef.current.send(JSON.stringify({\n                type: 'apply_change',\n                data: change\n            }));\n        }\n    }, [isConnected]);\n    \n    const handleConflict = (conflictData) =&gt; {\n        // Merge conflicting changes\n        setDocument(prev =&gt; mergeChanges(prev, conflictData));\n    };\n    \n    return { document, applyChange, pendingChanges, isConnected };\n}</code></pre>\n\nWhat sophisticated React patterns and potential issues are demonstrated here?",
        options: ["Real-time synchronization with conflict resolution, potential memory leaks from WebSocket", "Proper WebSocket management with cleanup", "Efficient change tracking and conflict handling", "No issues - optimal collaborative editing implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated performance monitoring and optimization system for a React application. The system needs to track component render times, memory usage, and user interactions. You're experiencing performance overhead and inaccurate metrics. Here's the current implementation:\n\n<pre><code>function usePerformanceMonitor(componentName) {\n    const renderStartTime = useRef(null);\n    const renderCount = useRef(0);\n    const [metrics, setMetrics] = useState({\n        renderTime: 0,\n        renderCount: 0,\n        memoryUsage: 0\n    });\n    \n    useEffect(() =&gt; {\n        renderStartTime.current = performance.now();\n        renderCount.current += 1;\n        \n        return () =&gt; {\n            const renderTime = performance.now() - renderStartTime.current;\n            const memoryUsage = performance.memory ? performance.memory.usedJSHeapSize : 0;\n            \n            setMetrics(prev =&gt; ({\n                ...prev,\n                renderTime: (prev.renderTime + renderTime) / 2,\n                renderCount: renderCount.current,\n                memoryUsage\n            }));\n            \n            // Send metrics to monitoring service\n            sendMetrics({\n                component: componentName,\n                renderTime,\n                renderCount: renderCount.current,\n                memoryUsage,\n                timestamp: Date.now()\n            });\n        };\n    });\n    \n    const trackUserInteraction = useCallback((interactionType, data) =&gt; {\n        sendMetrics({\n            component: componentName,\n            type: 'user_interaction',\n            interaction: interactionType,\n            data,\n            timestamp: Date.now()\n        });\n    }, [componentName]);\n    \n    return { metrics, trackUserInteraction };\n}</code></pre>\n\nWhat performance and monitoring issues exist in this implementation?",
        options: ["Performance monitoring overhead affects actual performance", "Inaccurate render time measurements", "Memory leaks from continuous metric collection", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated error boundary and recovery system for a critical financial application. The system needs to handle different types of errors gracefully and provide fallback UI components. You're experiencing error boundary limitations and recovery issues. Here's the current implementation:\n\n<pre><code>class AdvancedErrorBoundary extends React.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            hasError: false,\n            error: null,\n            errorInfo: null,\n            retryCount: 0\n        };\n    }\n    \n    static getDerivedStateFromError(error) {\n        return { hasError: true, error };\n    }\n    \n    componentDidCatch(error, errorInfo) {\n        this.setState({ errorInfo });\n        \n        // Log error to monitoring service\n        logError({\n            error: error.message,\n            stack: error.stack,\n            componentStack: errorInfo.componentStack,\n            retryCount: this.state.retryCount\n        });\n    }\n    \n    handleRetry = () =&gt; {\n        this.setState(prevState =&gt; ({\n            hasError: false,\n            error: null,\n            errorInfo: null,\n            retryCount: prevState.retryCount + 1\n        }));\n    };\n    \n    render() {\n        if (this.state.hasError) {\n            return (\n                &lt;div className=\"error-boundary\"&gt;\n                    &lt;h2&gt;Something went wrong&lt;/h2&gt;\n                    &lt;p&gt;Error: {this.state.error &amp;&amp; this.state.error.message}&lt;/p&gt;\n                    &lt;button onClick={this.handleRetry}&gt;\n                        Retry ({this.state.retryCount})\n                    &lt;/button&gt;\n                    {this.state.retryCount &gt; 3 &amp;&amp; (\n                        &lt;FallbackComponent /&gt;\n                    )}\n                &lt;/div&gt;\n            );\n        }\n        \n        return this.props.children;\n    }\n}</code></pre>\n\nWhat advanced error handling patterns and potential issues are demonstrated here?",
        options: ["Error boundary with retry mechanism, potential infinite retry loops", "Proper error logging and monitoring integration", "Graceful degradation with fallback components", "No issues - sophisticated error handling implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(reactjsQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for React.js exam
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
    
    reactjsQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / reactjsQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${reactjsQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === reactjsQuestions[index].correct) {
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
        totalQuestions: reactjsQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, reactjsQuestions, currentAnswers, timeLeft);
}
