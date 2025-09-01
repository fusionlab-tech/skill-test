// Next.js Programming Exam Questions - B2-C1 Level
const nextjsQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "Consider this Next.js code:\n```jsx\n// app/users/[id]/page.jsx\nexport default async function UserPage({ params }) {\n    const user = await fetchUser(params.id);\n    \n    if (!user) {\n        notFound();\n    }\n    \n    return (\n        <div>\n            <h1>{user.name}</h1>\n            <UserProfile user={user} />\n        </div>\n    );\n}\n```\nWhat is the purpose of `notFound()` and when should it be used?",
        options: ["Redirects to 404 page and handles missing data gracefully", "Throws an error for debugging purposes", "Logs missing data to console", "No purpose - unnecessary function call"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Analyze this Next.js code:\n```jsx\n// app/blog/page.jsx\nexport default async function BlogPage() {\n    const posts = await fetch('https://api.example.com/posts', {\n        next: { revalidate: 3600 }\n    }).then(res => res.json());\n    \n    return (\n        <div>\n            {posts.map(post => (\n                <BlogPost key={post.id} post={post} />\n            ))}\n        </div>\n    );\n}\n```\nWhat does the `next: { revalidate: 3600 }` configuration do?",
        options: ["Sets cache duration to 1 hour", "Forces immediate revalidation", "Disables caching completely", "Sets maximum cache size"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Examine this Next.js code:\n```jsx\n// app/dashboard/layout.jsx\nexport default function DashboardLayout({ children }) {\n    return (\n        <div className=\"dashboard\">\n            <Sidebar />\n            <main>{children}</main>\n        </div>\n    );\n}\n\n// app/dashboard/page.jsx\nexport default function DashboardPage() {\n    return <h1>Dashboard Content</h1>;\n}\n```\nWhat is the relationship between these files and how does Next.js handle them?",
        options: ["Layout wraps page content, creating nested UI structure", "Page overrides layout completely", "Both render independently", "Layout is optional and ignored"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "Consider this Next.js code:\n```jsx\n// app/products/page.jsx\nexport default async function ProductsPage({ searchParams }) {\n    const { category, sort } = searchParams;\n    \n    const query = buildQuery({ category, sort });\n    const products = await fetchProducts(query);\n    \n    return (\n        <div>\n            <ProductFilters />\n            <ProductGrid products={products} />\n        </div>\n    );\n}\n\n// app/products/ProductFilters.jsx\n'use client';\n\nexport default function ProductFilters() {\n    const router = useRouter();\n    const searchParams = useSearchParams();\n    \n    const updateFilters = (newFilters) => {\n        const params = new URLSearchParams(searchParams);\n        Object.entries(newFilters).forEach(([key, value]) => {\n            if (value) params.set(key, value);\n            else params.delete(key);\n        });\n        router.push(`/products?${params.toString()}`);\n    };\n    \n    return (\n        <div>\n            <select onChange={(e) => updateFilters({ category: e.target.value })}>\n                <option value=\"\">All Categories</option>\n                <option value=\"electronics\">Electronics</option>\n            </select>\n        </div>\n    );\n}\n```\nWhat potential issue exists in this implementation?",
        options: ["Client-side navigation causes full page reloads", "Missing error handling for invalid search params", "Server component cannot access search params", "No issues - proper implementation"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Analyze this Next.js code:\n```jsx\n// app/api/users/route.js\nexport async function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const page = parseInt(searchParams.get('page')) || 1;\n    const limit = parseInt(searchParams.get('limit')) || 10;\n    \n    try {\n        const users = await db.users.findMany({\n            skip: (page - 1) * limit,\n            take: limit,\n            orderBy: { createdAt: 'desc' }\n        });\n        \n        const total = await db.users.count();\n        \n        return Response.json({\n            users,\n            pagination: {\n                page,\n                limit,\n                total,\n                pages: Math.ceil(total / limit)\n            }\n        });\n    } catch (error) {\n        return Response.json(\n            { error: 'Failed to fetch users' },\n            { status: 500 }\n        );\n    }\n}\n```\nWhat performance issue exists in this API route?",
        options: ["N+1 query problem with separate count query", "Missing caching headers", "No pagination validation", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "Examine this Next.js code:\n```jsx\n// app/blog/[slug]/page.jsx\nexport async function generateStaticParams() {\n    const posts = await fetchAllPosts();\n    \n    return posts.map((post) => ({\n        slug: post.slug,\n    }));\n}\n\nexport default async function BlogPost({ params }) {\n    const post = await fetchPost(params.slug);\n    \n    if (!post) {\n        notFound();\n    }\n    \n    return (\n        <article>\n            <h1>{post.title}</h1>\n            <div dangerouslySetInnerHTML={{ __html: post.content }} />\n        </article>\n    );\n}\n```\nWhat security and performance issues exist in this component?",
        options: ["XSS vulnerability from dangerouslySetInnerHTML, missing ISR optimization", "No security issues, proper implementation", "Missing error boundaries", "Performance issues only"],
        correct: 0,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "Consider this sophisticated Next.js code:\n```jsx\n// app/providers.tsx\n'use client';\n\nimport { createContext, useContext, useReducer, ReactNode } from 'react';\n\ninterface AppState {\n    user: User | null;\n    theme: 'light' | 'dark';\n    notifications: Notification[];\n}\n\ntype AppAction = \n    | { type: 'SET_USER'; payload: User }\n    | { type: 'SET_THEME'; payload: 'light' | 'dark' }\n    | { type: 'ADD_NOTIFICATION'; payload: Notification }\n    | { type: 'REMOVE_NOTIFICATION'; payload: string };\n\nconst AppContext = createContext<{\n    state: AppState;\n    dispatch: React.Dispatch<AppAction>;\n} | null>(null);\n\nfunction appReducer(state: AppState, action: AppAction): AppState {\n    switch (action.type) {\n        case 'SET_USER':\n            return { ...state, user: action.payload };\n        case 'SET_THEME':\n            return { ...state, theme: action.payload };\n        case 'ADD_NOTIFICATION':\n            return {\n                ...state,\n                notifications: [...state.notifications, action.payload]\n            };\n        case 'REMOVE_NOTIFICATION':\n            return {\n                ...state,\n                notifications: state.notifications.filter(\n                    n => n.id !== action.payload\n                )\n            };\n        default:\n            return state;\n    }\n}\n\nexport function AppProvider({ children }: { children: ReactNode }) {\n    const [state, dispatch] = useReducer(appReducer, {\n        user: null,\n        theme: 'light',\n        notifications: []\n    });\n    \n    return (\n        <AppContext.Provider value={{ state, dispatch }}>\n            {children}\n        </AppContext.Provider>\n    );\n}\n\nexport function useApp() {\n    const context = useContext(AppContext);\n    if (!context) {\n        throw new Error('useApp must be used within AppProvider');\n    }\n    return context;\n}\n```\nWhat advanced Next.js patterns and potential issues are demonstrated here?",
        options: ["Context provider with reducer pattern, potential performance issues from unnecessary re-renders", "Proper state management with TypeScript", "Advanced React patterns in Next.js", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Analyze this complex Next.js code:\n```jsx\n// app/middleware.ts\nimport { NextResponse } from 'next/server';\nimport type { NextRequest } from 'next/server';\n\nexport function middleware(request: NextRequest) {\n    const { pathname } = request.nextUrl;\n    const token = request.cookies.get('auth-token');\n    \n    // Public routes that don't require authentication\n    const publicRoutes = ['/login', '/register', '/', '/api/auth'];\n    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));\n    \n    if (isPublicRoute) {\n        return NextResponse.next();\n    }\n    \n    // Check authentication\n    if (!token) {\n        const loginUrl = new URL('/login', request.url);\n        loginUrl.searchParams.set('redirect', pathname);\n        return NextResponse.redirect(loginUrl);\n    }\n    \n    // Validate token and add user info to headers\n    try {\n        const user = validateToken(token.value);\n        const requestHeaders = new Headers(request.headers);\n        requestHeaders.set('x-user-id', user.id);\n        requestHeaders.set('x-user-role', user.role);\n        \n        // Role-based access control\n        if (user.role === 'admin' && pathname.startsWith('/admin')) {\n            return NextResponse.next({\n                request: {\n                    headers: requestHeaders,\n                },\n            });\n        }\n        \n        if (user.role === 'user' && pathname.startsWith('/admin')) {\n            return NextResponse.redirect(new URL('/unauthorized', request.url));\n        }\n        \n        return NextResponse.next({\n            request: {\n                headers: requestHeaders,\n            },\n        });\n    } catch (error) {\n        // Invalid token\n        const response = NextResponse.redirect(new URL('/login', request.url));\n        response.cookies.delete('auth-token');\n        return response;\n    }\n}\n\nexport const config = {\n    matcher: [\n        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',\n    ],\n};\n```\nWhat sophisticated Next.js patterns and potential issues are demonstrated?",
        options: ["Middleware with authentication, role-based access control, and potential security vulnerabilities", "Proper authentication flow with middleware", "Advanced routing with security", "No issues - secure implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Examine this advanced Next.js code:\n```jsx\n// app/lib/db.ts\nimport { PrismaClient } from '@prisma/client';\n\ndeclare global {\n    var __prisma: PrismaClient | undefined;\n}\n\nconst prisma = globalThis.__prisma || new PrismaClient({\n    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],\n});\n\nif (process.env.NODE_ENV !== 'production') {\n    globalThis.__prisma = prisma;\n}\n\nexport { prisma };\n\n// app/lib/cache.ts\nimport { Redis } from 'ioredis';\n\ndeclare global {\n    var __redis: Redis | undefined;\n}\n\nconst redis = globalThis.__redis || new Redis({\n    host: process.env.REDIS_HOST,\n    port: parseInt(process.env.REDIS_PORT || '6379'),\n    password: process.env.REDIS_PASSWORD,\n    retryDelayOnFailover: 100,\n    maxRetriesPerRequest: 3,\n});\n\nif (process.env.NODE_ENV !== 'production') {\n    globalThis.__redis = redis;\n}\n\nexport { redis };\n\n// app/lib/withCache.ts\nexport function withCache<T>(\n    key: string,\n    fn: () => Promise<T>,\n    ttl: number = 3600\n): Promise<T> {\n    return new Promise(async (resolve, reject) => {\n        try {\n            // Try to get from cache first\n            const cached = await redis.get(key);\n            if (cached) {\n                resolve(JSON.parse(cached));\n                return;\n            }\n            \n            // Execute function and cache result\n            const result = await fn();\n            await redis.setex(key, ttl, JSON.stringify(result));\n            resolve(result);\n        } catch (error) {\n            reject(error);\n        }\n    });\n}\n```\nWhat performance and resource management issues exist in this implementation?",
        options: ["Potential memory leaks from global variables, missing connection pooling, and error handling", "Proper database and cache connection management", "Efficient caching with Redis", "No issues - optimal implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Consider this sophisticated Next.js code:\n```jsx\n// app/components/DataTable.tsx\n'use client';\n\nimport { useState, useMemo, useCallback } from 'react';\nimport { useRouter, useSearchParams } from 'next/navigation';\n\ninterface DataTableProps<T> {\n    data: T[];\n    columns: ColumnDef<T>[];\n    pageSize?: number;\n    sortable?: boolean;\n    filterable?: boolean;\n}\n\nexport default function DataTable<T>({\n    data,\n    columns,\n    pageSize = 10,\n    sortable = true,\n    filterable = true\n}: DataTableProps<T>) {\n    const router = useRouter();\n    const searchParams = useSearchParams();\n    \n    const [sortField, setSortField] = useState<string>(\n        searchParams.get('sort') || ''\n    );\n    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(\n        (searchParams.get('order') as 'asc' | 'desc') || 'asc'\n    );\n    const [currentPage, setCurrentPage] = useState<number>(\n        parseInt(searchParams.get('page') || '1')\n    );\n    const [filters, setFilters] = useState<Record<string, string>>(() => {\n        const filterParams: Record<string, string> = {};\n        searchParams.forEach((value, key) => {\n            if (key.startsWith('filter_')) {\n                filterParams[key.replace('filter_', '')] = value;\n            }\n        });\n        return filterParams;\n    });\n    \n    const filteredData = useMemo(() => {\n        let result = [...data];\n        \n        // Apply filters\n        if (filterable) {\n            Object.entries(filters).forEach(([field, value]) => {\n                if (value) {\n                    result = result.filter(item =>\n                        String(item[field as keyof T])\n                            .toLowerCase()\n                            .includes(value.toLowerCase())\n                    );\n                }\n            });\n        }\n        \n        // Apply sorting\n        if (sortable && sortField) {\n            result.sort((a, b) => {\n                const aVal = a[sortField as keyof T];\n                const bVal = b[sortField as keyof T];\n                \n                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;\n                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;\n                return 0;\n            });\n        }\n        \n        return result;\n    }, [data, filters, sortField, sortDirection, filterable, sortable]);\n    \n    const paginatedData = useMemo(() => {\n        const startIndex = (currentPage - 1) * pageSize;\n        return filteredData.slice(startIndex, startIndex + pageSize);\n    }, [filteredData, currentPage, pageSize]);\n    \n    const totalPages = Math.ceil(filteredData.length / pageSize);\n    \n    const updateURL = useCallback((updates: Record<string, string>) => {\n        const params = new URLSearchParams(searchParams);\n        \n        Object.entries(updates).forEach(([key, value]) => {\n            if (value) {\n                params.set(key, value);\n            } else {\n                params.delete(key);\n            }\n        });\n        \n        router.push(`?${params.toString()}`);\n    }, [router, searchParams]);\n    \n    const handleSort = useCallback((field: string) => {\n        const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';\n        setSortField(field);\n        setSortDirection(newDirection);\n        updateURL({ sort: field, order: newDirection });\n    }, [sortField, sortDirection, updateURL]);\n    \n    const handleFilter = useCallback((field: string, value: string) => {\n        const newFilters = { ...filters, [field]: value };\n        setFilters(newFilters);\n        \n        const filterParams: Record<string, string> = {};\n        Object.entries(newFilters).forEach(([key, val]) => {\n            if (val) filterParams[`filter_${key}`] = val;\n        });\n        \n        updateURL(filterParams);\n        setCurrentPage(1);\n    }, [filters, updateURL]);\n    \n    const handlePageChange = useCallback((page: number) => {\n        setCurrentPage(page);\n        updateURL({ page: page.toString() });\n    }, [updateURL]);\n    \n    return (\n        <div className=\"data-table\">\n            {/* Table implementation with sorting, filtering, and pagination */}\n        </div>\n    );\n}\n```\nWhat advanced Next.js patterns and potential issues are demonstrated here?",
        options: ["Complex data table with URL state management, potential performance issues from frequent re-renders", "Proper table implementation with Next.js", "Advanced component patterns", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(nextjsQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Next.js exam
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
    
    nextjsQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / nextjsQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${nextjsQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === nextjsQuestions[index].correct) {
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
        totalQuestions: nextjsQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, nextjsQuestions, currentAnswers, timeLeft);
}
