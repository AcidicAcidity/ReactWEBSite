import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import './RoadmapImporter.css';

function RoadmapImporter({ onImport }) {
  const {
    technologies,
    loading,
    error,
    addTechnology,
  } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);

  // Импорт из произвольного URL дорожной карты (пример)
  const handleImportRoadmap = async (roadmapUrl) => {
    try {
      setImporting(true);

      // Имитация загрузки дорожной карты из API
      const response = await fetch(roadmapUrl);
      if (!response.ok) {
        throw new Error('Не удалось загрузить дорожную карту');
      }

      const roadmapData = await response.json();

      // Добавляем каждую технологию из дорожной карты в API‑слой
      const imported = [];
      for (const tech of roadmapData.technologies) {
        const created = await addTechnology(tech);
        imported.push(created);
      }

      // Передаём импортированные технологии наверх (в useTechnologies)
      if (onImport && imported.length > 0) {
        onImport(imported);
      }

      alert(
        `Успешно импортировано ${roadmapData.technologies.length} технологий`
      );
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  // Пример импорта из фиктивного API
  const handleExampleImport = () => {
    handleImportRoadmap('https://api.example.com/roadmaps/frontend');
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>

      <div className="import-actions">
        <button
          onClick={handleExampleImport}
          disabled={importing || loading}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
        </button>
      </div>

      {loading && (
        <div className="import-loading">
          <div className="spinner" />
          <p>Загрузка технологий из API...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {technologies.length > 0 && (
        <div className="import-preview">
          <p>Доступно технологий из API: {technologies.length}</p>
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;
