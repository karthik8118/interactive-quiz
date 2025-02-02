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

    function renderQuestion(index) {
        /**
         * Render the question at the given index
         * @param {number} index - The index of the question to render
         * @returns {void}
         */

        // Get the question at the given index
        const q = questions[index];

        // Shuffle the answers and keep track of the correct answer
        correct_answer = q.Answers[q.Correct];
        q.Answers = q.Answers.sort(() => Math.random() - 0.5);
        q.Correct = q.Answers.indexOf(correct_answer);

        // Render the question in the quiz-container
        container.innerHTML = `
      <h2>Question ${index + 1}</h2>
      <p>${q.Question}</p>
      ${q.Answers.map((ans, i) => `
        <label name="answer_label">
          <input type="radio" name="answer_radio" value="${correct_answer === ans}" />
          ${ans}
        </label><br/>
      `).join('')}
      <button id="actionBtn">Submit</button>
    `;

        // Display how many questions (including current) remain
        document.getElementById('remainingBox').textContent =
            `Remaining ${order.length + 1}`;

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
            document.getElementById('scoreBox').textContent = `Correct ${correct.length}/${correct.length + wrong.length}`;

            // Switch to "next" mode
            actionBtn.textContent = "Next";
            mode = 'next';

            // Exit the function
            return;
        } else {
            // Proceed to next question
            nextQuestion();

            // Switch back to "submit" mode
            actionBtn.textContent = "Submit";
            mode = 'submit';
        }
    }

    function nextQuestion() {
        /**
         * Move to the next question
         * @returns {void}
         */

        // Get the next question index
        currentIndex = order.pop();

        // Render the next question or end the quiz
        if (currentIndex !== undefined) {
            renderQuestion(currentIndex);
        } else {
            container.innerHTML = "<h2>Quiz Completed</h2>";
        }
    }

    // Fetch the questions from the JSON file
    fetch('./questions.json')
        .then(res => res.json())
        .then(data => {

            // Store the questions
            questions = data;

            // Create a random order of questions
            order = Array.from({ length: questions.length }, (_, i) => i).sort(() => Math.random() - 0.5);

            // Select the first question
            currentIndex = order.pop();

            // Render the first question
            renderQuestion(currentIndex);
        });

    document.getElementById('printBtn').addEventListener('click', () => {
        // Build the summary
        const printDiv = document.getElementById('printContainer');
        printDiv.innerHTML = ''; // clear old content

        const buildList = (indices, color) => {
            indices.forEach(idx => {
                const q = questions[idx];
                // Basic question info
                printDiv.innerHTML += `
                <div style="color: #000000; margin: 10px 0;">
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

        printDiv.innerHTML += '<h2 style="color: #34a853;">Correct Answers</h2>';
        buildList(correct, '#34a853');
        printDiv.innerHTML += '<h2 style="color: #ea4335;">Wrong Answers</h2>';
        buildList(wrong, '#ea4335');

        // Print the summary
        window.print();
    });
});
