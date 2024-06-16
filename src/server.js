require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const routes = require('./routes/routes');
const { handleSocketConnection } = require('./controllers/socketController');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

app.use(cors());

// app.use(routes);
app.use('/', routes);

io.on('connection', (socket) => handleSocketConnection(socket, io));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { io };
