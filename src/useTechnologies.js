// src/useTechnologies.js
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

  // Обновление статуса технологии в лоб (если понадобится)
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

  // Массовый импорт технологий (из API / RoadmapImporter)
  const importTechnologies = (newTechs) => {
    setTechnologies((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));

      const filtered = newTechs.filter((t) => !existingIds.has(t.id));

      const normalized = filtered.map((t) => ({
        ...t,
        // гарантируем наличие полей статуса и заметок в нашей модели
        status: t.status ?? 'not-started',
        notes: t.notes ?? '',
      }));

      return [...prev, ...normalized];
    });
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
    importTechnologies,
    progress: calculateProgress(),
  };
}

export default useTechnologies;
