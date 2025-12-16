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
    difficulty: 'beginner',
    deadline: '',
    resources: ['https://react.dev'],
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend',
    difficulty: 'beginner',
    deadline: '',
    resources: ['https://nodejs.org'],
  },
  {
    id: 3,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    difficulty: 'beginner',
    deadline: '',
    resources: [],
  },
  {
    id: 4,
    title: 'Database Basics',
    description: 'Введение в базы данных и SQL',
    status: 'not-started',
    notes: '',
    category: 'database',
    difficulty: 'beginner',
    deadline: '',
    resources: [],
  },
];

function normalizeTechnology(tech) {
  return {
    id: tech.id ?? Date.now(),
    title: tech.title ?? '',
    description: tech.description ?? '',
    status: tech.status ?? 'not-started',
    notes: tech.notes ?? '',
    category: tech.category ?? 'frontend',
    difficulty: tech.difficulty ?? 'beginner',
    deadline: tech.deadline ?? '',
    resources: Array.isArray(tech.resources) ? tech.resources : [],
  };
}

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    'technologies',
    initialTechnologies.map(normalizeTechnology)
  );

  // Создание новой технологии
  const createTechnology = (techData) => {
    const newTech = normalizeTechnology({
      ...techData,
      id: Date.now(),
      status: 'not-started',
    });

    setTechnologies((prev) => [...prev, newTech]);
    return newTech;
  };

  // Обновление существующей технологии по id
  const updateTechnology = (id, patch) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === id ? normalizeTechnology({ ...tech, ...patch }) : tech
      )
    );
  };

  // Обновление статуса технологии в лоб
  const updateStatus = (techId, newStatus) => {
    updateTechnology(techId, { status: newStatus });
  };

  // Обновление заметок
  const updateNotes = (techId, newNotes) => {
    updateTechnology(techId, { notes: newNotes });
  };

  // Циклическое переключение статуса (not-started → in-progress → completed → not-started)
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

  // Массовый импорт технологий (из API / JSON)
  const importTechnologies = (newTechs) => {
    setTechnologies((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const filtered = newTechs.filter(
        (t) => t.id != null && !existingIds.has(t.id)
      );
      const normalized = filtered.map(normalizeTechnology);
      return [...prev, ...normalized];
    });
  };

  // Массовое изменение статусов (для самостоятельного задания)
  const updateStatuses = (ids, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        ids.includes(tech.id) ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Полная замена списка технологий (для импорта)
  const setAllTechnologies = (list) => {
    setTechnologies(list.map(normalizeTechnology));
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
    createTechnology,
    updateTechnology,
    updateStatus,
    updateNotes,
    toggleStatus,
    importTechnologies,
    updateStatuses,
    setAllTechnologies,
    progress: calculateProgress(),
  };
}

export default useTechnologies;
