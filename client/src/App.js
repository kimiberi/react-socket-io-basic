import React from "react"
import "./App.css"
import io from "socket.io-client"

// frontend runs in '3000' then backend for '3001'
const socket = io.connect("http://localhost:3001")

const App = () => {
  const sendMessage = () => {
    // emit message to sort people
    // you can emit sort of event so the person can listen to that event
    // socket.emit()
  }

  return (
    <div className='App'>
      <input placeholder='Message..' />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default App
