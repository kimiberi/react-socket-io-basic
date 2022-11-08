import React, { useEffect, useState } from "react"
import "./App.css"
import io from "socket.io-client"

// frontend runs in '3000' then backend for '3001'
const socket = io.connect(`${process.env.REACT_APP_BACKEND_LOCALHOST_URL}`)

const App = () => {
  const [sendMsg, setSendMsg] = useState("")
  const [receivedMsg, setReceivedMsg] = useState("")
  const [room, setRoom] = useState("")

  // OPTION 2 - CHAT WITH ROOM JOIN
  const joinRoom = () => {
    return room && socket.emit("join_room", room)
  }

  const sendMessage = () => {
    // NOTE:
    // emit message to sort people
    // you can emit sort of event so the person can listen to that event

    // OPTION 0 - TESTING
    // we'll send data to backend
    // socket.emit("send_message", {
    //   message: "hello",
    // })

    // OPTION 1 - CHAT
    // we'll send data to backend
    // socket.emit("send_message", { message: sendMsg })

    // OPTION 1.1 - CHAT WITH RANDOM NAME
    // socket.emit("send_message", sendMsg)

    // OPTION 2 - CHAT WITH ROOM JOIN
    // we'll send data to backend
    // socket.emit("send_message", { message: sendMsg, room })

    // OPTION 2.2 - ROOM JOIN CHAT WITH RANDOM NAME
    socket.emit("send_message", {
      message: `${socket.id.substring(0, 2)} said ${sendMsg}`,
      room,
    })
  }

  // we'll listen on this event from backend, we created 'receive_message'
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // OPTION 0 - TESTING
      // alert(data.message)

      // OPTION 1 & 2
      setReceivedMsg(data.message)
    })
  }, [])

  return (
    <div className='App'>
      {/* JOIN ROOM */}
      <input
        placeholder='Join here..'
        onChange={(event) => {
          setRoom(event.target.value)
        }}
      />

      <button onClick={joinRoom}>Join Room</button>

      <br />
      <br />

      {/* SEND MESSAGE */}
      <input
        placeholder='Message..'
        onChange={(event) => {
          setSendMsg(event.target.value)
        }}
      />

      <button onClick={sendMessage}>Send Message</button>

      <h2>{receivedMsg}</h2>
    </div>
  )
}

export default App
