import { useState } from 'react';
import './CSS/App.css';
import carsData from './data.js';
import Table from './components/Table.js';
import Sort from './components/sort.js';
import Filter from './components/Filter.js';
import Chart from './components/Chart.js'; // Импортируем новый график

function App() {
    const [filteredData, setFilteredData] = useState(carsData);
    const [sortedData, setSortedData] = useState(carsData);

    const columns = carsData.length > 0 ? Object.keys(carsData[0]) : [];

    const handleFilter = (newFilteredData) => {
        setFilteredData(newFilteredData);
        setSortedData(newFilteredData);
    };

    const handleSortApply = (fullySortedArray) => {
        setSortedData(fullySortedArray);
    };

    return (
        <div className="App">
            <h3>Японские автомобили</h3>

            <h4>Фильтры</h4>
            <Filter
                filtering={handleFilter}
                data={filteredData}
                fullData={carsData}
            />

            <Sort
                columns={columns}
                data={filteredData}
                onApplySort={handleSortApply}
            />

            {/* Выводим график на основе текущих отфильтрованных данных автомобиля */}
            <Chart data={filteredData} />

            <Table
                data={sortedData}
                amountRows="15"
                showPag={true}
            />
        </div>
    );
}

export default App;