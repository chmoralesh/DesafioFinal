import Header from "../components/Header";
import CardAlarm from "../components/CardAlarm";
// Bootstrap

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { WebSocketContext } from "../contexts/WebSocketProvider";
import { groupsRender } from "../utils/OptionsInputs";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data } = useContext(WebSocketContext);

  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  // const callApi = async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setValues(data);
  // };
  const callApi = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setValues(data);
    } catch (error) {
      console.error("Error al cargar alarmas:", error);
    } finally {
      setLoading(false); // <-- ya tenemos datos o error
    }
  };

  useEffect(() => {
    callApi(`${apiUrl}/alarmas`);
  }, []);

  // Actualiza values cada vez que cambie el WS
  useEffect(() => {
    if (data && data.length > 0) {
      setValues(data);
      setLoading(false);
    }
  }, [data]);

  const alarmWidth = 2;

  const grupos = groupsRender;

  if (loading) {
    return (
      <div className="loader-container">
        <p>Cargando alarmas...</p>
        <div>
          <>
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" variant="light" />
            <Spinner animation="border" variant="dark" />
          </>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-100 d-flex flex-column align-items-center text-white">
        <h2 className="mt-3">Resumen de Alarmas Generales</h2>
      </div>

      <Container fluid className="mt-3">
        <Container fluid className="mt-2">
          <Row className="g-3">
            {grupos.map((grupo) => (
              <Col md={alarmWidth} key={grupo.id}>
                <p className="group">{grupo.name}</p>
                {values
                  .filter((e) => e.group === grupo.id)
                  .map((e) => (
                    <div key={e.id} className="mt-2">
                      <CardAlarm id={e.id} name={e.name} state={e.state} />
                    </div>
                  ))}
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
