document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "According to Piaget, what is the process of integrating new information into existing cognitive structures?",
            options: ["Assimilation", "Accommodation", "Equilibration", "Reinforcement"],
            answer: "Assimilation"
        },
        {
            question: "Which of the following describes a variable-ratio reinforcement schedule?",
            options: ["Receiving a paycheck every two weeks", "A teacher randomly rewarding participation in class", "A vending machine dispensing snacks after inserting money", "A loyalty program that gives a free coffee after 10 purchases"],
            answer: "A teacher randomly rewarding participation in class"
        },
        {
            question: "What is a key principle of constructivism in learning?",
            options: ["Passive absorption of knowledge", "Active engagement with materials to construct meaning", "Repetition of tasks without exploration", "Intelligence is fixed and unchangeable"],
            answer: "Active engagement with materials to construct meaning"
        },
        {
            question: "According to Self-Determination Theory, which of the following is NOT a basic psychological need?",
            options: ["Competence", "Autonomy", "Financial security", "Relatedness"],
            answer: "Financial security"
        },
        {
            question: "What is the primary purpose of scaffolding in education?",
            options: ["To provide permanent support for struggling learners", "To gradually reduce assistance as learners gain independence", "To make learning easier by eliminating challenges", "To allow students to avoid difficult tasks"],
            answer: "To gradually reduce assistance as learners gain independence"
        },
        {
            question: "Which type of memory is responsible for holding information for a brief period before processing?",
            options: ["Long-term memory", "Short-term memory", "Sensory memory", "Working memory"],
            answer: "Sensory memory"
        },
        {
            question: "What is the primary function of the phonological loop in Baddeley’s working memory model?",
            options: ["Processing verbal and auditory information", "Managing visual-spatial data", "Directing attention and coordinating cognitive processes", "Integrating multiple types of information"],
            answer: "Processing verbal and auditory information"
        },
        {
            question: "What does expectancy-value theory (EVT) propose as the two key factors of motivation?",
            options: ["Intrinsic and extrinsic rewards", "Expectancy of success and task value", "Persistence and resilience", "Emotional intelligence and cognitive ability"],
            answer: "Expectancy of success and task value"
        },
        {
            question: "What does the coherence principle in Mayer’s Cognitive Model of Multimedia Learning suggest?",
            options: ["Information should be presented with redundancy for reinforcement", "Removing unnecessary details improves learning", "Learning should rely more on text than visuals", "Complex topics should be taught in a single session"],
            answer: "Removing unnecessary details improves learning"
        },
        {
            question: "According to Vygotsky, what is the Zone of Proximal Development (ZPD)?",
            options: ["The stage of learning that occurs independently", "The gap between what a learner can do alone and with assistance", "The period where only intrinsic motivation is effective", "A stage of memory consolidation in learning"],
            answer: "The gap between what a learner can do alone and with assistance"
        },
        {
            question: "Which learning theory suggests that behavior is shaped by rewards and punishments?",
            options: ["Constructivism", "Behaviorism", "Cognitive Learning Theory", "Experiential Learning Theory"],
            answer: "Behaviorism"
        },
        {
            question: "What is an example of classical conditioning?",
            options: ["A child learns to solve math problems by repetition", "A dog salivates at the sound of a bell after repeated pairings with food", "A student receives a reward for completing a task", "A child mimics a teacher’s behavior after observing them"],
            answer: "A dog salivates at the sound of a bell after repeated pairings with food"
        },
        {
            question: "What is a feature of self-regulated learning (SRL)?",
            options: ["Passive absorption of content", "Teacher-controlled goal setting", "The learner actively managing their own learning strategies", "Learning only occurs in structured classroom settings"],
            answer: "The learner actively managing their own learning strategies"
        },
        {
            question: "According to Atkinson & Shiffrin’s Multi-Store Model, which store has the shortest duration?",
            options: ["Sensory memory", "Short-term memory", "Long-term memory", "Working memory"],
            answer: "Sensory memory"
        },
        {
            question: "What role does intrinsic load play in Cognitive Load Theory?",
            options: ["It should always be reduced to improve learning", "It is the inherent difficulty of the material being learned", "It refers to distractions that impact learning", "It is a type of motivation"],
            answer: "It is the inherent difficulty of the material being learned"
        },
        {
            question: "What is a primary challenge of adaptive learning systems?",
            options: ["They cannot be personalized to individual learners", "Over-reliance on AI can weaken metacognitive skills", "They are ineffective in improving learner performance", "They require human instructors to function"],
            answer: "Over-reliance on AI can weaken metacognitive skills"
        },
        {
            question: "What is an example of extraneous cognitive load?",
            options: ["The natural difficulty of a complex topic", "Irrelevant animations distracting from the core lesson", "Meaningful problem-solving activities", "Using prior knowledge to process new information"],
            answer: "Irrelevant animations distracting from the core lesson"
        },
        {
            question: "What part of the brain is responsible for basic survival functions?",
            options: ["Hippocampus", "Brainstem", "Neocortex", "Amygdala"],
            answer: "Brainstem"
        },
        {
            question: "In social cognitive theory, what influences learning the most?",
            options: ["Reinforcement and punishment alone", "Observational learning and modeling", "Passive memorization of facts", "Innate intelligence"],
            answer: "Observational learning and modeling"
        },
        {
            question: "What describes situational interest in learning?",
            options: ["A deeply ingrained, long-term interest in a subject", "A temporary engagement triggered by external factors", "An emotional response to failure", "A personality trait associated with motivation"],
            answer: "A temporary engagement triggered by external factors"
        },
        {
            question: "What is the goal of gamification in learning?",
            options: ["To replace traditional learning methods entirely", "To increase engagement and motivation using game-like elements", "To create new theories of memory processing", "To reduce student interaction with teachers"],
            answer: "To increase engagement and motivation using game-like elements"
        },
        {
            question: "Which reinforcement schedule produces the most consistent responses over time?",
            options: ["Fixed-interval", "Variable-ratio", "Fixed-ratio", "Continuous"],
            answer: "Variable-ratio"
        },
        {
            question: "What is a key benefit of self-efficacy in learning?",
            options: ["It reduces the need for motivation", "It increases persistence in the face of challenges", "It eliminates the effects of stress", "It replaces cognitive learning strategies"],
            answer: "It increases persistence in the face of challenges"
        },
        {
            question: "According to the Circumplex Model of Emotion, which two dimensions describe emotions?",
            options: ["Valence and arousal", "Positivity and negativity", "Intensity and duration", "Stability and flexibility"],
            answer: "Valence and arousal"
        },
        {
            question: "In experimental research, what is the dependent variable?",
            options: ["The factor manipulated by the researcher", "The measured outcome influenced by the independent variable", "A random variable with no impact on the study", "A control measure to eliminate bias"],
            answer: "The measured outcome influenced by the independent variable"
        },
        {
            question: "What is a key characteristic of intrinsic motivation?",
            options: ["Performing a task for external rewards", "Engaging in an activity because it is inherently interesting", "Avoiding punishment by completing an activity", "Seeking approval from others"],
            answer: "Engaging in an activity because it is inherently interesting"
        },
        {
            question: "According to the Flow Theory, what is required for someone to enter a flow state?",
            options: ["Low challenge and low skill", "High challenge and high skill", "High challenge and low skill", "No challenge but high skill"],
            answer: "High challenge and high skill"
        },
        {
            question: "Which principle of instructional design ensures that controls and functions align logically?",
            options: ["Affordances", "Feedback", "Signifiers", "Mapping"],
            answer: "Mapping"
        },
        {
            question: "Which type of motivation involves engaging in an activity due to external pressures or rewards?",
            options: ["Intrinsic motivation", "Extrinsic motivation", "Amotivation", "Self-determined motivation"],
            answer: "Extrinsic motivation"
        },
        {
            question: "What is a potential disadvantage of gamification in learning?",
            options: ["It reduces motivation in students", "It can make learning too difficult", "It may shift focus to extrinsic rewards rather than genuine learning", "It replaces traditional classroom teaching"],
            answer: "It may shift focus to extrinsic rewards rather than genuine learning"
        },
        {
            question: "According to Cognitive Load Theory, which type of cognitive load should be maximized to improve learning?",
            options: ["Intrinsic load", "Extraneous load", "Germane load", "Working memory load"],
            answer: "Germane load"
        },
        {
            question: "What cognitive process involves connecting new information to existing knowledge?",
            options: ["Attention", "Elaboration", "Storage", "Retrieval"],
            answer: "Elaboration"
        },
        {
            question: "Which part of self-regulated learning (SRL) involves setting goals and planning learning strategies?",
            options: ["Performance phase", "Forethought phase", "Self-reflection phase", "Execution phase"],
            answer: "Forethought phase"
        },
        {
            question: "What is an example of an adaptive learning system?",
            options: ["A traditional classroom lecture", "A standardized textbook with fixed content", "An AI-driven tutoring system that adjusts content based on student progress", "A memorization-based learning method"],
            answer: "An AI-driven tutoring system that adjusts content based on student progress"
        },
        {
            question: "What is a defining feature of self-efficacy?",
            options: ["Confidence in one's ability to perform a specific task", "Generalized intelligence", "Dependence on external validation", "Avoidance of challenging tasks"],
            answer: "Confidence in one's ability to perform a specific task"
        },
        {
            question: "According to the Circumplex Model of Emotion, what two factors define emotional experiences?",
            options: ["Duration and intensity", "Valence and arousal", "Stability and flexibility", "Positive and negative reinforcement"],
            answer: "Valence and arousal"
        },
        {
            question: "What type of reinforcement schedule is used in slot machines, leading to addictive behaviors?",
            options: ["Fixed-ratio", "Fixed-interval", "Variable-ratio", "Continuous reinforcement"],
            answer: "Variable-ratio"
        },
        {
            question: "Which memory model suggests that information flows through a sequence of stores?",
            options: ["Multi-Store Model", "Parallel Distributed Processing Model", "Working Memory Model", "Dual-Process Theory"],
            answer: "Multi-Store Model"
        },
        {
            question: "What is one risk of overusing artificial intelligence (AI) in education?",
            options: ["Increased student independence", "Reduced self-regulated learning skills", "Improved memory retention", "Better classroom interaction"],
            answer: "Reduced self-regulated learning skills"
        },
        {
            question: "What does the principle of scaffolding suggest about learning?",
            options: ["Learners should always work independently", "Temporary support should be provided until learners gain competence", "The teacher should always provide direct answers", "Learning should occur without guidance"],
            answer: "Temporary support should be provided until learners gain competence"
        },
        {
            question: "What is an example of observational learning according to Bandura?",
            options: ["A student memorizing a list of definitions", "A child learning aggressive behavior by watching violent media", "A person learning to drive by reading a manual", "A baby crying due to hunger"],
            answer: "A child learning aggressive behavior by watching violent media"
        },
        {
            question: "Which research method is best for establishing a cause-and-effect relationship?",
            options: ["Correlational study", "Case study", "Experimental study", "Observational study"],
            answer: "Experimental study"
        },
        {
            question: "What is the primary function of feedback in instructional design?",
            options: ["To increase cognitive load", "To communicate whether an action was successful", "To reduce motivation", "To introduce new learning material"],
            answer: "To communicate whether an action was successful"
        },
        {
            question: "What does the Attribution Theory suggest about failure?",
            options: ["Failure is always caused by external factors", "Internal, controllable attributions increase motivation", "People learn best through rewards only", "Effort has no impact on success"],
            answer: "Internal, controllable attributions increase motivation"
        },
        {
            question: "What is an example of cognitive dissonance?",
            options: ["Feeling conflicted after acting against personal beliefs", "Experiencing high confidence in one's abilities", "Developing an intrinsic motivation for learning", "Memorizing information for a test"],
            answer: "Feeling conflicted after acting against personal beliefs"
        }
    ];

    const questionsContainer = document.getElementById('questions-container');

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        q.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });

        const feedback = document.createElement('div');
        feedback.classList.add('feedback');
        questionDiv.appendChild(feedback);

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            feedback.innerHTML = '';

            if (selectedOption && selectedOption.value === q.answer) {
                feedback.textContent = 'Correct!';
                feedback.style.color = 'green';
            } else {
                feedback.textContent = `Wrong! The correct answer is: ${q.answer}`;
                feedback.style.color = 'red';
            }
        });
        questionDiv.appendChild(submitButton);

        questionsContainer.appendChild(questionDiv);
    });

    document.getElementById('quiz-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0;

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const feedback = document.querySelectorAll('.feedback')[index];
            feedback.innerHTML = '';

            if (selectedOption && selectedOption.value === q.answer) {
                score++;
                feedback.textContent = 'Correct!';
                feedback.style.color = 'green';
            } else {
                feedback.textContent = `Wrong! The correct answer is: ${q.answer}`;
                feedback.style.color = 'red';
            }
        });

        document.getElementById('score').textContent = `${score} / ${questions.length}`;
        document.getElementById('result-container').classList.remove('hidden');
    });
});