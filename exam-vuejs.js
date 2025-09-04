// Vue.js Programming Exam Questions - B2-C1 Level
const vuejsQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a shopping cart component for an e-commerce application. Users report that when they add items quickly, the cart sometimes shows incorrect quantities or duplicates. Here's the current implementation:\n\n<pre><code>&lt;template&gt;\n  &lt;div&gt;\n    &lt;div v-for=\"item in cartItems\" :key=\"item.id\"&gt;\n      {{ item.name }} - Quantity: {{ item.quantity }}\n    &lt;/div&gt;\n    &lt;button @click=\"addItem\"&gt;Add Item&lt;/button&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\nexport default {\n  data() {\n    return {\n      cartItems: []\n    }\n  },\n  methods: {\n    addItem() {\n      const newItem = { id: Date.now(), name: 'Product', quantity: 1 }\n      this.cartItems.push(newItem)\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat's causing the cart synchronization issues?",
        options: ["Race condition in concurrent item additions", "Missing reactivity for nested object properties", "No proper key management for list items", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a user authentication system for a Vue.js application. Users report that they sometimes get logged out unexpectedly and see other users' data. Here's the current implementation:\n\n<pre><code>&lt;script&gt;\nexport default {\n  data() {\n    return {\n      user: null,\n      isAuthenticated: false\n    }\n  },\n  methods: {\n    async login(credentials) {\n      try {\n        const response = await fetch('/api/login', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify(credentials)\n        })\n        const data = await response.json()\n        this.user = data.user\n        this.isAuthenticated = true\n        localStorage.setItem('token', data.token)\n      } catch (error) {\n        console.error('Login failed:', error)\n      }\n    },\n    \n    async getUserProfile() {\n      const token = localStorage.getItem('token')\n      const response = await fetch('/api/profile', {\n        headers: { 'Authorization': `Bearer ${token}` }\n      })\n      const user = await response.json()\n      this.user = user\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat's causing the authentication and data isolation issues?",
        options: ["No token validation and expiration handling", "Missing user context management", "No proper session management", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a file upload component for a document management system. Users report that large files fail to upload and sometimes the upload process gets stuck. Here's the current implementation:\n\n<pre><code>&lt;template&gt;\n  &lt;div&gt;\n    &lt;input type=\"file\" @change=\"handleFileUpload\" ref=\"fileInput\"&gt;\n    &lt;div v-if=\"uploading\"&gt;Uploading...&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\nexport default {\n  data() {\n    return {\n      uploading: false\n    }\n  },\n  methods: {\n    async handleFileUpload(event) {\n      const file = event.target.files[0]\n      if (!file) return\n      \n      this.uploading = true\n      const formData = new FormData()\n      formData.append('file', file)\n      \n      try {\n        const response = await fetch('/api/upload', {\n          method: 'POST',\n          body: formData\n        })\n        const result = await response.json()\n        console.log('Upload successful:', result)\n      } catch (error) {\n        console.error('Upload failed:', error)\n      } finally {\n        this.uploading = false\n      }\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat's causing the file upload issues?",
        options: ["No file size limits and timeout handling", "Missing progress tracking and chunked upload", "No proper error handling and validation", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a real-time chat application using Vue.js with WebSocket connections. The system needs to handle message broadcasting, user presence tracking, and connection management. You're experiencing connection drops and message delivery failures. Here's the current implementation:\n\n<pre><code>&lt;script&gt;\nexport default {\n  data() {\n    return {\n      messages: [],\n      socket: null,\n      isConnected: false,\n      currentUser: null\n    }\n  },\n  mounted() {\n    this.connectWebSocket()\n  },\n  methods: {\n    connectWebSocket() {\n      this.socket = new WebSocket('ws://localhost:8080/chat')\n      \n      this.socket.onopen = () => {\n        this.isConnected = true\n      }\n      \n      this.socket.onmessage = (event) => {\n        const message = JSON.parse(event.data)\n        this.messages.push(message)\n      }\n      \n      this.socket.onclose = () => {\n        this.isConnected = false\n      }\n    },\n    \n    sendMessage(text) {\n      if (this.isConnected) {\n        this.socket.send(JSON.stringify({\n          text,\n          user: this.currentUser,\n          timestamp: Date.now()\n        }))\n      }\n    }\n  },\n  beforeDestroy() {\n    if (this.socket) {\n      this.socket.close()\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat's causing the connection and message delivery issues?",
        options: ["No connection health monitoring and reconnection logic", "Missing message queuing and retry mechanisms", "No proper session management and cleanup", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a data table component with sorting, filtering, and pagination for a large dataset. Users report that the table becomes slow and unresponsive when dealing with thousands of rows. Here's the current implementation:\n\n<pre><code>&lt;template&gt;\n  &lt;div&gt;\n    &lt;input v-model=\"searchTerm\" placeholder=\"Search...\"&gt;\n    &lt;table&gt;\n      &lt;thead&gt;\n        &lt;tr&gt;\n          &lt;th @click=\"sort('name')\"&gt;Name&lt;/th&gt;\n          &lt;th @click=\"sort('email')\"&gt;Email&lt;/th&gt;\n        &lt;/tr&gt;\n      &lt;/thead&gt;\n      &lt;tbody&gt;\n        &lt;tr v-for=\"user in filteredUsers\" :key=\"user.id\"&gt;\n          &lt;td&gt;{{ user.name }}&lt;/td&gt;\n          &lt;td&gt;{{ user.email }}&lt;/td&gt;\n        &lt;/tr&gt;\n      &lt;/tbody&gt;\n    &lt;/table&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\nexport default {\n  data() {\n    return {\n      users: [],\n      searchTerm: '',\n      sortField: 'name',\n      sortOrder: 'asc'\n    }\n  },\n  computed: {\n    filteredUsers() {\n      return this.users\n        .filter(user =&gt; user.name.toLowerCase().includes(this.searchTerm.toLowerCase()))\n        .sort((a, b) =&gt; {\n          if (this.sortOrder === 'asc') {\n            return a[this.sortField] &gt; b[this.sortField] ? 1 : -1\n          } else {\n            return a[this.sortField] &lt; b[this.sortField] ? 1 : -1\n          }\n        })\n    }\n  },\n  methods: {\n    sort(field) {\n      if (this.sortField === field) {\n        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'\n      } else {\n        this.sortField = field\n        this.sortOrder = 'asc'\n      }\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat's causing the performance issues?",
        options: ["No virtualization for large datasets", "Inefficient filtering and sorting on every keystroke", "Missing pagination and lazy loading", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a form component with complex validation rules and dynamic fields. Users report that form submission sometimes fails silently and validation errors don't always appear correctly. Here's the current implementation:\n\n<pre><code>&lt;template&gt;\n  &lt;form @submit.prevent=\"submitForm\"&gt;\n    &lt;div v-for=\"field in formFields\" :key=\"field.name\"&gt;\n      &lt;input \n        v-model=\"formData[field.name]\"\n        :type=\"field.type\"\n        :placeholder=\"field.placeholder\"\n        @blur=\"validateField(field.name)\"\n      &gt;\n      &lt;div v-if=\"errors[field.name]\" class=\"error\"&gt;\n        {{ errors[field.name] }}\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;button type=\"submit\" :disabled=\"!isFormValid\"&gt;Submit&lt;/button&gt;\n  &lt;/form&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\nexport default {\n  data() {\n    return {\n      formData: {},\n      errors: {},\n      formFields: [\n        { name: 'email', type: 'email', placeholder: 'Email' },\n        { name: 'password', type: 'password', placeholder: 'Password' }\n      ]\n    }\n  },\n  computed: {\n    isFormValid() {\n      return Object.keys(this.errors).length === 0\n    }\n  },\n  methods: {\n    validateField(fieldName) {\n      const value = this.formData[fieldName]\n      if (!value) {\n        this.errors[fieldName] = 'This field is required'\n      } else {\n        delete this.errors[fieldName]\n      }\n    },\n    \n    async submitForm() {\n      // Validate all fields\n      this.formFields.forEach(field =&gt; {\n        this.validateField(field.name)\n      })\n      \n      if (this.isFormValid) {\n        try {\n          const response = await fetch('/api/submit', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(this.formData)\n          })\n          const result = await response.json()\n          console.log('Form submitted:', result)\n        } catch (error) {\n          console.error('Submission failed:', error)\n        }\n      }\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat's causing the form validation and submission issues?",
        options: ["Reactive validation not working properly", "Missing error handling for API failures", "No proper form state management", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a sophisticated state management system for a large Vue.js application using Vuex. The system needs to handle complex data flows, async operations, and real-time updates. You're experiencing performance bottlenecks and state synchronization issues. Here's the current implementation:\n\n<pre><code>// store/index.js\nconst store = new Vuex.Store({\n  state: {\n    users: [],\n    posts: [],\n    comments: [],\n    loading: false\n  },\n  mutations: {\n    SET_USERS(state, users) {\n      state.users = users\n    },\n    SET_POSTS(state, posts) {\n      state.posts = posts\n    },\n    SET_COMMENTS(state, comments) {\n      state.comments = comments\n    },\n    SET_LOADING(state, loading) {\n      state.loading = loading\n    }\n  },\n  actions: {\n    async fetchAllData({ commit }) {\n      commit('SET_LOADING', true)\n      try {\n        const [users, posts, comments] = await Promise.all([\n          fetch('/api/users').then(r =&gt; r.json()),\n          fetch('/api/posts').then(r =&gt; r.json()),\n          fetch('/api/comments').then(r =&gt; r.json())\n        ])\n        commit('SET_USERS', users)\n        commit('SET_POSTS', posts)\n        commit('SET_COMMENTS', comments)\n      } catch (error) {\n        console.error('Failed to fetch data:', error)\n      } finally {\n        commit('SET_LOADING', false)\n      }\n    }\n  },\n  getters: {\n    getUserPosts: (state) =&gt; (userId) =&gt; {\n      return state.posts.filter(post =&gt; post.userId === userId)\n    },\n    getPostComments: (state) =&gt; (postId) =&gt; {\n      return state.comments.filter(comment =&gt; comment.postId === postId)\n    }\n  }\n})</code></pre>\n\nWhat advanced Vue.js patterns and potential issues are demonstrated here?",
        options: ["Vuex state management with performance issues and memory leaks", "Proper separation of concerns with mutations and actions", "Efficient data fetching with Promise.all", "No issues - optimal state management implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated component architecture for a dashboard application using Vue.js with advanced patterns. The system needs to handle dynamic component loading, complex prop validation, and event communication. You're experiencing component lifecycle issues and memory leaks. Here's the current implementation:\n\n<pre><code>&lt;template&gt;\n  &lt;div&gt;\n    &lt;component \n      v-for=\"widget in widgets\" \n      :key=\"widget.id\"\n      :is=\"widget.component\"\n      :data=\"widget.data\"\n      @update=\"handleWidgetUpdate\"\n      @delete=\"handleWidgetDelete\"\n    &gt;&lt;/component&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\nexport default {\n  data() {\n    return {\n      widgets: [],\n      componentCache: new Map()\n    }\n  },\n  async mounted() {\n    await this.loadWidgets()\n    this.setupEventListeners()\n  },\n  methods: {\n    async loadWidgets() {\n      const widgets = await fetch('/api/widgets').then(r =&gt; r.json())\n      for (const widget of widgets) {\n        if (!this.componentCache.has(widget.component)) {\n          const component = await import(`@/components/${widget.component}.vue`)\n          this.componentCache.set(widget.component, component.default)\n        }\n        this.$options.components[widget.component] = this.componentCache.get(widget.component)\n      }\n      this.widgets = widgets\n    },\n    \n    setupEventListeners() {\n      window.addEventListener('resize', this.handleResize)\n      document.addEventListener('keydown', this.handleKeydown)\n    },\n    \n    handleWidgetUpdate(widgetId, data) {\n      const widget = this.widgets.find(w =&gt; w.id === widgetId)\n      if (widget) {\n        widget.data = { ...widget.data, ...data }\n      }\n    },\n    \n    handleWidgetDelete(widgetId) {\n      this.widgets = this.widgets.filter(w =&gt; w.id !== widgetId)\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat advanced Vue.js patterns and potential issues are demonstrated here?",
        options: ["Dynamic component loading with potential memory leaks and lifecycle issues", "Proper component architecture with event communication", "Efficient component caching and lazy loading", "No issues - sophisticated dashboard implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated performance monitoring system for a Vue.js application. The system needs to track component render times, memory usage, and user interactions. You're experiencing performance overhead and incomplete monitoring data. Here's the current implementation:\n\n<pre><code>// performance-monitor.js\nclass PerformanceMonitor {\n  constructor() {\n    this.metrics = {\n      renderTimes: new Map(),\n      memoryUsage: [],\n      userInteractions: []\n    }\n    this.observers = new Map()\n  }\n  \n  startMonitoring(component) {\n    const startTime = performance.now()\n    \n    // Monitor render time\n    this.$nextTick(() =&gt; {\n      const endTime = performance.now()\n      const renderTime = endTime - startTime\n      this.metrics.renderTimes.set(component.$options.name, renderTime)\n    })\n    \n    // Monitor memory usage\n    if (performance.memory) {\n      this.metrics.memoryUsage.push({\n        timestamp: Date.now(),\n        used: performance.memory.usedJSHeapSize,\n        total: performance.memory.totalJSHeapSize\n      })\n    }\n    \n    // Monitor user interactions\n    const observer = new MutationObserver((mutations) =&gt; {\n      mutations.forEach((mutation) =&gt; {\n        this.metrics.userInteractions.push({\n          type: mutation.type,\n          target: mutation.target.tagName,\n          timestamp: Date.now()\n        })\n      })\n    })\n    \n    observer.observe(component.$el, {\n      childList: true,\n      subtree: true,\n      attributes: true\n    })\n    \n    this.observers.set(component.$options.name, observer)\n  }\n  \n  stopMonitoring(component) {\n    const observer = this.observers.get(component.$options.name)\n    if (observer) {\n      observer.disconnect()\n      this.observers.delete(component.$options.name)\n    }\n  }\n  \n  getMetrics() {\n    return {\n      averageRenderTime: this.calculateAverageRenderTime(),\n      memoryTrend: this.calculateMemoryTrend(),\n      interactionCount: this.metrics.userInteractions.length\n    }\n  }\n}</code></pre>\n\nWhat performance and monitoring issues exist in this implementation?",
        options: ["Performance monitoring overhead affects application performance", "Missing proper cleanup and memory management", "Incomplete error tracking and data collection", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated data synchronization system for a Vue.js application with offline support. The system needs to handle conflict resolution, data versioning, and real-time synchronization. You're experiencing data inconsistencies and synchronization failures. Here's the current implementation:\n\n<pre><code>&lt;script&gt;\nexport default {\n  data() {\n    return {\n      localData: new Map(),\n      serverData: new Map(),\n      syncQueue: [],\n      isOnline: navigator.onLine,\n      lastSyncTime: null\n    }\n  },\n  \n  async mounted() {\n    await this.loadLocalData()\n    this.setupOnlineListener()\n    this.startSyncInterval()\n  },\n  \n  methods: {\n    async loadLocalData() {\n      const stored = localStorage.getItem('appData')\n      if (stored) {\n        this.localData = new Map(JSON.parse(stored))\n      }\n    },\n    \n    async saveLocalData() {\n      localStorage.setItem('appData', JSON.stringify([...this.localData]))\n    },\n    \n    async syncWithServer() {\n      if (!this.isOnline) return\n      \n      try {\n        // Send local changes to server\n        for (const [key, value] of this.syncQueue) {\n          await fetch(`/api/sync/${key}`, {\n            method: 'PUT',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(value)\n          })\n        }\n        \n        // Get server changes\n        const response = await fetch(`/api/sync?since=${this.lastSyncTime}`)\n        const serverChanges = await response.json()\n        \n        // Merge server changes\n        for (const [key, value] of Object.entries(serverChanges)) {\n          this.localData.set(key, value)\n        }\n        \n        this.syncQueue = []\n        this.lastSyncTime = Date.now()\n        await this.saveLocalData()\n        \n      } catch (error) {\n        console.error('Sync failed:', error)\n      }\n    },\n    \n    updateData(key, value) {\n      this.localData.set(key, value)\n      this.syncQueue.push([key, value])\n      this.saveLocalData()\n      \n      if (this.isOnline) {\n        this.syncWithServer()\n      }\n    },\n    \n    setupOnlineListener() {\n      window.addEventListener('online', () => {\n        this.isOnline = true\n        this.syncWithServer()\n      })\n      \n      window.addEventListener('offline', () => {\n        this.isOnline = false\n      })\n    },\n    \n    startSyncInterval() {\n      setInterval(() => {\n        if (this.isOnline) {\n          this.syncWithServer()\n        }\n      }, 30000) // Sync every 30 seconds\n    }\n  }\n}\n&lt;/script&gt;</code></pre>\n\nWhat sophisticated Vue.js patterns and potential issues are demonstrated here?",
        options: ["Offline-first data synchronization with potential conflict resolution issues", "Proper local storage management with real-time sync", "Efficient data versioning and conflict handling", "No issues - optimal synchronization implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(vuejsQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Vue.js exam
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
    
    vuejsQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / vuejsQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${vuejsQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === vuejsQuestions[index].correct) {
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
        totalQuestions: vuejsQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, vuejsQuestions, currentAnswers, timeLeft);
}
