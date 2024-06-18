require("dotenv").config();
const express = require("express");
const http = require("https");
const fs = require("fs");
const path = require('path');  // socket io

const socketIo = require("socket.io");
const cors = require("cors");
const routes = require("./routes/routes");
const { handleSocketConnection } = require("./controllers/socketController");

 

const privateKeyPath = path.join(__dirname, 'cert', 'server.key');
const certificatePath = path.join(__dirname, 'cert', 'server.cert');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');


const credentials = {
  key: privateKey,
  cert: certificate,
 };



const app = express();

const server = http.createServer(credentials,app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

app.use(cors());

// app.use(routes);
app.use("/", routes);

io.on("connection", (socket) => handleSocketConnection(socket, io));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { io };
