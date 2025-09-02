// MERN Stack Exam Questions - B2-C1 Level
const mernQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a user authentication system for an e-commerce app. Users report that sometimes they get logged out unexpectedly, and the login state doesn't persist when they refresh the page. Here's the current implementation:\n\n<pre><code>// Frontend - Login component\nconst Login = () => {\n  const [user, setUser] = useState(null);\n  \n  const handleLogin = async (credentials) => {\n    try {\n      const response = await fetch('/api/login', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(credentials)\n      });\n      const data = await response.json();\n      setUser(data.user);\n    } catch (error) {\n      console.error('Login failed:', error);\n    }\n  };\n  \n  return (\n    &lt;div&gt;\n      {user ? &lt;Dashboard user={user} /&gt; : &lt;LoginForm onSubmit={handleLogin} /&gt;}\n    &lt;/div&gt;\n  );\n};</code></pre>\n\nWhat's causing the authentication issues?",
        options: ["No token storage or persistence mechanism", "Missing error handling for failed requests", "Insecure API endpoint", "No issues - implementation is correct"],
        correct: 0,
        level: "basic"
    },
    {
        question: "You're building a product catalog for an online store. The product list loads slowly and users complain about poor performance when browsing through hundreds of products. Here's the current implementation:\n\n<pre><code>// Frontend - Product list component\nconst ProductList = () => {\n  const [products, setProducts] = useState([]);\n  \n  useEffect(() => {\n    fetch('/api/products')\n      .then(res => res.json())\n      .then(data => setProducts(data));\n  }, []);\n  \n  return (\n    &lt;div&gt;\n      {products.map(product => (\n        &lt;ProductCard key={product.id} product={product} /&gt;\n      ))}\n    &lt;/div&gt;\n  );\n};</code></pre>\n\nWhat's causing the performance issues?",
        options: ["Loading all products at once without pagination", "Missing loading states and error handling", "No caching mechanism", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a real-time chat feature for a social media app. Users report that messages sometimes appear out of order or get duplicated. Here's the current implementation:\n\n<pre><code>// Frontend - Chat component\nconst Chat = ({ roomId }) => {\n  const [messages, setMessages] = useState([]);\n  \n  useEffect(() => {\n    const socket = io('/chat');\n    \n    socket.on('newMessage', (message) => {\n      setMessages(prev => [...prev, message]);\n    });\n    \n    return () => socket.disconnect();\n  }, [roomId]);\n  \n  return (\n    &lt;div&gt;\n      {messages.map(msg => (\n        &lt;Message key={msg.id} message={msg} /&gt;\n      ))}\n    &lt;/div&gt;\n  );\n};</code></pre>\n\nWhat's causing the message ordering and duplication issues?",
        options: ["Race condition - messages arrive out of order", "Missing message deduplication logic", "No proper message sorting", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a shopping cart system for an e-commerce platform. Users report that when they add items to their cart, the total price sometimes shows incorrect amounts, and items occasionally disappear. Here's the current implementation:\n\n<pre><code>// Backend - Cart API\napp.post('/api/cart/add', async (req, res) => {\n  try {\n    const { userId, productId, quantity } = req.body;\n    \n    const cart = await Cart.findOne({ userId });\n    if (!cart) {\n      await Cart.create({ userId, items: [] });\n    }\n    \n    const product = await Product.findById(productId);\n    cart.items.push({ productId, quantity, price: product.price });\n    \n    await cart.save();\n    res.json({ success: true, cart });\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});</code></pre>\n\nWhat's causing the cart synchronization issues?",
        options: ["Race condition in concurrent cart updates", "Missing validation for product existence", "No atomic operations for cart modifications", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a user dashboard that displays analytics data. The dashboard loads slowly and sometimes shows stale data. Here's the current implementation:\n\n<pre><code>// Frontend - Dashboard component\nconst Dashboard = () => {\n  const [analytics, setAnalytics] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    const fetchAnalytics = async () => {\n      setLoading(true);\n      try {\n        const response = await fetch('/api/analytics');\n        const data = await response.json();\n        setAnalytics(data);\n      } catch (error) {\n        console.error('Failed to fetch analytics:', error);\n      } finally {\n        setLoading(false);\n      }\n    };\n    \n    fetchAnalytics();\n    \n    // Refresh every 30 seconds\n    const interval = setInterval(fetchAnalytics, 30000);\n    return () => clearInterval(interval);\n  }, []);\n  \n  if (loading) return &lt;Spinner /&gt;;\n  return &lt;AnalyticsView data={analytics} /&gt;;\n};</code></pre>\n\nWhat's causing the performance and data freshness issues?",
        options: ["No caching strategy for expensive analytics queries", "Frequent API calls without optimization", "Missing error handling for failed requests", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a file upload system for a document management app. Users report that large files fail to upload and sometimes the upload progress gets stuck. Here's the current implementation:\n\n<pre><code>// Frontend - File upload component\nconst FileUpload = () => {\n  const [uploading, setUploading] = useState(false);\n  const [progress, setProgress] = useState(0);\n  \n  const handleUpload = async (file) => {\n    setUploading(true);\n    setProgress(0);\n    \n    const formData = new FormData();\n    formData.append('file', file);\n    \n    try {\n      const response = await fetch('/api/upload', {\n        method: 'POST',\n        body: formData\n      });\n      \n      if (response.ok) {\n        setProgress(100);\n        console.log('Upload successful');\n      }\n    } catch (error) {\n      console.error('Upload failed:', error);\n    } finally {\n      setUploading(false);\n    }\n  };\n  \n  return (\n    &lt;div&gt;\n      &lt;input type=\"file\" onChange={(e) => handleUpload(e.target.files[0])} /&gt;\n      {uploading && &lt;ProgressBar progress={progress} /&gt;}\n    &lt;/div&gt;\n  );\n};</code></pre>\n\nWhat's causing the upload issues?",
        options: ["No chunked upload for large files", "Missing progress tracking implementation", "No timeout handling for long uploads", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a complex microservices architecture for a banking application. The system needs to handle transactions, user authentication, and real-time notifications. You're experiencing data consistency issues and performance problems. Here's the current implementation:\n\n<pre><code>// Transaction Service\nclass TransactionService {\n  async transferMoney(fromAccount, toAccount, amount) {\n    try {\n      // Deduct from source account\n      await AccountService.updateBalance(fromAccount, -amount);\n      \n      // Add to destination account\n      await AccountService.updateBalance(toAccount, amount);\n      \n      // Create transaction record\n      const transaction = await Transaction.create({\n        fromAccount,\n        toAccount,\n        amount,\n        status: 'completed'\n      });\n      \n      // Send notification\n      await NotificationService.sendTransferNotification(transaction);\n      \n      return transaction;\n    } catch (error) {\n      // Rollback logic missing\n      throw error;\n    }\n  }\n}</code></pre>\n\nWhat advanced MERN patterns and potential issues are demonstrated here?",
        options: ["Missing distributed transaction management, potential data inconsistency", "Proper service separation with clear responsibilities", "Efficient microservices communication", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated caching system for a high-traffic e-commerce platform. The system needs to handle product catalog, user sessions, and real-time inventory updates. You're experiencing cache invalidation issues and memory leaks. Here's the current implementation:\n\n<pre><code>// Cache Service\nclass CacheService {\n  constructor() {\n    this.cache = new Map();\n    this.ttl = new Map();\n  }\n  \n  set(key, value, ttlSeconds = 3600) {\n    this.cache.set(key, value);\n    this.ttl.set(key, Date.now() + (ttlSeconds * 1000));\n  }\n  \n  get(key) {\n    if (this.ttl.get(key) &lt; Date.now()) {\n      this.cache.delete(key);\n      this.ttl.delete(key);\n      return null;\n    }\n    return this.cache.get(key);\n  }\n  \n  invalidate(pattern) {\n    for (const key of this.cache.keys()) {\n      if (key.includes(pattern)) {\n        this.cache.delete(key);\n        this.ttl.delete(key);\n      }\n    }\n  }\n}</code></pre>\n\nWhat performance and memory management issues exist in this implementation?",
        options: ["Memory leaks from uncleaned TTL entries, inefficient pattern matching", "Proper TTL implementation with automatic cleanup", "Efficient cache invalidation strategy", "No issues - optimal caching implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a complex real-time collaboration system for a document editing app. Multiple users need to edit documents simultaneously with conflict resolution. You're experiencing data conflicts and performance issues. Here's the current implementation:\n\n<pre><code>// Real-time Collaboration Service\nclass CollaborationService {\n  constructor() {\n    this.activeSessions = new Map();\n    this.documentVersions = new Map();\n  }\n  \n  joinDocument(userId, documentId) {\n    const session = {\n      userId,\n      documentId,\n      lastSeen: Date.now(),\n      cursor: { line: 0, column: 0 }\n    };\n    \n    this.activeSessions.set(userId, session);\n    \n    // Send current document state\n    const document = this.documentVersions.get(documentId);\n    return document || this.loadDocument(documentId);\n  }\n  \n  handleEdit(userId, documentId, edit) {\n    const document = this.documentVersions.get(documentId);\n    if (!document) return;\n    \n    // Apply edit directly\n    document.content = this.applyEdit(document.content, edit);\n    document.version++;\n    \n    // Broadcast to all users\n    this.broadcastEdit(documentId, edit, userId);\n  }\n  \n  broadcastEdit(documentId, edit, excludeUserId) {\n    // Broadcast logic\n  }\n}</code></pre>\n\nWhat sophisticated MERN patterns and potential issues are demonstrated here?",
        options: ["Missing conflict resolution, potential data corruption in concurrent edits", "Proper real-time collaboration with version control", "Efficient broadcasting mechanism", "No issues - optimal collaboration implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated search and recommendation engine for a content platform. The system needs to handle complex queries, user behavior tracking, and personalized recommendations. You're experiencing slow query performance and inaccurate recommendations. Here's the current implementation:\n\n<pre><code>// Search and Recommendation Service\nclass SearchService {\n  async searchContent(query, userId) {\n    try {\n      // Get user preferences\n      const userPrefs = await UserPreferences.findById(userId);\n      \n      // Search content\n      const results = await Content.find({\n        $text: { $search: query },\n        category: { $in: userPrefs.preferredCategories }\n      }).sort({ score: { $meta: 'textScore' } });\n      \n      // Get user's viewing history\n      const history = await ViewHistory.find({ userId })\n        .sort({ timestamp: -1 })\n        .limit(100);\n      \n      // Calculate personalized scores\n      const personalizedResults = results.map(content => ({\n        ...content,\n        personalizedScore: this.calculatePersonalizedScore(content, history)\n      }));\n      \n      return personalizedResults.sort((a, b) => \n        b.personalizedScore - a.personalizedScore\n      );\n    } catch (error) {\n      throw error;\n    }\n  }\n  \n  calculatePersonalizedScore(content, history) {\n    // Complex scoring algorithm\n  }\n}</code></pre>\n\nWhat performance and scalability issues exist in this implementation?",
        options: ["Inefficient database queries, missing caching, no pagination", "Proper personalization with user preferences", "Efficient search with text indexing", "No issues - optimal search implementation"],
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
