const PORT = 8000;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

const Checkpoint = require('./src/controllers/checkpoint');
const Robot = require('./src/controllers/robot');
const User = require('./src/controllers/user');
const Auth = require('./src/controllers/auth');

const AuthMiddleware = require('./src/middlewares/auth');

app.post('/auth/login', Auth.login);

app.get('/checkpoint', AuthMiddleware.protect, Checkpoint.getAll);
app.post('/checkpoint', AuthMiddleware.protect, Checkpoint.create);
app.put('/checkpoint/:id', AuthMiddleware.protect, Checkpoint.update);
app.delete('/checkpoint/:id', AuthMiddleware.protect, Checkpoint.delete);

app.get('/robot/history', AuthMiddleware.protect, Robot.getAllHistoryCheckpoint);
app.get('/robot/history/:id', AuthMiddleware.protect, Robot.getOne);
app.get('/robot', AuthMiddleware.protect, Robot.getAll);
app.post('/robot', AuthMiddleware.protect, Robot.create);
app.put('/robot/:id', AuthMiddleware.protect, Robot.update);
app.delete('/robot/:id', AuthMiddleware.protect, Robot.delete);

app.get('/user', AuthMiddleware.protect, User.getAll);
app.post('/user', AuthMiddleware.protect, User.create);
app.put('/user/:id', AuthMiddleware.protect, User.update);
app.delete('/user/:id', AuthMiddleware.protect, User.delete);

app.listen(PORT, () => {
  console.log('SERVER START ON PORT ' + PORT);
});

