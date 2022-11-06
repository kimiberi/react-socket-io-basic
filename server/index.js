const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors())
// we create http server with Express
const server = http.createServer(app)

const io = new Server(server, {
  // specify all properties and functionalities that you want in cors inside the project and work inside socket.io
  cors: {
    origin: "http://localhost:3000", // URL for Frontend
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

    // OPTION 1 - CHAT
    // 'broadcast' -> send to 'everyone' except yourself opkors
    // 'receive_message' -> we'll listen to this so we can receive ALL messages we emit to other people
    // socket.broadcast.emit("receive_message", data)

    // OPTION 2 - CHAT WITH ROOM JOIN
    socket.to(data.room).emit("receive_message", data)
  })
})

// listen to port
server.listen(3001, () => {
  console.log("server is running")
})
