// DevOps Programming Exam Questions - B2-C1 Level
const devopsQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're setting up CI/CD for a web application. The deployment pipeline is failing intermittently, and you notice that some builds pass while others fail with the same code. Here's the current pipeline configuration:\n\n<pre><code># .github/workflows/deploy.yml\nname: Deploy to Production\n\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Install dependencies\n        run: npm install\n      - name: Run tests\n        run: npm test\n      - name: Build application\n        run: npm run build\n      - name: Deploy to server\n        run: |\n          scp -r dist/* user@server:/var/www/app/\n          ssh user@server 'sudo systemctl restart nginx'</code></pre>\n\nWhat's causing the intermittent failures and how would you fix it?",
        options: ["Race condition in parallel deployments", "Missing error handling and rollback mechanism", "No environment isolation between builds", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're managing a containerized application that's experiencing memory leaks and performance issues in production. The application runs fine locally but crashes in production. Here's the current Docker configuration:\n\n<pre><code># Dockerfile\nFROM node:16-alpine\n\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\n\nCOPY . .\nRUN npm run build\n\nEXPOSE 3000\nCMD [\"npm\", \"start\"]</code></pre>\n\nWhat's causing the production issues and what's the best solution?",
        options: ["Missing resource limits and health checks", "No proper logging and monitoring setup", "Container runs as root user", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're setting up monitoring for a microservices architecture. The current monitoring setup only tracks basic metrics, but you need to identify performance bottlenecks and troubleshoot issues quickly. Here's the current configuration:\n\n<pre><code># docker-compose.yml\nversion: '3.8'\nservices:\n  app:\n    image: myapp:latest\n    ports:\n      - \"3000:3000\"\n  \n  monitoring:\n    image: prometheus:latest\n    ports:\n      - \"9090:9090\"\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml</code></pre>\n\nWhat's missing from this monitoring setup?",
        options: ["Application metrics and custom dashboards", "Log aggregation and distributed tracing", "Alerting rules and notification system", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're implementing infrastructure as code for a multi-environment setup (dev, staging, production). The current Terraform configuration has issues with state management and environment isolation. Here's the current setup:\n\n<pre><code># main.tf\nresource \"aws_instance\" \"web_server\" {\n  ami           = var.ami_id\n  instance_type = var.instance_type\n  \n  tags = {\n    Name = \"web-server\"\n    Environment = var.environment\n  }\n}\n\n# variables.tf\nvariable \"ami_id\" {\n  description = \"AMI ID for the instance\"\n  type        = string\n}\n\nvariable \"instance_type\" {\n  description = \"Instance type\"\n  type        = string\n  default     = \"t2.micro\"\n}</code></pre>\n\nWhat's causing the infrastructure management issues?",
        options: ["Shared state file causing conflicts between environments", "Missing environment-specific variable files", "No proper resource tagging and naming conventions", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're setting up a Kubernetes cluster for a high-traffic application. The application is experiencing pod evictions and inconsistent performance. Here's the current deployment configuration:\n\n<pre><code># deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web-app\n  template:\n    metadata:\n      labels:\n        app: web-app\n    spec:\n      containers:\n      - name: web-app\n        image: myapp:latest\n        ports:\n        - containerPort: 3000\n        resources:\n          requests:\n            memory: \"64Mi\"\n            cpu: \"250m\"</code></pre>\n\nWhat's causing the pod evictions and performance issues?",
        options: ["Missing resource limits and proper resource requests", "No health checks and readiness probes", "Insufficient replica count for traffic load", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're implementing a disaster recovery strategy for a critical application. The current backup and recovery process is manual and error-prone. Here's the current setup:\n\n<pre><code># backup.sh\n#!/bin/bash\n\n# Database backup\npg_dump -h localhost -U postgres mydb > backup_$(date +%Y%m%d).sql\n\n# Application data backup\ntar -czf app_data_$(date +%Y%m%d).tar.gz /var/www/app/data/\n\n# Upload to S3\naws s3 cp backup_$(date +%Y%m%d).sql s3://my-backup-bucket/\naws s3 cp app_data_$(date +%Y%m%d).tar.gz s3://my-backup-bucket/</code></pre>\n\nWhat's wrong with this disaster recovery approach?",
        options: ["No automated scheduling and monitoring", "Missing backup validation and recovery testing", "No encryption and retention policies", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're building a sophisticated multi-cloud infrastructure for a global application. The system needs to handle traffic from multiple regions with automatic failover and load balancing. You're experiencing latency issues and inconsistent performance across regions. Here's the current architecture:\n\n<pre><code># terraform/main.tf\nmodule \"aws_infrastructure\" {\n  source = \"./modules/aws\"\n  \n  providers = {\n    aws = aws.us-east-1\n  }\n  \n  environment = var.environment\n  region      = \"us-east-1\"\n}\n\nmodule \"azure_infrastructure\" {\n  source = \"./modules/azure\"\n  \n  providers = {\n    azurerm = azurerm.eastus\n  }\n  \n  environment = var.environment\n  region      = \"eastus\"\n}\n\n# Load balancer configuration\nresource \"aws_lb\" \"main\" {\n  name               = \"main-lb\"\n  internal           = false\n  load_balancer_type = \"application\"\n  \n  subnets = var.public_subnet_ids\n}</code></pre>\n\nWhat advanced DevOps patterns and potential issues are demonstrated here?",
        options: ["Missing cross-cloud networking and traffic routing optimization", "Proper multi-cloud architecture with Terraform modules", "Efficient load balancing across regions", "No issues - sophisticated implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a complex GitOps workflow for a microservices architecture with multiple teams. The system needs to handle automated deployments, rollbacks, and environment promotion. You're experiencing deployment conflicts and inconsistent environment states. Here's the current setup:\n\n<pre><code># .github/workflows/gitops.yml\nname: GitOps Deployment\n\non:\n  push:\n    branches: [main, develop]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      \n      - name: Update Kubernetes manifests\n        run: |\n          # Update image tags in manifests\n          sed -i \"s|image: myapp:.*|image: myapp:${{ github.sha }}|g\" k8s/*.yaml\n          \n      - name: Apply to Kubernetes\n        run: |\n          kubectl apply -f k8s/\n          \n      - name: Wait for rollout\n        run: |\n          kubectl rollout status deployment/web-app</code></pre>\n\nWhat sophisticated DevOps patterns and potential issues are demonstrated here?",
        options: ["Missing proper GitOps tooling and environment isolation", "Proper automated deployment with Kubernetes", "Efficient CI/CD pipeline with GitOps", "No issues - optimal GitOps implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're building a sophisticated observability platform for a distributed system with hundreds of microservices. The system needs to handle metrics, logs, traces, and alerting across multiple environments. You're experiencing data inconsistency and alert fatigue. Here's the current implementation:\n\n<pre><code># observability-stack.yaml\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: prometheus-config\ndata:\n  prometheus.yml: |\n    global:\n      scrape_interval: 15s\n    \n    scrape_configs:\n    - job_name: 'kubernetes-pods'\n      kubernetes_sd_configs:\n      - role: pod\n      \n    - job_name: 'kubernetes-services'\n      kubernetes_sd_configs:\n      - role: service\n      \n    rule_files:\n    - \"/etc/prometheus/rules/*.yml\"\n    \n    alerting:\n      alertmanagers:\n      - static_configs:\n        - targets:\n          - alertmanager:9093\n---\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: grafana-dashboards\n  labels:\n    grafana_dashboard: \"1\"\ndata:\n  dashboard.json: |\n    {\n      \"dashboard\": {\n        \"title\": \"Application Metrics\",\n        \"panels\": [\n          {\n            \"title\": \"Request Rate\",\n            \"type\": \"graph\",\n            \"targets\": [\n              {\n                \"expr\": \"rate(http_requests_total[5m])\"\n              }\n            ]\n          }\n        ]\n      }\n    }</code></pre>\n\nWhat performance and scalability issues exist in this observability implementation?",
        options: ["Missing distributed tracing and log correlation", "No proper metric cardinality management", "Inefficient alerting rules and notification routing", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated security and compliance framework for a financial services application. The system needs to handle secrets management, network security, and compliance auditing across multiple environments. You're experiencing security vulnerabilities and compliance gaps. Here's the current implementation:\n\n<pre><code># security-policies.yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: web-app-policy\nspec:\n  podSelector:\n    matchLabels:\n      app: web-app\n  policyTypes:\n  - Ingress\n  - Egress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\n    ports:\n    - protocol: TCP\n      port: 3000\n  egress:\n  - to:\n    - podSelector:\n        matchLabels:\n          app: database\n    ports:\n    - protocol: TCP\n      port: 5432\n---\n# secrets.yaml\napiVersion: v1\nkind: Secret\nmetadata:\n  name: app-secrets\ntype: Opaque\ndata:\n  database-password: <base64-encoded-password>\n  api-key: <base64-encoded-api-key></code></pre>\n\nWhat advanced security patterns and potential issues are demonstrated here?",
        options: ["Missing proper secrets rotation and encryption at rest", "No runtime security monitoring and vulnerability scanning", "Insufficient network segmentation and access controls", "All of the above"],
        correct: 3,
        level: "advanced"
    }
];

let currentAnswers = new Array(devopsQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for DevOps exam
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
    
    devopsQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / devopsQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${devopsQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === devopsQuestions[index].correct) {
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
        totalQuestions: devopsQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, devopsQuestions, currentAnswers, timeLeft);
}
