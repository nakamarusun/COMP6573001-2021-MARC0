const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(cors())
const io = require("socket.io")(server, {});

const routes = require('./api/routes.js')
app.use('/stream', routes.stream)
app.use('/user', routes.user)

const PORT = process.env.PORT || 5000;
server.listen(PORT);

