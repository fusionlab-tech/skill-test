// Cybersecurity Exam Questions - B2-C1 Level
const cybersecurityQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "You're conducting a security assessment for a web application. During penetration testing, you discover that the application is vulnerable to SQL injection attacks. The current implementation uses dynamic SQL queries without proper parameterization. Here's the vulnerable code:\n\n<pre><code>// Vulnerable PHP code\n$user_id = $_GET['id'];\n$query = \"SELECT * FROM users WHERE id = \" . $user_id;\n$result = mysql_query($query);\n\n// Similar vulnerability in login\n$username = $_POST['username'];\n$password = $_POST['password'];\n$query = \"SELECT * FROM users WHERE username = '$username' AND password = '$password'\";\n$result = mysql_query($query);</code></pre>\n\nWhat are the primary security risks and how should they be mitigated?",
        options: ["Use parameterized queries and input validation", "Implement proper authentication and authorization", "Add input sanitization and output encoding", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're investigating a security incident where users report that their accounts have been compromised. Upon analysis, you discover that the application stores passwords in plain text and uses weak session management. Here's the current implementation:\n\n<pre><code>// Insecure password storage\nfunction createUser($username, $password) {\n    $query = \"INSERT INTO users (username, password) VALUES ('$username', '$password')\";\n    mysql_query($query);\n}\n\n// Weak session management\nsession_start();\n$_SESSION['user_id'] = $user_id;\n$_SESSION['username'] = $username;\n// No session timeout or regeneration</code></pre>\n\nWhat security vulnerabilities exist and how should they be addressed?",
        options: ["Implement password hashing and strong session management", "Add multi-factor authentication and session timeout", "Use secure cookies and session regeneration", "All of the above"],
        correct: 3,
        level: "basic"
    },
    {
        question: "You're reviewing the security configuration of a web server and discover several misconfigurations that could lead to security breaches. The current setup includes:\n\n<pre><code># Apache configuration issues\nServerTokens Full\nServerSignature On\n\n# Directory browsing enabled\nOptions +Indexes\n\n# No security headers\n# Missing X-Frame-Options, X-XSS-Protection, etc.\n\n# Weak SSL configuration\nSSLProtocol all\nSSLCipherSuite ALL:!ADH:!LOW:!EXP:!MD5:@STRENGTH</code></pre>\n\nWhat security improvements should be implemented?",
        options: ["Implement proper security headers and disable information disclosure", "Configure strong SSL/TLS settings and disable directory browsing", "Add input validation and output encoding", "All of the above"],
        correct: 3,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "You're designing a secure authentication system for a financial application that handles sensitive customer data. The system needs to comply with PCI DSS requirements and implement defense-in-depth strategies. Here's the proposed architecture:\n\n<pre><code>// Proposed authentication flow\nclass AuthenticationService {\n    public function authenticate($credentials) {\n        $user = $this->findUser($credentials['username']);\n        if ($user && password_verify($credentials['password'], $user->password)) {\n            $token = $this->generateToken($user);\n            $this->logLogin($user, 'success');\n            return $token;\n        }\n        $this->logLogin($user, 'failed');\n        return false;\n    }\n    \n    private function generateToken($user) {\n        return base64_encode($user->id . ':' . time());\n    }\n}</code></pre>\n\nWhat security vulnerabilities exist in this implementation?",
        options: ["Weak token generation and insufficient logging", "Missing rate limiting and account lockout mechanisms", "No multi-factor authentication or session management", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're conducting a security audit of a microservices architecture and discover several vulnerabilities in the service-to-service communication. The current implementation uses basic API keys for authentication and has no proper authorization framework. Here's the current setup:\n\n<pre><code>// Service A calling Service B\n$api_key = 'hardcoded_secret_key_123';\n$response = file_get_contents(\"http://service-b/api/data?key=$api_key\");\n\n// Service B validation\nif ($_GET['key'] === 'hardcoded_secret_key_123') {\n    return sensitive_data();\n} else {\n    return 'Unauthorized';\n}</code></pre>\n\nWhat security improvements are needed for this architecture?",
        options: ["Implement proper authentication and authorization mechanisms", "Add encryption for service-to-service communication", "Implement proper secret management and rotation", "All of the above"],
        correct: 3,
        level: "middle"
    },
    {
        question: "You're investigating a data breach where customer information was exfiltrated from a database. The investigation reveals that the attacker gained access through a compromised service account with excessive privileges. Here's the current database setup:\n\n<pre><code>-- Database user with excessive privileges\nCREATE USER 'app_user'@'%' IDENTIFIED BY 'weak_password';\nGRANT ALL PRIVILEGES ON *.* TO 'app_user'@'%';\n\n-- No audit logging\n-- No data encryption at rest\n-- No network segmentation\n\n-- Application code with SQL injection vulnerability\n$query = \"SELECT * FROM customers WHERE id = \" . $_GET['id'];\n$result = mysql_query($query);</code></pre>\n\nWhat security controls should be implemented to prevent similar incidents?",
        options: ["Implement principle of least privilege and database encryption", "Add comprehensive audit logging and network segmentation", "Implement proper input validation and output encoding", "All of the above"],
        correct: 3,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - High Complexity
    {
        question: "You're designing a comprehensive security architecture for a cloud-based healthcare application that must comply with HIPAA requirements. The system needs to handle PHI (Protected Health Information) with end-to-end encryption and implement advanced threat detection. Here's the proposed architecture:\n\n<pre><code>// Proposed security architecture\nclass HealthcareSecurityManager {\n    public function processPHI($data) {\n        // Encrypt data at rest\n        $encrypted_data = $this->encrypt($data, $this->getEncryptionKey());\n        \n        // Store in database\n        $this->storeInDatabase($encrypted_data);\n        \n        // Log access\n        $this->auditLog('PHI_ACCESS', $data['patient_id']);\n        \n        // Send to external system\n        $this->sendToExternalSystem($data);\n    }\n    \n    private function encrypt($data, $key) {\n        return openssl_encrypt($data, 'AES-256-CBC', $key);\n    }\n    \n    private function sendToExternalSystem($data) {\n        // Send unencrypted data to external API\n        $response = file_get_contents('http://external-api.com/process', [\n            'http' => [\n                'method' => 'POST',\n                'content' => json_encode($data)\n            ]\n        ]);\n    }\n}</code></pre>\n\nWhat advanced security vulnerabilities and compliance issues exist in this implementation?",
        options: ["HIPAA compliance violations with unencrypted data transmission", "Insufficient key management and audit logging", "Missing threat detection and incident response", "All of the above"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "You're implementing a sophisticated threat detection and response system for a large enterprise network. The system needs to detect advanced persistent threats (APTs), implement behavioral analytics, and provide automated incident response. Here's the current implementation:\n\n<pre><code>// Threat detection system\nclass ThreatDetectionSystem {\n    public function analyzeTraffic($packet) {\n        // Basic signature-based detection\n        if ($this->isKnownMalware($packet)) {\n            $this->blockIP($packet['source_ip']);\n            return;\n        }\n        \n        // Simple anomaly detection\n        if ($packet['size'] > $this->threshold) {\n            $this->alert('Large packet detected');\n        }\n        \n        // Log all traffic\n        $this->logTraffic($packet);\n    }\n    \n    private function isKnownMalware($packet) {\n        // Check against static signature database\n        return in_array($packet['signature'], $this->malware_signatures);\n    }\n    \n    private function blockIP($ip) {\n        // Add to firewall rules\n        exec(\"iptables -A INPUT -s $ip -j DROP\");\n    }\n}</code></pre>\n\nWhat advanced security patterns and potential issues are demonstrated here?",
        options: ["Basic threat detection with potential false positives and security bypasses", "Proper signature-based detection with behavioral analytics", "Efficient traffic analysis with automated response", "No issues - sophisticated threat detection implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're designing a zero-trust security architecture for a modern enterprise environment. The system needs to implement continuous verification, micro-segmentation, and advanced identity management. Here's the proposed implementation:\n\n<pre><code>// Zero-trust security implementation\nclass ZeroTrustSecurityManager {\n    public function verifyAccess($user, $resource, $context) {\n        // Check user identity\n        if (!$this->verifyIdentity($user)) {\n            return $this->denyAccess('Invalid identity');\n        }\n        \n        // Check device trust\n        if (!$this->verifyDevice($user['device_id'])) {\n            return $this->denyAccess('Untrusted device');\n        }\n        \n        // Check network location\n        if (!$this->verifyNetworkLocation($context['ip_address'])) {\n            return $this->denyAccess('Untrusted network');\n        }\n        \n        // Grant access\n        return $this->grantAccess($user, $resource);\n    }\n    \n    private function verifyIdentity($user) {\n        // Simple username/password check\n        return $user['username'] && $user['password'];\n    }\n    \n    private function verifyDevice($device_id) {\n        // Check if device is registered\n        return in_array($device_id, $this->trusted_devices);\n    }\n    \n    private function verifyNetworkLocation($ip) {\n        // Check if IP is in trusted range\n        return $this->isIPInRange($ip, '192.168.1.0/24');\n    }\n}</code></pre>\n\nWhat advanced security patterns and potential issues are demonstrated here?",
        options: ["Incomplete zero-trust implementation with weak verification mechanisms", "Proper continuous verification with micro-segmentation", "Efficient identity management with device trust", "No issues - optimal zero-trust security implementation"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "You're implementing a comprehensive security incident response and forensics system for a large organization. The system needs to handle evidence collection, timeline reconstruction, and automated threat hunting. Here's the current implementation:\n\n<pre><code>// Incident response and forensics system\nclass IncidentResponseSystem {\n    public function handleIncident($incident_data) {\n        // Collect evidence\n        $evidence = $this->collectEvidence($incident_data);\n        \n        // Analyze timeline\n        $timeline = $this->analyzeTimeline($evidence);\n        \n        // Determine threat level\n        $threat_level = $this->assessThreatLevel($incident_data);\n        \n        // Take response action\n        if ($threat_level > 7) {\n            $this->isolateAffectedSystems($incident_data['affected_systems']);\n        }\n        \n        // Notify stakeholders\n        $this->notifyStakeholders($incident_data, $threat_level);\n        \n        // Store evidence\n        $this->storeEvidence($evidence);\n    }\n    \n    private function collectEvidence($incident_data) {\n        // Collect logs from affected systems\n        $logs = [];\n        foreach ($incident_data['affected_systems'] as $system) {\n            $logs[] = file_get_contents(\"/var/log/$system.log\");\n        }\n        return $logs;\n    }\n    \n    private function analyzeTimeline($evidence) {\n        // Simple timestamp analysis\n        $timestamps = [];\n        foreach ($evidence as $log) {\n            preg_match_all('/\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}/', $log, $matches);\n            $timestamps = array_merge($timestamps, $matches[0]);\n        }\n        sort($timestamps);\n        return $timestamps;\n    }\n    \n    private function assessThreatLevel($incident_data) {\n        // Basic threat assessment\n        $score = 0;\n        if ($incident_data['data_exfiltration']) $score += 5;\n        if ($incident_data['system_compromise']) $score += 3;\n        if ($incident_data['privilege_escalation']) $score += 4;\n        return min($score, 10);\n    }\n}</code></pre>\n\nWhat sophisticated security patterns and potential issues are demonstrated here?",
        options: ["Basic incident response with potential evidence contamination and incomplete analysis", "Proper evidence collection with timeline reconstruction", "Efficient threat assessment with automated response", "No issues - optimal incident response implementation"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(cybersecurityQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for Cybersecurity exam
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
    
    cybersecurityQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / cybersecurityQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${cybersecurityQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === cybersecurityQuestions[index].correct) {
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
        totalQuestions: cybersecurityQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, cybersecurityQuestions, currentAnswers, timeLeft);
}
