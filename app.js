const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const errorsHandler = require("./assets/errorsHandler");

const ioController = require("./assets/io-controller");

// Security.
app.use(helmet());

// Debug.
app.use(morgan("dev"));

// Static folders.
app.use(express.static(__dirname + "/public"));

// Handle io.
ioController(io);

// Redirection.
app.get("/", (req, res) => {
    res.redirect(config.routes.login);
});

// Display login page.
app.get(config.routes.login, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

// Display chat page.
app.get(config.routes.chat, (req, res) => {
    res.sendFile(__dirname + "/public/chat.html");
});

// Handle errors.
app.use(errorsHandler.error404);
app.use(errorsHandler.logErrors);
app.use(errorsHandler.clientError);
app.use(errorsHandler.serverError);

// Running server.
server.listen(process.env.PORT || config.port, () => {
    console.log("Server running on port " + (process.env.PORT || config.port));
});