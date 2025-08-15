const UserAuthor = require("../models/userAuthorModel");

async function createUserOrAuthor(req, res) {
    // Business logic to create User or Author
    // Get user or author object from req
    const newUserAuthor = req.body;
    // Find user by email id
    const userInDb = await UserAuthor.findOne({ email: newUserAuthor.email });

    // If user or author existed
    if (userInDb !== null) {
        // Check with role
        if (newUserAuthor.role === userInDb.role) {
            res.status(200).send({ message: newUserAuthor.role, payload: userInDb });
        } else {
            res.status(400).send({ message: "Invalid role" }); // Changed to 400 Bad Request
        }
    } else {
        // Create new user or author
        let newUser = new UserAuthor(newUserAuthor);
        let newUserOrAuthorDoc = await newUser.save();
        res.status(201).send({ message: newUserOrAuthorDoc.role, payload: newUserOrAuthorDoc });
    }
}

module.exports = createUserOrAuthor;
