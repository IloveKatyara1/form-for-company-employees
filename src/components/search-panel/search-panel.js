import { useState, useDeferredValue } from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
    const [term, setTerm] = useState();

    const onUpdataSearch = (e) => {
        setTerm(e.target.value);

        props.onUpdataTerm(e.target.value);
    };

    const onClearSearch = () => {
        setTerm('');

        props.onUpdataTerm('');
    };

    return (
        <div className="search-div">
            <input
                type="text"
                className="form-control search-input"
                placeholder="Find an employee"
                value={term}
                onChange={onUpdataSearch}
            />

            <button className={`btn_remove ${term ? 'active' : ''}`} onClick={onClearSearch}>
                ✖
            </button>
        </div>
    );
};

export default SearchPanel;
