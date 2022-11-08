import React, { useEffect, useState } from "react"
import io from "socket.io-client"

// NOTE: this would be a basic sample of checking Socket.io connection
const socket = io.connect(process.env.REACT_APP_BACKEND_URL)

const Test = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  // check socket.io connection
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [])

  return (
    <div>
      <p>Test Page Connected: {"" + isConnected}</p>
    </div>
  )
}

export default Test
