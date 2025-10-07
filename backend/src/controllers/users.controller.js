import {
  createUserModel,
  destroyPostModel,
  getUsersModel,
} from "../models/auth.model.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, type, name } = req.body;
    const user = await createUserModel({ email, password, type, name });
    return res
      .status(201)
      .json({ message: "Usuario creado correctamente", user });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const getUserController = async (req, res) => {
  const email = req.user; // Asumiendo que el middleware verifyToken añade el usuario al request
  try {
    const users = await getUsersModel(email);
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { email } = req.params;
    const deletedCount = await destroyPostModel(email);
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Email no encontrado" });
    }
    res
      .status(200)
      .json({ message: `Se eliminó el usuario con email: ${email}` });
  } catch (error) {
    console.log("Error => ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
