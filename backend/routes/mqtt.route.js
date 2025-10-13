import { Router } from "express";
import { alarmStates } from "../src/services/mqtt.js";
import { ackAlarm } from "../src/controllers/mqtt.controller.js";

const router = Router();

// Endpoint para obtener el estado actual del array MQTT
router.get("/alarmas", (req, res) => {
  res.json(alarmStates);
});

router.post("/ack", ackAlarm);

export default router;
