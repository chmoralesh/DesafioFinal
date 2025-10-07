import React, { useState } from "react";
import Swal from "sweetalert2";

import { Form, Button, Container, Col, Row } from "react-bootstrap";
//import Form from "react-bootstrap/Form";
import { UserContext } from "../contexts/UserContext";

const UserFormDelete = ({ customizedData = {} }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { title = "", color = "", buttonText = "" } = customizedData;

  //estado para email
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  //funciones

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
    setErrorEmail(false);
  };

  //alertas

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setErrorEmail(true);
      Swal.fire({
        title: "El email es obligatorio",
        icon: "error",
      });
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/auth/delete/${email}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: data.error || "No se pudo eliminar el usuario",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Eliminado correctamente",
        text: data.message,
        icon: "success",
      });

      setEmail("");
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire({
        title: "Error del servidor",
        text: "Verifica que el backend esté corriendo",
        icon: "error",
      });
    }
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

                <Button type="submit" variant={`${color} text-dark fw-bold`}>
                  {buttonText}
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>

        <Row></Row>
      </Container>
    </div>
  );
};

export default UserFormDelete;
