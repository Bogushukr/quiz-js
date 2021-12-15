import questions from './questions.js';

const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4'),
    optionElements = document.querySelectorAll('.option'),
    question = document.getElementById('question'),
    numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    answersTracker = document.getElementById('answers-tracker'),
    btnNext = document.getElementById('btn-next'),
    btnTryAgain = document.getElementById('btn-try-again'),
    titleModal = document.getElementById('quiz-over-modal-title'),
    correctAnswer = document.getElementById('correct-answer');

let indexOfQuestion,
    indexOfPage = 0,
    score = 0;

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question
    
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};
let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOption();
};

for (const option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
};

const disabledOption = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct')
        }
    });
};

const enableOption = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enableOption();
    }
}; 

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
    modalTitle();
};

const tryAgain = () => {
    window.location.reload();
};

const modalTitle = () => {
    if (score <= 3) {
        titleModal.innerHTML = 'Плохой результат!';
    } else if (score <= 5) {
        titleModal.innerHTML = 'Хороший результат!';
    } else {
    titleModal.innerHTML = 'Супер результат!';
    }
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
