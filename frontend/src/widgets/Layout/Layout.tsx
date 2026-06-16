import "./Layout.css";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Analytic</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main">
        <header className="header">
          <h3>Dashboard</h3>
          <div className="header-right">User</div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};