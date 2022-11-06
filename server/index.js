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

  // we'll listen to the event from frontend, we created 'send_message' to emit
  // we'll also received a data from frontend too
  socket.on("send_message", (data) => {
    console.log(data)
  })
})

// listen to port
server.listen(3001, () => {
  console.log("server is running")
})
