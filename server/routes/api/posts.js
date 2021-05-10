const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get posts
router.get("/", async (req, res) => {
    const posts = await loadPosts()
    res.send(await posts.find({}).toArray());
});

//Add Post

//Delete posts

async function loadPosts() {
    const password = process.env.PASSWORD;

    const client = await mongodb.MongoClient.connect
        ("mongodb+srv://admin-Robert:" + password + "@cluster0.lilsj.mongodb.net/vue_express?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true });

    return client.db("vue_express").collection("Posts");
}

module.exports = router;