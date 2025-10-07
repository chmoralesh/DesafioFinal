import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(400).json({ message: "El token debe estar presente" });
    }
    const extractToken = token.split(" ")[1];
    const decoded = jwt.verify(extractToken, process.env.JWT_SECRET);
    req.user = decoded.email; //si quiero todos los datos del usuario, usar req.user = decoded
    next();
  } catch (error) {
    return res.status(400).json({ message: "El token es invalido" });
  }
};
export { verifyToken };
