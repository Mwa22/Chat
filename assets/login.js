const loginRouter = require("express").Router();

// Display login page.
loginRouter.route("/")
.get((req, res) => {
    res.send("Hello World !");
})

module.exports = loginRouter;