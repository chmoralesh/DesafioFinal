import pool from "../../db/config.js";

//Mostrar datos de todas las alarmas
//GET
export const getAlarmsModel = async () => {
  const SQLquery = {
    text: "SELECT * FROM alarmas ORDER BY id_num",
  };
  const response = await pool.query(SQLquery);
  //console.log("Estas son las alarmas", response.rows);
  return response.rows;
};
//Register

export const createAlarmModel = async (alarm) => {
  const { name, type, delay, inhibit, group } = alarm;
  const state = 0;
  const SQLquery = {
    text: `INSERT INTO alarmas (name, type, delay, inhibit, state, "group") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, type, delay, inhibit, state, "group"`,
    values: [name, type, delay, inhibit, state, group],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

//PUT
export const setAlarmModel = async ({
  id,
  name,
  type,
  delay,
  inhibit,
  state,
  group,
}) => {
  if (!id) throw new Error("ID de alarma requerido");

  const SQLquery = {
    text: `
      UPDATE alarmas
      SET name = $2, type = $3, delay = $4, inhibit =$5, state = $6, "group" = $7
      WHERE id = $1
      RETURNING id, name, type, delay, inhibit, state, "group"
    `,
    values: [id, name, type, delay, inhibit, state, group],
  };

  const response = await pool.query(SQLquery);
  if (response.rowCount === 0) {
    throw new Error("No se pudo modificar la alarma");
  }
  return response.rows[0];
};

//Delete
export const destroyAlarmModel = async (id) => {
  const sqlQuery = {
    text: "DELETE FROM alarmas WHERE id = $1",
    values: [id],
  };
  const result = await pool.query(sqlQuery);
  return result.rowCount;
};
