import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

import { Form, Button, Container, Col, Row } from "react-bootstrap";
import {
  typeOptions,
  delayOptions,
  inhibitOptions,
  groupsOptions,
} from "../utils/OptionsInputs";

import { WebSocketContext } from "../contexts/WebSocketProvider";

const AlarmFormEdit = ({ customizedData = {} }) => {
  //estado para nombre actual
  const [actualName, setActualName] = useState("");
  const [errorActualName, setErrorActualName] = useState(false);
  //estado para nombre nuevo
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);
  //estado para tipo de alarma
  const [type, setType] = useState("NC");
  const [errorType, setErrorType] = useState(false);
  //estado para delay
  const [delay, setDelay] = useState(100);
  const [errorDelay, setErrorDelay] = useState(false);
  //estado para inhibir
  const [inhibit, setInhibit] = useState("No");
  const [errorInhibit, setErrorInhibit] = useState(false);
  const [inhibitValue, setInhibitValue] = useState(false);

  //estado para grupos
  const [group, setGroup] = useState(groupsOptions[0]);
  const [errorGroup, setErrorGroup] = useState(false);
  let groupIndex = 1;
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
  }, [alarmList, actualName, name]);

  useEffect(() => {
    const values = Object.values(data).map((item) => item.name);
    const ids = Object.values(data).map((item) => item.id);
    setAlarmIdList(ids);
    //console.log(ids);
    setAlarmList(values);

    //console.log("Se  ejecutó");
  }, [data]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    title = "",
    color = "",
    viewAll = false,
    buttonText = "",
    isEdit = false,
  } = customizedData;

  //funciones

  const automaticChangeId = () => {
    const index = alarmList.findIndex((n) => n == name);
    setAlarmId(alarmIdList[index]);
  };

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
  const handleChangeName = (e) => {
    setName(e.target.value);

    setErrorName(false);
  };
  const handleChangeType = (e) => {
    setType(e.target.value);

    setErrorType(false);
  };
  const handleChangeDelay = (e) => {
    setDelay(e.target.value);

    setErrorDelay(false);
  };
  const handleChangeInhibit = (e) => {
    setInhibit(e.target.value);

    if (inhibit === "Si") {
      setInhibitValue(true);
    } else {
      setInhibitValue(false);
    }
    setErrorInhibit(false);
  };
  const handleChangeGroup = (e) => {
    setGroup(e.target.value);

    setErrorGroup(false);
  };

  //alertas

  const handleRegister = async () => {
    groupIndex = groupsOptions.indexOf(group) + 1;

    if (inhibit === "Si") {
      setInhibitValue(true);
    } else {
      setInhibitValue(false);
    }

    console.log(name, type, delay, inhibitValue, groupIndex, alarmId);

    try {
      const res = await fetch(`${apiUrl}/alarmas/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          delay,
          inhibit: inhibitValue,
          group: groupIndex,
          id: alarmId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: data.error || "No se pudo editar la alarma",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Alarma editada correctamente",
        text: data.message,
        icon: "success",
      });

      setName("");
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
    //const index = alarmList.findIndex((n) => n == name);
    //setAlarmId(alarmIdList[index]);

    //console.log("el id ahoras es: ", alarmIdList[index]);

    //reset de estados
    let errorState = false;
    setErrorActualName(false);
    setErrorName(false);
    setErrorType(false);
    setErrorDelay(false);
    setErrorInhibit(false);
    setErrorGroup(false);

    if (actualName === "") {
      setErrorActualName(true);
      errorState = true;
    }
    if (name === "") {
      setErrorName(true);
      errorState = true;
    }
    if (type === "") {
      setErrorType(true);
      errorState = true;
    }
    if (delay === "") {
      setErrorDelay(true);
      errorState = true;
    }
    if (inhibit === "") {
      setErrorInhibit(true);
      errorState = true;
    }
    if (group === "") {
      setErrorGroup(true);
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
    setErrorName(false);
    setErrorType(false);
    setErrorDelay(false);
    setErrorInhibit(false);
    setErrorGroup(false);

    // limpiar después de enviar

    setActualName("");
    setName("");
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

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    placeholder="Ingrese el nombre de la alarma"
                    value={name}
                    onChange={(e) => handleChangeName(e)}
                  />
                  <Form.Text className="text-muted">
                    {errorName ? (
                      <p className="text-danger">
                        El nombre no puede estar vacio
                      </p>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                {viewAll ? (
                  <Form.Group className="mb-3" controlId="formBasicAlarmType">
                    <Form.Label>Selecciona el tipo de alarma</Form.Label>
                    <Form.Select
                      className="text-dark"
                      value={type}
                      onChange={(e) => handleChangeType(e)}
                    >
                      {typeOptions.map((e, i) => {
                        return <option key={i}>{e}</option>;
                      })}
                    </Form.Select>

                    <Form.Text className="">
                      {errorType ? (
                        <p className="text-danger">
                          Debe seleccionar un tipo de alarma válido
                        </p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                ) : (
                  ""
                )}
                {viewAll ? (
                  <Form.Group className="mb-3" controlId="formBasicAlarmType">
                    <Form.Label>
                      {"Selecciona el delay de la alarma (ms)"}
                    </Form.Label>
                    <Form.Select
                      className="text-dark"
                      value={delay}
                      onChange={(e) => handleChangeDelay(e)}
                    >
                      {delayOptions.map((e, i) => {
                        return <option key={i}>{e}</option>;
                      })}
                    </Form.Select>

                    <Form.Text className="">
                      {errorDelay ? (
                        <p className="text-danger">
                          Debe seleccionar un valor de delay
                        </p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                ) : (
                  ""
                )}
                {viewAll ? (
                  <Form.Group className="mb-3" controlId="formBasicAlarmType">
                    <Form.Label>
                      {"Selecciona si la alarma se debe inhibir"}
                    </Form.Label>
                    <Form.Select
                      className="text-dark"
                      value={inhibit}
                      onChange={(e) => handleChangeInhibit(e)}
                    >
                      {inhibitOptions.map((e, i) => {
                        return <option key={i}>{e}</option>;
                      })}
                    </Form.Select>

                    <Form.Text className="">
                      {errorInhibit ? (
                        <p className="text-danger">
                          Debe seleccionar un valor para inhibir
                        </p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>
                ) : (
                  ""
                )}
                {viewAll ? (
                  <Form.Group className="mb-3" controlId="formBasicAlarmType">
                    <Form.Label>
                      {"Selecciona el grupo al que pertenece la alarma"}
                    </Form.Label>
                    <Form.Select
                      className="text-dark"
                      value={group}
                      onChange={(e) => handleChangeGroup(e)}
                    >
                      {groupsOptions.map((e, i) => {
                        return <option key={i}>{e}</option>;
                      })}
                    </Form.Select>

                    <Form.Text className="">
                      {errorGroup ? (
                        <p className="text-danger">
                          Debe seleccionar un valor para grupo
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
        </Row>

        <Row></Row>
      </Container>
    </div>
  );
};

export default AlarmFormEdit;
