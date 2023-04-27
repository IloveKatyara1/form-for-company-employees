import "./app-info.css";

const AppInfo = (props) => {
    const {dataLength, premium, nameCompany, onChangeModal, needBtns} = props

    return (
        <div className="app-info">
            <h1>Employees in the company: {32 <= nameCompany.length ? nameCompany.slice(0, 32) + '...' : nameCompany} 
                {needBtns && (
                    <button type="button"
                        className="btn-pen btn-sm "
                        onClick={onChangeModal}>
                        <i className="fa-sharp fa-solid fa-pen"></i>
                    </button>
                )}
            </h1>
            <h2>Total number of employees: {dataLength}</h2>
            <h2>The bonus will be received by: {premium}</h2>
        </div>
    )
}

export default AppInfo;