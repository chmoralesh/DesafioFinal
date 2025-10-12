import { Router } from "express";
import { alarmStates } from "../src/services/mqtt.js";

const router = Router();

// Endpoint para obtener el estado actual del array MQTT
router.get("/alarmas", (req, res) => {
  res.json(alarmStates);
});

export default router;
