const questions = [
    {
        question: "📅 When did the Berlin Wall fall?",
        options: ["1985", "1989", "1991", "1995"],
        answer: "1989",
        fact: "The Berlin Wall fell on November 9, 1989, marking the end of the Cold War."
    },
    {
        question: "📅 In which year did the Titanic sink?",
        options: ["1902", "1912", "1922", "1932"],
        answer: "1912",
        fact: "The Titanic sank on April 15, 1912, after hitting an iceberg."
    },
    {
        question: "📅 When did World War II end?",
        options: ["1939", "1941", "1945", "1950"],
        answer: "1945",
        fact: "World War II ended on September 2, 1945, with Japan’s surrender."
    }
];

const today = new Date().toDateString();
const storedDate = localStorage.getItem("quizDate");

if (storedDate === today) {
    document.getElementById("question").innerText = "🛑 You have already played today! Come back tomorrow!";
    document.getElementById("timer").style.display = "none";
} else {
    startGame();
}

function startGame() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    let currentQuestion = questions[randomIndex];

    document.getElementById("question").innerText = currentQuestion.question;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    currentQuestion.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, currentQuestion.answer, currentQuestion.fact);
        optionsDiv.appendChild(btn);
    });

    let timeLeft = 30;
    let timerElement = document.getElementById("time");

    let countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(countdown);
            lockGame();
            document.getElementById("message").innerHTML = `<span class='wrong'>⏳ Time's up! Try again tomorrow.</span>`;
        }
    }, 1000);
}

function checkAnswer(selected, correct, fact) {
    lockGame();

    if (selected === correct) {
        document.getElementById("message").innerHTML = `<span class='correct'>✅ Correct! ${fact}</span>`;
    } else {
        document.getElementById("message").innerHTML = `<span class='wrong'>❌ Wrong! The correct answer was ${correct}. ${fact}</span>`;
    }

    document.getElementById("next-btn").style.display = "block";
    localStorage.setItem("quizDate", today);
}

function lockGame() {
    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    location.reload();
}