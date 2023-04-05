import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{name: 'John S.', earnings: 2000, premium: true, id: 1},
				{name: 'Nazar T.', earnings: 20000, premium: true, id: 2},
				{name: 'Tom A.', earnings: 5000, premium: false, id: 3},
			]
		}

		this.count = this.state.data.length
	}

	onDelete = (id) => {
		this.setState(({data}) => ({
			data: data.filter(obj => obj.id !== id)
		}))
	}

	addNewItem = (name, earnings) => {
		this.count += 1

		this.setState(({data}) => ({
			data: [...data, {name, earnings, premium: false, id: this.count}]
		}))
	}

	render() {
		const {data} = this.state;

		return (	
			<div className="app">
				<AppInfo />
	
				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>
				
				<EmployeesList data={data} onDelete={this.onDelete}/>
				<EmployeesAddForm addNewItem={this.addNewItem}/>
			</div>
		  );
	}
}

export default App;
