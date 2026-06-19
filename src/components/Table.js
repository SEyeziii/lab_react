import { useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import '../CSS/index.css';
import '../CSS/App.css';
import Filter from './Filter.js';

const Table = (props) => {
    const showPag = props.showPag === true;
    const [activePage, setActivePage] = useState("1");
    const displayData = props.data;
    const columns = displayData.length > 0 ? Object.keys(displayData[0]) : [];

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const amountRows = showPag ? Number(props.amountRows) : displayData.length;
    const totalPages = showPag ? Math.ceil(displayData.length / props.amountRows) : 1;
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
        <div className="table-container" style={{ marginTop: '20px' }}>
            <table>
                <TableHead head={columns} />
                <TableBody
                    body={displayData}
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
    );
};

export default Table;