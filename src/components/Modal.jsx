// src/components/Modal.jsx
import './Modal.css';

// Простой переиспользуемый компонент модального окна
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-window">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
