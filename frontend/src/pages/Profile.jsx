import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Row, Col, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { TokenContext } from "../contexts/TokenContext";
import { UserContext } from "../contexts/UserContext";
import { Container } from "react-bootstrap";
import { useUserProfile } from "../hooks/useProfile";

export const Profile = () => {
  const { logout, autoProfile } = useContext(UserContext);
  // // Obtener el perfil del usuario
  const [user, setUser] = useState({});
  const { token, userValidated } = useUserProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await autoProfile();
      if (!response.error) {
        setUser(response);
      }
    };
    fetchProfile();
  }, [autoProfile]);

  //------------------------------------

  return (
    <>
      <div className="container mt-5">
        <Card>
          <Card.Header className="d-flex justify-content-center">
            <h4>Mi Perfil</h4>
          </Card.Header>
          <Card.Body>
            <Container className="d-flex justify-content-center pb-3">
              {/* Contenedor de la tabla */}
              <div className="border rounded p-2 w-100 w-md-50 mx-auto">
                <Table className="m-0">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Nombre:</strong>
                      </td>
                      <td>{user ? user.name : "Cargando perfil..."}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{user ? user.email : "Cargando perfil..."}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tipo:</strong>
                      </td>
                      <td>{user ? user.type : "Cargando perfil..."}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Container>

            <Card.Footer>
              <Row className="g-2">
                <Col xs={12} md={2}>
                  <NavLink to="/register" className="w-100">
                    {userValidated && (
                      <Button className="w-100 rounded" variant="primary">
                        Editar Usuarios
                      </Button>
                    )}
                  </NavLink>
                </Col>

                <Col xs={12} md={2}>
                  <NavLink to="/alarmas" className="w-100">
                    {userValidated && (
                      <Button className="w-100 rounded" variant="primary">
                        Editar Alarmas
                      </Button>
                    )}
                  </NavLink>
                </Col>
                <Col xs={0} md={6}></Col>

                <Col xs={12} md={2} className="d-flex justify-content-end">
                  <NavLink to="/" className="w-100 w-md-auto" onClick={logout}>
                    <Button className="w-100 w-md-auto" variant="danger">
                      Cerrar Sesión
                    </Button>
                  </NavLink>
                </Col>
              </Row>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
