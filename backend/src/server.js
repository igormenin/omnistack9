const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const urlv3 = 'mongodb+srv://igorcmenin:918273@cursoomnistack9-s8xzf.mongodb.net/test?retryWrites=true&w=majority';
const urlv212 = 'mongodb://igorcmenin:918273@cursoomnistack9-shard-00-00-s8xzf.mongodb.net:27017,cursoomnistack9-shard-00-01-s8xzf.mongodb.net:27017,cursoomnistack9-shard-00-02-s8xzf.mongodb.net:27017/test?ssl=true&replicaSet=CursoOmniStack9-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(urlv3,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GET - Busca Dados
// POST - Edita Dados
// PUT - Enviar dados
// DELETE - deleta dados.

// req.query - Acessar query params (para filtros)
// app.get('/users', (req, res) => {
//   return res.json({ idade: req.query.idade });
// });

// req.params = Acessar route params (para edição, delete)
// app.put('/users/:id', (req, res) => {
//   return res.json({ id: req.params.id });
// });


// req.body = Acessar corpo da requisição (para criação, edição)
// app.use(express.json());
// app.post('/users', (req, res) => {
//   return res.json(req.body);
// });

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
})

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);