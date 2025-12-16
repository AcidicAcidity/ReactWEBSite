import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TechnologyListPage() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
      </div>

      <div className="technologies-grid">
        {technologies.map((tech) => (
          <div key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="technology-meta">
              <span className={`status-badge status-${tech.status}`}>
                {tech.status}
              </span>
              <Link
                to={`/technology/${tech.id}`}
                className="btn-link"
              >
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/" className="btn btn-primary">
            Перейти к трекеру
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyListPage;
