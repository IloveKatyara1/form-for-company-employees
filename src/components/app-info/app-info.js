import "./app-info.css";

const AppInfo = (props) => {
    const {dataLength, premium, nameCompany, onChangeModal} = props

    return (
        <div className="app-info">
            <h1>Сотрудники в компании: {nameCompany} 
                <button type="button"
                    className="btn-pen btn-sm "
                    onClick={onChangeModal}>
                    <i className="fa-sharp fa-solid fa-pen"></i>
                </button>
            </h1>
            <h2>Общее число сотрудников: {dataLength}</h2>
            <h2>Премию получат: {premium}</h2>
        </div>
    )
}

export default AppInfo;