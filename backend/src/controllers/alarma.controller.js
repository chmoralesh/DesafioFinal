import {
  createAlarmModel,
  destroyAlarmModel,
  getAlarmsModel,
  setAlarmModel,
} from "../models/alarma.model.js";

//NUEVO-----------------------
//GET
export const getAlarmsController = async (req, res) => {
  try {
    const data = await getAlarmsModel();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener las alarmas:", error);
    res.status(500).json({ error: "Error al obtener las alarmas" });
  }
};

//POST
export const registerAlarm = async (req, res) => {
  try {
    const { name, type, delay, groupIndex, inhibitValue } = req.body;
    const group = groupIndex;
    const inhibit = await inhibitValue;
    //console.log(req.body);
    //console.log(inhibit);
    const alarm = await createAlarmModel({ name, type, delay, inhibit, group });
    return res
      .status(201)
      .json({ message: "Alarma creada correctamente", alarm });
  } catch (error) {
    console.error("Error al crear alarma:", error);
    res.status(500).json({ error: "Error al crear alarma" });
  }
};

//PUT
export const updateAlarm = async (req, res) => {
  console.log(req.body);
  try {
    const { id, name, type, delay, inhibit, group } = req.body;
    const state = 0;
    const post = await setAlarmModel({
      id,
      name,
      type,
      delay,
      inhibit,
      state,
      group,
    });
    res.status(200).json({ message: `Se modificó la alarma con id: ${id}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar alarma" });
    console.log("Error => ", error);
  }
};

//Delete

export const deleteAlarm = async (req, res) => {
  console.log(req.body);
  try {
    const { id, name } = req.body;
    const deletedCount = await destroyAlarmModel(id);
    if (deletedCount === 0) {
      return res.status(404).json({ error: "id no encontrado" });
    }
    res
      .status(200)
      .json({ message: `Se eliminó la alarma con id: ${id} y nombre ${name}` });
  } catch (error) {
    console.log("Error => ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
