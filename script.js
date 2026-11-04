
// 1. QUESTIONS

const questions = [
    {
        question: "What is the probability of getting heads when flipping a fair coin?",
        options: ["1/4", "1/2", "1/3", "1"],
        correct: ["1/2"],
        difficulty: "Easy"
    },
    {
        question: "What is the probability of rolling a 4 on a fair six-sided die?",
        options: ["1/2", "1/3", "1/6", "1/4"],
        correct: ["1/6"],
        difficulty: "Easy"
    },
    {
        question: "A bag contains 3 red balls and 2 blue balls. What is P(red)?",
        options: ["2/5", "3/5", "1/2", "3/2"],
        correct: ["3/5"],
        difficulty: "Easy"
    },
    {
        question: "Two fair coins are tossed. What is the probability of getting exactly one head?",
        options: ["1/4", "1/2", "3/4", "1"],
        correct: ["1/2"],
        difficulty: "Medium"
    },
    {
        question: "What is the probability of drawing a king from a standard 52-card deck?",
        options: ["1/4", "1/26", "1/13", "4/13"],
        correct: ["1/13"],
        difficulty: "Medium"
    },
    {
        question: "Select all correct statements about probability.",
        options: [
            "Probability is between 0 and 1",
            "An impossible event has probability 1",
            "An impossible event has probability 0",
            "The probabilities of all outcomes sum to 1"
        ],
        correct: [
            "Probability is between 0 and 1",
            "An impossible event has probability 0",
            "The probabilities of all outcomes sum to 1"
        ],
        difficulty: "Medium",
        multiple: true
    },
    {
        question: "What is the probability of rolling an even number on a fair six-sided die?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        correct: ["1/2"],
        difficulty: "Medium"
    },
    {
        question: "Independent events are events where the occurrence of one does not change the probability of the other.",
        options: ["True", "False"],
        correct: ["True"],
        difficulty: "Medium"
    },
    {
        question: "A bag contains 5 white and 3 black balls. Two balls are drawn without replacement. What is the probability that both are white?",
        options: ["5/14", "5/8", "1/2", "10/14"],
        correct: ["5/14"],
        difficulty: "Hard"
    },
    {
        question: "A random variable X has P(0)=0.2, P(1)=0.5 and P(2)=0.3. Find E(X).",
        options: ["0.8", "1.0", "1.1", "1.5"],
        correct: ["1.1"],
        difficulty: "Hard"
    }
];


// 2. VARIABLES

let currentQuestion = 0;
let userAnswers = {};


// 3. GET HTML ELEMENTS

const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");

const numberText = document.getElementById("question-number");
const difficultyText = document.getElementById("difficulty");

const progressBar = document.getElementById("progress-bar");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");


// 4. START QUIZ

document.getElementById("start-btn").onclick = function() {
    startPage.classList.add("hidden");
    quizPage.classList.remove("hidden");

    showQuestion();
};


// 5. DISPLAY QUESTION

function showQuestion() {

    const q = questions[currentQuestion];

    numberText.textContent =
        "Question " + (currentQuestion + 1) + " / 10";

    difficultyText.textContent = q.difficulty;

    questionText.textContent = q.question;

    document.getElementById("instruction").textContent =
        q.multiple ? "Select all correct answers." : "Select one answer.";

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    answersDiv.innerHTML = "";

    q.options.forEach(function(option) {

        const label = document.createElement("label");
        label.className = "answer";

        const input = document.createElement("input");

        input.type = q.multiple ? "checkbox" : "radio";
        input.name = "answer";

        input.value = option;

        const saved = userAnswers[currentQuestion] || [];

        input.checked = saved.includes(option);

        input.onchange = saveAnswer;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));

        answersDiv.appendChild(label);
    });

    prevBtn.classList.toggle("hidden", currentQuestion === 0);

    nextBtn.classList.toggle(
        "hidden",
        currentQuestion === questions.length - 1
    );

    finishBtn.classList.toggle(
        "hidden",
        currentQuestion !== questions.length - 1
    );
}


// 6. SAVE ANSWER

function saveAnswer() {

    const selected = document.querySelectorAll(
        'input[name="answer"]:checked'
    );

    userAnswers[currentQuestion] =
        Array.from(selected).map(function(input) {
            return input.value;
        });
}


// 7. NEXT QUESTION

nextBtn.onclick = function() {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
};


// 8. PREVIOUS QUESTION

prevBtn.onclick = function() {

    saveAnswer();

    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
};


// 9. FINISH QUIZ AND CHECK ANSWERS

finishBtn.onclick = function() {

    saveAnswer();

    let score = 0;

    let reviewHTML = "";

    questions.forEach(function(q, index) {

        const user = userAnswers[index] || [];

        const correct = q.correct;

        const isCorrect =
            user.length === correct.length &&
            correct.every(function(answer) {
                return user.includes(answer);
            });

        if (isCorrect) {
            score++;
        }

        reviewHTML += `
            <div class="review-item">
                <strong>Question ${index + 1}</strong><br>
                Your answer: ${user.length ? user.join(", ") : "Not answered"}<br>
                Correct answer: ${correct.join(", ")}<br>
                Result: ${isCorrect ? "Correct ✓" : "Incorrect ✗"}
            </div>
        `;
    });


    // 10. CALCULATE PERCENTAGE

    const percentage = Math.round(
        (score / questions.length) * 100
    );


    // 11. SHOW RESULT

    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    document.getElementById("score").textContent =
        score + " / " + questions.length;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("feedback").textContent =
        percentage >= 80
        ? "Excellent work! Keep it up!"
        : percentage >= 50
        ? "Good effort! Keep practicing!"
        : "Keep learning. You can improve!";

    document.getElementById("review").innerHTML =
        reviewHTML;
};


// 12. RESTART QUIZ

document.getElementById("restart-btn").onclick = function() {

    currentQuestion = 0;
    userAnswers = {};

    resultPage.classList.add("hidden");
    startPage.classList.remove("hidden");

};
