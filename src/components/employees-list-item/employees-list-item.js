import './employees-list-item.css';

const EmployeesListItem = ({name, earnings, premium}) => {
    let needPremium = 'list-group-item d-flex justify-content-between ';

    if(premium) {
        needPremium += 'increase'
    }
    
    return (
        <li className={needPremium}>
            <span className="list-group-item-label">{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={earnings + '$'}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm ">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm ">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;