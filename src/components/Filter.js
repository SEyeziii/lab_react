/*
   компонент, для фильтрации таблицы
*/

const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            'Марка' : event.target['marka'].value.toLowerCase(),
            'Модель' : event.target['model'].value.toLowerCase(),
            'Год' : [event.target['year_start'].value, event.target['year_end'].value],
            'Двигатель' : event.target['dvig'].value.toLowerCase(),
            'Мощность' : [event.target['moh_start'].value, event.target['moh_end'].value],
            'Тип кузова' : [event.target['type'].value],
            'Разгон' : [event.target['raz_start'].value, event.target['raz_end'].value]
        };

        let arr = props.fullData;
        for (const key in filterField) {
            const value = filterField[key];

            if (key === 'Год' || key === 'Мощность' || key === 'Разгон') {
                let [min, max] = value;
                if (min === '') {
                    min = -Infinity;
                }
                else {
                    min = Number(min);
                }

                if (max === '') {
                    max = Infinity;
                }
                else {
                    max = Number(max);
                }

                arr = arr.filter(item => {
                    return item[key] >= min && item[key] <= max;
                });
            }
            else if (value && value !== '') {
                arr = arr.filter(item => item[key].toLowerCase().includes(value));
            }
        }

        props.filtering(arr);
    }

    const handleReset = (event) => {
        event.target.reset();
        props.filtering([...props.fullData]);
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Марка: </label>
                <input name='marka' type="text" />
            </p>
            <p>
                <label>Модель: </label>
                <input name='model' type="text" />
            </p>
            <p>
                <label>Двигатель: </label>
                <input name='dvig' type="text" />
            </p>
            <p>
                <label>Тип кузова: </label>
                <input name='type' type="text" />
            </p>
            <p>
                <label>Год от: </label>
                <input name='year_start' type="number" />
            </p>
            <p>
                <label>Год до: </label>
                <input name='year_end' type="number" />
            </p>
            <p>
                <label>Мощность от: </label>
                <input name='moh_start' type="number" />
            </p>
            <p>
                <label>мощноcть до: </label>
                <input name='moh_end' type="number" />
            </p>
            <p>
                <label>Разгон от: </label>
                <input name='raz_start' type="number" />
            </p>
            <p>
                <label>Разгон до: </label>
                <input name='raz_end' type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
}

export default Filter;