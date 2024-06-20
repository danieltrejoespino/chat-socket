const myslqAccions = require("./dbMysqlController");

const encodeBase64Node = (input) => Buffer.from(input, 'utf8').toString('base64');
const decodeBase64Node = (input) => Buffer.from(input, 'base64').toString('utf8');


const handleSocketConnection = (socket, io) => {
  console.log(`New client connected: ${socket.id}`);

  const sendPreviousMessages = async () => {
    try {
      const rspta = await myslqAccions.getMessage();          
      rspta.forEach((message) => {
        message.MSG =decodeBase64Node(message.MSG)        
      });


      socket.emit('previousMessages', rspta);
    } catch (error) {
      console.error('Error sending previous messages:', error);
    }
  };

  sendPreviousMessages();







  socket.on("message", async (message) => {
    console.log(message);
    const data = {
      user: message.USERID,
      msg: encodeBase64Node(message.MSG),
    };
    io.emit("message", message);
    try {
      const saveMsg = await myslqAccions.insertMessage(data);
      console.log(saveMsg);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};

module.exports = { handleSocketConnection };
