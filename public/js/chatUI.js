// "Sunday" = 0, "Monday" = 1, ...
const DAYOFWEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var today = -1;

// Display new message in chat.
function addMessageUi(username, message, datetime, self) {
    today = updateDayUi();

    // self (boolean), true if message comes from me.
    let selfOrOthers = (self) ? "self" : "others";

    $(".chat-content").append(
        $("<div>")
        .addClass(selfOrOthers + "-message")
        .append(
            $("<div>")
            .addClass("username")
            .text(username)
        )
        .append(
            $("<div>")
            .addClass("message-box")
            .append(
                $("<div>")
                .addClass("message")
                .text(message)
            )
            .append(
                $("<div>")
                .addClass("datetime")
                .text(datetime)
            )
        )
    );

    updateScroll();
}

// Add a broadcast message.
function addBroadcastMessageUi(message, command) {
    let commandClass = (command != "undefined") ? command : "";
    $(".chat-content").append(
        $("<div>")
        .addClass("broadcast-message")
        .addClass(commandClass)
        .append(
            $("<div>").text(message)
        )
    );

    updateScroll();
}

// Clean submit input.
function cleanInput(input_path) {
    $(input_path).val("");
}

// Scroll to bottom.
function updateScroll() {
    let scrollHeight = document.getElementsByClassName("chat-content")[0].scrollHeight;
    $(".chat-content").scrollTop(scrollHeight);
}

// return current day of week (0-6).
function updateDayUi() {
    let currentDay = new Date();
    if (currentDay.getDay() != today) {
        today = currentDay.getDay();
        let message = DAYOFWEEK[today] + " " + dateToString(currentDay.getDate()) + "-" + dateToString(currentDay.getMonth() + 1) + "-" + currentDay.getFullYear();
        addBroadcastMessageUi(message, "newDay");
    }

    return today;
}

// day or month under 10 add "0" (9 -> "09").
function dateToString(date) {
    return (date < 10) ? "0" + date : date;
}

// Display the modal error.
function displayError() {
    $(".modal-error").css("display", "flex");
}