const path = require("path");

exports.error404 = (req, res, next) => {
    return res.status(404).sendFile(path.join(__dirname , "..", "/public/error404.html"));
};

exports.logErrors = (err, req, res, next) => {
    console.error(err);
    next(err);
};

exports.clientError = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({
            error: 'Something failed!'
        })
    }
    else {
        next(err)
    }
};

exports.serverError = (err, req, res, next) => {
    res.status(500)
    res.render('error', { error: err })
};