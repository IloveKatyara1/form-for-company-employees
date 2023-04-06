import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onProps}) => {
    const employeesItem = data.map(item => {
        const {id, ...propsItem} = item;
        return <EmployeesListItem 
                key={id} 
                {...propsItem} 
                onDelete={() => onDelete(id)} 
                onProps={(e) => onProps(id, e.currentTarget.getAttribute('data-toggle'))}/> 
    })

    return (
        <ul className="app-list list-group">
            {employeesItem}
        </ul>
    )
}

export default EmployeesList;