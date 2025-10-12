import { findUserByEmailModel } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmailModel(email);
    if (!user) {
      return res
        .status(404)
        .json({ error: "El usuario o la contraseña son incorrectas" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "No autorizado" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "300s",
    });
    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export { loginUser };
