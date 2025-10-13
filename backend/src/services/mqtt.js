import mqtt from "mqtt";
import { setStateModel } from "../models/alarma.model.js";

const brokerUrl = "mqtt://broker.hivemq.com:1883";
const topic = "desafiolatam/alarmas";

// Array para guardar los estados (ej: [{ id, state }, ...])
let alarmStates = {};

// Conexión al broker MQTT
const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on("connect", () => {
  console.log("✅ Conectado al broker MQTT");
  mqttClient.subscribe(topic, (err) => {
    if (err) console.error("❌ Error al suscribirse:", err);
    else console.log(`📡 Suscrito al topic: ${topic}`);
  });
});

mqttClient.on("message", async (topic, message) => {
  try {
    const payload = message.toString();
    console.log(`📥 MQTT mensaje [${topic}]:`, payload);

    const data = JSON.parse(payload);

    // Guardar en memoria
    alarmStates[data.id] = data;

    // Actualizar solo el state en la DB
    await setStateModel({
      id: data.id,
      state: data.state ?? 0, // normaliza null/undefined
    });

    console.log("📊 Estado actual:", alarmStates);
  } catch (err) {
    console.error("❌ Error procesando mensaje MQTT:", err);
  }
});

// Función para publicar en cualquier topic
// const publishMQTT = (topic, data) => {
//   const payload = JSON.stringify(data);
//   mqttClient.publish(topic, payload, { qos: 1 }, (err) => {
//     if (err) console.error(`❌ Error al publicar en ${topic}:`, err);
//     else console.lo g(`📤 Publicado en ${topic}:`, payload);
//   });
// };

export const publishMQTT = (topic, data) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);

    mqttClient.publish(topic, payload, { qos: 1 }, (err) => {
      if (err) {
        console.error(`❌ Error al publicar en ${topic}:`, err);
        reject(err);
      } else {
        console.log(`📤 Publicado en ${topic}:`, payload);
        resolve();
      }
    });
  });
};

//publishMQTT("desafiolatam/logs", { mensaje: "Sistema iniciado" });

// Exportamos para usar en otros módulos
export { alarmStates, mqttClient };
