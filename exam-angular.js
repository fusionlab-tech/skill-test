// Angular.js Programming Exam Questions - B2-C1 Level
const angularQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "Consider this Angular component:\n\n<pre><code>@Component({\n  selector: 'app-user-profile',\n  template: `\n    &lt;div *ngIf=\"user\"&gt;\n      &lt;h2&gt;{{ user.name }}&lt;/h2&gt;\n      &lt;p&gt;{{ user.email }}&lt;/p&gt;\n    &lt;/div&gt;\n  `\n})\nexport class UserProfileComponent implements OnInit {\n  user: User | null = null;\n  \n  constructor(private userService: UserService) {}\n  \n  ngOnInit() {\n    this.userService.getUser().subscribe(\n      user =&gt; this.user = user,\n      error =&gt; console.error(error)\n    );\n  }\n}</code></pre>\n\nWhat potential issue exists in this component and how would you fix it?",
        options: ["Memory leak from unsubscribed observable", "Missing error handling in template", "Inefficient change detection", "No issues - component is properly implemented"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Analyze this Angular service:\n\n<pre><code>@Injectable({\n  providedIn: 'root'\n})\nexport class DataService {\n  private dataSubject = new BehaviorSubject&lt;any[]&gt;([]);\n  public data$ = this.dataSubject.asObservable();\n  \n  constructor(private http: HttpClient) {}\n  \n  loadData() {\n    this.http.get&lt;any[]&gt;('/api/data').subscribe(\n      data =&gt; this.dataSubject.next(data),\n      error =&gt; console.error('Error loading data:', error)\n    );\n  }\n  \n  addItem(item: any) {\n    const currentData = this.dataSubject.value;\n    this.dataSubject.next([...currentData, item]);\n  }\n}</code></pre>\n\nWhat is the issue with this service implementation?",
        options: ["Missing error handling in addItem method", "Potential memory leaks from HTTP subscriptions", "Inefficient data management", "No issues - proper service implementation"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Examine this Angular directive:\n\n<pre><code>@Directive({\n  selector: '[appHighlight]'\n})\nexport class HighlightDirective implements OnInit, OnDestroy {\n  @Input() appHighlight: string = 'yellow';\n  \n  constructor(private el: ElementRef, private renderer: Renderer2) {}\n  \n  ngOnInit() {\n    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.appHighlight);\n  }\n  \n  ngOnDestroy() {\n    this.renderer.removeStyle(this.el.nativeElement, 'background-color');\n  }\n}</code></pre>\n\nWhat is the purpose of using Renderer2 instead of direct DOM manipulation?",
        options: ["Server-side rendering compatibility", "Better performance optimization", "Security against XSS attacks", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "Consider this Angular component with reactive forms:\n\n<pre><code>@Component({\n  selector: 'app-user-form',\n  template: `\n    &lt;form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\"&gt;\n      &lt;input formControlName=\"name\" placeholder=\"Name\"&gt;\n      &lt;input formControlName=\"email\" placeholder=\"Email\"&gt;\n      &lt;button type=\"submit\" [disabled]=\"userForm.invalid\"&gt;Submit&lt;/button&gt;\n    &lt;/form&gt;\n  `\n})\nexport class UserFormComponent implements OnInit {\n  userForm: FormGroup;\n  \n  constructor(private fb: FormBuilder) {\n    this.userForm = this.fb.group({\n      name: ['', [Validators.required, Validators.minLength(2)]],\n      email: ['', [Validators.required, Validators.email]]\n    });\n  }\n  \n  ngOnInit() {\n    this.userForm.valueChanges.subscribe(value =&gt; {\n      console.log('Form value changed:', value);\n    });\n  }\n  \n  onSubmit() {\n    if (this.userForm.valid) {\n      console.log('Form submitted:', this.userForm.value);\n    }\n  }\n}</code></pre>\n\nWhat potential issue exists in this component?",
        options: ["Memory leak from unsubscribed valueChanges", "Missing form validation feedback", "Inefficient form handling", "No issues - proper form implementation"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Analyze this Angular route guard:\n\n<pre><code>@Injectable({\n  providedIn: 'root'\n})\nexport class AuthGuard implements CanActivate {\n  constructor(private authService: AuthService, private router: Router) {}\n  \n  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {\n    if (this.authService.isAuthenticated()) {\n      return true;\n    } else {\n      this.router.navigate(['/login']);\n      return false;\n    }\n  }\n}</code></pre>\n\nWhat is missing from this guard implementation?",
        options: ["Async authentication check", "Route parameter handling", "Error handling", "All of the above"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Examine this Angular interceptor:\n\n<pre><code>@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n  constructor(private authService: AuthService) {}\n  \n  intercept(req: HttpRequest&lt;any&gt;, next: HttpHandler): Observable&lt;HttpEvent&lt;any&gt;&gt; {\n    const authToken = this.authService.getToken();\n    \n    if (authToken) {\n      const authReq = req.clone({\n        setHeaders: {\n          Authorization: `Bearer ${authToken}`\n        }\n      });\n      return next.handle(authReq);\n    }\n    \n    return next.handle(req);\n  }\n}</code></pre>\n\nWhat potential issue exists in this interceptor?",
        options: ["Missing error handling for expired tokens", "No token refresh mechanism", "Inefficient header setting", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "Consider this sophisticated Angular component:\n\n<pre><code>@Component({\n  selector: 'app-data-table',\n  template: `\n    &lt;div class=\"table-container\"&gt;\n      &lt;table&gt;\n        &lt;thead&gt;\n          &lt;tr&gt;\n            &lt;th *ngFor=\"let column of columns\" (click)=\"sort(column.key)\"&gt;\n              {{ column.title }}\n            &lt;/th&gt;\n          &lt;/tr&gt;\n        &lt;/thead&gt;\n        &lt;tbody&gt;\n          &lt;tr *ngFor=\"let item of paginatedData; trackBy: trackByFn\"&gt;\n            &lt;td *ngFor=\"let column of columns\"&gt;\n              {{ getCellValue(item, column.key) }}\n            &lt;/td&gt;\n          &lt;/tr&gt;\n        &lt;/tbody&gt;\n      &lt;/table&gt;\n    &lt;/div&gt;\n  `\n})\nexport class DataTableComponent implements OnInit, OnDestroy {\n  @Input() data: any[] = [];\n  @Input() columns: Column[] = [];\n  @Input() pageSize: number = 10;\n  \n  paginatedData: any[] = [];\n  currentPage = 1;\n  sortKey: string | null = null;\n  sortDirection: 'asc' | 'desc' = 'asc';\n  \n  private destroy$ = new Subject&lt;void&gt;();\n  \n  ngOnInit() {\n    this.updatePaginatedData();\n    \n    combineLatest([\n      this.data$,\n      this.sortKey$,\n      this.sortDirection$,\n      this.currentPage$\n    ]).pipe(\n      takeUntil(this.destroy$)\n    ).subscribe(() =&gt; {\n      this.updatePaginatedData();\n    });\n  }\n  \n  ngOnDestroy() {\n    this.destroy$.next();\n    this.destroy$.complete();\n  }\n  \n  trackByFn(index: number, item: any): any {\n    return item.id || index;\n  }\n}</code></pre>\n\nWhat advanced Angular patterns and potential issues are demonstrated here?",
        options: ["Reactive programming with proper cleanup, potential performance issues with large datasets", "Advanced component architecture with proper lifecycle management", "Efficient data handling with trackBy functions", "All of the above with memory leak prevention"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "Analyze this complex Angular service with state management:\n\n<pre><code>@Injectable({\n  providedIn: 'root'\n})\nexport class StateService {\n  private stateSubject = new BehaviorSubject&lt;AppState&gt;(initialState);\n  public state$ = this.stateSubject.asObservable();\n  \n  private actions$ = new Subject&lt;Action&gt;();\n  \n  constructor() {\n    this.actions$.pipe(\n      scan((state, action) =&gt; this.reducer(state, action), initialState),\n      distinctUntilChanged()\n    ).subscribe(state =&gt; {\n      this.stateSubject.next(state);\n    });\n  }\n  \n  dispatch(action: Action) {\n    this.actions$.next(action);\n  }\n  \n  select&lt;T&gt;(selector: (state: AppState) =&gt; T): Observable&lt;T&gt; {\n    return this.state$.pipe(\n      map(selector),\n      distinctUntilChanged()\n    );\n  }\n  \n  private reducer(state: AppState, action: Action): AppState {\n    switch (action.type) {\n      case 'LOAD_USERS':\n        return { ...state, loading: true };\n      case 'LOAD_USERS_SUCCESS':\n        return { ...state, users: action.payload, loading: false };\n      case 'LOAD_USERS_ERROR':\n        return { ...state, error: action.payload, loading: false };\n      default:\n        return state;\n    }\n  }\n}</code></pre>\n\nWhat sophisticated patterns and potential issues are demonstrated?",
        options: ["Redux-like state management with proper immutability, potential memory leaks from unsubscribed observables", "Advanced reactive programming with proper state handling", "Efficient state selection with distinctUntilChanged", "All of the above with proper cleanup mechanisms"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Examine this advanced Angular component with virtual scrolling:\n\n<pre><code>@Component({\n  selector: 'app-virtual-list',\n  template: `\n    &lt;cdk-virtual-scroll-viewport itemSize=\"50\" class=\"viewport\"&gt;\n      &lt;div *cdkVirtualFor=\"let item of items; trackBy: trackByFn\" class=\"item\"&gt;\n        {{ item.name }}\n      &lt;/div&gt;\n    &lt;/cdk-virtual-scroll-viewport&gt;\n  `\n})\nexport class VirtualListComponent implements OnInit, OnDestroy {\n  @Input() items: any[] = [];\n  \n  private destroy$ = new Subject&lt;void&gt;();\n  \n  ngOnInit() {\n    this.items$.pipe(\n      debounceTime(300),\n      distinctUntilChanged(),\n      takeUntil(this.destroy$)\n    ).subscribe(items =&gt; {\n      this.updateVirtualScroll(items);\n    });\n  }\n  \n  ngOnDestroy() {\n    this.destroy$.next();\n    this.destroy$.complete();\n  }\n  \n  trackByFn(index: number, item: any): any {\n    return item.id || index;\n  }\n  \n  private updateVirtualScroll(items: any[]) {\n    // Virtual scroll update logic\n  }\n}</code></pre>\n\nWhat performance and memory management issues exist in this implementation?",
        options: ["Potential memory leaks from unsubscribed observables, inefficient virtual scrolling", "Proper cleanup with takeUntil pattern, optimized virtual scrolling", "Advanced performance optimization with debouncing", "No issues - optimal virtual scrolling implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this sophisticated Angular application with lazy loading:\n\n<pre><code>const routes: Routes = [\n  {\n    path: 'dashboard',\n    loadChildren: () =&gt; import('./dashboard/dashboard.module').then(m =&gt; m.DashboardModule),\n    canActivate: [AuthGuard]\n  },\n  {\n    path: 'admin',\n    loadChildren: () =&gt; import('./admin/admin.module').then(m =&gt; m.AdminModule),\n    canActivate: [AdminGuard]\n  }\n];\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes, {\n    preloadingStrategy: PreloadAllModules,\n    enableTracing: false\n  })],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule {}\n\n@Component({\n  selector: 'app-root',\n  template: `\n    &lt;router-outlet&gt;&lt;/router-outlet&gt;\n    &lt;ng-container *ngIf=\"loading$ | async\"&gt;\n      &lt;app-loading-spinner&gt;&lt;/app-loading-spinner&gt;\n    &lt;/ng-container&gt;\n  `\n})\nexport class AppComponent implements OnInit {\n  loading$: Observable&lt;boolean&gt;;\n  \n  constructor(private router: Router, private loadingService: LoadingService) {\n    this.loading$ = this.loadingService.loading$;\n  }\n  \n  ngOnInit() {\n    this.router.events.pipe(\n      filter(event =&gt; event instanceof NavigationStart),\n      tap(() =&gt; this.loadingService.setLoading(true)),\n      switchMap(() =&gt; this.router.events.pipe(\n        filter(event =&gt; event instanceof NavigationEnd || event instanceof NavigationError),\n        take(1)\n      )),\n      tap(() =&gt; this.loadingService.setLoading(false))\n    ).subscribe();\n  }\n}</code></pre>\n\nWhat advanced Angular patterns and potential issues are demonstrated here?",
        options: ["Lazy loading with proper route guards, potential memory leaks from unsubscribed router events", "Advanced routing with preloading strategies, proper loading state management", "Efficient navigation handling with proper cleanup", "All of the above with potential subscription management issues"],
        correct: 3,
        level: "advanced"
    }
];

let currentAnswers = new Array(angularQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Angular.js exam
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
    
    angularQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / angularQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${angularQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === angularQuestions[index].correct) {
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
        totalQuestions: angularQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, angularQuestions, currentAnswers, timeLeft);
}
