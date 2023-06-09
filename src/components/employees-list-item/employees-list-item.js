import './employees-list-item.css';

const EmployeesListItem = (props) => {
    const {name, earnings, onDelete, increase, like, onProps, onModalEmp, needBtns} = props;

    let needPremium = 'list-group-item d-flex justify-content-between';

    if(increase) {
        needPremium += ' increase'
    }
    if(like) {
        needPremium += ' like'
    }
    
    return (
        <li className={needPremium}>
            {needBtns ? (
                <button className="list-group-item-label"
                    onClick={onProps}
                    data-toggle="like">{40 <= name.length ? name.slice(0, 40) + '...' : name}</button>
            ) : (
                <span className="list-group-item-label cursor_none"
                    data-toggle="like">{40 <= name.length ? name.slice(0, 40) + '...' : name}</span>
            )}
            <span className="list-group-item-input">{15 <= earnings.length ? earnings.slice(0, 15) + '...$' : earnings + '$'}</span>
            <div className='d-flex justify-content-center align-items-center'>
                {needBtns && (
                    <>
                        <button type="button"
                            className="btn-pen btn-sm button "
                            onClick={onModalEmp}>
                            <i className="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button type="button"
                            className="btn-cookie btn-sm button "
                            onClick={onProps}
                            data-toggle="increase">
                            <i className="fas fa-cookie"></i>
                        </button>
                        <button type="button"
                                className="btn-trash btn-sm button "
                                onClick={onDelete}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </>
                )}
                {needBtns ? (
                    <i className="fas fa-star"
                        onClick={onProps}
                        data-toggle="like"></i>
                ) : (
                    <i className="fas fa-star cursor_none"
                        data-toggle="like"></i>
                )}
            </div>
        </li>
    )
}

export default EmployeesListItem;