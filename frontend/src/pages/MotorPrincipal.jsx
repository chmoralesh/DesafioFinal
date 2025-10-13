import React from "react";
import MotorSVG from "../assets/img/motor.svg";
import MotorDieselSVG from "../components/MotorDieselSVG";
import { Col, Container, Row } from "react-bootstrap";
import { groupsRender } from "../utils/OptionsInputs";
import { useContext, useState, useEffect } from "react";
import { WebSocketContext } from "../contexts/WebSocketProvider";
import CardAlarm from "../components/CardAlarm";
import "./MotorPrincipal.css";

const MotorPrincipal = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data } = useContext(WebSocketContext);
  const [values, setValues] = useState([]);

  const callApi = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setValues(data);
  };

  useEffect(() => {
    callApi(`${apiUrl}/alarmas`);
  }, []);

  // Actualiza values cada vez que cambie el WS
  useEffect(() => {
    if (data && data.length > 0) {
      setValues(data);
    }
  }, [data]);

  const customColors = {
    cuerpoMotor: [
      "rgba(50, 200, 57, 1)",
      "rgba(50, 200, 57, 1)",
      "rgba(50, 200, 57, 1)",
    ],
    culatas: ["rgba(105, 255, 100, 1)", "rgb(80,120,200)"],
    radiador: "#ff6b35",
    cables: "#00ff88",
  };

  const alarmWidth = 2;

  const grupo = groupsRender[0];
  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center text-white">
        <h2 className="mt-3 text-center">{`Resumen de Alarmas de ${grupo.name}`}</h2>
      </div>
      <Container fluid>
        <Row>
          <Col md={3} key={grupo.id}>
            <div className="bg-dark rounded-4 p-3">
              <Row className="g-2">
                {values
                  .filter((e) => e.group === grupo.id)
                  .map((e) => (
                    <Col xs={12} key={e.id}>
                      <CardAlarm id={e.id} name={e.name} state={e.state} />
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
          <Col
            md={9}
            className=" d-flex justify-content-center  imageContainer"
          >
            {/* {" "}
            <MotorDieselSVG colors={customColors} /> */}
            <Container
              fluid
              className="d-flex justify-content-center align-items-center p-3"
            >
              <div style={{ width: "100%" }}>
                <MotorDieselSVG />
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MotorPrincipal;
