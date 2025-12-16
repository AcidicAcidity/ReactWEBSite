import './ProgressHeader.css';

function ProgressHeader({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  let progressLabel;
  if (percentage === 0) {
    progressLabel = 'Начни с первой технологии 🚀';
  } else if (percentage < 100) {
    progressLabel = 'Продолжай в том же духе 💪';
  } else {
    progressLabel = 'Все технологии изучены! 🎉';
  }

  return (
    <div className="progress-header">
      <div className="progress-header-top">
        <h2>Прогресс изучения технологий</h2>
        <span className="progress-header-count">
          {completed} из {total} ({percentage}%)
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="progress-header-label">{progressLabel}</p>
    </div>
  );
}

export default ProgressHeader;
