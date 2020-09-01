const express = require('express');

const expressRouter = require('./express-router'); 

const shortid = require('shortid'); 

const Posts = require('./data/db'); 


const server = express();

server.use(express.json());
server.use('/api/users ', expressRouter); 

// Configuring server
server.get('/', (req, res) => {
    res.send(
        `
        <h2>Posts API</h2>
        <p>Welcome to the Posts API</p>
        `
    );
});

// POST create new post
server.post('/api/posts', (req, res) => {
    Posts.add(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error creating the post'
        })
    });
});
    
// POST create a comment on a post by id
server.post('/api/posts/:id/comments', (req, res) => {
    
});
    
// GET return an array of all posts
server.get('/api/posts', (req, res) => {
    Posts.find(req.query)
    .then(posts => [
        res.status(200).json(posts)
    ])
    .catch(error => {
        console.log(error);
        res.status(500).json({ 
            message: 'Error fetching the posts',
         })
    })
});
    
// GET post by id
server.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the post',
        });
      });
});
    
// GET comments by post id
server.get('/api/posts/:id/comments', (req, res) => {
    
});
    
// DELETE post by id
server.delete('/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The post has been deleted' })
        } else {
            res.status(404).json({ message: 'The post could not be found' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting this post'
        })
    });
});
    
// PUT update post by id
server.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'The post could not be found' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the post',
        });
      });
});
    
const port = 9000;
server.listen(port, () => console.log("Server is up..."));