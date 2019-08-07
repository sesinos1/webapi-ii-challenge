const router = require('express').Router();

const db = require('../data/db');

router.get('/', async (req, res) => {
    try {
        const db = await db.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const db = await db.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the post',
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post." });
    } else {
        try {
            let newPost = {
                title: req.body.title,
                contents: req.body.contents
            };
            let createdPostId = await db.insert(newPost);
            let createdPost = await db.findById(createdPostId.id)
            res.status(201).json(createdPost);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "could not be saved to the database" });
        }
    }


});

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post." });
    } else {
        try {
            let newPost = {
                title: req.body.title,
                contents: req.body.contents
            };
            let createdPostId = await db.insert(newPost);
            let createdPost = await db.findById(createdPostId.id)
            res.status(201).json(createdPost);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "could not be saved to the database" });
        }
    }


});

router.get('/:id/comments', (req, res) => {
    const {id} = req.params 
    db.findById(id).catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
    })
    db.findPostComments(id).then(comments => {
        res.status(200).json(comments)
    })
    .catch(error =>{
        res.status(500).json({ message: "The comments information could not be retrieved.",error})
    })
}
);


module.exports = router;  