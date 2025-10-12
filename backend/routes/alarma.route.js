import { Router } from "express";
import {
  deleteAlarm,
  getAlarmsController,
  registerAlarm,
  updateAlarm,
  updateState,
} from "../src/controllers/alarma.controller.js";

const router = Router();

router.get("/", getAlarmsController);
router.put("/update", updateAlarm);
router.put("/state", updateState);
router.post("/register", registerAlarm);
router.delete("/delete", deleteAlarm);

export default router;
