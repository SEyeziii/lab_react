import './CSS/App.css';
import carsData from './data.js';
import Table from './components/Table.js';

function App() {
    return (
        <div className="App">
            <h3>Японские автомобили</h3>
            <Table data={ carsData } amountRows="15" showPag={true} />
        </div>
    );
}

export default App;