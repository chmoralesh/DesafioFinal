import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_WS;
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Conectar usando socket.io-client
    const socketInstance = io(`${apiUrl}`, {
      transports: ["websocket"], // fuerza solo WebSocket
    });

    socketInstance.on("connect", () => {
      console.log("🔌 Conectado a Socket.IO");
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket.IO desconectado");
    });

    socketInstance.on("updateAlarmas", (newData) => {
      //console.log("📡 Datos recibidos:", newData);
      setData(newData);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, data }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
