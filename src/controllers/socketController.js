const myslqAccions = require('./dbMysqlController')

const handleSocketConnection = (socket, io) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('message', async (message) => {
    console.log(message);
    const data = {
      user : message.userid,
      msg: message.msg
    }       
    io.emit('message', message);
    try {
      const saveMsg = await myslqAccions.insertMessage(data)
      console.log(saveMsg);
    } catch (error) {
      console.log(error);
    }


  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};

module.exports = { handleSocketConnection };
