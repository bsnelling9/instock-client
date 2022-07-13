import './Header.scss';
import { NavLink } from 'react-router-dom';
import InStockLogo from '../../assets/Logo/InStock-Logo_2x.png';


export default function Header() {
    return (
        <nav className="nav">
      <div className="nav__container">
        <NavLink className="nav__logo-link" to="/" exact>
          <img className="nav__logo-img" src={InStockLogo} alt="InStock logo" />
        </NavLink>
        <div className="nav__list">
          <NavLink
            className="nav__list-link"
            activeClassName="nav__list-link--active"
            to="/"
            exact
          >
            <h3 className="nav__list-text">Warehouses</h3>
          </NavLink>
          <NavLink
            className="nav__list-link"
            activeClassName="nav__list-link--active"
            to="/Inventory"
          >
            <h3 className="nav__list-text">Inventory</h3>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

