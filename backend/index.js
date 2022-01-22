const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
const server = http.createServer(app);
const registerMarciHandler = require('./socket/marciHandler')
const routes = require('./api/routes.js')
const io = require("socket.io")(server, {});

app.use(cors())
app.set('socketio', io)
const onConnection = function(socket) {
  registerMarciHandler(io, socket)
}
io.on('connection', onConnection)

app.use('/api', routes.stream)
app.use('/user', routes.user)
app.use('/videos', routes.videos);
app.use('/marci', routes.marciCommand);

// Attach listeners when someone connects

const PORT = process.env.PORT || 5000;
server.listen(PORT);

