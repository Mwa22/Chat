const loginRouter = require("express").Router();
const config = require("config");
const { check, validationResult } = require("express-validator/check");
let users = require("../users-session");

loginRouter.route("/")

    // Display login page.
    .get((req, res) => {
        res.render("login.twig");
    })
    .post([
        // Check input
        check("username").trim().escape()
        
    ], (req, res) => {

        console.log(users);
        // Username already taken
        if (users.includes(req.body.username)) {
            res.render("login.twig", {
                errorIndex: 2
            });
        }
        // Redirect to chat
        else {
            users.push(req.body.username);
            req.session.username = req.body.username;
            res.redirect(config.routes.chat);
        }
    })
    
module.exports = loginRouter;