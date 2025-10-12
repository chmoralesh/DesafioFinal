import React from "react";

import { Container, Col, Row } from "react-bootstrap";

import AlarmFormRegister from "../components/AlarmFormRegister";
import AlarmFormEdit from "../components/AlarmFormEdit";
import AlarmFormDelete from "../components/AlarmFormDelete";
//import AlarmFormDelete from "../components/AlarmFormDelete";

const Alarms = () => {
  // Datos para personalizar el formulario de registro
  const registerData = {
    title: "Formulario de registro de alarmas",
    color: "success",
    viewAll: true,
    buttonText: "Registrar nueva alarma",
    isEdit: false,
  };
  // Datos para personalizar el formulario de modificación de usuario
  const editData = {
    title: "Formulario de edición de alarmas",
    color: "warning",
    viewAll: true,
    buttonText: "Editar alarma",
    isEdit: true,
  };
  // Datos para formulario de eliminación de usuario
  const deleteData = {
    title: "Formulario de eliminación de alarmas",
    color: "danger",
    viewAll: false,
    buttonText: "Eliminar alarma",
    isEdit: false,
  };

  return (
    <div>
      <Container>
        <Row className="w-100 mt-3 text-center ">
          {" "}
          <h2 className="text-info w-100 ">Interfaz de edición de usuarios</h2>
        </Row>
        <Row>
          <Col md={4}>
            {" "}
            <AlarmFormRegister customizedData={registerData} />
          </Col>
          <Col md={4}>
            {" "}
            <AlarmFormEdit customizedData={editData} />
          </Col>
          <Col md={4}>
            {" "}
            <AlarmFormDelete customizedData={deleteData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Alarms;
