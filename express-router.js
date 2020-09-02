const express = require('express'); 

const Posts = require('./data/db'); 

const router = express.Router();


// POST create new post
router.post('/', (req, res) => {
    Posts.insert(req.body)
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
router.post('/:id/comments', (req, res) => {
    const comment = req.body;
    const id = Number(req.params.id);
    comment.post_id = id;
    Posts.insertComment(comment)
    .then((comment) => {
        if (comment) {
            res.status(201).json(comment);
        } else {
            res.status(400).json({ message: 'Bad Request' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the comment to this post',
        });
      });
});
    
// GET return an array of all posts
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the comment to this post',
        });
      });
});
    
// DELETE post by id
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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

module.exports = router; 