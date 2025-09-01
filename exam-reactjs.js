// React.js Programming Exam Questions - B2-C1 Level
const reactjsQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a user profile page for an e-commerce app. A user reports that when they quickly navigate between different user profiles, they sometimes see the wrong user's data. Here's the current implementation:\n\n<pre><code>function UserProfile({ userId }) {\n    const [profile, setProfile] = useState(null);\n    const [loading, setLoading] = useState(true);\n    \n    useEffect(() =&gt; {\n        setLoading(true);\n        fetchUserProfile(userId)\n            .then(data =&gt; {\n                setProfile(data);\n                setLoading(false);\n            })\n            .catch(() =&gt; setLoading(false));\n    }, [userId]);\n    \n    if (loading) return &lt;Spinner /&gt;;\n    if (!profile) return &lt;Error /&gt;;\n    \n    return &lt;ProfileView data={profile} /&gt;;\n}</code></pre>\n\nWhat's causing the race condition and how would you fix it?",
        options: ["Race condition - API responses arrive out of order", "Missing error handling for failed requests", "Component doesn't handle loading states properly", "No issues - implementation is correct"],
        correct: 0,
        level: "basic"
    },
    {
        question: "You're working on a product catalog page that displays 1000+ products. Users complain that the page is slow and freezes when they interact with it. Here's the current implementation:\n\n<pre><code>const ProductList = ({ products, onProductClick }) =&gt; {\n    const processedProducts = products.map(product =&gt; ({\n        ...product,\n        discountedPrice: calculateDiscount(product.price, product.discount),\n        formattedPrice: formatCurrency(product.price)\n    }));\n    \n    const handleClick = (productId) =&gt; {\n        onProductClick(productId);\n    };\n    \n    return (\n        &lt;div&gt;\n            {processedProducts.map(product =&gt; (\n                &lt;ProductCard \n                    key={product.id} \n                    product={product} \n                    onClick={() =&gt; handleClick(product.id)} \n                /&gt;\n            ))}\n        &lt;/div&gt;\n    );\n};</code></pre>\n\nWhat's causing the performance issue and what's the best optimization?",
        options: ["Expensive calculations run on every render", "Too many re-renders from inline functions", "Missing React.memo for child components", "All of the above"],
        correct: 1,
        level: "basic"
    },
    {
        question: "You're building a search feature for a travel booking app. Users can search for flights, and when they type quickly, multiple API requests are sent. Sometimes users see results from an older search instead of their latest search. Here's the current implementation:\n\n<pre><code>function FlightSearch({ searchQuery }) {\n    const [flights, setFlights] = useState([]);\n    const [loading, setLoading] = useState(false);\n    \n    useEffect(() =&gt; {\n        if (searchQuery) {\n            setLoading(true);\n            fetchFlights(searchQuery)\n                .then(results =&gt; {\n                    setFlights(results);\n                    setLoading(false);\n                })\n                .catch(() =&gt; setLoading(false));\n        }\n    }, [searchQuery]);\n    \n    return (\n        &lt;div&gt;\n            {loading ? &lt;Spinner /&gt; : &lt;FlightList flights={flights} /&gt;}\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's the problem and how would you fix it?",
        options: ["Race condition - need AbortController to cancel old requests", "Missing debouncing for search input", "No error handling for failed API calls", "All of the above"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a shopping cart for an online store. Users report that when they remove items from their cart, the total price sometimes shows incorrect amounts. Here's the current implementation:\n\n<pre><code>function ShoppingCart() {\n    const [items, setItems] = useState([]);\n    const [total, setTotal] = useState(0);\n    \n    const addItem = useCallback((item) =&gt; {\n        setItems(prev =&gt; [...prev, item]);\n        setTotal(prev =&gt; prev + item.price);\n    }, []);\n    \n    const removeItem = useCallback((id) =&gt; {\n        setItems(prev =&gt; prev.filter(item =&gt; item.id !== id));\n        setTotal(prev =&gt; {\n            const item = items.find(i =&gt; i.id === id);\n            return prev - (item ? item.price : 0);\n        });\n    }, [items]);\n    \n    return (\n        &lt;div&gt;\n            &lt;CartItems items={items} onRemove={removeItem} /&gt;\n            &lt;Total amount={total} /&gt;\n            &lt;AddItemForm onAdd={addItem} /&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the incorrect total calculation?",
        options: ["State synchronization problem between items and total", "Missing error boundaries", "Inefficient re-renders", "No issues - proper state management"],
        correct: 0,
        level: "middle"
    },
    {
        question: "You're building a form validation hook for a user registration form. The hook should validate email format, password strength, and username availability. However, you're experiencing infinite re-renders. Here's the current implementation:\n\n<pre><code>function useFormValidation(initialValue) {\n    const [value, setValue] = useState(initialValue);\n    const [isValid, setIsValid] = useState(true);\n    \n    const validate = useCallback((newValue) =&gt; {\n        const valid = newValue.length &gt;= 3;\n        setIsValid(valid);\n        return valid;\n    }, []);\n    \n    const updateValue = useCallback((newValue) =&gt; {\n        setValue(newValue);\n        validate(newValue);\n    }, [validate]);\n    \n    return { value, isValid, updateValue };\n}</code></pre>\n\nWhat's causing the infinite re-render loop?",
        options: ["Circular dependency between validate and updateValue", "Missing dependency in useEffect", "Unnecessary useCallback usage", "No issues - proper hook implementation"],
        correct: 0,
        level: "middle"
    },
    {
        question: "You're building a product filtering system for an e-commerce site. Users can filter by category, price range, brand, and ratings. The page becomes very slow when users apply multiple filters quickly. Here's the current implementation:\n\n<pre><code>function ProductList({ products, filters }) {\n    const [filteredProducts, setFilteredProducts] = useState([]);\n    \n    useEffect(() =&gt; {\n        const filtered = products.filter(product =&gt; {\n            return filters.category ? product.category === filters.category : true;\n        }).filter(product =&gt; {\n            return filters.price ? product.price &lt;= filters.price : true;\n        }).filter(product =&gt; {\n            return filters.brand ? product.brand === filters.brand : true;\n        });\n        \n        setFilteredProducts(filtered);\n    }, [products, filters]);\n    \n    return (\n        &lt;div&gt;\n            {filteredProducts.map(product =&gt; (\n                &lt;ProductCard key={product.id} product={product} /&gt;\n            ))}\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat's causing the performance issues?",
        options: ["Unnecessary state for filtered results", "Missing React.memo optimization", "Inefficient filtering on every render", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "Consider this sophisticated React code:\n\n<pre><code>function useAdvancedState(initialState, reducer) {\n    const [state, dispatch] = useReducer(reducer, initialState);\n    const [history, setHistory] = useState([initialState]);\n    const [historyIndex, setHistoryIndex] = useState(0);\n    \n    const enhancedDispatch = useCallback((action) =&gt; {\n        const newState = reducer(state, action);\n        \n        setHistory(prev =&gt; {\n            const newHistory = prev.slice(0, historyIndex + 1);\n            newHistory.push(newState);\n            return newHistory;\n        });\n        \n        setHistoryIndex(prev =&gt; prev + 1);\n        dispatch(action);\n    }, [state, historyIndex, reducer]);\n    \n    const undo = useCallback(() =&gt; {\n        if (historyIndex &gt; 0) {\n            setHistoryIndex(prev =&gt; prev - 1);\n            dispatch({ type: 'RESTORE', payload: history[historyIndex - 1] });\n        }\n    }, [history, historyIndex]);\n    \n    const redo = useCallback(() =&gt; {\n        if (historyIndex &lt; history.length - 1) {\n            setHistoryIndex(prev =&gt; prev + 1);\n            dispatch({ type: 'RESTORE', payload: history[historyIndex + 1] });\n        }\n    }, [history, historyIndex]);\n    \n    return { state, dispatch: enhancedDispatch, undo, redo, canUndo: historyIndex &gt; 0, canRedo: historyIndex &lt; history.length - 1 };\n}</code></pre>\n\nWhat advanced React patterns and potential issues are demonstrated here?",
        options: ["Custom hook with undo/redo functionality, potential memory leaks from history array", "State machine pattern with proper cleanup", "Advanced state management with optimization", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Analyze this complex React code:\n\n<pre><code>function VirtualizedList({ items, itemHeight, containerHeight }) {\n    const [scrollTop, setScrollTop] = useState(0);\n    const containerRef = useRef(null);\n    \n    const visibleItemCount = Math.ceil(containerHeight / itemHeight);\n    const startIndex = Math.floor(scrollTop / itemHeight);\n    const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);\n    \n    const visibleItems = items.slice(startIndex, endIndex);\n    const totalHeight = items.length * itemHeight;\n    const offsetY = startIndex * itemHeight;\n    \n    const handleScroll = useCallback((e) =&gt; {\n        setScrollTop(e.target.scrollTop);\n    }, []);\n    \n    useEffect(() =&gt; {\n        const container = containerRef.current;\n        if (container) {\n            container.addEventListener('scroll', handleScroll);\n            return () =&gt; container.removeEventListener('scroll', handleScroll);\n        }\n    }, [handleScroll]);\n    \n    return (\n        &lt;div ref={containerRef} style={{ height: containerHeight, overflow: 'auto' }}&gt;\n            &lt;div style={{ height: totalHeight, position: 'relative' }}&gt;\n                &lt;div style={{ transform: `translateY(${offsetY}px)` }}&gt;\n                    {visibleItems.map((item, index) =&gt; (\n                        &lt;div key={startIndex + index} style={{ height: itemHeight }}&gt;\n                            {item.content}\n                        &lt;/div&gt;\n                    ))}\n                &lt;/div&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n\nWhat sophisticated React patterns and potential issues are demonstrated?",
        options: ["Virtual scrolling implementation with proper event handling and cleanup", "Performance optimization with DOM manipulation", "Advanced list rendering with scroll management", "All of the above with potential memory leaks"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "Examine this advanced React code:\n\n<pre><code>function useConcurrentFeatures() {\n    const [data, setData] = useState(null);\n    const [isPending, startTransition] = useTransition();\n    const [deferredData, setDeferredData] = useDeferredValue(data);\n    \n    const fetchData = useCallback(async (url) =&gt; {\n        startTransition(() =&gt; {\n            setData(null);\n        });\n        \n        try {\n            const response = await fetch(url);\n            const result = await response.json();\n            \n            startTransition(() =&gt; {\n                setData(result);\n            });\n        } catch (error) {\n            startTransition(() =&gt; {\n                setData({ error: error.message });\n            });\n        }\n    }, []);\n    \n    const processData = useCallback((rawData) =&gt; {\n        if (!rawData || rawData.error) return null;\n        \n        return rawData.map(item =&gt; ({\n            ...item,\n            processed: heavyProcessing(item)\n        }));\n    }, []);\n    \n    return {\n        data: deferredData,\n        isPending,\n        fetchData,\n        processedData: processData(deferredData)\n    };\n}</code></pre>\n\nWhat performance and concurrency issues exist in this hook implementation?",
        options: ["Potential race conditions with concurrent updates, memory leaks from unprocessed data", "Proper use of React 18 concurrent features", "Efficient data processing with deferred values", "No issues - optimal concurrent implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this sophisticated React code:\n\n<pre><code>function AdvancedForm({ initialData, onSubmit, validationSchema }) {\n    const [formData, setFormData] = useState(initialData);\n    const [errors, setErrors] = useState({});\n    const [touched, setTouched] = useState({});\n    const [isSubmitting, setIsSubmitting] = useState(false);\n    \n    const validateField = useCallback((name, value) =&gt; {\n        try {\n            validationSchema.validateAt(name, { [name]: value });\n            return null;\n        } catch (error) {\n            return error.message;\n        }\n    }, [validationSchema]);\n    \n    const handleChange = useCallback((name, value) =&gt; {\n        setFormData(prev =&gt; ({ ...prev, [name]: value }));\n        \n        if (touched[name]) {\n            const error = validateField(name, value);\n            setErrors(prev =&gt; ({ ...prev, [name]: error }));\n        }\n    }, [touched, validateField]);\n    \n    const handleBlur = useCallback((name) =&gt; {\n        setTouched(prev =&gt; ({ ...prev, [name]: true }));\n        const error = validateField(name, formData[name]);\n        setErrors(prev =&gt; ({ ...prev, [name]: error }));\n    }, [formData, validateField]);\n    \n    const handleSubmit = useCallback(async (e) =&gt; {\n        e.preventDefault();\n        \n        try {\n            await validationSchema.validate(formData);\n            setIsSubmitting(true);\n            await onSubmit(formData);\n        } catch (error) {\n            if (error.inner) {\n                const newErrors = {};\n                error.inner.forEach(err =&gt; {\n                    newErrors[err.path] = err.message;\n                });\n                setErrors(newErrors);\n            }\n        } finally {\n            setIsSubmitting(false);\n        }\n    }, [formData, validationSchema, onSubmit]);\n    \n    return (\n        &lt;form onSubmit={handleSubmit}&gt;\n            {/* Form fields with validation */}\n        &lt;/form&gt;\n    );\n}</code></pre>\n\nWhat advanced React patterns and potential issues are demonstrated here?",
        options: ["Form validation with schema validation, potential performance issues from frequent validation", "Advanced form handling with proper error management", "Efficient form state management", "No issues - sophisticated form implementation"],
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
