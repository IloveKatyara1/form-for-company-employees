import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onProps, onModal}) => {
    const employeesItem = data.map(item => {
        const {id, ...propsItem} = item;

        return <EmployeesListItem 
                key={id} 
                {...propsItem}
                onDelete={() => onDelete(id)} 
                onProps={(e) => onProps(id, e.currentTarget.getAttribute('data-toggle'))} 
                onModal={() => onModal('modalRenameEmp', id, item.name, item.earnings)}/> 
    })

    return (
        <ul className="app-list list-group">
            {data.length !== 0 ? employeesItem : (
                <div className="nothing">
                    <h2>here is nothing add new emploe</h2>
                </div>
            )}
        </ul>
    )
}

export default EmployeesList;