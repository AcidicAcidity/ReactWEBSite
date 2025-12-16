import './FilterBar.css';

const FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'not-started', label: 'Не начаты' },
  { id: 'in-progress', label: 'В процессе' },
  { id: 'completed', label: 'Выполнены' },
];

function FilterBar({ activeFilter, onChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          className={
            activeFilter === filter.id
              ? 'filter-button active'
              : 'filter-button'
          }
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
