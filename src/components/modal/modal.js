import { useState } from 'react';

import Select from 'react-select';

import './modal.css';
import spiner from '../../icons/spinner.svg';

const Modal = (props) => {
    const [name, setName] = useState(null);
    const [salary, setSalary] = useState(null);
    const [nameCompany, setNameCompany] = useState(props.nameCompanyProp || '');
    const [canClose, setCanClose] = useState(false);
    let elemActive;

    const onCloseModal = (canCloseProp) => {
        if (canClose || canCloseProp) {
            props.onModalEmp('none');

            setName(null);
            setSalary(null);
        }
    };

    const {
        getViewCompanyData,
        navForReportModal,
        doYouWantDeleteCompany,
        deleteCompany,
        nameData,
        changeNameData,
        makeDefaultProps,
        namesCompanyView,
        showCompany,
        modalName,
        onRenameEmp,
        onChangeApp,
        onRenameNameCompany,
        postCompany,
        massege,
        canCloseReportModal,
        wasSaved,
        addNamesCompany,
        onChangeModal,
    } = props;

    let clazz = `modal ` + modalName;

    if (modalName === 'none') {
        if (!canClose) setCanClose(true);

        return;
    }

    return (
        <div
            className="background"
            onClick={(e) => {
                if (e.target.classList[0] === 'background') onCloseModal();
            }}>
            <div className={clazz}>
                {modalName === 'selectAction' && (
                    <>
                        <h4>select action</h4>
                        <hr />
                        <div className="btn-group">
                            <button
                                type="button"
                                className={`btn`}
                                onClick={() => {
                                    setCanClose(false);
                                    changeNameData('viewCompanyData');
                                    namesCompanyView ? onChangeModal('chooseCompany') : getViewCompanyData();
                                }}>
                                view company
                            </button>
                            <p>or</p>
                            <button
                                type="button"
                                className={`btn`}
                                onClick={() => {
                                    onChangeApp('createCompany', 'modalRenameNameCompany');
                                    setCanClose(false);
                                }}>
                                create company
                            </button>
                            {wasSaved ? (
                                <>
                                    <p>or</p>
                                    <button
                                        type="button"
                                        className={`btn`}
                                        onClick={() => {
                                            changeNameData('oldData');
                                            onChangeModal('chooseCompany');
                                        }}>
                                        view your company
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </>
                )}
                {modalName === 'modalRenameEmp' && (
                    <>
                        <h4>rename</h4>
                        <hr />
                        <form className="add-form d-flex">
                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                className="form-control new-post-label"
                                onChange={(e) => setName(e.target.value)}
                                value={name ?? props.name}
                            />
                            <input
                                type="number"
                                name="salary"
                                placeholder="Salary in $?"
                                className="form-control new-post-label"
                                onChange={(e) => setSalary(e.target.value)}
                                value={salary ?? props.salary}
                            />
                            <button
                                type="submit"
                                className="btn btn-outline-light blue"
                                onClick={(e) => {
                                    onRenameEmp(e, name || props.name, salary > 0 ? salary : props.salary);
                                    onCloseModal();
                                }}>
                                save
                            </button>
                            <button type="submit" className="btn btn-outline-light red" onClick={(e) => onCloseModal()}>
                                cancel
                            </button>
                        </form>
                    </>
                )}
                {modalName === 'modalRenameNameCompany' && (
                    <>
                        <h4>company name</h4>
                        <hr />
                        <input
                            type="text"
                            name="nameCompany"
                            placeholder="name company"
                            className="form-control new-post-label"
                            onChange={(e) => setNameCompany(e.target.value)}
                            value={nameCompany}
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-light blue"
                            onClick={() => {
                                if (
                                    (!nameCompany || !nameCompany.trim()) &&
                                    (!props.nameCompany || !props.nameCompany.trim())
                                )
                                    return;

                                setCanClose(true);

                                onRenameNameCompany(
                                    nameCompany ? nameCompany.trim() : null || props.nameCompany.trim()
                                );
                                onCloseModal(true);
                            }}>
                            save
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline-light red"
                            onClick={() => (!canClose ? onChangeApp('selectAction', 'selectAction') : onCloseModal())}>
                            cancel
                        </button>
                    </>
                )}
                {modalName === 'saveCompany' && (
                    <>
                        <h4>do you want to save your company?</h4>
                        <hr />
                        <div className="btn-group">
                            <button onClick={postCompany}>Yes, I want to save</button>
                            <button onClick={makeDefaultProps}>No, I don't want to save</button>
                            <button onClick={onCloseModal}>Cancel</button>
                        </div>
                    </>
                )}
                {modalName === 'reportModal' && (
                    <>
                        <h4>{massege}</h4>
                        <hr />
                        <button
                            onClick={() =>
                                massege === 'The company was deleted' && !addNamesCompany().length
                                    ? onChangeApp('selectAction', 'selectAction')
                                    : canCloseReportModal
                                    ? onChangeApp('selectAction', navForReportModal || 'selectAction')
                                    : onCloseModal()
                            }>
                            ok
                        </button>
                    </>
                )}
                {modalName === 'chooseCompany' && (
                    <>
                        <h4>choose company</h4>
                        <hr />
                        <Select
                            options={nameData === 'viewCompanyData' ? namesCompanyView : addNamesCompany()}
                            onChange={(elem) => (elemActive = elem.value)}
                        />
                        <button
                            className="btn blue"
                            onClick={() => (elemActive ? showCompany(elemActive, nameData) : null)}>
                            view
                        </button>
                        <button className="btn red" onClick={() => onChangeModal('selectAction')}>
                            back
                        </button>
                        {nameData === 'oldData' && (
                            <button
                                className="btn red"
                                onClick={() => (elemActive ? doYouWantDeleteCompany(elemActive) : null)}>
                                delete
                            </button>
                        )}
                    </>
                )}
                {modalName === 'loading' && (
                    <>
                        <h4>loading...</h4>
                        <img src={spiner} alt="spiner" />
                    </>
                )}
                {modalName === 'deleteCompany' && (
                    <>
                        <h4>Are you sure want to delete your company?</h4>
                        <hr />
                        <button className="btn blue" onClick={() => onChangeModal('chooseCompany')}>
                            cancel
                        </button>
                        <button className="btn red" onClick={deleteCompany}>
                            Yes
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;
