let users = {};

// Test if the username already exist.
function usernameExist(username) {
    for (let user in users) {
        if (username == users[user]) {
            return true;
        }
    }
    return false;
}

module.exports = io => {

    // Login
    io.of("/login").on("connection", socket => {

        // Login
        socket.on("send-form", (username, sendErr) => {
            // Username already taken
            if (usernameExist(username)) {
                sendErr(2);
            }
            // Redirect to chat
            else {
                users[socket.handshake.address] = username;
                socket.emit("redirect", "/chat")
            }
        });
    });


    // Chat
    io.of("/chat").on("connection", socket => {
        let clientIP = socket.handshake.address;

        // Client isn't logged in.
        if (!users[clientIP]) {
            socket.emit("not logged in");
        } 
        // Cient is logged in. 
        else {
            socket.broadcast.emit("user connected", users[clientIP]);
            socket.emit("user connected", users[clientIP]);

            // Remove the username.
            socket.on("disconnect", () => {
                socket.broadcast.emit("user disconnected", users[clientIP]);
                delete users[clientIP];
            })

            // Get the message.
            socket.on("input_message", (message, sendData) => {
                
                let date = new Date();
                let query = {
                    message: message,
                    datetime: date.getHours() + ":" + date.getMinutes(),
                    username: users[clientIP]
                }
                
                console.log("(" + query.datetime + ") " + query.username + ": " + query.message);

                // Send data to all users.
                socket.broadcast.emit("new_message", query);

                // Send username to user who sent the message.
                sendData(query.username, query.datetime);
            });
        }

    });
};