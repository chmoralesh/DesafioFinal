import cors from "cors";
import "dotenv/config";
import express from "express";
//websockets
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import checkoutRoute from "./routes/checkout.route.js";
import alarmaRoute from "./routes/alarma.route.js";
import mqttRoute from "./routes/mqtt.route.js";
import "dotenv/config";
import "./src/services/mqtt.js";

const PORT = process.env.PORT || 5000;

export const loadAlarmas = async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/alarmas`);
    if (!response.ok) throw new Error("Error al obtener alarmas");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar las alarmas:", error);
    throw error;
  }
};

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/alarmas", alarmaRoute);
app.use("/api/checkouts", checkoutRoute);
app.use("/api/mqtt", mqttRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

//websockets

// Crear servidor HTTP a partir de Express
const httpServer = createServer(app);

// Configurar Socket.IO
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" }, // <- React normalmente corre en 3000
});

io.on("connection", async (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Enviar datos iniciales
  try {
    const alarmas = await loadAlarmas();
    socket.emit("updateAlarmas", alarmas);
  } catch (error) {
    console.error("Error al cargar alarmas:", error);
  }
});

setInterval(async () => {
  try {
    const alarmas = await loadAlarmas();
    io.emit("updateAlarmas", alarmas);
  } catch (error) {
    console.error("Error al cargar alarmas:", error);
  }
}, 1000);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
