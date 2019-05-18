let socket = io.connect("/chat");

// Send the message to the server.
function sendMessage() {
    let message = $(".chat-input input").val();

    // Send the message to the server.
    socket.emit("input_message", message, (username, datetime) => {

        // Get the username and display the message.
        addMessageUi(username, message, datetime, true);
        cleanInput(".chat-input input");
    });
}

$(document).ready(() => {

    // Sending a message.
    $("form").submit(event => {
        event.preventDefault();
        sendMessage();
    })

    // Not logged in.
    socket.on("not logged in", () => {
        displayError();
    });

    // User joined the room.
    socket.on("user connected", username => {
        addBroadcastMessageUi(username + " joined the room.", "joined-room");
    });

    // User left the room.
    socket.on("user disconnected", username => {
        addBroadcastMessageUi(username + " left the room.", "left-room");
    });

    // Other user sent a message.
    socket.on("new_message", query => {
        addMessageUi(query["username"], query["message"], query["datetime"], false);
    });
});