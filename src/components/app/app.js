import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import Modal from '../modal/modal';

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
			modal: {
				modalName: 'none',
				idRename: '', 
				name: '',
				salary: ''
			}
		}

		this.maxId = this.state.data.length
	}

	onDelete = (id) => {
		this.setState(({data}) => ({
			data: data.filter(obj => obj.id !== id)
		}))
	}

	addNewItem = (e, name, earnings) => {
		e.preventDefault();
                                
		if(name === '' || earnings === '') return

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
	
	onUpdataTerm = (term) => this.setState(({term}))

	filterSetings = (data, filter) => {
		if(filter === 'moreThan1000') return data.filter(item => item.earnings > 1000);
		else if(filter === 'promotion') return data.filter(item => item.like);
		else return data
	}

	onChangeFilter = (filter) => this.setState({filter})

	onModal = (modalName, idRename, name, salary) => this.setState(({modal}) => ({
		modal: {modalName, idRename, name, salary} 
	}))

	onRenameEmp = (e, name, earnings) => {
		e.preventDefault()

		this.setState(({data}) => ({
			data: data.map(element => {
				if(element.id === this.state.modal.idRename) {
					return {...element, name, earnings}
				}

				return element
			})
		}))
	}

	render() {		
		const {data, term, filter, modal} = this.state;
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
					onProps={this.onProps} 
					onModal={this.onModal}/>
				<EmployeesAddForm addNewItem={this.addNewItem}/>

				<Modal modalName={modal.modalName}
					onRenameEmp={this.onRenameEmp}
					onModal={this.onModal}
					name={modal.name} 
					salary={modal.salary}/>
			</div>
		);
	}
}

export default App;
