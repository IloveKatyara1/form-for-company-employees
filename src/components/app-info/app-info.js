import "./app-info.css";

const AppInfo = (props) => {
    const {dataLength, premium, nameCompany} = props

    return (
        <div className="app-info">
            <h1>Сотрудников в компании: {nameCompany}</h1>
            <h2>Общее число сотрудников: {dataLength}</h2>
            <h2>Премию получат: {premium}</h2>
        </div>
    )
}

export default AppInfo;