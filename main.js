$('#favorite_beverage').on('click', 
    function(e) {
        // gather all checked radio-button values
        var choices = $("input[type='radio']:checked").map(
            function(i, radio) {
                return $(radio).val();
            }
        ).toArray();
        console.log(choices);
    }
);