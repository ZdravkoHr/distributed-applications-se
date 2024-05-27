import { NavLink } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="main-nav">
      <h1>Zapothecary</h1>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="/apothecaries"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Apothecaries
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Customers
          </NavLink>
          <NavLink
            to="/Drugs"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Drugs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
