import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            clazz: 'btn_remove'
        }
    }

    onUpdataSearch = (e) => {
        this.setState(({term, clazz}) => ({
            term: e.target.value,
            clazz: `btn_remove ${e.target.value.length >= 1 ? 'active' : ''}`
        }))

        this.props.onUpdataTerm(e.target.value);
    }

    onClearSearch = () => {
        this.setState(({term, clazz}) => ({
            term: '',
            clazz: `btn_remove`
        }))

        this.props.onUpdataTerm('');
    }

    render() {
        return (
            <div className='search-div'>
                <input type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    value={this.state.term} 
                    onChange={this.onUpdataSearch}
                />

                <button className={this.state.clazz}
                    onClick={this.onClearSearch}  
                >
                    ✖
                </button>
            </div>
        )
    }
}

export default SearchPanel;