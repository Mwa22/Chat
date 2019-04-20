const loginRouter = require("express").Router();
const path = require("path");
const twig = require("twig");

// Display login page.
loginRouter.route("/")
    .get((req, res) => {
        res.render("login.twig");
    })
    .post((req, res) => {
        console.log(req.body.username);
        res.render("login.twig", {
            errorIndex: 2
        });
    })
module.exports = loginRouter;