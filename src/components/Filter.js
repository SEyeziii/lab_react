/*
   компонент, для фильтрации таблицы
*/

const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            'Название' : event.target['structure'].value.toLowerCase(),
            'Тип' : event.target['type'].value.toLowerCase(),
            'Страна' : event.target['country'].value.toLowerCase(),
            'Город' : event.target['city'].value.toLowerCase(),
            'Год' : [event.target['year_start'].value, event.target['year_end'].value],
            'Высота' : [event.target['height_start'].value, event.target['height_end'].value]
        };

        let arr = props.fullData;
        for (const key in filterField) {
            const value = filterField[key];

            if (key === 'Год' || key === 'Высота') {
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
                <label>Название: </label>
                <input name='structure' type="text" />
            </p>
            <p>
                <label>Тип: </label>
                <input name='type' type="text" />
            </p>
            <p>
                <label>Страна: </label>
                <input name='country' type="text" />
            </p>
            <p>
                <label>Город: </label>
                <input name='city' type="text" />
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
                <label>Высота от: </label>
                <input name='height_start' type="number" />
            </p>
            <p>
                <label>Высота до: </label>
                <input name='height_end' type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
}

export default Filter;