/* LOADING IN QUESTIONS VIA JSON */
$.getJSON("data.json", function(data) {
    // Generate header
    const headerHTML = `
        <img class="header-image" src="${data.headerImage}" alt="Guts Resting">
        <h1 class="header-title">${data.title}</h1>
    `;
    $("#header").append(headerHTML);

    // Generate questions
    const quizHTML = data.questions.map(function (question) {
        const answersHTML = question.answers.map(function(answer) {
            return `
                <label class="answer-choice ${question.question_type}">
                    <img src="${answer.img_url}" class="answer-choice-image">
                    <input type="radio" name="${question.question_name}" value="${answer.outcome}">

                    ${question.question_type === 'image_text' ? 
                        // If it is image_text, add a label
                        `<p class="answer-label">${answer.text}</p>` :

                        // If it is just text, classify it as THE choice
                        question.question_type === 'text' ? 
                        `<p class="answer-choice-text">${answer.text}</p>` : 

                        // If it is just an image, don't add any text to the answer
                        question.question_type === 'image' ? '' : ''
                    }
                </label>
            `;
        }).join('');
    
        return `
            <div class="question-container">
                <h2 class="question-title">${question.question_prompt}</h2>
                <div class="answer-choice-container">
                    ${answersHTML}
                </div>
            </div>
        `;
    }).join('');

    // Sub in our html
    $("#quiz").html(quizHTML);

    // Do quiz handling
    initializeQuizHandlers();
});



/* ------------------------------------------------------------------------- */
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
        calculateResults(choices, function(result) {
            displayResults(result);
        });
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

    $('.close').on('click', function() {
        $('#result-modal').css('display', 'none');
    });
}



/* ------------------------------------------------------------------------- */
/* CALCULATING RESULTS */
function calculateResults(choices, callback) {
    $.getJSON("data.json", function(data) {
        const characters = data.characters;
    
        // Initialize counts
        for (const key in characters) {
            characters[key].count = 0;
        }

        // Count how many times each characters' corresponding response is chosen
        choices.forEach(choice => {
            if (characters[choice]) {
                characters[choice].count++;
            }
        });

        // Find character with highest count
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

        callback(result);
    });
}



/* ------------------------------------------------------------------------- */
/* MODAL HANDLING */

// Get out modal, button and span (close button for modal)
var modal = document.getElementById('result-modal');
var button = document.getElementById('get-results-button');

// Opening the modal
button.onclick = function() {
    modal.style.display = "block";
}

// Closing the modal
$('.close').on('click', function() {
    $('#result-modal').css('display', 'none');
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}