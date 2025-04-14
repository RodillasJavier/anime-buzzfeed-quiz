/* LOADING IN QUESTIONS VIA JSON */
$.getJSON("data.json", function(data) {
    // Generate header
    const headerHTML = `
        <img class="header-image" src="${data.headerImage}" alt="Guts Resting">
        <h1 class="header-title">${data.title}</h1>
    `;
    $("#header").append(headerHTML);

    // Generate questions
    const quizHTML = data.questions.map((question, index) => {
        const answersHTML = question.answers.map(answer => `
            <label class="answer-choice ${question.question_type === 'text' ? 'text' : ''}">
                <img src="${answer.img_url}" class="answer-choice-image">
                <input type="radio" name="${question.question_name}" value="${answer.outcome}">
                ${question.question_type === 'image_text' ? 
                    `<p class="answer-label">${answer.text}</p>` :
                    question.question_type === 'text' ? 
                    `<p class="answer-choice-text">${answer.text}</p>` : 
                    ''}
            </label>
        `).join('');
    
        return `
            <div class="question-container">
                <h2 class="question-title">${question.question_prompt}</h2>
                <div class="answer-choice-container">
                    ${answersHTML}
                </div>
            </div>
        `;
    }).join('');

    $("#quiz").html(quizHTML);

    // Do quiz handling
    initializeQuizHandlers();
});



/* QUIZ HANDLING */
function initializeQuizHandlers() {
    // Answer choice state handling
    $("input[type='radio']").change(function() {
        const $question = $(this).closest('.question-container');
        
        // Remove all states
        $question.find('.answer-choice').removeClass('selected not-selected');
        
        // Add 'selected' state to chosen answer
        $(this).closest('.answer-choice').addClass('selected');
        
        // Add 'not-selected' state to everything else
        $question.find('.answer-choice').not('.selected').addClass('not-selected');
    });

    // Results button handling
    $('#get-results-button').on('click', function() {
        // Store the total number of questions
        const totalQuestions = $('.question-container').length;

        // Store all checked radio-button values in an array
        const choices = $("input[type='radio']:checked").map(function(i, radio) {
            return $(radio).val();
        }).toArray();
        
        // Validate completion of all questions
        if (choices.length < totalQuestions) {
            $('#results-text').text("Please answer all questions first before clicking 'Done'!");
            return;
        }
        
        // Get and display our results
        const results = calculateResults(choices);
        displayResults(results);
    });
}

// Helper to display results when the submit button is pressed
function displayResults(results) {
    const resultsHTML = `
        <div class="modal-content">
            <h2 id="results-header">You are <u>${results.character}</u>!</h2>
            <img src="${results.image}" alt="${results.character}" style="max-width: 300px;">
            <p id="results-text">${results.description}</p>
            <span class="close">&times;</span>
        </div>
    `;

    $('#result-modal').html(resultsHTML);
}



/* CALCULATING RESULTS */
function calculateResults(choices) {
    // Mapping answers to characters
    const characters = {
        '1': { 
            name: 'Goku', 
            count: 0, 
            image: 'media/characters/goku.png', 
            description: 'You are pure-hearted and always looking for the next challenge!' 
        },

        '2': { 
            name: 'Gojo', 
            count: 0, 
            image: 'media/characters/gojo.png', 
            description: 'Confident and capable, you know your worth!' 
        },

        '3': { 
            name: 'Luffy', 
            count: 0, 
            image: 'media/characters/luffy.png', 
            description: 'Adventure calls to you, and you never back down!' 
        },

        '4': { 
            name: 'Tanjiro', 
            count: 0, 
            image: 'media/characters/tanjiro.png', 
            description: 'Kind and determined, you never give up!' 
        },
        
        '5': { 
            name: 'Guts', 
            count: 0, 
            image: 'media/characters/guts.png', 
            description: 'You persevere through any challenge life throws at you!' 
        },
        
        '6': { 
            name: 'Spike', 
            count: 0, 
            image: 'media/characters/spike.png', 
            description: 'Cool and collected, you take life as it comes!' 
        }
    }

    // Count how many times each characters' corresponding response is chosen
    choices.forEach(choice => {
        if (characters[choice]) {
            characters[choice].count++;
        }
    });

    // Return the character with the most matches of responses
    let maxCount = 0;
    let result = null;
    for (const [character, data] of Object.entries(characters)) {
        if (data.count > maxCount) {
            maxCount = data.count;
            result = {
                character: data.name, 
                image: data.image, 
                description: data.description
            };
        }
    }

    return result;
}



/* ------------------------------------------------------------------------- */
/* MODAL HANDLING */

// Get out modal, button and span (close button for modal)
var modal = document.getElementById('result-modal');
var button = document.getElementById('get-results-button');
var span = document.getElementsByClassName('close')[0];

// Opening the modal
button.onclick = function() {
    modal.style.display = "block";
}

// Closing the modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}