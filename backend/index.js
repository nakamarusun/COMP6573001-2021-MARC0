const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(cors())
// const io = require("socket.io")(server, {
//     cors:{
//         origin: "http://localhost:3000",
//         methods: ["GET","POST"],
//     }
// });

let routes = require('./api/routes.js')
app.use('/', routes.play)

const PORT = process.env.PORT || 5000;
server.listen(PORT);

