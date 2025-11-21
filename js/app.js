const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const nextBtn = document.getElementById("next-btn");

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const scoreText = document.getElementById("score-text");

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    loadQuestion();
});

function loadQuestion() {
    let q = questions[currentQuestion];

    questionText.innerText = q.question;
    optionsBox.innerHTML = "";
    nextBtn.classList.add("hidden");

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option);
        optionsBox.appendChild(btn);
    });
}

function checkAnswer(button, selected) {
    let correctAnswer = questions[currentQuestion].answer;

    // Disable all buttons after choosing
    Array.from(optionsBox.children).forEach(btn => btn.disabled = true);

    if (selected === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");

        // highlight jawaban benar
        Array.from(optionsBox.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    scoreText.innerText = `Skor kamu: ${score} dari ${questions.length}`;
}