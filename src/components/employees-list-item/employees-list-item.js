import './employees-list-item.css';

const EmployeesListItem = (props) => {
    const {name, earnings, onDelete, increase, like, onProps} = props;

    let needPremium = 'list-group-item d-flex justify-content-between';

    if(increase) {
        needPremium += ' increase'
    }
    if(like) {
        needPremium += ' like'
    }
    
    return (
        <li className={needPremium}>
            <span className="list-group-item-label"
                onClick={onProps}
                data-toggle="like">{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={earnings + '$'}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onProps}
                    data-toggle="increase">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"
                    onClick={onProps}
                    data-toggle="like"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;