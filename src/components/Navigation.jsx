import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    (path === '/technologies' && location.pathname.startsWith('/technology/'));

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <Link
            to="/"
            className={isActive('/') ? 'active' : ''}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/technologies"
            className={isActive('/technologies') ? 'active' : ''}
          >
            Все технологии
          </Link>
        </li>
        {/* Зарезервируем под «Добавить технологию» на будущее */}
      </ul>
    </nav>
  );
}

export default Navigation;
