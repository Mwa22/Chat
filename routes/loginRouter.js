const loginRouter = require("express").Router();
const path = require("path");

// Display login page.
loginRouter.route("/")
.get((req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/login.html"));
})

module.exports = loginRouter;