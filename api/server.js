const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
// routers
const userRouter = require('../users/user-router');
const authRouter = require('../auth/auth-router');
const strainsRouter = require('../strains/strains-router');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/account', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/strains', strainsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ WELCOME: 'to the OnlyMaryJane API' })
})

module.exports = server;