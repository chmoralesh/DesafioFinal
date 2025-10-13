import { publishMQTT } from "../services/mqtt.js";

export const ackAlarm = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    await publishMQTT("desafiolatam/logs", { id });
    res.status(200).json({ message: `Se acusó la alarma con id: ${id}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar alarma" });
    console.log("Error => ", error);
  }
};
