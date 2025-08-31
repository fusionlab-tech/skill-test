// React Native Exam Questions
const reactNativeQuestions = [
    // Basic Questions (3) - Enhanced technical complexity
    {
        question: "What is the output of this React Native code?\n```javascript\nconst [count, setCount] = useState(0);\n\nuseEffect(() => {\n  setCount(count + 1);\n  setCount(count + 1);\n}, []);\n\nconsole.log(count);\n```",
        options: ["0", "1", "2", "Error"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Consider this component:\n```javascript\nconst MyComponent = ({ data }) => {\n  const [items, setItems] = useState(data);\n  \n  useEffect(() => {\n    setItems(data);\n  }, [data]);\n  \n  return <Text>{items.length}</Text>;\n};\n```\nWhat happens when the data prop changes?",
        options: ["Component re-renders with new data", "Component doesn't update", "Component crashes", "Component shows old data"],
        correct: 0,
        level: "basic"
    },
    {
        question: "What happens when you run this code?\n```javascript\ntry {\n  const result = JSON.parse('invalid json');\n  console.log(result);\n} catch (error) {\n  console.log(error.name);\n}\n```",
        options: ["SyntaxError", "TypeError", "ReferenceError", "No error"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - Enhanced complexity
    {
        question: "Consider this React Native navigation setup:\n```javascript\nconst Stack = createStackNavigator();\n\nfunction AppNavigator() {\n  return (\n    <Stack.Navigator>\n      <Stack.Screen name=\"Home\" component={HomeScreen} />\n      <Stack.Screen \n        name=\"Profile\" \n        component={ProfileScreen}\n        options={{\n          headerShown: false,\n          gestureEnabled: true\n        }}\n      />\n    </Stack.Navigator>\n  );\n}\n```\nWhat happens when navigating to the Profile screen?",
        options: ["The header is hidden and gestures are enabled", "The header is shown and gestures are disabled", "The screen transitions with animation", "The screen loads without navigation"],
        correct: 0,
        level: "middle"
    },
    {
        question: "In this React Native component:\n```javascript\nconst ImageGallery = ({ images }) => {\n  const [selectedIndex, setSelectedIndex] = useState(0);\n  \n  const renderItem = useCallback(({ item, index }) => (\n    <Image\n      source={{ uri: item.url }}\n      style={styles.image}\n      onLoad={() => console.log(`Image ${index} loaded`)}\n    />\n  ), []);\n  \n  return (\n    <FlatList\n      data={images}\n      renderItem={renderItem}\n      keyExtractor={item => item.id}\n      horizontal\n      pagingEnabled\n    />\n  );\n};\n```\nWhat is the purpose of useCallback here?",
        options: ["To optimize re-renders", "To prevent memory leaks", "To enable lazy loading", "To improve image quality"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Given this React Native performance optimization:\n```javascript\nconst ExpensiveList = React.memo(({ data, onItemPress }) => {\n  const getItemLayout = useCallback((data, index) => ({\n    length: ITEM_HEIGHT,\n    offset: ITEM_HEIGHT * index,\n    index,\n  }), []);\n  \n  return (\n    <FlatList\n      data={data}\n      getItemLayout={getItemLayout}\n      removeClippedSubviews={true}\n      maxToRenderPerBatch={10}\n      windowSize={5}\n    />\n  );\n});\n```\nWhat do these FlatList props accomplish?",
        options: ["Improve scrolling performance", "Reduce memory usage", "Enable virtualization", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - Enhanced complexity
    {
        question: "Consider this React Native bridge implementation:\n```javascript\nconst NativeModule = NativeModules.MyNativeModule;\n\nconst MyModule = {\n  async performHeavyTask(data) {\n    try {\n      const result = await NativeModule.heavyTask(data);\n      return result;\n    } catch (error) {\n      console.error('Native module error:', error);\n      throw error;\n    }\n  }\n};\n```\nWhat happens if the native module throws an exception?",
        options: ["The app crashes", "The exception is caught and logged", "The method returns null", "The app shows an error screen"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "In this React Native animation:\n```javascript\nconst AnimatedComponent = () => {\n  const animatedValue = useRef(new Animated.Value(0)).current;\n  \n  useEffect(() => {\n    const animation = Animated.loop(\n      Animated.sequence([\n        Animated.timing(animatedValue, {\n          toValue: 1,\n          duration: 1000,\n          useNativeDriver: true\n        }),\n        Animated.timing(animatedValue, {\n          toValue: 0,\n          duration: 1000,\n          useNativeDriver: true\n        })\n      ])\n    );\n    \n    animation.start();\n    return () => animation.stop();\n  }, []);\n  \n  return (\n    <Animated.View\n      style={[\n        styles.box,\n        {\n          opacity: animatedValue,\n          transform: [{\n            scale: animatedValue.interpolate({\n              inputRange: [0, 1],\n              outputRange: [0.5, 1]\n            })\n          }]\n        }\n      ]}\n    />\n  );\n};\n```\nWhat is the purpose of useNativeDriver: true?",
        options: ["To enable hardware acceleration", "To reduce JavaScript thread load", "To improve animation performance", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "Given this React Native deep linking setup:\n```javascript\nconst linking = {\n  prefixes: ['myapp://', 'https://myapp.com'],\n  config: {\n    screens: {\n      Home: 'home',\n      Profile: {\n        path: 'profile/:id',\n        parse: {\n          id: (id) => parseInt(id, 10)\n        }\n      },\n      Settings: 'settings'\n    }\n  },\n  async getInitialURL() {\n    return null;\n  }\n};\n```\nWhat happens when a user opens 'myapp://profile/123'?",
        options: ["The app opens to the Home screen", "The app navigates to Profile with id 123", "The app shows an error", "The app opens to Settings"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Consider this React Native error boundary:\n```javascript\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false, error: null };\n  }\n  \n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n  \n  componentDidCatch(error, errorInfo) {\n    logErrorToService(error, errorInfo);\n  }\n  \n  render() {\n    if (this.state.hasError) {\n      return <ErrorFallback error={this.state.error} />;\n    }\n    return this.props.children;\n  }\n}\n```\nWhat is the purpose of getDerivedStateFromError?",
        options: ["To log errors", "To update component state", "To prevent crashes", "To show error UI"],
        correct: 1,
        level: "advanced"
    }
];

let currentAnswers = new Array(reactNativeQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 100; // 100 seconds
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
    
    reactNativeQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / reactNativeQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${reactNativeQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === reactNativeQuestions[index].correct) {
            score++;
        }
    });
    return score;
}

function sendResults(score, percentage) {
    const candidateInfo = JSON.parse(localStorage.getItem('candidateInfo'));
    
    const emailBody = `
Candidate Information:
Name: ${candidateInfo.name}
Email: ${candidateInfo.email}
Address: ${candidateInfo.street}, ${candidateInfo.state}, ${candidateInfo.country}
Phone: ${candidateInfo.phone}
Skill Tested: React Native

Exam Results:
Score: ${score}/${reactNativeQuestions.length} (${percentage}%)
Time Remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}

Question Details:
${reactNativeQuestions.map((q, index) => {
    const userAnswer = currentAnswers[index];
    const isCorrect = userAnswer === q.correct;
    return `Q${index + 1} (${q.level}): ${isCorrect ? 'Correct' : 'Incorrect'} - User selected: ${userAnswer >= 0 ? q.options[userAnswer] : 'No answer'} | Correct: ${q.options[q.correct]}`;
}).join('\n')}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:nathanfielder0530@gmail.com?subject=React Native Skill Test Results - ${candidateInfo.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.open(mailtoLink);
}
