import React, { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io()

// For checking Basic Socket.io Connection
// Note: for successfully connect, BE MUST running
const Test = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

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
    <>
      <p>Connected: {"" + isConnected}</p>
    </>
  )
}

export default Test
