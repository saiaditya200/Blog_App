const exp = require("express");
const userApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel");
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserOrAuthor");
const Article = require("../models/articleModel");

// API

//create new user
userApp.post("/user", expressAsyncHandler(createUserOrAuthor));

//add comment
userApp.put('/comment/:articleId', expressAsyncHandler(async (req, res) => {
    //get comment obj
    const CommentObj = req.body;

    //add comment object to comments array of article
    const articleWithComments = await Article.findOneAndUpdate(
        { _id: req.params.articleId }, // Use _id for lookup
        { $push: { comments: CommentObj } },
        { new: true } // Use new for updated doc
    );

    //send res
    res.send({ message: "comment added", payload: articleWithComments });
}));

module.exports = userApp;