const questions = [
    {
        question: "1. What is the probability of getting heads when tossing a fair coin?",
        answers: ["1/2", "1/3", "1/4", "1"],
        correct: "1/2"
    },
    {
        question: "2. What is the probability of rolling a 4 on a fair six-sided die?",
        answers: ["1/2", "1/6", "1/3", "1/4"],
        correct: "1/6"
    },
    {
        question: "3. A bag contains 3 red balls and 2 blue balls. What is P(red)?",
        answers: ["2/5", "1/5", "3/5", "1/2"],
        correct: "3/5"
    },
    {
        question: "4. Two fair coins are tossed. What is the probability of getting exactly one head?",
        answers: ["1/4", "1/2", "3/4", "1"],
        correct: "1/2"
    },
    {
        question: "5. What is the probability of selecting a King from a standard 52-card deck?",
        answers: ["1/4", "1/13", "4/13", "1/52"],
        correct: "1/13"
    },
    {
        question: "6. Which statement about probability is correct?",
        answers: [
            ["Probability is between 0 and 1", "An impossible event has probability 0", "The sum of all probabilities is 1"],
            "Probability can be greater than 1"
        ],
        correct: [
            "Probability is between 0 and 1",
            "An impossible event has probability 0",
            "The sum of all probabilities is 1"
        ],
        multiple: true
    },
    {
        question: "7. What is the probability of rolling an even number on a fair die?",
        answers: ["1/3", "1/2", "2/3", "1/6"],
        correct: "1/2"
    },
    {
        question: "8. Independent events are events where the occurrence of one does not affect the probability of the other.",
        answers: ["True", "False"],
        correct: "True"
    },
    {
        question: "9. A bag has 5 white and 3 black balls. Two balls are drawn without replacement. What is the probability that both are white?",
        answers: ["5/14", "1/2", "5/8", "10/64"],
        correct: "5/14"
    },
    {
        question: "10. Find E(X), if P(X=0)=0.2, P(X=1)=0.5, and P(X=2)=0.3.",
        answers: ["0.8", "1.0", "1.1", "1.5"],
        correct: "1.1"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const scoreText = document.getElementById("score");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    startBtn.classList.add("hidden");
    quiz.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    questionText.textContent = q.question;
    answersDiv.innerHTML = "";

    if (q.multiple) {
        q.answers[0].forEach(answer => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.value = answer;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + answer));
            answersDiv.appendChild(label);
            answersDiv.appendChild(document.createElement("br"));
        });
    } else {
        q.answers.forEach(answer => {
            const button = document.createElement("button");

            button.textContent = answer;
            button.addEventListener("click", () => {
                userAnswers[currentQuestion] = answer;

                Array.from(answersDiv.children).forEach(item => {
                    item.style.backgroundColor = "#f8d5e5";
                });

                button.style.backgroundColor = "#d66c9c";
            });

            answersDiv.appendChild(button);
        });
    }

    nextBtn.textContent =
        currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

function nextQuestion() {
    const q = questions[currentQuestion];

    if (q.multiple) {
        const selected = Array.from(
            answersDiv.querySelectorAll("input:checked")
        ).map(input => input.value);

        userAnswers[currentQuestion] = selected;
    }

    if (userAnswers[currentQuestion] === undefined) {
        alert("Please select an answer!");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    score = 0;

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];

        if (q.multiple) {
            const correct = [...q.correct].sort().join("|");
            const selected = [...(userAnswer || [])].sort().join("|");

            if (correct === selected) {
                score++;
            }
        } else if (userAnswer === q.correct) {
            score++;
        }
    });

    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    const percentage = (score / questions.length) * 100;

    scoreText.textContent =
        `You got ${score} out of 10 correct (${percentage}%).`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    result.classList.add("hidden");
    quiz.classList.remove("hidden");

    showQuestion();
}
