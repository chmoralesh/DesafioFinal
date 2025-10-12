import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

import { Form, Button, Container, Col, Row } from "react-bootstrap";

import { WebSocketContext } from "../contexts/WebSocketProvider";

const AlarmFormDelete = ({ customizedData = {} }) => {
  //estado para nombre actual
  const [actualName, setActualName] = useState("");
  const [errorActualName, setErrorActualName] = useState(false);

  // Estados extra
  const { data } = useContext(WebSocketContext);
  const [alarmList, setAlarmList] = useState([]);
  const [alarmIdList, setAlarmIdList] = useState([]);
  const [alarmId, setAlarmId] = useState("A1");

  useEffect(() => {
    if (actualName && alarmList.length > 0) {
      const index = alarmList.findIndex((n) => n === actualName);
      if (index !== -1) {
        setAlarmId(alarmIdList[index]);
      }
    }
  }, [alarmList, actualName]);

  useEffect(() => {
    const values = Object.values(data).map((item) => item.name);
    const ids = Object.values(data).map((item) => item.id);
    setAlarmIdList(ids);
    //console.log(ids);
    setAlarmList(values);

    //console.log("Se  ejecutó");
  }, [data]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { title = "", color = "", buttonText = "" } = customizedData;

  //funciones

  const handleChangeActualName = (e) => {
    const selectedName = e.target.value;
    setActualName(selectedName);
    setErrorActualName(false);

    // Buscar el ID de la alarma seleccionada
    const index = alarmList.findIndex((n) => n === selectedName);
    if (index !== -1) {
      setAlarmId(alarmIdList[index]);
    }
  };

  //alertas

  const handleRegister = async () => {
    console.log(
      JSON.stringify({
        name: actualName,
        id: alarmId,
      })
    );
    try {
      const res = await fetch(`${apiUrl}/alarmas/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: actualName,
          id: alarmId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: data.error || "No se pudo eliminar la alarma",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Alarma eliminada correctamente",
        text: data.message,
        icon: "success",
      });
    } catch (error) {
      console.error("Error al crear:", error);
      Swal.fire({
        title: "Error del servidor",
        text: "Verifica que el backend esté corriendo",
        icon: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorState = false;
    setErrorActualName(false);

    if (actualName === "") {
      setErrorActualName(true);
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

    handleRegister();

    setErrorActualName(false);

    // limpiar después de enviar

    //setActualName("");
  };

  return (
    <div>
      <Container fluid>
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

                <Form.Group className="mb-3" controlId="formBasicAlarmType">
                  <Form.Label>Selecciona el nombre de la alarma</Form.Label>
                  <Form.Select
                    className="text-dark"
                    value={actualName}
                    onChange={(e) => handleChangeActualName(e)}
                  >
                    {alarmList.map((e, i) => {
                      return <option key={i}>{e}</option>;
                    })}
                  </Form.Select>

                  <Form.Text className="">
                    {errorActualName ? (
                      <p className="text-danger">
                        Debe seleccionar un nombre de alarma válido
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

export default AlarmFormDelete;
