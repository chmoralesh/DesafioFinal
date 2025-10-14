import headerImage from "../assets/img/Header.jpg";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="container-header">
        <img className="imgs" src={headerImage} alt="Fondo Pizzas" />
        <div className="title"></div>
      </div>
    </>
  );
};

export default Header;
