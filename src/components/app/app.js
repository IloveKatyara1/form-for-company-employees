import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
  	const data = [
		{name: 'John S.', earnings: 2000, premium: true, id: 1},
		{name: 'Nazar T.', earnings: 20000, premium: true, id: 2},
		{name: 'Tom A.', earnings: 5000, premium: false, id: 3}
  	];	

	return (	
		<div className="app">
			<AppInfo />

			<div className="search-panel">
				<SearchPanel/>
				<AppFilter/>
			</div>
			
			<EmployeesList data={data}/>
			<EmployeesAddForm/>
		</div>
  	);
}

export default App;
