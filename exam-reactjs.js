// React.js Programming Exam Questions - B2-C1 Level
const reactjsQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "Consider this React code:\n```jsx\nfunction UserProfile({ user }) {\n    const [profile, setProfile] = useState(null);\n    const [loading, setLoading] = useState(true);\n    \n    useEffect(() => {\n        if (user?.id) {\n            fetchUserProfile(user.id)\n                .then(data => {\n                    setProfile(data);\n                    setLoading(false);\n                })\n                .catch(() => setLoading(false));\n        }\n    }, [user?.id]);\n    \n    if (loading) return <Spinner />;\n    if (!profile) return <Error />;\n    \n    return <ProfileView data={profile} />;\n}\n```\nWhat potential issue exists in this component and how would you fix it?",
        options: ["Memory leak from unmounted component updates", "Missing dependency array optimization", "Race condition from multiple API calls", "No issues - component is properly implemented"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Analyze this React code:\n```jsx\nconst ExpensiveComponent = React.memo(({ data, onUpdate }) => {\n    const processedData = useMemo(() => {\n        return data.map(item => ({\n            ...item,\n            computed: heavyComputation(item.value)\n        }));\n    }, [data]);\n    \n    const handleClick = useCallback((id) => {\n        onUpdate(id);\n    }, [onUpdate]);\n    \n    return (\n        <div>\n            {processedData.map(item => (\n                <Item key={item.id} data={item} onClick={handleClick} />\n            ))}\n        </div>\n    );\n});\n```\nWhat performance optimization issue exists here?",
        options: ["useMemo dependency array is missing", "useCallback is unnecessary for simple functions", "React.memo is redundant with useMemo", "Missing key prop optimization"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Examine this React code:\n```jsx\nfunction DataFetcher({ url, children }) {\n    const [data, setData] = useState(null);\n    const [error, setError] = useState(null);\n    \n    useEffect(() => {\n        const controller = new AbortController();\n        \n        fetch(url, { signal: controller.signal })\n            .then(res => res.json())\n            .then(setData)\n            .catch(setError);\n        \n        return () => controller.abort();\n    }, [url]);\n    \n    if (error) return <ErrorDisplay error={error} />;\n    if (!data) return <Loading />;\n    \n    return children(data);\n}\n```\nWhat is the purpose of the AbortController and when is it crucial?",
        options: ["Prevents memory leaks from unmounted components", "Optimizes network requests", "Handles authentication errors", "Manages component state"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "Consider this React code:\n```jsx\nfunction ShoppingCart() {\n    const [items, setItems] = useState([]);\n    const [total, setTotal] = useState(0);\n    \n    const addItem = useCallback((item) => {\n        setItems(prev => [...prev, item]);\n        setTotal(prev => prev + item.price);\n    }, []);\n    \n    const removeItem = useCallback((id) => {\n        setItems(prev => prev.filter(item => item.id !== id));\n        setTotal(prev => {\n            const item = items.find(i => i.id === id);\n            return prev - (item ? item.price : 0);\n        });\n    }, [items]);\n    \n    return (\n        <div>\n            <CartItems items={items} onRemove={removeItem} />\n            <Total amount={total} />\n            <AddItemForm onAdd={addItem} />\n        </div>\n    );\n}\n```\nWhat state management issue exists in this component?",
        options: ["State synchronization problem between items and total", "Missing error boundaries", "Inefficient re-renders", "No issues - proper state management"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Analyze this React code:\n```jsx\nfunction useCustomHook(initialValue) {\n    const [value, setValue] = useState(initialValue);\n    const [isValid, setIsValid] = useState(true);\n    \n    const validate = useCallback((newValue) => {\n        const valid = newValue.length >= 3;\n        setIsValid(valid);\n        return valid;\n    }, []);\n    \n    const updateValue = useCallback((newValue) => {\n        setValue(newValue);\n        validate(newValue);\n    }, [validate]);\n    \n    return { value, isValid, updateValue };\n}\n```\nWhat is the issue with this custom hook's dependency management?",
        options: ["Circular dependency between validate and updateValue", "Missing dependency in useEffect", "Unnecessary useCallback usage", "No issues - proper hook implementation"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Examine this React code:\n```jsx\nfunction ProductList({ products, filters }) {\n    const [filteredProducts, setFilteredProducts] = useState([]);\n    \n    useEffect(() => {\n        const filtered = products.filter(product => {\n            return filters.category ? product.category === filters.category : true;\n        }).filter(product => {\n            return filters.price ? product.price <= filters.price : true;\n        });\n        \n        setFilteredProducts(filtered);\n    }, [products, filters]);\n    \n    return (\n        <div>\n            {filteredProducts.map(product => (\n                <ProductCard key={product.id} product={product} />\n            ))}\n        </div>\n    );\n}\n```\nWhat performance issue exists in this component?",
        options: ["Unnecessary state for filtered results", "Missing React.memo optimization", "Inefficient filtering on every render", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "Consider this sophisticated React code:\n```jsx\nfunction useAdvancedState(initialState, reducer) {\n    const [state, dispatch] = useReducer(reducer, initialState);\n    const [history, setHistory] = useState([initialState]);\n    const [historyIndex, setHistoryIndex] = useState(0);\n    \n    const enhancedDispatch = useCallback((action) => {\n        const newState = reducer(state, action);\n        \n        setHistory(prev => {\n            const newHistory = prev.slice(0, historyIndex + 1);\n            newHistory.push(newState);\n            return newHistory;\n        });\n        \n        setHistoryIndex(prev => prev + 1);\n        dispatch(action);\n    }, [state, historyIndex, reducer]);\n    \n    const undo = useCallback(() => {\n        if (historyIndex > 0) {\n            setHistoryIndex(prev => prev - 1);\n            dispatch({ type: 'RESTORE', payload: history[historyIndex - 1] });\n        }\n    }, [history, historyIndex]);\n    \n    const redo = useCallback(() => {\n        if (historyIndex < history.length - 1) {\n            setHistoryIndex(prev => prev + 1);\n            dispatch({ type: 'RESTORE', payload: history[historyIndex + 1] });\n        }\n    }, [history, historyIndex]);\n    \n    return { state, dispatch: enhancedDispatch, undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };\n}\n```\nWhat advanced React patterns and potential issues are demonstrated here?",
        options: ["Custom hook with undo/redo functionality, potential memory leaks from history array", "State machine pattern with proper cleanup", "Advanced state management with optimization", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Analyze this complex React code:\n```jsx\nfunction VirtualizedList({ items, itemHeight, containerHeight }) {\n    const [scrollTop, setScrollTop] = useState(0);\n    const containerRef = useRef(null);\n    \n    const visibleItemCount = Math.ceil(containerHeight / itemHeight);\n    const startIndex = Math.floor(scrollTop / itemHeight);\n    const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);\n    \n    const visibleItems = items.slice(startIndex, endIndex);\n    const totalHeight = items.length * itemHeight;\n    const offsetY = startIndex * itemHeight;\n    \n    const handleScroll = useCallback((e) => {\n        setScrollTop(e.target.scrollTop);\n    }, []);\n    \n    useEffect(() => {\n        const container = containerRef.current;\n        if (container) {\n            container.addEventListener('scroll', handleScroll);\n            return () => container.removeEventListener('scroll', handleScroll);\n        }\n    }, [handleScroll]);\n    \n    return (\n        <div ref={containerRef} style={{ height: containerHeight, overflow: 'auto' }}>\n            <div style={{ height: totalHeight, position: 'relative' }}>\n                <div style={{ transform: `translateY(${offsetY}px)` }}>\n                    {visibleItems.map((item, index) => (\n                        <div key={startIndex + index} style={{ height: itemHeight }}>\n                            {item.content}\n                        </div>\n                    ))}\n                </div>\n            </div>\n        </div>\n    );\n}\n```\nWhat sophisticated React patterns and potential issues are demonstrated?",
        options: ["Virtual scrolling implementation with proper event handling and cleanup", "Performance optimization with DOM manipulation", "Advanced list rendering with scroll management", "All of the above with potential memory leaks"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "Examine this advanced React code:\n```jsx\nfunction useConcurrentFeatures() {\n    const [data, setData] = useState(null);\n    const [isPending, startTransition] = useTransition();\n    const [deferredData, setDeferredData] = useDeferredValue(data);\n    \n    const fetchData = useCallback(async (url) => {\n        startTransition(() => {\n            setData(null);\n        });\n        \n        try {\n            const response = await fetch(url);\n            const result = await response.json();\n            \n            startTransition(() => {\n                setData(result);\n            });\n        } catch (error) {\n            startTransition(() => {\n                setData({ error: error.message });\n            });\n        }\n    }, []);\n    \n    const processData = useCallback((rawData) => {\n        if (!rawData || rawData.error) return null;\n        \n        return rawData.map(item => ({\n            ...item,\n            processed: heavyProcessing(item)\n        }));\n    }, []);\n    \n    return {\n        data: deferredData,\n        isPending,\n        fetchData,\n        processedData: processData(deferredData)\n    };\n}\n```\nWhat performance and concurrency issues exist in this hook implementation?",
        options: ["Potential race conditions with concurrent updates, memory leaks from unprocessed data", "Proper use of React 18 concurrent features", "Efficient data processing with deferred values", "No issues - optimal concurrent implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this sophisticated React code:\n```jsx\nfunction AdvancedForm({ initialData, onSubmit, validationSchema }) {\n    const [formData, setFormData] = useState(initialData);\n    const [errors, setErrors] = useState({});\n    const [touched, setTouched] = useState({});\n    const [isSubmitting, setIsSubmitting] = useState(false);\n    \n    const validateField = useCallback((name, value) => {\n        try {\n            validationSchema.validateAt(name, { [name]: value });\n            return null;\n        } catch (error) {\n            return error.message;\n        }\n    }, [validationSchema]);\n    \n    const handleChange = useCallback((name, value) => {\n        setFormData(prev => ({ ...prev, [name]: value }));\n        \n        if (touched[name]) {\n            const error = validateField(name, value);\n            setErrors(prev => ({ ...prev, [name]: error }));\n        }\n    }, [touched, validateField]);\n    \n    const handleBlur = useCallback((name) => {\n        setTouched(prev => ({ ...prev, [name]: true }));\n        const error = validateField(name, formData[name]);\n        setErrors(prev => ({ ...prev, [name]: error }));\n    }, [formData, validateField]);\n    \n    const handleSubmit = useCallback(async (e) => {\n        e.preventDefault();\n        \n        try {\n            await validationSchema.validate(formData);\n            setIsSubmitting(true);\n            await onSubmit(formData);\n        } catch (error) {\n            if (error.inner) {\n                const newErrors = {};\n                error.inner.forEach(err => {\n                    newErrors[err.path] = err.message;\n                });\n                setErrors(newErrors);\n            }\n        } finally {\n            setIsSubmitting(false);\n        }\n    }, [formData, validationSchema, onSubmit]);\n    \n    return (\n        <form onSubmit={handleSubmit}>\n            {/* Form fields with validation */}\n        </form>\n    );\n}\n```\nWhat advanced React patterns and potential issues are demonstrated here?",
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
