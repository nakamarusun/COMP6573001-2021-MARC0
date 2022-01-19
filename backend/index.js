const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
const server = http.createServer(app);
const registerMarciHandler = require('./socket/marciHandler')

app.use(cors())
const io = require("socket.io")(server, {});

const routes = require('./api/routes.js')
app.use('/api', routes.stream)
app.use('/user', routes.user)
app.use('/videos', routes.videos);

// Attach listeners when someone connects
const onConnection = function(socket) {
  registerMarciHandler(io, socket)
}
io.on('connection', onConnection)
app.set('socketio', io)

const PORT = process.env.PORT || 5000;
server.listen(PORT);

