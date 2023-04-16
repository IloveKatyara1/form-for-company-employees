import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import Modal from '../modal/modal';
import {postData} from '../../services/server'

import './app.css';
import spiner from '../../icons/spinner.svg'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dataNewCompany: [], 
			term: '', 
			filter: 'all',
			modalProp: {
				modalName: 'selectAction',
				modalRenameEmp: {
					idRename: '', 
					name: '',
					salary: ''
				},
			},
			app: 'selectAction',
			massege: '',
			wasSaved: false,
			namesCompany: '',
			id: 1
		}

		this.maxId = 0;
		this.nameCompany = '';
		this.canCloseReportModal = true
		this.id = 1
	}

	oldData = []

	onDelete = (id) => {
		this.setState(({dataNewCompany}) => ({
			dataNewCompany: dataNewCompany.filter(obj => obj.id !== id)
		}))
	}

	addNewItem = (e, name, earnings) => {
		this.maxId += 1

		this.setState(({dataNewCompany}) => ({
			dataNewCompany: [...dataNewCompany, {name, earnings, increase: false, like: false, id: this.maxId}]
		}))
	}

	onProps = (id, name) => {
		this.setState(({dataNewCompany}) => ({
			dataNewCompany: dataNewCompany.map(obj => {
				if(obj.id === id) {
					return {...obj, [name]: !obj[name]}
				}
				return obj;
			})
		}))
	}

	searchEmp = (data, term, nameData) => {
		if(term.length === 0) {
			return this.state[nameData]
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

	onModalEmp = (modalName, idRename, name, salary) => this.setState(({modalProp}) => ({
		modalProp: {modalName, modalRenameEmp: {idRename, name, salary}} 
	}))

	onRenameEmp = (e, name, earnings) => {
		e.preventDefault()

		this.setState(({dataNewCompany}) => ({
			dataNewCompany: dataNewCompany.map(element => {
				if(element.id === this.state.modalProp.modalRenameEmp.idRename) {
					return {...element, name, earnings}
				}

				return element
			})
		}))
	}

	onChangeApp = (app, modalName) => this.setState((state) => ({
		...state,
		modalProp: {
			...state.modalProp,
			modalName
		},
		app
	}))

	changeMassege = (massege) => this.setState(({massege}))

	postCompany = () => {	
		let wasRepeated;

		if(this.state.dataNewCompany.length === 0) {
			this.canCloseReportModal = false

			this.changeMassege(<h4>you dont have any employees</h4>)
			this.onChangeModal('reportModal')
			return
		}

		this.oldData.forEach((obj, i) => {
			if(obj.nameCompany === this.nameCompany) {
				this.canCloseReportModal = false
				wasRepeated = true

				this.changeMassege(<h4>you already have one company with that name</h4>)
				this.onChangeModal('reportModal')
			}
		})

		if (!wasRepeated) {
			this.canCloseReportModal = true

			this.changeMassege(<img src={spiner} alt="spiner" />)
			this.onChangeModal('reportModal')
	
			let repeated;
	
			this.oldData.forEach((obj, i) => {
				if(obj.id === this.state.id) {
					this.oldData[i] =  {
						nameCompany: this.nameCompany,
						maxId: this.maxId,
						employees: [...this.state.dataNewCompany],
						id: this.state.id
					}
	
					repeated = true
				}
			})
	
			if(!repeated) {
				this.oldData = [
					...this.oldData,
					{
						nameCompany: this.nameCompany,
						maxId: this.maxId,
						employees: [...this.state.dataNewCompany],
						id: this.state.id
					}
				]
			}
	
			let text;
	
			postData('http://localhost:3000/createdCompany', JSON.stringify(this.oldData))
			.then((res) => console.log(res))
			.then(() => text = 'data was send')
			.then(() => {
				this.nameCompany = ''
				this.maxId = 0;
				if(!repeated) this.id += 1
	
				this.setState(({
					...this.state,
					dataNewCompany: [], 
					term: '', 
					filter: 'all',
					wasSaved: true,
					namesCompany: this.oldData.map(obj => ({ value: obj.nameCompany, label: obj.nameCompany })),
					id: this.id
				}))
			})
			.catch(() => {
				this.canCloseReportModal = false
				text = 'something went wrong';
			})
			.finally(() => this.changeMassege(<h4>{text}</h4>))
		}
	}

	showCompany = (name) => {
		const dataCompany = this.oldData.filter(obj => obj.nameCompany === name)[0];

		this.nameCompany = name;
		this.maxId = dataCompany.maxId

		this.setState(({
			...this.state,
			dataNewCompany: [...dataCompany.employees], 
			term: '', 
			filter: 'all',
			modalProp: {
				...this.state.modalProp,
				modalName: 'none',
			},
			app: 'createCompany',
			id: dataCompany.id
		}))
	}

	onChangeModal = (modalName) => this.setState(({modalProp}) => ({
		modalProp: {
			...modalProp,
			modalName
		}
	}))

	onRenameNameCompany = (nameCompany) => {	
		this.nameCompany = nameCompany;
		this.render();
	}

	canRenderInfoApp = false

	render() {		
		const {dataNewCompany, term, filter, modalProp, app, massege, wasSaved, namesCompany} = this.state;
		const filtredData = this.filterSetings(this.searchEmp(dataNewCompany, term, 'dataNewCompany'), filter)
		const premium = dataNewCompany.filter(elem => elem.increase).length;

		return (	
			<div className="app">
				{app === 'createCompany' && (
					<>
						<AppInfo 
							dataLength={dataNewCompany.length}
							premium={premium}
							nameCompany={this.nameCompany}
							onChangeModal={() => this.onChangeModal('modalRenameNameCompany')}	
						/>
			
						<div className="search-panel">
							<SearchPanel onUpdataTerm={this.onUpdataTerm}/>
							<AppFilter filter={filter} onChangeFilter={this.onChangeFilter}/>
						</div>
						
						<EmployeesList 
							data={filtredData} 
							onDelete={this.onDelete} 
							onProps={this.onProps} 
							onModalEmp={this.onModalEmp}/>
						<EmployeesAddForm addNewItem={this.addNewItem}/>
						<Modal 
							modalName={modalProp.modalName}
							onRenameEmp={this.onRenameEmp}
							onModalEmp={this.onModalEmp}
							name={modalProp.modalRenameEmp.name} 
							salary={modalProp.modalRenameEmp.salary}
							nameCompany={this.nameCompany}
							onRenameNameCompany={this.onRenameNameCompany}
							onChangeApp={this.onChangeApp}
							postCompany={this.postCompany}
							massege={massege}
							canCloseReportModal={this.canCloseReportModal}
						/>
						<button
							className='button button_menu'
							onClick={() => this.onChangeModal('saveCompany')}
						>
							change action
						</button>
					</>
				)} {app === 'viewCompany' && (
					<>

					</>
				)} {app === 'selectAction' && (
					<Modal modalName={modalProp.modalName}
						onRenameEmp={this.onRenameEmp}
						onModalEmp={this.onModalEmp}
						name={modalProp.modalRenameEmp.name} 
						salary={modalProp.modalRenameEmp.salary}
						onChangeApp={this.onChangeApp}
						wasSaved={wasSaved}
						namesCompany={namesCompany}
						onChangeModal={this.onChangeModal}
						showCompany={this.showCompany}
					/>
				)}
			</div>
		);
	}
}

export default App;
