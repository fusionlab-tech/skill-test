// French Language Exam Questions - B2-C1 Level
const frenchQuestions = [
    // Basic Questions (3) - B2 Level - More Practical and Real-World
    {
        question: "Vous écrivez un email professionnel à un client concernant un retard de projet. Quelle phrase maintient le mieux un ton professionnel tout en étant honnête sur la situation ?\n\n<pre><code>\"Je suis vraiment désolé, mais on a raté le planning et on ne pourra pas livrer à temps.\"\n\n\"En raison de défis techniques imprévus, nous devons prolonger l'échéance du projet de deux semaines.\"\n\n\"Le projet est en retard parce que notre équipe n'a pas assez travaillé.\"\n\n\"On ne peut pas finir le projet à temps, mais ce n'est pas de notre faute.\"</code></pre>",
        options: ["Première option - directe et honnête", "Deuxième option - professionnelle et explicative", "Troisième option - assume la responsabilité", "Quatrième option - évite les reproches"],
        correct: 1,
        level: "basic"
    },
    {
        question: "Vous présentez les résultats trimestriels à la direction. Quelle phrase d'ouverture établit le mieux la crédibilité et fixe le bon ton ?\n\n<pre><code>\"Alors, je pense qu'on s'en est pas mal sortis ce trimestre...\"\n\n\"Je vais maintenant parler de nos performances trimestrielles.\"\n\n\"Nos résultats du Q3 démontrent une croissance solide sur tous les indicateurs clés.\"\n\n\"Bon, voici les chiffres, mais je ne suis pas sûr de ce qu'ils signifient.\"</code></pre>",
        options: ["Première option - modeste et humble", "Deuxième option - claire et directe", "Troisième option - confiante et basée sur les données", "Quatrième option - honnête sur l'incertitude"],
        correct: 2,
        level: "basic"
    },
    {
        question: "Vous répondez à une plainte client concernant un défaut de produit. Quelle réponse équilibre le mieux empathie et professionnalisme ?\n\n<pre><code>\"Nous sommes vraiment désolés de ce problème. Nous comprenons à quel point cela doit être frustrant pour vous, et nous nous engageons à le résoudre rapidement. Veuillez contacter notre équipe support dès que possible.\"\n\n\"C'est un problème connu qui affecte certains clients. Nous travaillons sur une solution.\"\n\n\"Je suis désolé que vous ayez des problèmes. Pouvez-vous essayer de l'éteindre et de le rallumer ?\"\n\n\"Nous nous excusons pour tout inconvénient. Veuillez retourner le produit pour un remboursement complet.\"</code></pre>",
        options: ["Première option - empathique et axée sur les solutions", "Deuxième option - technique et informative", "Troisième option - décontractée et utile", "Quatrième option - directe et axée sur le remboursement"],
        correct: 0,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex Real-World Scenarios
    {
        question: "Vous négociez un contrat avec un partenaire commercial potentiel. L'autre partie a proposé des termes défavorables à votre entreprise. Quelle approche maintient le mieux la relation tout en protégeant vos intérêts ?\n\n<pre><code>\"Ces termes sont complètement inacceptables. Nous devons recommencer.\"\n\n\"J'apprécie votre proposition. Bien que nous voyions de la valeur dans ce partenariat, nous avons quelques préoccupations concernant les termes actuels que nous aimerions discuter.\"\n\n\"Nous ne pouvons pas accepter ces termes, mais peut-être qu'on peut trouver quelque chose.\"\n\n\"Laissez-moi y réfléchir et je vous recontacte.\"</code></pre>",
        options: ["Première option - directe et ferme", "Deuxième option - diplomatique et collaborative", "Troisième option - vague mais ouverte", "Quatrième option - non-committale"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Vous dirigez une réunion d'équipe où vous devez aborder une baisse de performance. Quelle approche motive le mieux l'amélioration tout en maintenant le moral de l'équipe ?\n\n<pre><code>\"Notre performance a été terrible récemment, et nous devons faire mieux.\"\n\n\"J'ai remarqué quelques défis dans notre performance récente. Travaillons ensemble pour identifier des solutions et remettre les choses sur les rails.\"\n\n\"Tout le monde doit travailler plus dur, ou il y aura des conséquences.\"\n\n\"Je suis déçu des résultats récents de l'équipe. Nous devons nous améliorer immédiatement.\"</code></pre>",
        options: ["Première option - directe et honnête", "Deuxième option - collaborative et axée sur les solutions", "Troisième option - menaçante et exigeante", "Quatrième option - déçue mais ferme"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Vous rédigez une proposition pour un nouveau projet qui nécessite un investissement important. Quelle ouverture capture le mieux l'attention et établit la proposition de valeur ?\n\n<pre><code>\"Nous devons investir dans ce projet parce que c'est important.\"\n\n\"Cette proposition décrit une initiative stratégique qui pourrait augmenter les revenus de 25% tout en réduisant les coûts opérationnels.\"\n\n\"Je pense qu'on devrait faire ce projet. Ça semble être une bonne idée.\"\n\n\"Le document suivant décrit un projet que nous devrions considérer d'implémenter.\"</code></pre>",
        options: ["Première option - simple et directe", "Deuxième option - basée sur les données et convaincante", "Troisième option - décontractée et basée sur l'opinion", "Quatrième option - formelle et neutre"],
        correct: 1,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - Audio Listening Comprehension
    {
        question: "Écoutez l'audio et répondez à la question : Quel est l'argument principal de l'orateur concernant l'intelligence artificielle en médecine ?",
        audioSrc: "audio/french_ai_healthcare.mp3",
        options: ["L'IA remplacera complètement les médecins humains dans une décennie", "L'IA devrait être utilisée comme un outil complémentaire pour améliorer le diagnostic médical", "L'IA pose des risques significatifs qui surpassent ses avantages en médecine", "L'IA n'est adaptée qu'aux tâches administratives en santé"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    {
        question: "Écoutez l'audio et identifiez le ton et le but de l'orateur : Quelle est l'attitude de l'orateur envers la politique environnementale proposée ?",
        audioSrc: "audio/french_environmental_policy.mp3",
        options: ["Sceptique mais ouverte au compromis", "Fortement favorable avec des réserves", "Complètement opposée à tout changement", "Neutre et analytique"],
        correct: 0,
        level: "advanced",
        audioType: true
    },
    {
        question: "Écoutez l'audio et répondez : Quelle recommandation spécifique l'orateur fait-il concernant l'urbanisme ?",
        audioSrc: "audio/french_urban_planning.mp3",
        options: ["Augmenter les places de parking dans les centres-villes", "Implémenter plus d'espaces verts et de zones piétonnes", "Construire des gratte-ciel plus hauts pour accommoder la croissance démographique", "Réduire le financement des transports publics"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    {
        question: "Écoutez l'audio et déterminez : Quelle est l'hypothèse sous-jacente dans l'argument de l'orateur concernant la réforme éducative ?",
        audioSrc: "audio/french_education_reform.mp3",
        options: ["Les méthodes d'enseignement traditionnelles sont complètement inefficaces", "La technologie seule peut résoudre les défis éducatifs", "L'engagement des étudiants est l'indicateur principal du succès d'apprentissage", "Les tests standardisés mesurent avec précision la réussite des étudiants"],
        correct: 2,
        level: "advanced",
        audioType: true
    }
];

let currentAnswers = new Array(frenchQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 400; // 400 seconds for language exam
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
    
    frenchQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const levelBadge = document.createElement('span');
        levelBadge.style.cssText = 'background: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 10px; display: inline-block;';
        levelBadge.textContent = q.level.toUpperCase();
        
        // Check if this is an audio question
        if (q.audioType) {
            questionDiv.innerHTML = `
                ${levelBadge.outerHTML}
                <h3>Question ${index + 1}: ${q.question}</h3>
                <div class="audio-player">
                    <audio controls>
                        <source src="${q.audioSrc}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p class="audio-note"><em>Écoutez l'audio avant de répondre à la question.</em></p>
                </div>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <div class="option" data-question="${index}" data-option="${optIndex}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
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
        }
        
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
    const percentage = Math.round((score / frenchQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${frenchQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === frenchQuestions[index].correct) {
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
        totalQuestions: frenchQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, frenchQuestions, currentAnswers, timeLeft);
}
