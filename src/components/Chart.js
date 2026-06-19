import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Марка"); // По умолчанию группируем по Маркам
    const [oy, setOy] = useState([true, false]);
    const [chartType, setChartType] = useState("scatter");

    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);
        setChartType(event.target["chartType"].value);
    }

    const createArrGraph = (data, key) => {
        if (!data || data.length === 0) return [];

        // Группируем машины по выбранному признаку (Марка, Модель, Год, Тип кузова)
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];

        for (let entry of groupObj) {
            // Рассчитываем мин/макс на основе числового поля "Мощность" (можно заменить на "Разгон")
            let minMax = d3.extent(entry[1].map(d => Number(d['Мощность'] || 0)));
            arrGraph.push({ labelX: entry[0], values: minMax });
        }

        if (key === 'Год') {
            arrGraph.sort((a, b) => Number(a.labelX) - Number(b.labelX));
        }

        return arrGraph;
    }

    const isOySelected = oy[0] || oy[1];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX </p>
                <div>
                    <label>
                        <input type="radio" name="ox" value="Марка" defaultChecked={ ox === "Марка" }/>
                        Марка
                    </label>
                    <br/>

                    <br/>
                    <label>
                        <input type="radio" name="ox" value="Год" defaultChecked={ ox === "Год" }/>
                        Год
                    </label>
                </div>

                <p> Значение по оси OY (Мощность) </p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />
                    Максимальная мощность <br/>
                    <input  type="checkbox" name="oy" defaultChecked={ oy[1] === true } />
                    Минимальная мощность
                </div>

                <p> Тип диаграммы: </p>
                <div>
                    <select name="chartType" defaultValue={ chartType }>
                        <option value="scatter">Точечная диаграмма</option>
                        <option value="bar">Гистограмма</option>
                    </select>
                </div>

                <p>
                    <button type="submit">Построить </button>
                </p>
            </form>

            {!isOySelected ? (
                <div style={{ color: 'red', fontWeight: 'bold', margin: '20px 0' }}>
                    Ошибка: Выберите хотя бы одно значение по оси OY!
                </div>
            ) : (
                <ChartDraw
                    data={ createArrGraph(props.data, ox) }
                    oy={ oy }
                    chartType={ chartType }
                />
            )}
        </>
    )
}

export default Chart;