import { useState, useEffect } from 'react';
import './App.css';
import Greeting from './Greeting';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';
import TechnologyNotes from './components/TechnologyNotes';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
      notes: '',
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'not-started',
      notes: '',
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'not-started',
      notes: '',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const total = technologies.length;
  const completedCount = technologies.filter(
    (tech) => tech.status === 'completed'
  ).length;

  const notStartedCount = technologies.filter(
    (tech) => tech.status === 'not-started'
  ).length;

  // Загружаем данные из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
      console.log('Данные загружены из localStorage');
    }
  }, []);

  // Сохраняем технологии в localStorage при любом изменении
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]);

  const cycleStatus = (status) => {
    if (status === 'not-started') return 'in-progress';
    if (status === 'in-progress') return 'completed';
    return 'not-started';
  };

  const handleStatusToggle = (id) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === id
          ? { ...tech, status: cycleStatus(tech.status) }
          : tech
      )
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const handleMarkAllCompleted = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: 'completed' }))
    );
  };

  const handleResetAll = () => {
    setTechnologies((prev) =>
      prev.map((tech) => ({ ...tech, status: 'not-started' }))
    );
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

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const filteredByStatus = technologies.filter((tech) => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

  const filteredTechnologies = filteredByStatus.filter((tech) =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Greeting />

      <ProgressHeader total={total} completed={completedCount} />

      <QuickActions
        onMarkAllCompleted={handleMarkAllCompleted}
        onResetAll={handleResetAll}
        onPickRandom={handlePickRandom}
        hasNotStarted={notStartedCount > 0}
      />

      <h2 className="app-title">Трекер изучения технологий</h2>

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
              onStatusClick={handleStatusToggle}
            />
            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateTechnologyNotes}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
