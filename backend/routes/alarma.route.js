import { Router } from "express";
import {
  deleteAlarm,
  getAlarmsController,
  registerAlarm,
  updateAlarm,
} from "../src/controllers/alarma.controller.js";

const router = Router();

router.get("/", getAlarmsController);
router.put("/update", updateAlarm);
router.post("/register", registerAlarm);
router.delete("/delete", deleteAlarm);

export default router;
