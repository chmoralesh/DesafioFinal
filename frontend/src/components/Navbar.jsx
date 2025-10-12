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
                <NavLink to="/Mppl" className="w-100">
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

// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import miles from "../utils/miles";
// import { NavLink } from "react-router-dom";
// import { CartContext } from "../contexts/CartContext";
// import { useContext, useEffect, useState } from "react";
// import TotalCalc from "../utils/TotalCalc";
// import { TokenContext } from "../contexts/TokenContext";
// import { UserContext } from "../contexts/UserContext";
// import logoImage from "../assets/img/logo (2).png";
// import RelojDigital from "../utils/RelojDigital";
// import { Col, Row } from "react-bootstrap";
// import "./Navbar.css";

// const Navbars = () => {
//   const { cart } = useContext(CartContext);
//   const { logout, autoProfile } = useContext(UserContext);

//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const response = await autoProfile();
//       if (!response.error) {
//         setUser(response);
//         //console.log(typeof response.name);
//       }
//     };
//     fetchProfile();
//   }, [autoProfile]);
//   //console.log(user.name);

//   const { token } = useContext(TokenContext);
//   useEffect(() => {}, [token]);

//   return (
//     <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
//       <Container fluid>
//         <Navbar.Brand>
//           <img src={logoImage} alt="Logo" height="50" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <NavLink to="/" className="nav-link">
//               Inicio
//             </NavLink>
//             <NavLink to="/Mppl" className="nav-link">
//               Motor Principal
//             </NavLink>
//             <NavLink to="/disp1" className="nav-link">
//               Menú disponible 1
//             </NavLink>
//             <NavLink to="/disp2" className="nav-link">
//               Menú disponible 2
//             </NavLink>
//           </Nav>
//           <Nav>
//             {token ? (
//               <NavLink to="/profile" className="nav-link">
//                 Usuario: {user.type}
//               </NavLink>
//             ) : (
//               <NavLink to="/login" className="nav-link">
//                 Login
//               </NavLink>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>

//     // <Navbar
//     //   expand="lg"
//     //   className="bg-dark sticky-top "
//     //   style={{ height: "100px" }}
//     // >
//     //   <Container fluid className="w-100">
//     //     <Row className="w-100 justify-content-center align-items-center">
//     //       <Col md={2} className="d-flex justify-content-center">
//     //         <img
//     //           style={{ height: "90px", width: "auto" }}
//     //           className="imgs"
//     //           src={logoImage}
//     //           alt="Logo"
//     //         />
//     //       </Col>
//     //       <Col md={6} className=" ">
//     //         <Container fluid>
//     //           <Row className=" ">
//     //             <Col md={8} className="w-100 d-flex align-items-center">
//     //               <Row className="w-100">
//     //                 <Col
//     //                   md={2}
//     //                   className=" d-flex justify-content-center align-items-center "
//     //                 >
//     //                   <NavLink to="/" className={"w-100"}>
//     //                     {({ isActive }) => (
//     //                       <Button
//     //                         className={`rounded menu-button ${
//     //                           isActive ? "text-info border-info" : "text-white"
//     //                         }`}
//     //                         variant="outline-light"
//     //                       >
//     //                         Inicio
//     //                       </Button>
//     //                     )}
//     //                   </NavLink>
//     //                 </Col>
//     //                 <Col
//     //                   md={2}
//     //                   className=" d-flex justify-content-center align-items-center "
//     //                 >
//     //                   <NavLink to="/Mppl" className={"w-100"}>
//     //                     {({ isActive }) => (
//     //                       <Button
//     //                         className={`rounded menu-button ${
//     //                           isActive ? "text-info border-info" : "text-white"
//     //                         }`}
//     //                         variant="outline-light"
//     //                       >
//     //                         Motor Principal
//     //                       </Button>
//     //                     )}
//     //                   </NavLink>
//     //                 </Col>
//     //                 <Col
//     //                   md={2}
//     //                   className=" d-flex justify-content-center align-items-center "
//     //                 >
//     //                   <NavLink to="/disp1" className={"w-100"}>
//     //                     {({ isActive }) => (
//     //                       <Button
//     //                         className={`rounded menu-button ${
//     //                           isActive ? "text-info border-info" : "text-white"
//     //                         }`}
//     //                         variant="outline-light"
//     //                       >
//     //                         Menú disponible 1
//     //                       </Button>
//     //                     )}
//     //                   </NavLink>
//     //                 </Col>
//     //                 <Col
//     //                   md={2}
//     //                   className=" d-flex justify-content-center align-items-center "
//     //                 >
//     //                   <NavLink to="/disp2" className={"w-100"}>
//     //                     {({ isActive }) => (
//     //                       <Button
//     //                         className={`rounded menu-button ${
//     //                           isActive ? "text-info border-info" : "text-white"
//     //                         }`}
//     //                         variant="outline-light"
//     //                       >
//     //                         Menú disponible 2
//     //                       </Button>
//     //                     )}
//     //                   </NavLink>
//     //                 </Col>
//     //                 <Col
//     //                   md={4}
//     //                   className=" d-flex justify-content-center align-items-center "
//     //                 >
//     //                   {token ? (
//     //                     <NavLink to="/profile" className={"w-100"}>
//     //                       {({ isActive }) => (
//     //                         <Button
//     //                           className={`rounded menu-button ${
//     //                             isActive
//     //                               ? "text-info border-info"
//     //                               : "text-white"
//     //                           }`}
//     //                           variant="outline-success"
//     //                         >
//     //                           🔓 Usuario: {user.type ? user.type : ""}
//     //                         </Button>
//     //                       )}
//     //                     </NavLink>
//     //                   ) : (
//     //                     <NavLink to="/login" className={"w-100"}>
//     //                       {({ isActive }) => (
//     //                         <Button
//     //                           className={`rounded menu-button ${
//     //                             isActive
//     //                               ? "text-info border-info"
//     //                               : "text-white"
//     //                           }`}
//     //                           variant="outline-light"
//     //                         >
//     //                           🔐 Login
//     //                         </Button>
//     //                       )}
//     //                     </NavLink>
//     //                   )}
//     //                 </Col>
//     //                 {/* <Col
//     //                   md={2}
//     //                   className=" d-flex justify-content-center align-items-center "
//     //                 >
//     //                   {token ? (
//     //                     <NavLink to="/" onClick={logout} className={"w-100"}>
//     //                       <Button
//     //                         className="rounded menu-button border-3"
//     //                         variant="outline-light"
//     //                       >
//     //                         🔓 Logout
//     //                       </Button>
//     //                     </NavLink>
//     //                   ) : (
//     //                     <NavLink to="/register" className={"w-100"}>
//     //                       {({ isActive }) => (
//     //                         <Button
//     //                           className={`rounded menu-button ${
//     //                             isActive
//     //                               ? "text-info border-info"
//     //                               : "text-white"
//     //                           }`}
//     //                           variant="outline-light"
//     //                         >
//     //                           🔐 Register
//     //                         </Button>
//     //                       )}
//     //                     </NavLink>
//     //                   )}
//     //                 </Col> */}
//     //               </Row>
//     //             </Col>

//     //             {/* <Form className="d-flex">
//     //         <NavLink to="/cart">
//     //           {({ isActive }) => (
//     //             <Button
//     //               className={`rounded mx-2 ${
//     //                 isActive ? "text-info border-info" : "text-white"
//     //               }`}
//     //               variant="outline-light"
//     //             >
//     //               🛒 Total: ${miles(TotalCalc(cart))}
//     //             </Button>
//     //           )}
//     //         </NavLink>
//     //       </Form> */}
//     //           </Row>
//     //         </Container>
//     //       </Col>
//     //       <Col md={4} className=" justify-content-center">
//     //         <Button
//     //           className={`w-100 rounded text-white
//     //               `}
//     //           variant="outline-light"
//     //         >
//     //           <RelojDigital />
//     //           AQUÍ ESTARÁ LA ÚLTIMA ALARMA ACTIVA NO ACUSADA
//     //         </Button>

//     //         {/* <NavLink to="/cart" className={"w-100 "}>
//     //           {({ isActive }) => (
//     //             <Button
//     //               className={`w-100 rounded ${
//     //                 isActive ? "text-info border-info" : "text-white"
//     //               }`}
//     //               variant="outline-light"
//     //             >
//     //               <RelojDigital />
//     //               🛒 Total: ${miles(TotalCalc(cart))}
//     //             </Button>
//     //           )}
//     //         </NavLink> */}
//     //       </Col>
//     //     </Row>
//     //   </Container>
//     // </Navbar>
//   );
// };

// export default Navbars;
