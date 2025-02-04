function setCookie(name, value, days) {
    /**
     * Set a cookie with the given name, value and expiration date
     * @param {string} name - The name of the cookie
     * @param {string} value - The value of the cookie
     * @param {number} days - The number of days until the cookie expires
     * @returns {void}
    */
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    /**
     * Get the value of a cookie with the given name
     * @param {string} name - The name of the cookie
     * @returns {string} - The value of the cookie
    */
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    const prefix = name + "=";
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(prefix) === 0) {
            return c.substring(prefix.length, c.length);
        }
    }
    return "";
}

document.addEventListener('DOMContentLoaded', () => {
    // Create variables
    let questions = [];
    let order = [];
    let currentIndex = -1;
    let correct = [];
    let wrong = [];

    // The action button is initially in "submit" mode
    let mode = 'submit';

    // Get the quiz container
    const container = document.getElementById('quiz-container');

    let savedProgress = getCookie('quizProgress');
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            correct = progress.correct;
            wrong = progress.wrong;
            order = progress.order;
            currentIndex = progress.currentIndex;
        } catch (e) {
            console.error('Failed to parse saved progress:', e);
        }
    }

    function renderQuestion(index) {
        /**
         * Render the question at the given index
         * @param {number} index - The index of the question to render
         * @returns {void}
         */
        const q = questions[index];
        const correct_answer = q.Answers[q.Correct];
        q.Answers = q.Answers.sort(() => Math.random() - 0.5);
        q.Correct = q.Answers.indexOf(correct_answer);

        container.innerHTML = `
          <div class="question-container">
            <h2>Question<span class="question-number">#${String(index + 1).padStart(3, '0')}</span></h2>
            <p>${q.Question}</p>
            ${q.Answers.map((ans, i) => `
              <label name="answer_label">
                <input type="radio" name="answer_radio" value="${correct_answer === ans}" />
                ${ans}
              </label><br/>
            `).join('')}
            <button id="actionBtn" class="action-btn">Submit</button>
          </div>
        `;

        updateScoreBox();

        const actionBtn = document.getElementById('actionBtn');
        actionBtn.addEventListener('click', () => actionBtnClick());
        actionBtn.disabled = true;

        const radios = container.querySelectorAll('input[name="answer_radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                actionBtn.disabled = false;
            });
        });
    }

    function updateScoreBox() {
        /**
         * Update the score display
         * @returns {void}
         */
        document.getElementById('textBox').textContent =
            `You have completed ${correct.length + wrong.length} out of ${questions.length} with ${correct.length} correct.`;

        const scoreBox = document.getElementById('scoreBox');
        scoreBox.innerHTML = `
            <div class="grid-container">
                ${questions.map((q, i) => {
            let color = 'var(--primary-color);';
            let answeredClass = '';
            if (correct.includes(i)) {
                color = 'var(--correct-color);';
                answeredClass = 'answered';
            } else if (wrong.includes(i)) {
                color = 'var(--wrong-color);';
                answeredClass = 'answered';
            }
            return `<div class="dot ${answeredClass}" data-index="${i}" style="background-color: ${color};"></div>`;
        }).join('')}
            </div>
        `;

        const dots = scoreBox.querySelectorAll('.dot.answered');
        dots.forEach(dot => {
            const index = dot.getAttribute('data-index');
            const q = questions[index];
            const correct_answer = q.Answers[q.Correct];
            const tooltip = document.createElement('div');
            tooltip.className = 'question-answer';
            tooltip.innerHTML = `
                <p>Question: ${q.Question}</p>
                <p>Answer: ${correct_answer}</p>
            `;
            dot.appendChild(tooltip);
        });
    }

    function actionBtnClick() {
        /**
         * Handle the action button click event
         * @returns {void}
         */
        const radios = container.querySelectorAll('input[name="answer_radio"]');

        if (mode === 'submit') {
            const selected = document.querySelector('input[name="answer_radio"]:checked');

            radios.forEach(radio => {
                radio.disabled = true;
                radio.parentElement.style.color = (radio.value === "true") ? '#34a853' : '#ea4335';
            });

            if (selected.value === "true") {
                container.classList.add('flash-correct');
                setTimeout(() => container.classList.remove('flash-correct'), 700);
                correct.push(currentIndex);
            } else {
                container.classList.add('flash-wrong');
                setTimeout(() => container.classList.remove('flash-wrong'), 700);
                wrong.push(currentIndex);
            }

            updateScoreBox();

            actionBtn.textContent = "Next";
            actionBtn.classList.add('action-btn');
            mode = 'next';

            currentIndex = order.pop();

            setCookie('quizProgress', JSON.stringify({
                correct,
                wrong,
                order,
                currentIndex
            }), 7);

        } else {
            if (currentIndex !== undefined && currentIndex !== -1) {
                renderQuestion(currentIndex);
            } else {
                container.innerHTML = "<h2>Quiz Completed</h2>";
            }

            actionBtn.textContent = "Submit";
            actionBtn.classList.add('action-btn');
            mode = 'submit';
        }
    }

    fetch('./questions.json')
        .then(res => res.json())
        .then(data => {
            questions = data;

            if (order.length === 0) {
                order = Array.from({ length: questions.length }, (_, i) => i).sort(() => Math.random() - 0.5);
                currentIndex = order.pop();
            }

            document.addEventListener('keydown', function(event) {
                const actionBtn = document.getElementById('actionBtn');
                if (event.key === 'Enter') {
                    if (!actionBtn.disabled) {
                        actionBtnClick();
                    }
                }
                if (event.key === '1') {
                    const radios = container.querySelectorAll('input[name="answer_radio"]');
                    radios[0].checked = true;
                    actionBtn.disabled = false;
                }
                if (event.key === '2') {
                    const radios = container.querySelectorAll('input[name="answer_radio"]');
                    radios[1].checked = true;
                    actionBtn.disabled = false;
                }
                if (event.key === '3') {
                    const radios = container.querySelectorAll('input[name="answer_radio"]');
                    radios[2].checked = true;
                    actionBtn.disabled = false;
                }
                if (event.key === '4') {
                    const radios = container.querySelectorAll('input[name="answer_radio"]');
                    radios[3].checked = true;
                    actionBtn.disabled = false;
                }
            });

            renderQuestion(currentIndex);
        });

    document.getElementById('printBtn').addEventListener('click', () => {
        const printDiv = document.getElementById('printContainer');
        let content = '';

        const buildList = (indices, color) => {
            indices.forEach(idx => {
                const q = questions[idx];
                content += `
                    <div style="color: black; margin: 10px 0;">
                    <b style="color: ${color}">Question ${idx + 1}:</b> ${q.Question}
                    <ul>
                ${q.Answers.map((ans, i) => {
                    const isCorrect = i === q.Correct;
                    return `
                    <li>${isCorrect ? '<b>' + ans + '</b>' : ans}</li>
                    `;
                }).join('')}
                </ul>
                    </div>
                    `;
            });
        };

        content += '<h2 style="color: var(--correct-color);">Correct Answers</h2>';
        buildList(correct, 'var(--correct-color)');
        content += '<h2 style="color: var(--wrong-color);">Wrong Answers</h2>';
        buildList(wrong, 'var(--wrong-color)');

        printDiv.innerHTML = content;

        window.print();
    });
});