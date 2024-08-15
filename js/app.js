const questions = [
    {
        question: "Quelle est la capitale du Senegal ?",
        options: ["Londres", "Berlin", "Dakar"],
        correctAnswer: 2
    },
    {
        question: "Quelle est la couleur du ciel ?",
        options: ["Rouge", "Bleu", "Vert"],
        correctAnswer: 1
    },
    // Ajoute plus de questions ici...
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-btn').onclick = function() {
    document.getElementById('loading-page').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    displayQuestion();
};

function displayQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, index) => {
        const checkbox = document.createElement('div');
        checkbox.innerText = option;
        checkbox.className = 'checkbox';
        checkbox.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(checkbox);
    });
}

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox, index) => {
        if (index === questionData.correctAnswer) {
            checkbox.classList.add('correct');
        } else if (index === selectedIndex) {
            checkbox.classList.add('incorrect');
        }
    });

    if (selectedIndex === questionData.correctAnswer) {
        score += 10;
    }

    document.getElementById("score").innerText = score;
    document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn').onclick = function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        this.style.display = 'none';
    } else {
        handleGameEnd();
    }
};

function handleGameEnd() {
    const correctAnswers = score / 10;
    const incorrectAnswers = questions.length - correctAnswers;

    const summaryText = `
        Vous avez répondu à ${questions.length} questions.
        Correctes : ${correctAnswers}
        Incorrectes : ${incorrectAnswers}
        Votre score final est de ${score} points.
    `;
    document.getElementById('game-summary').innerText = summaryText;
    document.getElementById('end-game-modal').style.display = 'block';

    document.getElementById('restart-btn').onclick = restartGame;
    document.getElementById('quit-btn').onclick = quitGame;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('end-game-modal').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    displayQuestion();
}

function quitGame() {
    alert("Merci d'avoir joué !");
    window.close(); // Ou rediriger vers une autre page
}
