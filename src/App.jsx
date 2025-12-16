import { useState } from 'react';
import './App.css';
import Greeting from './Greeting';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'not-started',
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'not-started',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const total = technologies.length;
  const completedCount = technologies.filter(
    (tech) => tech.status === 'completed'
  ).length;

  const notStartedCount = technologies.filter(
    (tech) => tech.status === 'not-started'
  ).length;

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

  const filteredTechnologies = technologies.filter((tech) => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

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

      <FilterBar
        activeFilter={activeFilter}
        onChange={handleFilterChange}
      />

      <div className="technology-list">
        {filteredTechnologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onStatusClick={handleStatusToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
