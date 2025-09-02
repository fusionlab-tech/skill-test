// Spanish Language Exam Questions - B2-C1 Level
const spanishQuestions = [
    // Basic Questions (3) - B2 Level - More Technically Complex
    {
        question: "Identifica la estructura gramatical en esta oración: 'No solo la empresa superó sus objetivos trimestrales, sino que también logró reducir los costos operativos en un 15%.'",
        options: ["Inversión con adverbio negativo", "Condicional mixto", "Cláusula relativa no restrictiva", "Modo subjuntivo"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Elige la palabra correcta para completar esta oración: 'El _____ crecimiento del sector tecnológico ha creado oportunidades sin precedentes para la innovación.'",
        options: ["floreciente", "próspero", "expansivo", "desarrollado"],
        correct: 0,
        level: "basic"
    },
    {
        question: "Analiza esta oración: 'Los hallazgos de la investigación, que fueron publicados el mes pasado, desafían la sabiduría convencional sobre el cambio climático.' ¿Qué tipo de cláusula es 'que fueron publicados el mes pasado'?",
        options: ["Cláusula relativa restrictiva", "Cláusula relativa no restrictiva", "Cláusula adverbial", "Cláusula sustantiva"],
        correct: 1,
        level: "basic"
    },
    
    // Middle Questions (3) - B2+ Level - More Complex
    {
        question: "Completa esta oración con la estructura condicional apropiada: 'Si el gobierno _____ más financiamiento para proyectos de energía renovable, nosotros _____ haber logrado nuestros objetivos de reducción de carbono para ahora.'",
        options: ["hubiera proporcionado / habríamos", "proporcionara / podríamos", "proporcionaría / habríamos", "proporciona / podremos"],
        correct: 0,
        level: "middle"
    },
    {
        question: "Identifica el recurso retórico en esta oración: 'La infraestructura de la ciudad se derrumbó como un castillo de naipes durante la crisis económica.'",
        options: ["Metáfora", "Símil", "Hipérbole", "Personificación"],
        correct: 1,
        level: "middle"
    },
    {
        question: "Elige la palabra más apropiada para este contexto académico: 'La metodología del estudio _____ varias limitaciones que pueden afectar la validez de sus conclusiones.'",
        options: ["exhibe", "demuestra", "revela", "presenta"],
        correct: 0,
        level: "middle"
    },
    
    // Advanced Questions (4) - C1 Level - Audio Listening Comprehension
    {
        question: "Escucha el audio y responde la pregunta: ¿Cuál es el argumento principal del hablante sobre la inteligencia artificial en la atención médica?",
        audioSrc: "audio/spanish_ai_healthcare.mp3",
        options: ["La IA reemplazará completamente a los médicos humanos dentro de una década", "La IA debe usarse como herramienta complementaria para mejorar el diagnóstico médico", "La IA presenta riesgos significativos que superan sus beneficios en medicina", "La IA solo es adecuada para tareas administrativas en la atención médica"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    {
        question: "Escucha el audio e identifica el tono y propósito del hablante: ¿Cuál es la actitud del hablante hacia la política ambiental propuesta?",
        audioSrc: "audio/spanish_environmental_policy.mp3",
        options: ["Escéptico pero abierto al compromiso", "Fuertemente partidario con reservas", "Completamente opuesto a cualquier cambio", "Neutral y analítico"],
        correct: 0,
        level: "advanced",
        audioType: true
    },
    {
        question: "Escucha el audio y responde: ¿Qué recomendación específica hace el hablante con respecto a la planificación urbana?",
        audioSrc: "audio/spanish_urban_planning.mp3",
        options: ["Aumentar espacios de estacionamiento en centros urbanos", "Implementar más espacios verdes y zonas peatonales", "Construir rascacielos más altos para acomodar el crecimiento poblacional", "Reducir el financiamiento del transporte público"],
        correct: 1,
        level: "advanced",
        audioType: true
    },
    {
        question: "Escucha el audio y determina: ¿Cuál es la suposición subyacente en el argumento del hablante sobre la reforma educativa?",
        audioSrc: "audio/spanish_education_reform.mp3",
        options: ["Los métodos de enseñanza tradicionales son completamente inefectivos", "La tecnología por sí sola puede resolver los desafíos educativos", "El compromiso del estudiante es el indicador principal del éxito del aprendizaje", "Las pruebas estandarizadas miden con precisión el logro del estudiante"],
        correct: 2,
        level: "advanced",
        audioType: true
    }
];

let currentAnswers = new Array(spanishQuestions.length).fill(-1);
let examStarted = false;
let timeLeft = 500; // 500 seconds for language exam
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
        
        // Check if this is an audio question
        if (q.audioType) {
            questionDiv.innerHTML = `
                ${levelBadge.outerHTML}
                <h3>Question ${index + 1}: ${q.question}</h3>
                <div class="audio-player">
                    <audio controls>
                        <source src="${q.audioSrc}" type="audio/mpeg">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                    <p class="audio-note"><em>Escucha el audio antes de responder la pregunta.</em></p>
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
