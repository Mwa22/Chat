const express = require("express");
const config = require("config");
const morgan = require("morgan");

const loginRouter = require("./routes/loginRouter");

const app = express();

// Debug.
app.use(morgan("dev"));

// Static folders.
app.use(express.static(__dirname + "/public"));

// Routers.
app.use("/login", loginRouter)

// Redirection.
app.get("/", (req, res) => {
    res.redirect("/login");
});


// Running server.
app.listen(config.get("port"), () => {
    console.log("Server running on port " + config.get("port"))
});