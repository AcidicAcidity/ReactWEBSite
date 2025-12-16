// src/components/TechnologyForm.jsx
import { useState, useEffect } from 'react';
import './TechnologyForm.css';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
  // состояние формы
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources && initialData.resources.length > 0
      ? initialData.resources
      : [''],
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Название обязательно
    if (!formData.title.trim()) {
      newErrors.title = 'Название технологии обязательно';
    }

    // Дедлайн не может быть в прошлом
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    // Примитивная проверка ресурсов (если не пустые, пусть будут хотя бы с http)
    const resourceErrors = formData.resources.map((url) => {
      if (!url.trim()) return null;
      if (!/^https?:\/\//i.test(url.trim())) {
        return 'URL должен начинаться с http:// или https://';
      }
      return null;
    });

    if (resourceErrors.some((e) => e)) {
      newErrors.resources = resourceErrors;
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData((prev) => ({
      ...prev,
      resources: newResources,
    }));
  };

  const addResourceField = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, ''],
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        resources: newResources,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (!isFormValid) return;

    const cleanedResources = formData.resources
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    onSave({
      ...formData,
      resources: cleanedResources,
    });
  };

  return (
    <form className="technology-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="tech-title">
          Название технологии
        </label>
        <input
          id="tech-title"
          type="text"
          value={formData.title}
          onChange={handleChange('title')}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'tech-title-error' : undefined}
          required
        />
        {errors.title && (
          <div
            id="tech-title-error"
            className="error-message"
            role="alert"
          >
            {errors.title}
          </div>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="tech-description">
          Описание
        </label>
        <textarea
          id="tech-description"
          value={formData.description}
          onChange={handleChange('description')}
          rows={3}
        />
      </div>

      <div className="form-row two-columns">
        <div>
          <label htmlFor="tech-category">
            Категория
          </label>
          <select
            id="tech-category"
            value={formData.category}
            onChange={handleChange('category')}
          >
            <option value="frontend">Фронтенд</option>
            <option value="backend">Бэкенд</option>
            <option value="database">Базы данных</option>
            <option value="language">Языки</option>
            <option value="devops">DevOps</option>
          </select>
        </div>

        <div>
          <label htmlFor="tech-difficulty">
            Сложность
          </label>
          <select
            id="tech-difficulty"
            value={formData.difficulty}
            onChange={handleChange('difficulty')}
          >
            <option value="beginner">Начальный</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="tech-deadline">
          Дедлайн (необязательно)
        </label>
        <input
          id="tech-deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange('deadline')}
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? 'tech-deadline-error' : undefined}
        />
        {errors.deadline && (
          <div
            id="tech-deadline-error"
            className="error-message"
            role="alert"
          >
            {errors.deadline}
          </div>
        )}
      </div>

      <div className="form-row">
        <label>Ресурсы для изучения</label>
        <div className="resources-list">
          {formData.resources.map((url, index) => {
            const resourceError =
              errors.resources && errors.resources[index];
            const fieldId = `tech-resource-${index}`;
            const errorId = `${fieldId}-error`;

            return (
              <div key={index} className="resource-row">
                <input
                  id={fieldId}
                  type="url"
                  value={url}
                  onChange={(e) =>
                    handleResourceChange(index, e.target.value)
                  }
                  placeholder="https://example.com/resource"
                  aria-invalid={!!resourceError}
                  aria-describedby={
                    resourceError ? errorId : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => removeResourceField(index)}
                  disabled={formData.resources.length === 1}
                  className="resource-remove-btn"
                  aria-label="Удалить ресурс"
                >
                  ✕
                </button>
                {resourceError && (
                  <div
                    id={errorId}
                    className="error-message"
                    role="alert"
                  >
                    {resourceError}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={addResourceField}
          className="resource-add-btn"
        >
          + Добавить ресурс
        </button>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={!isFormValid}
        >
          Сохранить технологию
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={onCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default TechnologyForm;
