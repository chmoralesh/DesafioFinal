import { readFile, writeFile } from "node:fs/promises";
import bcrypt from "bcryptjs";
import pool from "../../db/config.js";

//Register

export const createUserModel = async (user) => {
  const { email, password, type, name } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const SQLquery = {
    text: "INSERT INTO usuarios (email, password, type, name) VALUES ($1, $2, $3, $4) RETURNING email, type, name",
    values: [email, hashedPassword, type, name],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

//login
export const findUserByEmailModel = async (email) => {
  const SQLquery = {
    text: "SELECT * FROM usuarios WHERE email = $1",
    values: [email],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

//Mostrar datos de usuario activo
export const getUsersModel = async (email) => {
  const SQLquery = {
    text: "SELECT email, type, name FROM usuarios WHERE email = $1",
    values: [email],
  };
  const response = await pool.query(SQLquery);
  //console.log("Esto es", response.rows[0]);
  return response.rows[0];
};

//Delete
export const destroyUserModel = async (email) => {
  const sqlQuery = {
    text: "DELETE FROM usuarios WHERE email = $1",
    values: [email],
  };
  const result = await pool.query(sqlQuery);
  return result.rowCount;
};

//PUT
export const setUserModel = async ({ email, password, type, name }) => {
  console.log("esto entra al password", password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log("esto sale hash", hashedPassword);

  const SQLquery = {
    text: `
      UPDATE usuarios
      SET password = $1, type = $2, name = $3
      WHERE email = $4
      RETURNING email, type, name
    `,
    values: [hashedPassword, type, name, email],
  };

  const response = await pool.query(SQLquery);
  if (response.rowCount === 0) {
    throw new Error("No se encontró un usuario con ese email");
  }

  return response.rows[0];
};
