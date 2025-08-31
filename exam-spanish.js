// Spanish Language Exam Questions - B2-C1 Level
const spanishQuestions = [
    // Basic Questions (3) - B2 Level
    {
        question: "Analiza esta oración:\n\"Los hallazgos de la investigación, que fueron publicados el mes pasado, han sido recibidos con considerable escepticismo por la comunidad académica.\"\n¿Qué tipo de cláusula es \"que fueron publicados el mes pasado\"?",
        options: ["Cláusula relativa restrictiva", "Cláusula relativa no restrictiva", "Cláusula adverbial", "Cláusula sustantiva"],
        correct: 1,
        level: "basic"
    },
    {
        question: "En la oración:\n\"No solo la empresa superó sus objetivos trimestrales, sino que también logró reducir los costos operativos en un 15%.\"\n¿Qué estructura gramatical se está utilizando?",
        options: ["Inversión con adverbio negativo", "Construcción de voz pasiva", "Modo subjuntivo", "Frase gerundial"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Dado este texto:\n\"El campo floreciente de la inteligencia artificial ha precipitado dilemas éticos sin precedentes que desafían nuestra comprensión fundamental de la conciencia y autonomía humanas.\"\n¿Qué significa 'floreciente' en este contexto?",
        options: ["Declinando rápidamente", "Creciendo y desarrollándose", "Controvertido y disputado", "Tecnológicamente avanzado"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level
    {
        question: "Analiza esta oración compleja:\n\"De haber implementado el gobierno las regulaciones ambientales propuestas antes, la crisis ecológica actual podría haber sido evitada, aunque las implicaciones económicas habrían sido sustanciales.\"\n¿Qué estructura condicional se usa aquí?",
        options: ["Tercer condicional con referencia temporal mixta", "Segundo condicional con pretérito pluscuamperfecto", "Condicional mixto (pretérito pluscuamperfecto + habría)", "Condicional invertido con modal"],
        correct: 2,
        level: "middle"
    },
    {
        question: "Considera este pasaje académico:\n\"El fenómeno de la disonancia cognitiva, mediante el cual los individuos experimentan malestar psicológico cuando sus creencias entran en conflicto con sus acciones, tiene implicaciones profundas para las intervenciones de cambio conductual.\"\n¿Qué dispositivo retórico está funcionando 'mediante el cual'?",
        options: ["Un pronombre relativo", "Un adverbio conjuntivo", "Una conjunción subordinante", "Un marcador discursivo"],
        correct: 2,
        level: "middle"
    },
    {
        question: "En esta oración:\n\"La decisión de la empresa de diversificar su portafolio, manteniendo simultáneamente sus competencias centrales, ejemplifica la previsión estratégica en un mercado cada vez más volátil.\"\n¿Cuál es la función del infinitivo 'diversificar'?",
        options: ["Sujeto de la oración", "Objeto de la preposición", "Modificador del sustantivo 'decisión'", "Complemento del verbo 'ejemplifica'"],
        correct: 2,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level
    {
        question: "Examina esta construcción sofisticada:\n\"De no ser por los avances tecnológicos sin precedentes de la última década, el cambio de paradigma actual en la metodología educativa apenas sería concebible, y mucho menos implementable.\"\n¿Qué características gramaticales hacen que esta oración sea particularmente compleja?",
        options: ["Subjuntivo invertido, múltiples verbos modales y nominalización", "Voz pasiva, cláusulas relativas y frases participiales", "Cláusulas condicionales, construcciones de infinitivo y gerundios", "Modo subjuntivo, inversión y frases adverbiales complejas"],
        correct: 0,
        level: "advanced"
    },
    {
        question: "Considera este discurso académico:\n\"Los fundamentos epistemológicos sobre los que se predica la indagación científica contemporánea necesitan una reevaluación fundamental de los enfoques metodológicos, particularmente a la luz de paradigmas interdisciplinarios emergentes que desafían los límites disciplinarios tradicionales.\"\n¿Cuál es la función retórica principal de esta oración?",
        options: ["Presentar una hipótesis", "Establecer marco teórico", "Criticar metodología existente", "Proponer una solución"],
        correct: 1,
        level: "advanced"
    },
    {
        question: "Analiza esta estructura de oración compleja:\n\"No obstante los considerables desafíos inherentes a implementar una agenda de reforma tan integral, los beneficios potenciales—que van desde la eficiencia mejorada y mejores resultados hasta una mayor satisfacción de las partes interesadas—superan con creces los costos y riesgos asociados.\"\n¿Cuál es la función de la frase encerrada entre guiones?",
        options: ["Explicación parentética", "Frase apositiva", "Modificador no restrictivo", "Todas las anteriores"],
        correct: 3,
        level: "advanced"
    },
    {
        question: "En esta construcción sofisticada:\n\"El grado en que estas proposiciones teóricas pueden ser operacionalizadas en contextos prácticos depende no meramente de su validez inherente, sino también del grado en que los marcos institucionales y los intereses de las partes interesadas se alinean con los principios subyacentes.\"\n¿Qué estructura gramatical crea la complejidad?",
        options: ["Múltiples cláusulas embebidas y estructura paralela", "Voz pasiva y verbos modales", "Frases de infinitivo y gerundios", "Cláusulas relativas y construcciones participiales"],
        correct: 0,
        level: "advanced"
    }
];

let currentAnswers = new Array(spanishQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 300; // 300 seconds for language exam
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
    
    spanishQuestions.forEach((q, index) => {
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
    const percentage = Math.round((score / spanishQuestions.length) * 100);
    
    document.getElementById('examContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultMessage').textContent = `You scored ${score} out of ${spanishQuestions.length} questions correctly.`;
    
    // Send results via email
    sendResults(score, percentage);
}

function calculateScore() {
    let score = 0;
    currentAnswers.forEach((answer, index) => {
        if (answer === spanishQuestions[index].correct) {
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
        totalQuestions: spanishQuestions.length,
        percentage: percentage
    };
    
    // Use the centralized email utility
    handleEmailSending(candidateInfo, examResults, spanishQuestions, currentAnswers, timeLeft);
}
