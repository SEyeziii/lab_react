import React, { useState } from 'react';

const Sort = ({ columns, data, onApplySort }) => {
    const [localFields, setLocalFields] = useState([
        { column: '', desc: false },
        { column: '', desc: false },
        { column: '', desc: false }
    ]);

    const handleChange = (index, field, value) => {
        const newFields = [...localFields];
        newFields[index] = { ...newFields[index], [field]: value };

        if (field === 'column' && value === '') {
            newFields[index].desc = false;
        }
        setLocalFields(newFields);
    };

    const getSortedData = (dataToSort) => {
        let arr = [...dataToSort];
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                let first = arr[j];
                let second = arr[j + 1];
                let needSwap = false;

                for (let k = 0; k < localFields.length; k++) {
                    let column = localFields[k].column;
                    let desc = localFields[k].desc;

                    if (!column) continue;

                    let firstCell = first[column];
                    let secondCell = second[column];
                    let comparison = 0;

                    if (['ID', 'Год', 'Мощность', 'Разгон'].includes(column)) {
                        comparison = Number(firstCell) - Number(secondCell);
                    } else {
                        comparison = String(firstCell).localeCompare(String(secondCell), 'ru');
                    }

                    if (comparison !== 0) {
                        if ((!desc && comparison > 0) || (desc && comparison < 0)) {
                            needSwap = true;
                        }
                        break;
                    }
                }

                if (needSwap) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sortedResult = getSortedData(data);
        onApplySort(sortedResult);
    };

    return (
        <form onSubmit={handleSubmit} className="sort-container" style={{ margin: '20px 0' }}>
            <h4>Сортировка</h4>

            {[0, 1, 2].map((index) => {
                const previousSelected = localFields.slice(0, index).map(f => f.column);
                const isDisabled = index > 0 && !localFields[index - 1].column;

                return (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <label>{index + 1}-й уровень: </label>

                        <select
                            value={localFields[index].column}
                            onChange={(e) => handleChange(index, 'column', e.target.value)}
                            disabled={isDisabled}
                        >
                            <option value="">Не выбрано</option>
                            {columns.map(col => {
                                if (previousSelected.includes(col)) return null;
                                return <option key={col} value={col}>{col}</option>;
                            })}
                        </select>

                        <label style={{ marginLeft: '10px' }}>
                            <input
                                type="checkbox"
                                checked={localFields[index].desc}
                                onChange={(e) => handleChange(index, 'desc', e.target.checked)}
                                disabled={isDisabled}
                            />
                            По убыванию
                        </label>
                    </div>
                );
            })}

            <button type="submit" style={{ marginTop: '5px' }}>Сортировать</button>
        </form>
    );
};

export default Sort;