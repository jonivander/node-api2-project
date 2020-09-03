const express = require('express');

const expressRouter = require('./express-router'); 

const server = express();

server.use(express.json());
server.use('/api/posts', expressRouter); 
server.use('/', (req, res) => {
    res.send('HELLO'); 
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log("Server is up..."));