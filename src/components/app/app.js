import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import Modal from '../modal/modal';
import {postData, getData} from '../../services/server'

import './app.css';

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
			namesCompany: '',
			id: 1,
			massegeErrorView: '',
			nameCompany: ''
		}

		this.maxIdEmp = 0;
		this.namesCompanyView = '';
		this.canCloseReportModal = true
		this.namesCompanyView = ''
		this.dontWantSave = false
		this.nameData = ''
	}

	idMax = 1
	oldData = []
	viewCompanyData = []

	getViewCompanyData = () => {
		this.canCloseReportModal = true;
		this.onChangeModal('loading')

		getData('http://localhost:3000/viewCompany')
		.then((data) => this.viewCompanyData = [...data])
		.then(() => this.namesCompanyView = this.viewCompanyData.map(obj => ({ value: obj.nameCompany, label: obj.nameCompany })))
		.then(() => !this.dontWantSave ? this.onChangeModal('chooseCompany') : null)
		.catch((error) => !this.dontWantSave ? this.changeMassege(`something went wrong`) : null)
	}

	onDelete = (id) => {
		this.setState(({dataNewCompany}) => ({
			dataNewCompany: dataNewCompany.filter(obj => obj.id !== id)
		}))
	}

	addNewItem = (e, name, earnings) => {
		this.maxIdEmp += 1

		this.setState(({dataNewCompany}) => ({
			dataNewCompany: [...dataNewCompany, {name, earnings, increase: false, like: false, id: this.maxIdEmp}]
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

	changeMassege = (massege) => this.setState({ massege }, () => this.onChangeModal('reportModal'));

	onChangeDontWantSave = (boolen) => this.dontWantSave = boolen

	postCompany = () => {	
		let wasRepeatedNameCompany;

		if(this.state.dataNewCompany.length === 0) {
			this.canCloseReportModal = false

			this.changeMassege('you dont have any employees')
			return
		}

		this.oldData.forEach((obj, i) => {
			if(obj.nameCompany === this.state.nameCompany && obj.id !== this.state.id) {
				this.canCloseReportModal = false
				wasRepeatedNameCompany = true

				this.changeMassege('you already have one company with that name')
			}
		})

		if (!wasRepeatedNameCompany) {
			this.canCloseReportModal = true
			this.dontWantSave = false

			this.onChangeModal('loading')
	
			let repeated;
	
			this.oldData.forEach((obj, i) => {
				if(obj.id === this.state.id) {
					this.oldData[i] =  {
						nameCompany: this.state.nameCompany,
						maxIdEmp: this.maxIdEmp,
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
						nameCompany: this.state.nameCompany,
						maxIdEmp: this.maxIdEmp,
						employees: [...this.state.dataNewCompany],
						id: this.state.id
					}
				]
			}
	
			let text;
	
			postData('http://localhost:3000/createdCompany', JSON.stringify(this.oldData))
			.then((res) => !this.dontWantSave ? console.log(res) : null)
			.then(() => text = 'data was send')
			.then(() => {
				if(!this.dontWantSave) {
					this.maxIdEmp = 0;
					if(!repeated) this.idMax += 1
		
					this.setState(({
						...this.state,
						nameCompany: '',
						dataNewCompany: [], 
						term: '', 
						filter: 'all',
						namesCompany: this.oldData.map(obj => ({ value: obj.nameCompany, label: obj.nameCompany })),
						id: this.idMax
					}))
				} else {
					this.oldData = this.oldData.filter(obj => obj.id !== this.idMax)
					postData('http://localhost:3000/createdCompany', JSON.stringify(this.oldData))
				}
			})
			.catch(() => {
				if(!this.dontWantSave) {
					this.canCloseReportModal = false
					text = 'something went wrong';
				} else this.oldData = this.oldData.filter(obj => obj.id !== this.idMax)
			})
			.finally(() => !this.dontWantSave ? this.changeMassege(text) : '')
		}
	}

	showCompany = (name, nameData) => {
		const dataCompany = this[nameData].filter(obj => obj.nameCompany === name)[0];
		
		this.maxIdEmp = dataCompany.maxIdEmp || 0

		this.setState(({
			...this.state,
			nameCompany: name,
			dataNewCompany: [...dataCompany.employees], 
			term: '', 
			filter: 'all',
			modalProp: {
				...this.state.modalProp,
				modalName: 'none',
			},
			app: nameData === 'oldData' ? 'createCompany' : 'viewCompany',
			id: dataCompany.id
		}))
	}

	makeDefaultProps = () => {
		this.maxIdEmp = 0;

		this.setState(({
			...this.state,
			nameCompany: '',
			dataNewCompany: [], 
			term: '', 
			filter: 'all',
			namesCompany: this.oldData.map(obj => ({ value: obj.nameCompany, label: obj.nameCompany })) || '',
			id: this.idMax
		}))

		this.onChangeApp('selectAction', 'selectAction')
	}

	onChangeModal = (modalName) => this.setState(({modalProp}) => ({
		modalProp: {
			...modalProp,
			modalName
		}
	}))

	onRenameNameCompany = (nameCompany) => this.setState(({nameCompany}))

	onCancelLoading = () => {
		this.onChangeDontWantSave(true)
		this.canCloseReportModal ? this.onChangeModal('selectAction') : this.onChangeModal('none')
	}

	changeNameData = (nameData) => this.nameData = nameData

	render() {		
		const {dataNewCompany, nameCompany, massegeErrorView, term, filter, modalProp, app, massege, namesCompany} = this.state;
		const filtredData = this.filterSetings(this.searchEmp(dataNewCompany, term, 'dataNewCompany'), filter)
		const premium = dataNewCompany.filter(elem => elem.increase).length;

		return (	
			<div className="app">
				{app === 'createCompany' && (
					<>
						<AppInfo 
							dataLength={dataNewCompany.length}
							premium={premium}
							nameCompany={nameCompany}
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
							onModalEmp={this.onModalEmp}
							needBtns={true}
						/>
						<EmployeesAddForm addNewItem={this.addNewItem}/>
						<Modal 
							modalName={modalProp.modalName}
							onRenameEmp={this.onRenameEmp}
							onModalEmp={this.onModalEmp}
							name={modalProp.modalRenameEmp.name} 
							salary={modalProp.modalRenameEmp.salary}
							nameCompany={nameCompany}
							onRenameNameCompany={this.onRenameNameCompany}
							onChangeApp={this.onChangeApp}
							postCompany={this.postCompany}
							massege={massege}
							canCloseReportModal={this.canCloseReportModal}
							makeDefaultProps={this.makeDefaultProps}
							onCancelLoading={this.onCancelLoading}
						/>
						<button
							className='button button_menu'
							onClick={() => this.onChangeModal('saveCompany')}
						>
							change action
						</button>
						{this.oldData.length ? (
							<button
								className='button button_menu button_change_company'
								onClick={() => {
									this.makeDefaultProps()
									this.nameData = 'oldData';
									this.onChangeApp('selectAction', 'chooseCompany')
								}}
							>
								change company
							</button>
						) : null}
					</>
				)} {app === 'viewCompany' && (
					<>
						<AppInfo 
							dataLength={dataNewCompany.length}
							premium={premium}
							nameCompany={nameCompany}
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
							onModalEmp={this.onModalEmp}
							needBtns={false}
						/>
						<button
							className='button button_menu'
							onClick={() => this.makeDefaultProps()}
						>
							change action
						</button>
						<button
							className='button button_menu button_change_company'
							onClick={() => {
								this.nameData = 'viewCompanyData';
								this.makeDefaultProps()
								this.onChangeApp('selectAction', 'chooseCompany')
							}}
						>
							change company
						</button>
					</>
				)} {app === 'selectAction' && (
					<Modal modalName={modalProp.modalName}
						onRenameEmp={this.onRenameEmp}
						onModalEmp={this.onModalEmp}
						name={modalProp.modalRenameEmp.name} 
						salary={modalProp.modalRenameEmp.salary}
						onChangeApp={this.onChangeApp}
						wasSaved={this.oldData.length}
						namesCompany={namesCompany}
						namesCompanyView={this.namesCompanyView}
						onChangeModal={this.onChangeModal}
						showCompany={this.showCompany}
						onChangeDontWantSave={this.onChangeDontWantSave}
						massegeErrorView={massegeErrorView}
						getViewCompanyData={this.getViewCompanyData}
						canCloseReportModal={this.canCloseReportModal}
						massege={massege}
						onCancelLoading={this.onCancelLoading}
						nameData={this.nameData}
						changeNameData={this.changeNameData}
					/>
				)}
			</div>
		);
	}
}

export default App;