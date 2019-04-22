let users = require("./users-session");

module.exports = io => {
    io.on("connection", socket => {
        console.log("connected");

        // Login
        socket.on("send-form", (username, sendErr) => {
            // Username already taken
            if (users.includes(username)) {
                sendErr(2);
            }
            // Redirect to chat
            else {
                users.push(username);
                socket.username = username;
            }
        });

        // Chat
    });
};