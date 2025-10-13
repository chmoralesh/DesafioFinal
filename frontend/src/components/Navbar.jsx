import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";
import { TokenContext } from "../contexts/TokenContext";
import { UserContext } from "../contexts/UserContext";

import { useContext, useEffect, useState } from "react";

import logoImage from "../assets/img/logo (2).png";
import RelojDigital from "../utils/RelojDigital";
import miles from "../utils/miles";
import TotalCalc from "../utils/TotalCalc";

import "./Navbar.css";

const Navbars = () => {
  const { cart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const { logout, autoProfile } = useContext(UserContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await autoProfile();
      if (!response.error) setUser(response);
    };
    fetchProfile();
  }, [autoProfile]);

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={logoImage}
            alt="Logo"
            style={{ height: "90px", width: "auto" }}
          />
        </Navbar.Brand>

        {/* Toggle para mobile */}
        <Navbar.Toggle aria-controls="navbar-collapse" />

        {/* Contenido colapsable */}
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="menu d-flex align-items-center w-100">
            {/* Menú principal */}
            <Row className="w-100">
              <Col
                md={2}
                className="d-flex justify-content-center align-items-center mb-2 mb-md-0 "
              >
                <NavLink to="/" className="w-100">
                  {({ isActive }) => (
                    <Button
                      className={`rounded menu-button ${
                        isActive ? "text-info border-info" : "text-white"
                      }`}
                      variant="outline-light"
                    >
                      Inicio
                    </Button>
                  )}
                </NavLink>
              </Col>

              <Col
                md={2}
                className="d-flex justify-content-center align-items-center mb-2 mb-md-0"
              >
                <NavLink to="/mppl" className="w-100">
                  {({ isActive }) => (
                    <Button
                      className={`rounded menu-button ${
                        isActive ? "text-info border-info" : "text-white"
                      }`}
                      variant="outline-light"
                    >
                      Motor Principal
                    </Button>
                  )}
                </NavLink>
              </Col>

              <Col
                md={2}
                className="d-flex justify-content-center align-items-center mb-2 mb-md-0"
              >
                <NavLink to="/disp1" className="w-100">
                  {({ isActive }) => (
                    <Button
                      className={`rounded menu-button ${
                        isActive ? "text-info border-info" : "text-white"
                      }`}
                      variant="outline-light"
                    >
                      Menú disponible 1
                    </Button>
                  )}
                </NavLink>
              </Col>

              <Col
                md={2}
                className="d-flex justify-content-center align-items-center mb-2 mb-md-0"
              >
                <NavLink to="/disp2" className="w-100">
                  {({ isActive }) => (
                    <Button
                      className={`rounded menu-button ${
                        isActive ? "text-info border-info" : "text-white"
                      }`}
                      variant="outline-light"
                    >
                      Menú disponible 2
                    </Button>
                  )}
                </NavLink>
              </Col>

              <Col
                md={4}
                className="d-flex justify-content-center align-items-center mb-2 mb-md-0"
              >
                {token ? (
                  <NavLink
                    to="/profile"
                    className="w-100 d-flex justify-content-center link"
                  >
                    {({ isActive }) => (
                      <Button
                        className={`rounded last-button ${
                          isActive ? "text-info border-info" : "text-white"
                        }`}
                        variant="outline-success"
                      >
                        🔓 Usuario: {user.type || ""}
                      </Button>
                    )}
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="w-100 d-flex justify-content-center link"
                  >
                    {({ isActive }) => (
                      <Button
                        className={`rounded last-button ${
                          isActive ? "text-info border-info" : "text-white"
                        }`}
                        variant="outline-light"
                      >
                        🔐 Login
                      </Button>
                    )}
                  </NavLink>
                )}
              </Col>
            </Row>
          </Nav>

          {/* Sección derecha con reloj */}
          <Nav className="ms-auto d-flex align-items-center mt-3 mt-lg-0">
            <Button
              className="w-100 rounded text-white"
              variant="outline-light"
            >
              <RelojDigital />
              AQUÍ ESTARÁ LA ÚLTIMA ALARMA ACTIVA NO ACUSADA
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
