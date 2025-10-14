import React from "react";

import { Container, Col, Row } from "react-bootstrap";

import UserForm from "../components/UserFormRegister";
import UserFormDelete from "../components/UserFormDelete";

const Register = () => {
  // Datos para personalizar el formulario de registro
  const registerData = {
    title: "Formulario de registro de usuarios",
    color: "success",
    viewAll: true,
    buttonText: "Registrar nuevo usuario",
    isEdit: false,
  };
  // Datos para personalizar el formulario de modificación de usuario
  const editData = {
    title: "Formulario de edición de usuarios",
    color: "warning",
    viewAll: true,
    buttonText: "Editar usuario",
    isEdit: true,
  };
  // Datos para formulario de eliminación de usuario
  const deleteData = {
    title: "Formulario de eliminación de usuarios",
    color: "danger",
    viewAll: false,
    buttonText: "Eliminar usuario",
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
            <UserForm customizedData={registerData} />
          </Col>
          <Col md={4}>
            {" "}
            <UserForm customizedData={editData} />
          </Col>
          <Col md={4}>
            {" "}
            <UserFormDelete customizedData={deleteData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
