import {
  Modal,
  Button,
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../contexts/CartContext";
import { WebSocketContext } from "../contexts/WebSocketProvider";
import { UserContext } from "../contexts/UserContext";

import miles from "../utils/miles";
import { ColorStateAlarms } from "../utils/ColorStateAlarms";
import {
  typeOptions,
  delayOptions,
  inhibitOptions,
  stateOptions,
} from "../utils/OptionsInputs";
import "./AlarmModal.css";

// Hook para obtener el perfil del usuario
import { useUserProfile } from "../hooks/useProfile";

export const AlarmModal = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [alarma, setAlarma] = useState(null);
  const idUp = code.toUpperCase();

  const { cart, setCart } = useContext(CartContext);
  const { data } = useContext(WebSocketContext);

  // Obtener el perfil del usuario
  const { token, userValidated } = useUserProfile();

  //------------------------------------

  const callApi = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setAlarma(data);
    //console.log(data);
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    try {
      await callApi(`${apiUrl}/alarmas/${code}`);
    } catch (error) {
      console.log(error);
    }
  };

  const acknowledgeAlarm = async (idUp) => {
    try {
      const response = await fetch(`${apiUrl}/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: idUp }),
      });
      alert("Alarma reconocida");
      console.log(response.status);
    } catch (error) {
      console.log("Error al reconocer la alarma", error);
    }
  };

  useEffect(() => {
    if (!code) return;

    fetchData();
  }, [code]);

  // Valores actuales de la alarma obtenidos por WebSocket o API
  const actualAlarma = data?.find((item) => item.id === idUp);
  const values = actualAlarma || alarma;

  const totalUp = () => {
    setCart(
      cart.map((item) =>
        item.id === idUp ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Opciones para tipo de señal
  const [selectedType, setSelectedType] = useState("");
  useEffect(() => {
    if (values.type) {
      setSelectedType(values.type);
    }
  }, [values.type]);

  // Opciones para delay
  const [selectedDelay, setSelectedDelay] = useState("");

  useEffect(() => {
    if (values.delay) {
      setSelectedDelay(values.delay);
    }
  }, [values.delay]);

  // Opciones para inhibir
  const [selectedInhibit, setSelectedInhibit] = useState("No");
  useEffect(() => {
    if (values.inhibit) {
      setSelectedInhibit(values.inhibit ? "Si" : "No");
    }
  }, [values.inhibit]);

  // Opciones para estado
  const [selectedState, setSelectedState] = useState("");
  useEffect(() => {
    if (values.state || values.state === 0) {
      setSelectedState(stateOptions[values.state]);
    }
  }, [values.state]);

  return (
    <Modal show={true} onHide={() => navigate(-1)} size="lg" centered>
      <Modal.Header
        closeButton
        className={`${ColorStateAlarms(values.state).backgroundColor} `}
      >
        <Modal.Title className="text-white p-2 rounded text-center w-100">
          Alarma {values.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <article
          className="d-flex justify-content-center mt-3"
          style={{ minWidth: "100%" }}
        >
          <Container
            fluid
            className="text-center mb-3 border-3  "
            border="primary"
          >
            {/* -------Card Header------- */}
            <Card className="  bg-primary bg-opacity-10  rounded-top titles">
              <Row className="">
                <Col md={4} className="pt-2">
                  <p>Descripción</p>
                </Col>
                <Col md={4} className="pt-2 border-start border-end">
                  <p>Valor Actual</p>
                </Col>
                <Col md={4} className="pt-2">
                  <p>Valor Deseado</p>
                </Col>
              </Row>
            </Card>
            {/* -------Card Estado------- */}
            <Card className=" mt-1">
              <Row className="row-edit">
                <Col md={4} className="pt-2">
                  <p>Estado</p>
                </Col>
                <Col
                  md={4}
                  className={`border-0 rounded-top pt-2 border-start border-end text-white  ${
                    values.state === 2 ? "blink-border" : ""
                  } ${
                    ColorStateAlarms(values.state).backgroundColor
                  } state-mobile`}
                >
                  <p className={` `}>{selectedState}</p>
                </Col>
                <Col md={4} className="align-items-center d-flex"></Col>
              </Row>
            </Card>
            {/* -------Card Delay------- */}
            <Card className=" mt-1">
              <Row className="row-edit">
                <Col md={4} className="pt-2">
                  <p>{`Delay [ms]`}</p>
                </Col>
                <Col md={4} className="pt-2 border-start border-end">
                  <p>{values.delay}</p>
                </Col>
                <Col md={4} className="align-items-center d-flex">
                  {userValidated ? (
                    <Form.Select
                      className=""
                      value={selectedDelay}
                      onChange={(e) => setSelectedDelay(e.target.value)}
                    >
                      {delayOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Card>
            {/* -------Card Inhibir------- */}
            <Card className=" mt-1">
              <Row className="row-edit">
                <Col md={4} className="pt-2">
                  <p>Inhibir</p>
                </Col>
                <Col md={4} className="pt-2 border-start border-end">
                  <p>
                    {values.inhibit ? inhibitOptions[0] : inhibitOptions[1]}
                  </p>
                </Col>
                <Col md={4} className="align-items-center d-flex">
                  {token ? (
                    <Form.Select
                      className=""
                      value={selectedInhibit}
                      onChange={(e) => setSelectedInhibit(e.target.value)}
                    >
                      {inhibitOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Card>
            {/* -------Card Tipo------- */}
            <Card className=" mt-1">
              <Row className="row-edit">
                <Col md={4} className="pt-2">
                  <p>Tipo de señal</p>
                </Col>
                <Col md={4} className="pt-2 border-start border-end">
                  <p>{values.type}</p>
                </Col>
                <Col md={4} className="align-items-center d-flex">
                  {userValidated ? (
                    <Form.Select
                      className=""
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      {typeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Card>
          </Container>
        </article>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row className="g-2">
            <Col xs={12} md={3} className="text-start ">
              <Button
                className="w-100 w-md-auto "
                variant="secondary"
                onClick={() => acknowledgeAlarm(idUp)}
              >
                Acusar Alarma
              </Button>
            </Col>
            <Col md={5}></Col>
            <Col xs={12} md={4} className="text-end">
              {token ? (
                <Button
                  className="w-100 w-md-auto"
                  variant="secondary"
                  onClick={() => acknowledgeAlarm(idUp)}
                >
                  Agregar a Modificaciones
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};
