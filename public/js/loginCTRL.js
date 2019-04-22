const errors = [
    {
        title: "Empty username",
        content: "Type an username."
    },
    {
        title: "Invalid username",
        content: "Your username must be 3 to 16 characters."
    },
    {
        title: "Username already taken",
        content: "Type another username."
    }
];

let socket = io();

$(document).ready(() => {

    // Test input value.
    $("form").submit((event) => {
        event.preventDefault();
        
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
            shakeAnimation($("input"));
            displayError(errors[errorIndex].title, errors[errorIndex].content);
        }
        // Send form.
        else {
            socket.emit("send-form", value, (errId) => {
                // Display error from server.
                if (errId) {
                    shakeAnimation($("input"));
                    displayError(errors[errId].title, errors[errId].content);
                }
            });
        }
    });

    // Exit modal error.
    $(".modal-exit").click(() => {
        closeModal();
    });
});