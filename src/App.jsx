// src/App.jsx
import { useState } from 'react';
import './App.css';
import Greeting from './Greeting';
import TechnologyCard from './components/TechnologyCard';
import TechnologyNotes from './components/TechnologyNotes';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';
import ProgressBar from './components/ProgressBar';
import useTechnologies from './useTechnologies';

function App() {
  const {
    technologies,
    toggleStatus,
    updateNotes,
    progress,
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  // Фильтрация по статусу
  const filteredByStatus = technologies.filter((tech) => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

  // Фильтрация по поисковому запросу (title + description)
  const filteredTechnologies = filteredByStatus.filter((tech) =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notStartedCount = technologies.filter(
    (tech) => tech.status === 'not-started'
  ).length;

  const handleMarkAllCompleted = () => {
    // массовое завершение — простой вариант: крутим статусы до completed
    technologies.forEach((tech) => {
      if (tech.status !== 'completed') {
        toggleStatus(tech.id);
      }
    });
  };

  const handleResetAll = () => {
    // массовый сброс — крутим статусы до not-started
    technologies.forEach((tech) => {
      if (tech.status !== 'not-started') {
        toggleStatus(tech.id);
      }
    });
  };

  const handlePickRandom = () => {
    const notStarted = technologies.filter(
      (tech) => tech.status === 'not-started'
    );
    if (notStarted.length === 0) {
      alert(
        'Нет технологий со статусом "Не начато" для случайного выбора.'
      );
      return;
    }
    const random =
      notStarted[Math.floor(Math.random() * notStarted.length)];
    alert(
      `Следующая технология для изучения: "${random.title}".`
    );
  };

  return (
    <div className="App">
      <Greeting />

      <header className="app-header">
        <h1>Трекер изучения технологий</h1>
        <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        />
      </header>

      <QuickActions
        onMarkAllCompleted={handleMarkAllCompleted}
        onResetAll={handleResetAll}
        onPickRandom={handlePickRandom}
        hasNotStarted={notStartedCount > 0}
      />

      <h2 className="app-title">Мои технологии</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechnologies.length}</span>
      </div>

      <FilterBar
        activeFilter={activeFilter}
        onChange={handleFilterChange}
      />

      <div className="technology-list">
        {filteredTechnologies.map((tech) => (
          <div key={tech.id} className="technology-with-notes">
            <TechnologyCard
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusClick={toggleStatus}
            />
            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateNotes}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
