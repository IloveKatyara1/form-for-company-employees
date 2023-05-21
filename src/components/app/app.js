import { useState } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import Modal from '../modal/modal';
import { postData, getData } from '../../services/server';

import './app.css';

const App = () => {
    const [dataNewCompany, setDataNewCompany] = useState([]);
    const [term, setTerm] = useState();
    const [filter, setFilter] = useState('all');
    const [modalName, setModalName] = useState('selectAction');
    const [idRename, setIdRename] = useState();
    const [name, setName] = useState();
    const [salary, setSalary] = useState();
    const [app, setApp] = useState('selectAction');
    const [massege, setMassege] = useState();
    const [id, setId] = useState(1);
    const [nameCompany, setNameCompany] = useState();
    const [maxIdEmp, setMaxIdEmp] = useState(0);
    const [namesCompanyView, setNamesCompanyView] = useState();
    const [canCloseReportModal, setCanCloseReportModal] = useState(true);
    const [nameData, setNameData] = useState();
    const [nameCompanyDelete, setNameCompanyDelete] = useState();
    const [navForReportModal, setNavForReportModal] = useState();
    const [idMax, setIdMax] = useState(1);
    const [oldData, setOldData] = useState([]);
    const [viewCompanyData, setViewCompanyData] = useState([]);

    const getViewCompanyData = () => {
        setNavForReportModal('selectAction');
        setCanCloseReportModal(true);

        onChangeModal('loading');

        Promise.all([
            getData('http://localhost:3000/viewCompany').then((data) => {
                setViewCompanyData([...data]);
                setNamesCompanyView(data.map((obj) => ({ value: obj.nameCompany, label: obj.nameCompany })));
            }),
        ])
            .then(() => onChangeModal('chooseCompany'))
            .catch(() => changeMassege(`something went wrong`));
    };

    const onDelete = (id) => setDataNewCompany((dataNewCompany) => dataNewCompany.filter((obj) => obj.id !== id));

    const addNewItem = (e, name, earnings) => {
        setMaxIdEmp((maxIdEmp) => maxIdEmp + 1);
        setDataNewCompany([...dataNewCompany, { name, earnings, increase: false, like: false, id: maxIdEmp }]);
    };

    const onProps = (id, name) =>
        setDataNewCompany((dataNewCompany) =>
            dataNewCompany.map((obj) => {
                if (obj.id === id) {
                    return { ...obj, [name]: !obj[name] };
                }
                return obj;
            })
        );

    const searchEmp = (data, term) => {
        if (!term) {
            return data;
        }

        return data.filter((emp) => emp.name.indexOf(term) > -1);
    };

    const onUpdataTerm = (term) => setTerm(term);

    const filterSetings = (data, filter) => {
        if (filter === 'moreThan1000') return data.filter((item) => item.earnings > 1000);
        else if (filter === 'promotion') return data.filter((item) => item.like);
        else return data;
    };

    const onChangeFilter = (filter) => setFilter(filter);

    const onModalEmp = (modalName, idRename, name, salary) => {
        setModalName(modalName);
        setIdRename(idRename);
        setName(name);
        setSalary(salary);
    };

    const onRenameEmp = (e, name, earnings) => {
        e.preventDefault();

        setDataNewCompany((dataNewCompany) =>
            dataNewCompany.map((element) => {
                if (element.id === idRename) {
                    return { ...element, name, earnings };
                }

                return element;
            })
        );
    };

    const onChangeApp = (app, modalName) => {
        setApp(app);
        setModalName(modalName);
    };

    const changeMassege = (massege) => {
        setMassege(massege);
        onChangeModal('reportModal');
    };

    const postCompany = () => {
        let wasRepeatedNameCompany;

        if (dataNewCompany.length === 0) {
            setCanCloseReportModal(false);

            changeMassege('you dont have any employees');
            return;
        }

        oldData.forEach((obj, i) => {
            if (obj.nameCompany === nameCompany && obj.id !== id) {
                setCanCloseReportModal(false);
                wasRepeatedNameCompany = true;

                changeMassege('you already have one company with that name');
            }
        });

        if (!wasRepeatedNameCompany) {
            setCanCloseReportModal(true);

            onChangeModal('loading');

            let repeated;

            setOldData(
                oldData.map((obj, i) => {
                    if (obj.id === id) {
                        repeated = true;

                        return {
                            nameCompany: nameCompany,
                            maxIdEmp: maxIdEmp,
                            employees: [...dataNewCompany],
                            id: id,
                        };
                    }

                    return obj;
                })
            );

            let text;

            postData(
                'http://localhost:3000/createdCompany',
                JSON.stringify(
                    !repeated
                        ? [
                              ...oldData,
                              {
                                  nameCompany: nameCompany,
                                  maxIdEmp: maxIdEmp,
                                  employees: [...dataNewCompany],
                                  id: id,
                              },
                          ]
                        : [...oldData]
                )
            )
                .then((res) => console.log(res))
                .then(() => (text = 'data was send'))
                .then(() => {
                    if (!repeated) {
                        setOldData((oldData) => [
                            ...oldData,
                            {
                                nameCompany: nameCompany,
                                maxIdEmp: maxIdEmp,
                                employees: [...dataNewCompany],
                                id: id,
                            },
                        ]);
                    }
                })
                .then(() => {
                    setMaxIdEmp(0);
                    if (!repeated) setIdMax((idMax) => idMax + 1);

                    makeDefaultProps();
                })
                .catch(() => {
                    setCanCloseReportModal(false);
                    text = 'something went wrong';
                })
                .finally(() => changeMassege(text));
        }
    };

    const doYouWantDeleteCompany = (nameCompanyDelete) => {
        setNameCompanyDelete(nameCompanyDelete);
        onChangeModal('deleteCompany');
    };

    const deleteCompany = () => {
        setCanCloseReportModal(true);

        onChangeModal('loading');

        let text;

        postData(
            'http://localhost:3000/createdCompany',
            JSON.stringify(oldData.filter((company) => company.nameCompany !== nameCompanyDelete))
        )
            .then((res) => console.log(res))
            .then((text = 'The company was deleted'))
            .then(() => setOldData((oldData) => oldData.filter((company) => company.nameCompany !== nameCompanyDelete)))
            .then(() => (oldData.length ? setNavForReportModal('chooseCompany') : null))
            .catch(() => {
                setCanCloseReportModal(false);
                text = 'something went wrong';
            })
            .finally(() => changeMassege(text));
    };

    const showCompany = (name, nameData) => {
        const dataCompany =
            nameData === 'oldData'
                ? oldData.filter((obj) => obj.nameCompany === name)
                : viewCompanyData.filter((obj) => obj.nameCompany === name);

        setMaxIdEmp(dataCompany[0].maxIdEmp || 0);
        setNameCompany(dataCompany[0].nameCompany);
        setDataNewCompany([...dataCompany[0].employees]);
        setTerm('');
        setFilter('all');
        setModalName('none');
        setApp(nameData === 'oldData' ? 'createCompany' : 'viewCompany');
        setId(dataCompany[0].id);
    };

    const makeDefaultProps = () => {
        setMaxIdEmp(0);
        setDataNewCompany([]);
        setTerm('');
        setFilter('all');
        setNameCompany('');
        setId(idMax + 1);

        onChangeApp('selectAction', navForReportModal || 'selectAction');

        setNavForReportModal(null);
    };

    const onChangeModal = (modalName) => setModalName(modalName);

    const onRenameNameCompany = (nameCompany) => setNameCompany(nameCompany);

    const addNamesCompany = () => oldData.map((obj) => ({ value: obj.nameCompany, label: obj.nameCompany }));

    const changeNameData = (nameData) => setNameData(nameData);

    const filtredData = filterSetings(searchEmp(dataNewCompany, term), filter) || [];
    const premium = dataNewCompany.filter((elem) => elem.increase).length || 0;

    return (
        <div className="app">
            {app === 'createCompany' && (
                <>
                    <AppInfo
                        dataLength={dataNewCompany.length}
                        premium={premium}
                        nameCompany={nameCompany}
                        onChangeModal={() => onChangeModal('modalRenameNameCompany')}
                        needBtns={true}
                    />

                    <div className="search-panel">
                        <SearchPanel onUpdataTerm={onUpdataTerm} />
                        <AppFilter filter={filter} onChangeFilter={onChangeFilter} />
                    </div>

                    <EmployeesList
                        data={filtredData}
                        onDelete={onDelete}
                        onProps={onProps}
                        onModalEmp={onModalEmp}
                        needBtns={true}
                    />
                    <EmployeesAddForm addNewItem={addNewItem} />
                    <Modal
                        modalName={modalName}
                        onRenameEmp={onRenameEmp}
                        onModalEmp={onModalEmp}
                        name={name}
                        salary={salary}
                        nameCompanyProp={nameCompany}
                        onRenameNameCompany={onRenameNameCompany}
                        onChangeApp={onChangeApp}
                        postCompany={postCompany}
                        massege={massege}
                        canCloseReportModal={canCloseReportModal}
                        makeDefaultProps={makeDefaultProps}
                        navForReportModal={navForReportModal}
                    />
                    <button
                        className="button button_menu"
                        onClick={() => {
                            setNavForReportModal('selectAction');
                            onChangeModal('saveCompany');
                        }}>
                        change action
                    </button>
                    {oldData.length ? (
                        <button
                            className="button button_menu button_change_company"
                            onClick={() => {
                                setNameData('oldData');
                                setNavForReportModal('chooseCompany');
                                onChangeModal('saveCompany');
                            }}>
                            change company
                        </button>
                    ) : null}
                </>
            )}
            {app === 'viewCompany' && (
                <>
                    <AppInfo
                        dataLength={dataNewCompany.length}
                        premium={premium}
                        nameCompany={nameCompany}
                        onChangeModal={() => onChangeModal('modalRenameNameCompany')}
                        needBtns={false}
                    />

                    <div className="search-panel">
                        <SearchPanel onUpdataTerm={onUpdataTerm} />
                        <AppFilter filter={filter} onChangeFilter={onChangeFilter} />
                    </div>

                    <EmployeesList
                        data={filtredData}
                        onDelete={onDelete}
                        onProps={onProps}
                        onModalEmp={onModalEmp}
                        needBtns={false}
                    />
                    <button className="button button_menu" onClick={makeDefaultProps}>
                        change action
                    </button>
                    <button
                        className="button button_menu button_change_company"
                        onClick={() => {
                            setNameData('viewCompanyData');
                            makeDefaultProps();
                            onChangeApp('selectAction', 'chooseCompany');
                        }}>
                        change company
                    </button>
                </>
            )}
            {app === 'selectAction' && (
                <Modal
                    modalName={modalName}
                    onRenameEmp={onRenameEmp}
                    onModalEmp={onModalEmp}
                    name={name}
                    salary={salary}
                    onChangeApp={onChangeApp}
                    wasSaved={oldData.length}
                    namesCompanyView={namesCompanyView}
                    onChangeModal={onChangeModal}
                    showCompany={showCompany}
                    getViewCompanyData={getViewCompanyData}
                    canCloseReportModal={canCloseReportModal}
                    massege={massege}
                    nameData={nameData}
                    changeNameData={changeNameData}
                    doYouWantDeleteCompany={doYouWantDeleteCompany}
                    deleteCompany={deleteCompany}
                    navForReportModal={navForReportModal}
                    addNamesCompany={addNamesCompany}
                />
            )}
        </div>
    );
};

export default App;
