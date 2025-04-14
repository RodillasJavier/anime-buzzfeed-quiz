/* SUBMIT BUTTON HANDLING */
$('#get-results-button').on('click', function(e) {
        // Store all checked radio-button values in an array
        var choices = $("input[type='radio']:checked").map(function(i, radio) {
            return $(radio).val();
        }).toArray();

        var result = choices;
        console.log(choices[0]);
        document.getElementById('results-text').textContent = result;
});



/* STATE HANDLING FOR ANSWER CHOICES */
$(document).ready(function() {
    $("input[type='radio']").change(function() {
        const $question = $(this).closest('.question-container');

        // Remove all states
        $question.find('.answer-choice').removeClass('selected not-selected');

        // Add 'selected' state to chosen answer
        $(this).closest('.answer-choice').addClass('selected');

        // Add 'not-selected' state to everything else
        $question.find('.answer-choice').not('.selected').addClass('not-selected');
    });
});



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