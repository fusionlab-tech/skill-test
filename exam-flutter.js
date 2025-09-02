// Flutter Programming Exam Questions - B2-C1 Level
const flutterQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're building a user profile screen for a social media app. Users report that when they navigate away and come back, their profile data disappears and shows loading again. Here's the current implementation:\n\n<pre><code>class UserProfileScreen extends StatefulWidget {\n  @override\n  _UserProfileScreenState createState() => _UserProfileScreenState();\n}\n\nclass _UserProfileScreenState extends State&lt;UserProfileScreen&gt; {\n  User? user;\n  bool isLoading = true;\n  \n  @override\n  void initState() {\n    super.initState();\n    _loadUserData();\n  }\n  \n  Future&lt;void&gt; _loadUserData() async {\n    setState(() => isLoading = true);\n    try {\n      final userData = await UserService.getUser();\n      setState(() {\n        user = userData;\n        isLoading = false;\n      });\n    } catch (e) {\n      setState(() => isLoading = false);\n    }\n  }\n  \n  @override\n  Widget build(BuildContext context) {\n    if (isLoading) return CircularProgressIndicator();\n    if (user == null) return Text('Error loading user');\n    return UserProfileWidget(user: user!);\n  }\n}</code></pre>\n\nWhat's causing the data to disappear and how would you fix it?",
        options: ["State is not preserved when navigating away", "Missing error handling for network failures", "UserService is not properly implemented", "No issues - implementation is correct"],
        correct: 0,
        level: "basic"
    },
    {
        question: "You're building a product list for an e-commerce app. The list displays 1000+ products and users complain about slow scrolling and app freezing. Here's the current implementation:\n\n<pre><code>class ProductListScreen extends StatelessWidget {\n  final List&lt;Product&gt; products;\n  \n  @override\n  Widget build(BuildContext context) {\n    return ListView.builder(\n      itemCount: products.length,\n      itemBuilder: (context, index) {\n        final product = products[index];\n        return ListTile(\n          title: Text(product.name),\n          subtitle: Text('\$${product.price.toStringAsFixed(2)}'),\n          trailing: IconButton(\n            icon: Icon(Icons.favorite),\n            onPressed: () => _toggleFavorite(product.id),\n          ),\n        );\n      },\n    );\n  }\n  \n  void _toggleFavorite(String productId) {\n    // Toggle favorite logic\n  }\n}</code></pre>\n\nWhat's causing the performance issues and what's the best optimization?",
        options: ["ListView.builder is inefficient for large lists", "Missing const constructors and widget optimization", "No lazy loading implementation", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're building a search feature for a travel booking app. When users type quickly, multiple API requests are sent and sometimes they see results from an older search. Here's the current implementation:\n\n<pre><code>class FlightSearchScreen extends StatefulWidget {\n  @override\n  _FlightSearchScreenState createState() => _FlightSearchScreenState();\n}\n\nclass _FlightSearchScreenState extends State&lt;FlightSearchScreen&gt; {\n  List&lt;Flight&gt; flights = [];\n  bool isLoading = false;\n  \n  void _onSearchChanged(String query) {\n    if (query.isNotEmpty) {\n      setState(() => isLoading = true);\n      _searchFlights(query);\n    }\n  }\n  \n  Future&lt;void&gt; _searchFlights(String query) async {\n    try {\n      final results = await FlightService.search(query);\n      setState(() {\n        flights = results;\n        isLoading = false;\n      });\n    } catch (e) {\n      setState(() => isLoading = false);\n    }\n  }\n}</code></pre>\n\nWhat's the problem and how would you fix it?",
        options: ["Race condition - need to cancel previous requests", "Missing debouncing for search input", "No error handling for failed API calls", "All of the above"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're building a shopping cart for an online store. Users report that when they add/remove items, the total price sometimes shows incorrect amounts. Here's the current implementation:\n\n<pre><code>class ShoppingCartProvider extends ChangeNotifier {\n  List&lt;CartItem&gt; _items = [];\n  double _total = 0.0;\n  \n  List&lt;CartItem&gt; get items => _items;\n  double get total => _total;\n  \n  void addItem(Product product) {\n    _items.add(CartItem(product: product, quantity: 1));\n    _total += product.price;\n    notifyListeners();\n  }\n  \n  void removeItem(String productId) {\n    final item = _items.firstWhere((item) => item.product.id == productId);\n    _items.removeWhere((item) => item.product.id == productId);\n    _total -= item.product.price * item.quantity;\n    notifyListeners();\n  }\n}</code></pre>\n\nWhat's causing the incorrect total calculation?",
        options: ["State synchronization problem between items and total", "Missing error handling for item not found", "Race condition in concurrent operations", "No issues - implementation is correct"],
        correct: 0,
        level: "middle"
    },
    {
        question: "You're building a form validation system for user registration. The form should validate email format, password strength, and username availability. However, you're experiencing performance issues with frequent validation calls. Here's the current implementation:\n\n<pre><code>class RegistrationForm extends StatefulWidget {\n  @override\n  _RegistrationFormState createState() => _RegistrationFormState();\n}\n\nclass _RegistrationFormState extends State&lt;RegistrationForm&gt; {\n  final _formKey = GlobalKey&lt;FormState&gt;();\n  String _email = '';\n  String _password = '';\n  String _username = '';\n  \n  @override\n  Widget build(BuildContext context) {\n    return Form(\n      key: _formKey,\n      child: Column(\n        children: [\n          TextFormField(\n            onChanged: (value) {\n              setState(() => _email = value);\n              _validateEmail(value);\n            },\n            validator: (value) => _validateEmail(value),\n          ),\n          TextFormField(\n            onChanged: (value) {\n              setState(() => _password = value);\n              _validatePassword(value);\n            },\n            validator: (value) => _validatePassword(value),\n          ),\n        ],\n      ),\n    );\n  }\n  \n  String? _validateEmail(String? value) {\n    // Email validation logic\n  }\n  \n  String? _validatePassword(String? value) {\n    // Password validation logic\n  }\n}</code></pre>\n\nWhat's causing the performance issues?",
        options: ["Validation runs on every keystroke", "setState called too frequently", "No debouncing for validation calls", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're building a product filtering system for an e-commerce app. Users can filter by category, price range, brand, and ratings. The app becomes very slow when users apply multiple filters quickly. Here's the current implementation:\n\n<pre><code>class ProductFilterScreen extends StatefulWidget {\n  @override\n  _ProductFilterScreenState createState() => _ProductFilterScreenState();\n}\n\nclass _ProductFilterScreenState extends State&lt;ProductFilterScreen&gt; {\n  List&lt;Product&gt; _allProducts = [];\n  List&lt;Product&gt; _filteredProducts = [];\n  FilterOptions _filters = FilterOptions();\n  \n  @override\n  void initState() {\n    super.initState();\n    _loadProducts();\n  }\n  \n  void _applyFilters() {\n    setState(() {\n      _filteredProducts = _allProducts.where((product) {\n        return _filters.category == null || product.category == _filters.category;\n      }).where((product) {\n        return _filters.maxPrice == null || product.price <= _filters.maxPrice!;\n      }).where((product) {\n        return _filters.brand == null || product.brand == _filters.brand;\n      }).toList();\n    });\n  }\n}</code></pre>\n\nWhat's causing the performance issues?",
        options: ["Multiple filter operations on every change", "No memoization of filtered results", "setState called for every filter change", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a complex state management system for a banking app. The app needs to handle user authentication, account balances, transaction history, and real-time notifications. You're experiencing memory leaks and performance issues. Here's the current implementation:\n\n<pre><code>class BankingAppProvider extends ChangeNotifier {\n  User? _user;\n  List&lt;Account&gt; _accounts = [];\n  List&lt;Transaction&gt; _transactions = [];\n  StreamSubscription? _notificationSubscription;\n  \n  @override\n  void dispose() {\n    _notificationSubscription?.cancel();\n    super.dispose();\n  }\n  \n  Future&lt;void&gt; login(String email, String password) async {\n    _user = await AuthService.login(email, password);\n    await _loadUserData();\n    _startNotificationListener();\n    notifyListeners();\n  }\n  \n  void _startNotificationListener() {\n    _notificationSubscription = NotificationService.stream.listen((notification) {\n      _handleNotification(notification);\n    });\n  }\n  \n  void _handleNotification(Notification notification) {\n    // Handle notification logic\n    notifyListeners();\n  }\n}</code></pre>\n\nWhat advanced Flutter patterns and potential issues are demonstrated here?",
        options: ["Proper stream management with disposal, potential memory leaks from listeners", "Advanced state management with proper cleanup", "Efficient notification handling", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated navigation system for a news app with deep linking, authentication guards, and dynamic routing. The app needs to handle complex navigation scenarios. Here's the current implementation:\n\n<pre><code>class AppRouter {\n  static Route&lt;dynamic&gt; generateRoute(RouteSettings settings) {\n    switch (settings.name) {\n      case '/':\n        return MaterialPageRoute(builder: (_) => HomeScreen());\n      case '/article':\n        final args = settings.arguments as Map&lt;String, dynamic&gt;?;\n        return MaterialPageRoute(\n          builder: (_) => ArticleScreen(articleId: args?['id']),\n        );\n      case '/profile':\n        return MaterialPageRoute(\n          builder: (_) => AuthGuard(\n            child: ProfileScreen(),\n          ),\n        );\n      default:\n        return MaterialPageRoute(builder: (_) => NotFoundScreen());\n    }\n  }\n}\n\nclass AuthGuard extends StatelessWidget {\n  final Widget child;\n  \n  const AuthGuard({required this.child});\n  \n  @override\n  Widget build(BuildContext context) {\n    return Consumer&lt;AuthProvider&gt;(\n      builder: (context, auth, _) {\n        if (auth.isLoading) {\n          return LoadingScreen();\n        }\n        if (!auth.isAuthenticated) {\n          return LoginScreen();\n        }\n        return child;\n      },\n    );\n  }\n}</code></pre>\n\nWhat sophisticated Flutter patterns and potential issues are demonstrated?",
        options: ["Advanced navigation with guards, potential memory leaks from providers", "Proper authentication flow with navigation", "Efficient route generation", "No issues - optimal navigation implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a complex data synchronization system for an offline-first note-taking app. The app needs to sync data across multiple devices, handle conflicts, and work offline. Here's the current implementation:\n\n<pre><code>class NoteSyncService {\n  final Database _localDb;\n  final ApiService _apiService;\n  final StreamController&lt;SyncEvent&gt; _syncController = StreamController.broadcast();\n  \n  Stream&lt;SyncEvent&gt; get syncStream => _syncController.stream;\n  \n  Future&lt;void&gt; syncNotes() async {\n    try {\n      final localNotes = await _localDb.getAllNotes();\n      final remoteNotes = await _apiService.getNotes();\n      \n      final conflicts = _detectConflicts(localNotes, remoteNotes);\n      \n      for (final conflict in conflicts) {\n        _syncController.add(SyncEvent.conflict(conflict));\n      }\n      \n      final mergedNotes = _mergeNotes(localNotes, remoteNotes);\n      \n      await _localDb.saveNotes(mergedNotes);\n      await _apiService.updateNotes(mergedNotes);\n      \n      _syncController.add(SyncEvent.completed());\n    } catch (e) {\n      _syncController.add(SyncEvent.error(e));\n    }\n  }\n  \n  void dispose() {\n    _syncController.close();\n  }\n}</code></pre>\n\nWhat performance and memory management issues exist in this implementation?",
        options: ["Potential memory leaks from unclosed streams, inefficient conflict resolution", "Proper stream management with disposal", "Efficient data synchronization", "No issues - optimal sync implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated animation system for a fitness tracking app. The app needs complex animations for workout progress, charts, and transitions. You're experiencing performance issues and janky animations. Here's the current implementation:\n\n<pre><code>class WorkoutProgressWidget extends StatefulWidget {\n  @override\n  _WorkoutProgressWidgetState createState() => _WorkoutProgressWidgetState();\n}\n\nclass _WorkoutProgressWidgetState extends State&lt;WorkoutProgressWidget&gt;\n    with TickerProviderStateMixin {\n  late AnimationController _progressController;\n  late AnimationController _chartController;\n  late Animation&lt;double&gt; _progressAnimation;\n  late Animation&lt;double&gt; _chartAnimation;\n  \n  @override\n  void initState() {\n    super.initState();\n    _progressController = AnimationController(\n      duration: Duration(seconds: 2),\n      vsync: this,\n    );\n    _chartController = AnimationController(\n      duration: Duration(seconds: 1),\n      vsync: this,\n    );\n    \n    _progressAnimation = Tween&lt;double&gt;(\n      begin: 0.0,\n      end: 1.0,\n    ).animate(CurvedAnimation(\n      parent: _progressController,\n      curve: Curves.easeInOut,\n    ));\n    \n    _chartAnimation = Tween&lt;double&gt;(\n      begin: 0.0,\n      end: 1.0,\n    ).animate(CurvedAnimation(\n      parent: _chartController,\n      curve: Curves.elasticOut,\n    ));\n  }\n  \n  @override\n  void dispose() {\n    _progressController.dispose();\n    _chartController.dispose();\n    super.dispose();\n  }\n}</code></pre>\n\nWhat advanced Flutter patterns and potential issues are demonstrated here?",
        options: ["Complex animation system with proper disposal, potential performance issues with multiple controllers", "Advanced animation patterns with proper lifecycle management", "Efficient animation handling", "No issues - optimal animation implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(flutterQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Flutter exam
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
    
    flutterQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / flutterQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${flutterQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === flutterQuestions[index].correct) {
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
        totalQuestions: flutterQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, flutterQuestions, currentAnswers, timeLeft);
}
