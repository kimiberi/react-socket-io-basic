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

// listen to port
server.listen(3001, () => {
  console.log("server is running")
})
