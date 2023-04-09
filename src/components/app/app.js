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
			], 
			term: '', 
			filter: 'all',
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

	searchEmp = (data, term) => {
		if(term.length === 0) {
			return this.state.data
		}

		return data.filter(emp => emp.name.indexOf(term) > -1)
	}
	
	onUpdataTerm = (value) => {
		this.setState(({term}) => ({
			term: value
		}))
	}

	filterSetings = (data, filter) => {
		if(filter === 'moreThan1000') return data.filter(item => item.earnings > 1000);
		else if(filter === 'promotion') return data.filter(item => item.like);
		else return data
	}

	onChangeFilter = (filterBtn) => {
		this.setState(({filter}) => ({
			filter: filterBtn
		}))
	}

	render() {
		const {data, term, filter} = this.state;
		const filtredData = this.filterSetings(this.searchEmp(data, term), filter)
		const premium = data.filter(elem => elem.increase).length;

		return (	
			<div className="app">
				<AppInfo 
					dataLength={data.length}
					premium={premium}/>
	
				<div className="search-panel">
					<SearchPanel onUpdataTerm={this.onUpdataTerm}/>
					<AppFilter filter={filter} onChangeFilter={this.onChangeFilter}/>
				</div>
				
				<EmployeesList 
					data={filtredData} 
					onDelete={this.onDelete} 
					onProps={this.onProps}/>
				<EmployeesAddForm addNewItem={this.addNewItem}/>
			</div>
		);
	}
}

export default App;
