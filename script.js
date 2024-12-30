const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris",
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Management Language",
        ],
        answer: "Hyper Text Markup Language",
    },
    {
        question:
            'Which programming language is known as "the mother of all languages"?',
        options: ["C++", "Java", "Python", "Assembly Language"],
        answer: "Assembly Language",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
        ],
        answer: "Cascading Style Sheets",
    },
    {
        question: "What year was JavaScript created?",
        options: ["1995", "1999", "2001", "2005"],
        answer: "1995",
    },
];

let currentQuestion = 0;
let timer;
let correctAnswers = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const questionCounterElement = 
    document.getElementById('question-counter');
const timerValueElement = document.getElementById('timer-value');
const scoreBox = document.getElementById('score-box');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

function displayQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionCounterElement.textContent = 
      `  Question ${currentQuestion + 1}/${quizData.length};`
    questionElement.innerText = currentQuiz.question;
    optionsElement.innerHTML = "";
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', 
            () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuiz = quizData[currentQuestion];
    if (selectedOption === currentQuiz.answer) {
        // Correct answer
        correctAnswers++;
    }
    // Move to next question
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        // Quiz finished
        endQuiz();
    }
}

function startTimer(duration) {
    let timeLeft = duration;
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            timerValueElement.textContent = timeLeft;
        } else {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    const scorePercentage = 
        ((correctAnswers / quizData.length) * 100).toFixed(2);
    scoreElement.textContent = 
       ` ${correctAnswers} out of ${quizData.length} (${scorePercentage}%);`
    scoreBox.classList.remove('hidden');
}

function restartQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    scoreBox.classList.add('hidden');
    displayQuestion();
    startTimer(60); // Start timer again with 60 seconds
}

restartButton.addEventListener('click', restartQuiz);

// Start quiz
displayQuestion();
startTimer(60); // Start timer with 60 seconds