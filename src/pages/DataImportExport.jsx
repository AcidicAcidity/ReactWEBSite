// src/pages/DataImportExport.jsx
import { useState } from 'react';
import useTechnologies from '../useTechnologies';
import './DataImportExport.css';

function DataImportExport() {
  const { technologies, setAllTechnologies } = useTechnologies();
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const exportToJSON = () => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'technologies-export.json';
    a.click();

    URL.revokeObjectURL(url);

    setStatus('Экспорт выполнен успешно');
    setTimeout(() => setStatus(''), 3000);
  };

  const importFromJSON = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const parsed = JSON.parse(content);

        if (!Array.isArray(parsed)) {
          throw new Error('Ожидается массив технологий');
        }

        setAllTechnologies(parsed);
        setStatus(`Импортировано ${parsed.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        console.error(error);
        setStatus('Ошибка импорта: неверный формат файла');
      }
    };

    reader.readAsText(file);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('technologies', JSON.stringify(technologies));
    setStatus('Данные сохранены в localStorage');
    setTimeout(() => setStatus(''), 3000);
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('technologies');
    if (!saved) {
      setStatus('В localStorage нет сохранённых данных');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {
        throw new Error();
      }
      setAllTechnologies(parsed);
      setStatus('Данные загружены из localStorage');
      setTimeout(() => setStatus(''), 3000);
    } catch {
      setStatus('Ошибка загрузки: повреждённые данные в localStorage');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const parsed = JSON.parse(content);

        if (!Array.isArray(parsed)) {
          throw new Error('Ожидается массив технологий');
        }

        setAllTechnologies(parsed);
        setStatus(`Импортировано ${parsed.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        console.error(error);
        setStatus('Ошибка импорта: неверный формат файла');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="data-import-export">
      <h1>Импорт и экспорт данных</h1>

      {status && (
        <div className="status-message">
          {status}
        </div>
      )}

      <div className="controls">
        <button
          onClick={exportToJSON}
          disabled={technologies.length === 0}
        >
          Экспорт в JSON
        </button>

        <label className="file-input-label">
          Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
          />
        </label>

        <button
          onClick={saveToLocalStorage}
          disabled={technologies.length === 0}
        >
          Сохранить в localStorage
        </button>

        <button onClick={loadFromLocalStorage}>
          Загрузить из localStorage
        </button>
      </div>

      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Перетащите JSON-файл сюда
      </div>

      {technologies.length > 0 && (
        <div className="technologies-list">
          <h2>Текущие технологии ({technologies.length})</h2>
          <ul>
            {technologies.map((tech) => (
              <li key={tech.id}>
                <strong>{tech.title}</strong> — {tech.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DataImportExport;
