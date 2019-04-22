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