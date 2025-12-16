import useLocalStorage from './useLocalStorage';

// Начальные данные для технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend',
  },
  {
    id: 3,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started',
    notes: '',
    category: 'frontend',
  },
  {
    id: 4,
    title: 'Database Basics',
    description: 'Введение в базы данных и SQL',
    status: 'not-started',
    notes: '',
    category: 'database',
  },
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    'technologies',
    initialTechnologies
  );

  // Обновление статуса технологии
  const updateStatus = (techId, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Обновление заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Циклическое переключение статуса (оставим, чтобы не потерять клик по карточке)
  const toggleStatus = (techId) => {
    setTechnologies((prev) =>
      prev.map((tech) => {
        if (tech.id !== techId) return tech;
        let next = 'not-started';
        if (tech.status === 'not-started') next = 'in-progress';
        else if (tech.status === 'in-progress') next = 'completed';
        else next = 'not-started';
        return { ...tech, status: next };
      })
    );
  };

  // Расчёт общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(
      (tech) => tech.status === 'completed'
    ).length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    toggleStatus,
    progress: calculateProgress(),
  };
}

export default useTechnologies;
