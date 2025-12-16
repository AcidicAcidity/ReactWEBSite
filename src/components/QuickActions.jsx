import './QuickActions.css';

function QuickActions({
  onMarkAllCompleted,
  onResetAll,
  onPickRandom,
  hasNotStarted,
}) {
  const handleRandomClick = () => {
    if (!hasNotStarted) {
      alert('Нет технологий со статусом "Не начато" для случайного выбора.');
      return;
    }
    onPickRandom();
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="quick-actions-buttons">
        <button onClick={onMarkAllCompleted}>
          Отметить все как выполненные
        </button>
        <button onClick={onResetAll}>Сбросить все статусы</button>
        <button onClick={handleRandomClick}>
          Случайный выбор следующей технологии
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
