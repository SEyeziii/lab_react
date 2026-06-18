import { useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import '../CSS/index.css';
import '../CSS/App.css';

const Table = (props) => {
    const showPag = props.showPag === true;

    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);



    const columns = props.data.length > 0 ? Object.keys(props.data[0]) : [];

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const updateDateTable = (value) => {
        setDataTable(value);
        setActivePage("1");
    };


    const amountRows = showPag ? Number(props.amountRows) : dataTable.length;
    const totalPages = showPag ? Math.ceil(dataTable.length / props.amountRows) : 1;
    const arr = Array.from({ length: totalPages }, (v, i) => i + 1);

    const pages = arr.map((item, index) => (
        <span
            key={index}
            className={Number(activePage) === item ? "active" : "1"}
            onClick={changeActive}
        >
            {item}
        </span>
    ));

    return (
        <>
            <h4>Фильтры</h4>
            <Filter
                filtering={updateDateTable}
                data={dataTable}
                fullData={props.data}
            />


            <div className="table-container">
                <table>
                    <TableHead head={columns} />
                    <TableBody
                        body={dataTable}
                        amountRows={amountRows}
                        numPage={showPag ? activePage : 1}
                    />
                </table>

                {showPag && totalPages > 1 && (
                    <div id="pag">
                        {pages}
                    </div>
                )}
            </div>
        </>
    );
};

export default Table;