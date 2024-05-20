import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <h1 id="logo">Travel Mate</h1>
        <nav>
          <ul>
            <li className="nav__links">
              <Link to="/">Головна</Link>
            </li>
            <li className="nav__links">
              <Link to="/trips">Знайти поїздку</Link>
            </li>
            <li className="nav__links">
              <Link to="/trips/create">Створити поїздку</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
};

export default Layout;