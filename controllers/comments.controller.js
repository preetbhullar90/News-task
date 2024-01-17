const { fetchAllComments } = require("../models/comments.model");

module.exports.getAllComments = (req, res, next) => {

    const { article_id } = req.params;
    fetchAllComments(article_id).then((comment) => {

        res.status(200).send({comment})
    })
        .catch((err) => {
        next(err)
    })
}
