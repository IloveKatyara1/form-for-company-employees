import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdataSearch = (e) => {
        this.setState(({term}) => ({
            term: e.target.value
        }))

        this.props.onUpdataTerm(e.target.value);
    }

    render() {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    value={this.state.term} 
                    onChange={this.onUpdataSearch}/>
        )
    }
}

export default SearchPanel;