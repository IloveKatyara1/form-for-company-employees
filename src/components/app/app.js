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
				{name: 'John S.', earnings: 2000, increase: true, like: true, id: 1},
				{name: 'Nazar T.', earnings: 20000, increase: true, like: false, id: 2},
				{name: 'Tom A.', earnings: 5000, increase: false, like: false, id: 3},
			]
		}

		this.maxId = this.state.data.length
	}

	onDelete = (id) => {
		this.setState(({data}) => ({
			data: data.filter(obj => obj.id !== id)
		}))
	}

	addNewItem = (name, earnings) => {
		this.maxId += 1

		this.setState(({data}) => ({
			data: [...data, {name, earnings, increase: false, like: false, id: this.maxId}]
		}))
	}

	onProps = (id, name) => {
		this.setState(({data}) => ({
			data: data.map(obj => {
				if(obj.id === id) {
					return {...obj, [name]: !obj[name]}
				}
				return obj;
			})
		}))
	}

	render() {
		const {data} = this.state;

		return (	
			<div className="app">
				<AppInfo 
					dataLength={data.length}
					premium={data.filter(elem => elem.increase).length}/>
	
				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>
				
				<EmployeesList 
					data={data} 
					onDelete={this.onDelete} 
					onProps={this.onProps}/>
				<EmployeesAddForm addNewItem={this.addNewItem}/>
			</div>
		  );
	}
}

export default App;
