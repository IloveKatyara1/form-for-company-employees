import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete}) => {
    const employeesItem = data.map(item => {
        const {id, ...propsItem} = item;
        return <EmployeesListItem key={id} {...propsItem} onDelete={() => onDelete(id)}/>
    })

    return (
        <ul className="app-list list-group">
            {employeesItem}
        </ul>
    )
}

export default EmployeesList;