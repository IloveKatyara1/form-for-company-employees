import "./app-filter.css";

const AppFilter = (props) => {
    const dataBtns = [
        {key: 'all', placeHolder: 'Все сотрудники'},
        {key: 'promotion', placeHolder: 'На повышение'},
        {key: 'moreThan1000', placeHolder: 'З/П больше 1000$'},
    ]

    const btnsFilter = dataBtns.map(btn => {
        const clazz = props.filter === btn.key ? 'btn-light' : 'btn-outline-light'

        return (
            <button type="button"
                className={`btn ${clazz}`}
                key={btn.key}
                onClick={() => props.onChangeFilter(btn.key)}>
                {btn.placeHolder}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {btnsFilter}
        </div>
    )
}

export default AppFilter;