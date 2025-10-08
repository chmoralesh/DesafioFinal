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
        {/* <Row>
          <Col md={4}>
            {" "}
            <Container className="d-flex flex-column align-items-center mt-3 ">
              <Form
                className="container mt-3 border border-success rounded p-3"
                variant="outline-success"
                action="submit"
                onSubmit={(e) => handleSubmit(e)}
              >
                <Form.Label className="fw-bold fs-3 w-100 text-center pb-3 border-bottom border-success">
                  Formulario de registro de usuarios
                </Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Dirección email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => handleChangeEmail(e)}
                    autoComplete="username"
                  />
                  <Form.Text className="text-muted">
                    {errorEmail ? (
                      <p className="text-danger">
                        El email no puede estar vacio
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword1">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={pass1}
                    onChange={(e) => handleChangePass1(e)}
                    autoComplete="new-password"
                  />
                  <Form.Text className="text-muted">
                    {errorPass1 ? (
                      <p className="text-danger">
                        La contraseña debe tener mas de 6 caracteres y no puede
                        estar vacía
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña nuevamente"
                    value={pass2}
                    onChange={(e) => handleChangePass2(e)}
                    autoComplete="new-password"
                  />
                  <Form.Text className="text-muted">
                    {errorPass2 ? (
                      <p className="text-danger">
                        Las contraseñas no son iguales
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Button type="submit" variant="success text-dark fw-bold">
                  Registrar nuevo usuario
                </Button>
              </Form>
            </Container>
          </Col>
          <Col md={4}>
            <Container className="d-flex flex-column align-items-center mt-3 ">
              <Form
                className="container mt-3 border border-warning rounded p-3"
                action="submit"
                onSubmit={(e) => handleSubmit(e)}
              >
                <Form.Label className="fw-bold fs-3 w-100 text-center pb-3 border-bottom border-warning">
                  Formulario de edición de usuarios
                </Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Dirección email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => handleChangeEmail(e)}
                    autoComplete="username"
                  />
                  <Form.Text className="text-muted">
                    {errorEmail ? (
                      <p className="text-danger">
                        El email no puede estar vacio
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword1">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={pass1}
                    onChange={(e) => handleChangePass1(e)}
                    autoComplete="new-password"
                  />
                  <Form.Text className="text-muted">
                    {errorPass1 ? (
                      <p className="text-danger">
                        La contraseña debe tener mas de 6 caracteres y no puede
                        estar vacía
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña nuevamente"
                    value={pass2}
                    onChange={(e) => handleChangePass2(e)}
                    autoComplete="new-password"
                  />
                  <Form.Text className="text-muted">
                    {errorPass2 ? (
                      <p className="text-danger">
                        Las contraseñas no son iguales
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Button type="submit" variant="warning text-dark fw-bold">
                  Editar usuario
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>

        <Row></Row> */}
      </Container>
    </div>
  );
};

export default Register;
