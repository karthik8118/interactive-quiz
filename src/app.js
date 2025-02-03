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

    // Decode the cookie string
    const decodedCookie = decodeURIComponent(document.cookie);

    // Split the cookie string into an array of cookies
    const ca = decodedCookie.split(';');

    // Find the cookie with the given name
    const prefix = name + "=";
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(prefix) === 0) {
            return c.substring(prefix.length, c.length);
        }
    }

    // Return an empty string if the cookie is not found
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
            const parsed = JSON.parse(savedProgress);
            correct = parsed.correct || [];
            wrong = parsed.wrong || [];
            order = parsed.order || [];
            currentIndex = parsed.currentIndex ?? -1;
        } catch (e) {
            console.error("Failed to parse progress:", e);
        }
    }

    function renderQuestion(index) {
        /**
         * Render the question at the given index
         * @param {number} index - The index of the question to render
         * @returns {void}
         */

        // Get the question at the given index
        const q = questions[index];

        // Shuffle the answers and keep track of the correct answer
        const correct_answer = q.Answers[q.Correct];
        q.Answers = q.Answers.sort(() => Math.random() - 0.5);
        q.Correct = q.Answers.indexOf(correct_answer);

        // Render the question in the quiz-container
        container.innerHTML = `
      <h2>Question<span class="question-number">#${String(index + 1).padStart(3, '0')}</span></h2>
      <p>${q.Question}</p>
      ${q.Answers.map((ans, i) => `
        <label name="answer_label">
          <input type="radio" name="answer_radio" value="${correct_answer === ans}" />
          ${ans}
        </label><br/>
      `).join('')}
      <button id="actionBtn">Submit</button>
    `;

        // Update the score display
        updateScoreBox();

        // Get the action button, add an event listener and disable it
        const actionBtn = document.getElementById('actionBtn');
        actionBtn.addEventListener('click', () => actionBtnClick());
        actionBtn.disabled = true;

        // Get the radio buttons and add an event listener to enable the action button
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

        // Display how many questions (including current) remain
        document.getElementById('textBox').textContent =
            `You have completed ${correct.length + wrong.length} out of ${questions.length} with ${correct.length} correct.`;

        // Get the score box
        const scoreBox = document.getElementById('scoreBox');

        // Color the dots based on the correctness of the answers
        scoreBox.innerHTML = `
            <div class="grid-container">
                ${questions.map((q, i) => {
            let color = 'var(--primary-color);';
            if (correct.includes(i)) {
                color = 'var(--correct-color);';
            } else if (wrong.includes(i)) {
                color = 'var(--wrong-color);';
            }
            return `<div class="dot" style="background-color: ${color};"></div>`;
        }).join('')}
            </div>
        `;
    }

    function actionBtnClick() {
        /**
         * Handle the action button click event
         * @returns {void}
         */

        // Get the radio buttons
        const radios = container.querySelectorAll('input[name="answer_radio"]');

        if (mode === 'submit') {
            const selected = document.querySelector('input[name="answer_radio"]:checked');

            // Disable radio buttons and color them
            radios.forEach(radio => {
                radio.disabled = true;
                radio.parentElement.style.color = (radio.value === "true") ? '#34a853' : '#ea4335';
            });

            // Track correct answers
            if (selected.value === "true") {
                container.classList.add('flash-correct');
                setTimeout(() => container.classList.remove('flash-correct'), 700);
                correct.push(currentIndex);
            } else {
                container.classList.add('flash-wrong');
                setTimeout(() => container.classList.remove('flash-wrong'), 700);
                wrong.push(currentIndex);
            }

            // Update score display
            updateScoreBox();

            // Switch to "next" mode
            actionBtn.textContent = "Next";
            mode = 'next';

            // Get the next question index
            currentIndex = order.pop();

            // Save the progress
            setCookie('quizProgress', JSON.stringify({
                correct,
                wrong,
                order,
                currentIndex
            }), 7);

        } else {// Proceed to next question

            // Render the next question or end the quiz
            if (currentIndex !== undefined && currentIndex !== -1) {
                renderQuestion(currentIndex);
            } else {
                container.innerHTML = "<h2>Quiz Completed</h2>";
            }

            // Switch back to "submit" mode
            actionBtn.textContent = "Submit";
            mode = 'submit';
        }
    }

    // Fetch the questions from the JSON file
    fetch('./questions.json')
        .then(res => res.json())
        .then(data => {

            // Store the questions
            questions = data;

            // Create a random order of questions
            if (order.length === 0) {
                order = Array.from({ length: questions.length }, (_, i) => i).sort(() => Math.random() - 0.5);

                // Select the first question
                currentIndex = order.pop();
            }

            // Add an event listener to the document to listen for the Enter key
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

            // Render the first question
            renderQuestion(currentIndex);
        });


    document.getElementById('printBtn').addEventListener('click', () => {
        // Build the summary
        const printDiv = document.getElementById('printContainer');
        let content = ''; // Build the content string

        const buildList = (indices, color) => {
            indices.forEach(idx => {
                const q = questions[idx];
                // Basic question info
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

        printDiv.innerHTML = content; // Set the content once

        // Print the summary
        window.print();
    });
});
