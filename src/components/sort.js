import React, { useState } from 'react';

const Sort = ({ columns, onApplySort }) => {
    // Локальное состояние для хранения выбранных полей до нажатия на кнопку
    const [localSortFields, setLocalSortFields] = useState([
        { column: '', direction: 'asc' },
        { column: '', direction: 'asc' },
        { column: '', direction: 'asc' }
    ]);

    // Обновление локального состояния при выборе в select
    const handleChange = (index, field, value) => {
        const newFields = [...localSortFields];
        newFields[index][field] = value;
        setLocalSortFields(newFields);
    };

    // Хэндлер для отправки данных в родительский компонент по клику
    const handleSubmit = (e) => {
        e.preventDefault();
        onApplySort(localSortFields); // Передаем настройки сортировки наверх
    };

    return (
        <form onSubmit={handleSubmit} className="sort-container" style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
            <h4>Сортировка (до 3-х уровней)</h4>

            {localSortFields.map((field, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <label>{index + 1}-й уровень: </label>

                    <select
                        value={field.column}
                        onChange={(e) => handleChange(index, 'column', e.target.value)}
                    >
                        <option value="">-- Не выбрано --</option>
                        {columns.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>

                    <select
                        value={field.direction}
                        onChange={(e) => handleChange(index, 'direction', e.target.value)}
                        disabled={!field.column}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="asc">По возрастанию (А-Я / 0-9)</option>
                        <option value="desc">По убыванию (Я-А / 9-0)</option>
                    </select>
                </div>
            ))}

            <p style={{ marginTop: '15px' }}>
                <button type="submit">Сортировать</button>
            </p>
        </form>
    );
};

export default Sort;