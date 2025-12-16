// src/pages/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Greeting from '../Greeting';
import TechnologyCard from '../components/TechnologyCard';
import TechnologyNotes from '../components/TechnologyNotes';
import QuickActions from '../components/QuickActions';
import FilterBar from '../components/FilterBar';
import ProgressBar from '../components/ProgressBar';
import RoadmapImporter from '../components/RoadmapImporter';
import TechnologyForm from '../components/TechnologyForm';
import Modal from '../components/Modal';
import useTechnologies from '../useTechnologies';

function HomePage() {
  const {
    technologies,
    toggleStatus,
    updateNotes,
    progress,
    importTechnologies,
    createTechnology,
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const notStartedCount = technologies.filter(
    (tech) => tech.status === 'not-started'
  ).length;

  const handleMarkAllCompleted = () => {
    technologies.forEach((tech) => {
      if (tech.status !== 'completed') {
        toggleStatus(tech.id);
      }
    });
  };

  const handleResetAll = () => {
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
    alert(`Следующая технология для изучения: "${random.title}".`);
  };

  const handleAddTechnologyClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddTechnologySave = (data) => {
    createTechnology(data);
    setIsAddModalOpen(false);
  };

  const handleAddTechnologyCancel = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="page">
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

      <RoadmapImporter onImport={importTechnologies} />

      <div className="page-header">
        <h2 className="app-title">Мои технологии</h2>
        <button
          className="btn-primary"
          type="button"
          onClick={handleAddTechnologyClick}
        >
          + Добавить технологию
        </button>
      </div>

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
            <Link to={`/technology/${tech.id}`} className="tech-title-link">
              <TechnologyCard
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                onStatusClick={toggleStatus}
              />
            </Link>
            <TechnologyNotes
              techId={tech.id}
              notes={tech.notes}
              onNotesChange={updateNotes}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleAddTechnologyCancel}
        title="Новая технология"
      >
        <TechnologyForm
          onSave={handleAddTechnologySave}
          onCancel={handleAddTechnologyCancel}
        />
      </Modal>
    </div>
  );
}

export default HomePage;
