const errors = [
    {
        title: "Empty username",
        content: "Type an username."
    },
    {
        title: "Invalid username",
        content: "Your username must be 3 to 16 characters."
    }
];

// Shake animation.
function shakeAnimation(element) {
    element.css("animation", "shake 0.5s");
    setTimeout(() => {
        element.css("animation", "none");
    }, 500);
}

// Display modal error.
function displayError(title, content) {
    // Change modal content.
    $(".modal-title").text(title);
    $(".modal-content").text(content);

    // Show modal.
    $(".modal-error").css("display", "flex");
    $(".modal-error").animate({top: "10px", opacity: 1});
}

// Close modal Error.
function closeModal() {
    $(".modal-error").css("display", "none");

    // Reset modal-error for animation.
    $(".modal-error").css("top", "0");
    $(".modal-error").css("opacity", "0");
}

$(document).ready(() => {

    // Test input value.
    $("form").submit((event) => {
        
        let value = $("input").val();
        let errorIndex = -1;

        if (value == "") {
            errorIndex = 0;
        }
        else if (value.length < 3 || value.length > 16) {
            errorIndex = 1;
        }

        // Display error.
        if (errorIndex != -1) {
            event.preventDefault();
            shakeAnimation($("input"));
            displayError(errors[errorIndex].title, errors[errorIndex].content);
        }

    });

    // Exit modal error.
    $(".modal-exit").click(() => {
        closeModal();
    });
});