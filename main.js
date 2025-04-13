$('#get-results-button').on('click', function(e) {
        // gather all checked radio-button values
        var choices = $("input[type='radio']:checked").map(function(i, radio) {
            return $(radio).val();
        }).toArray();

        var result = choices[0];
        console.log(choices[0]);
        document.getElementById('results-text').textContent = result;
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