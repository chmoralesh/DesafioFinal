import Navbars from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Alarm } from "./pages/Alarm";
import { Route, Routes, useLocation } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Pagina404 } from "./pages/404";
import { useContext } from "react";
import { TokenContext } from "./contexts/TokenContext";
import { AlarmModal } from "./pages/AlarmModal";
import Alarms from "./pages/Alarms";
import MotorPrincipal from "./pages/MotorPrincipal";
import { UserContext } from "./contexts/UserContext";
import { useEffect } from "react";

const App = () => {
  const { token } = useContext(TokenContext);
  const { logout } = useContext(UserContext);

  const location = useLocation();
  const state = location.state;
  useEffect(() => {
    // Se ejecuta solo una vez al cargar la app
    logout();
  }, []);
  return (
    <>
      <Navbars />

      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={token ? <Register /> : <Home />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/alarmas/:code" element={<Alarm />} />
        <Route path="/alarmas/" element={token ? <Alarms /> : <Login />} />
        <Route path="/mppl" element={<MotorPrincipal />} />
        <Route path="/profile" element={token ? <Profile /> : <Login />} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>

      {/* Modal sobre la página de fondo */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/alarmas/:code" element={<AlarmModal />} />
        </Routes>
      )}

      {/* <Footer /> */}
    </>
  );
};

export default App;
