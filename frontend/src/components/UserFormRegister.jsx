import React, { useContext, useState } from "react";
import Swal from "sweetalert2";

import { Form, Button, Container, Col, Row } from "react-bootstrap";
//import Form from "react-bootstrap/Form";
import { UserContext } from "../contexts/UserContext";

const UserForm = ({ customizedData = {} }) => {
  const {
    title = "",
    color = "",
    isEdit = false,
    buttonText = "",
    emailIsList = false,
  } = customizedData;

  const { handleRegister } = useContext(UserContext);
  //estado para email
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  //estado para password 1
  const [pass1, setPass1] = useState("");
  const [errorPass1, setErrorPass1] = useState(false);
  //estado para password 2
  const [pass2, setPass2] = useState("");
  const [errorPass2, setErrorPass2] = useState(false);
  //estado para tipo de usuario
  const [userType, setUserType] = useState("operador");
  const [errorUserType, setErrorUserType] = useState(false);
  //estado para nombre
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);

  //funciones

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail(false);
  };
  const handleChangePass1 = (e) => {
    setPass1(e.target.value);
    setErrorPass1(false);
  };
  const handleChangePass2 = (e) => {
    setPass2(e.target.value);
    setErrorPass2(false);
  };
  const handleChangeUserType = (e) => {
    setUserType(e.target.value);
    setErrorUserType(false);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
    setErrorName(false);
  };

  //alertas

  const handleSubmit = (e) => {
    e.preventDefault();

    //reset de estados
    let errorState = false;
    setErrorEmail(false);
    setErrorPass1(false);
    setErrorPass2(false);
    setErrorUserType(false);

    if (email === "") {
      setErrorEmail(true);
      errorState = true;
    }
    if (pass1.length < 6 || pass1 === "") {
      setErrorPass1(true);
      errorState = true;
    }
    if (pass2 != pass1 || pass2 === "") {
      setErrorPass2(true);
      errorState = true;
    }
    if (userType === "") {
      setErrorUserType(true);
      errorState = true;
    }
    if (name === "") {
      setErrorName(true);
      errorState = true;
    }

    if (errorState) {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        icon: "error",
        draggable: false,
      });
      return;
    }

    handleRegister(e, email, pass1, userType, name);

    setErrorEmail(false);
    setErrorPass1(false);
    setErrorPass2(false);
    setErrorUserType(false);
    setErrorName(false);

    // limpiar después de enviar

    setEmail("");
    setPass1("");
    setPass2("");
    setName("");
  };

  return (
    <div>
      <Container fluid>
        {/* <Row className="w-100 mt-3 text-center ">
          {" "}
          <h2 className="text-info w-100 ">Interfaz de edición de usuarios</h2>
        </Row> */}
        <Row>
          <Col>
            {" "}
            <Container className="d-flex flex-column align-items-center mt-3 ">
              <Form
                className={`container mt-3 border border-${color} rounded p-3`}
                action="submit"
                onSubmit={(e) => handleSubmit(e)}
              >
                <Form.Label
                  className={`fw-bold fs-3 w-100 text-center pb-3 border-bottom border-${color}`}
                >
                  {title}
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
                {isEdit ? (
                  <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre"
                      value={name}
                      onChange={(e) => handleChangeName(e)}
                      autoComplete=""
                    />
                    <Form.Text className="text-muted">
                      {errorName ? (
                        <p className="text-danger">
                          El nombre de usuario es obligatorio
                        </p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                ) : (
                  ""
                )}
                {isEdit ? (
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
                          La contraseña debe tener mas de 6 caracteres y no
                          puede estar vacía
                        </p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                ) : (
                  ""
                )}

                {isEdit ? (
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
                ) : (
                  ""
                )}
                {isEdit ? (
                  <Form.Group className="mb-3" controlId="formBasicUserType">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Select
                      className="text-dark"
                      value={userType}
                      onChange={(e) => handleChangeUserType(e)}
                    >
                      <option>{`operador`}</option>
                      <option>{`supervisor`}</option>
                      <option>{`superuser`}</option>
                    </Form.Select>

                    <Form.Text className="">
                      {errorUserType ? (
                        <p className="text-danger">
                          Debe seleccionar un tipo de usuario válido
                        </p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                ) : (
                  ""
                )}

                <Button type="submit" variant={`${color} text-dark fw-bold`}>
                  {buttonText}
                </Button>
              </Form>
            </Container>
          </Col>
          {/* <Col md={4}>
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
          </Col> */}
        </Row>

        <Row></Row>
      </Container>
    </div>
  );
};

export default UserForm;
