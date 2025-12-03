// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
  let statusText;
  let statusClass;
  let statusIcon;

  switch (status) {
    case 'completed':
      statusText = 'Изучено';
      statusClass = 'status-completed';
      statusIcon = '✅';
      break;
    case 'in-progress':
      statusText = 'В процессе';
      statusClass = 'status-in-progress';
      statusIcon = '⏳';
      break;
    case 'not-started':
    default:
      statusText = 'Не начато';
      statusClass = 'status-not-started';
      statusIcon = '🕒';
      break;
  }

  return (
    <div className={`technology-card ${statusClass}`}>
      <div className="technology-card-header">
        <h3 className="technology-card-title">{title}</h3>
        <span className="technology-card-status">
          {statusIcon} {statusText}
        </span>
      </div>
      <p className="technology-card-description">{description}</p>
    </div>
  );
}

export default TechnologyCard;
