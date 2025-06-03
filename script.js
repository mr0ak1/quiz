const questions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        choices: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    }
];

// DOM Elements
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const currentQuestionElement = document.getElementById('current');
const totalQuestionsElement = document.getElementById('total');
const scoreElement = document.getElementById('score-value');
const resultElement = document.getElementById('result');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Initialize the quiz
function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    questionContainer.classList.remove('hide');
    resultElement.classList.add('hide');
    setNextQuestion();
}

// Set up the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    totalQuestionsElement.textContent = shuffledQuestions.length;
}

// Display the current question and choices
function showQuestion(question) {
    questionElement.textContent = question.question;
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        choicesElement.appendChild(button);
    });
}

// Reset the state for the next question
function resetState() {
    nextButton.classList.add('hide');
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(index) {
    const correct = shuffledQuestions[currentQuestionIndex].correct;
    const buttons = choicesElement.children;
    
    // Disable all buttons
    Array.from(buttons).forEach(button => {
        button.disabled = true;
    });

    // Show correct/wrong feedback
    if (index === correct) {
        buttons[index].classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        buttons[index].classList.add('wrong');
        buttons[correct].classList.add('correct');
    }

    // Show next button if not last question
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        showResults();
    }
}

// Show quiz results
function showResults() {
    questionContainer.classList.add('hide');
    resultElement.classList.remove('hide');
    finalScoreElement.textContent = `${score} out of ${shuffledQuestions.length}`;
}

// Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startQuiz); 