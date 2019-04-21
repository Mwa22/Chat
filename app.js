const express = require("express");
const config = require("config");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const helmet = require("helmet");

const loginRouter = require("./assets/routes/login-router");
const chatRouter = require("./assets/routes/chat-router");

const app = express();

// Security.
app.use(helmet());

// Debug.
app.use(morgan("dev"));

// Static folders.
app.use(express.static(__dirname + "/public"));

// Parsers.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session.
app.use(session({
    secret: "Poof a secret !",
    name: "login-session",
    keys: ["key1", "key2"],
    cookie: {
        httpOnly: true,
        domain: config.host,
        path: "/"
    }
}));

// Redirection.
app.get("/", (req, res) => {
    res.redirect(config.routes.login);
});

// Routes.
app.use(config.routes.login, loginRouter);
app.use(config.routes.chat, chatRouter);

// 404
app.use((req, res, next) => {
    return res.status(404).render("error404.twig");
});

// Log errors.
app.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

// Client error handler.
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({
            error: 'Something failed!'
        })
    }
    else {
        next(err)
    }
});

// Error handler.
app.use((err, req, res, next) => {
    res.status(500)
    res.render('error', { error: err })
});

// Running server.
app.listen(process.env.PORT || config.port, () => {
    console.log("Server running on port " + (process.env.PORT || config.port));
});