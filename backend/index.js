const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()
app.use(cors())
// we create http server with Express
const server = http.createServer(app)

const io = new Server(server, {
  // specify all properties and functionalities that you want in cors inside the project and work inside socket.io
  cors: {
    origin: process.env.REACT_APP_FRONTEND_URL, // URL for Frontend
    methods: ["GET", "POST"],
  },
})

// listen to event
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`)

  // we'll listen to the event from frontend, we created 'send_message' and 'join_room' events to emit
  // we'll also received a data from frontend too

  // OPTION 2 - CHAT WITH ROOM JOIN
  socket.on("join_room", (data) => {
    socket.join(data)
  })

  socket.on("send_message", (data) => {
    // console.log(data)

    // NOTE:
    // 'broadcast' -> send to 'everyone' except yourself opkors
    // 'receive_message' -> we'll listen to this so we can receive ALL messages we emit to other people

    // OPTION 0 - TESTING
    // socket.broadcast.emit("receive_message", data)

    // OPTION 1 - CHAT
    // socket.broadcast.emit("receive_message", data)

    // OPTION 1.1 - CHAT WITH RANDOM NAME
    // socket.broadcast.emit("receive_message", {
    //   message: `${socket.id.substring(0, 2)} said ${data}`,
    // })

    // OPTION 2 - CHAT WITH ROOM JOIN
    // socket.to(data.room).emit("receive_message", data)

    // OPTION 2.2 - ROOM JOIN CHAT WITH RANDOM NAME
    socket.to(data.room).emit("receive_message", data)
  })
})

// listen to port
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`server running ${process.env.NODE_ENV} on port ${PORT}`)
})
