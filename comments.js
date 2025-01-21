// Create web server
const express = require('express');
const app = express();
app.use(express.json());

// Create a variable to store comments
let comments = [
    { id: 1, comment: 'This is a comment!' },
    { id: 2, comment: 'Another comment!' }
];

// GET /comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.status(201).send(comment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    comment.comment = req.body.comment;
    res.send(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));