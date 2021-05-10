const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get posts
router.get("/", async (req, res) => {
    const posts = await loadPosts()
    res.send(await posts.find({}).toArray());
});

//Add Post
router.post("/", async (req, res) => {
    const posts = await loadPosts();

    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete posts
router.delete("/:id", async (req, res) => {
    const posts = await loadPosts();

    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })

    res.status(200).send();
})

async function loadPosts() {
    const password = process.env.PASSWORD;

    const client = await mongodb.MongoClient.connect
        ("mongodb+srv://admin-Robert:" + password + "@cluster0.lilsj.mongodb.net/vue_express?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true });

    return client.db("vue_express").collection("Posts");
}

module.exports = router;