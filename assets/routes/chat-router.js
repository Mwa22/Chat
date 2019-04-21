const chatRouter = require("express").Router();

// Display login page.
chatRouter.route("/")
    .get((req, res) => {
        res.render("chat.twig", {
            username: req.session.username
        });
    })
module.exports = chatRouter;