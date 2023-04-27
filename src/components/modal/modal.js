import React from 'react'

import Select from 'react-select'

import './modal.css'
import spiner from '../../icons/spinner.svg'

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: null,
                salary: null,
                nameCompany: null
            },
            massege: '',
        }
    }

    canClose = true;
    cantClose = true;
    elemActive;

    onCloseModal = () => {
        if(this.canClose) {
            this.props.onModalEmp('none')

            this.setState(({inputs}) => ({
                inputs: {
                    name: null,
                    salare: null,
                    nameCompany: null
                }
            }))
            this.massege = ''
        }
    }

    render() {
        const {getViewCompanyData, navForReportModal, doYouWantDeleteCompany, deleteCompany, nameData, changeNameData, makeDefaultProps, namesCompanyView, onCancelLoading, showCompany, modalName, onRenameEmp, onChangeApp, onRenameNameCompany, postCompany, massege, canCloseReportModal, wasSaved, namesCompany, onChangeModal} = this.props;

        let clazz = `modal ` + modalName

        const onChangeValue = (e) => {
            const { name, value } = e.target;
            this.setState(({inputs}) => ({
                inputs: {
                    ...inputs,
                    [name]: value
                }
            }))
        }

        const makeInputDefault = (nameFnc) => {
            this.setState(({inputs}) => ({
                inputs: {
                    ...inputs,
                    [nameFnc]: null
                }
            }))

            return this.props[nameFnc]
        }

        const {name, salary, nameCompany} = this.state.inputs;

        if(modalName === 'none') return;

        this.canClose = true;

        return (
            <div className="background" 
                onClick={
                    (e) => {if(e.target.classList[0] === 'background') this.onCloseModal()}
                }
            >
                <div className={clazz}>
                    {modalName === 'selectAction' && (
                        <>
                            {this.canClose = false}
                            <h4>
                                select action
                            </h4>
                            <hr />
                            <div className="btn-group">
                                <button type="button"
                                    className={`btn`}
                                    onClick={() => {
                                        this.cantClose = true;
                                        changeNameData('viewCompanyData')
                                        namesCompanyView ? onChangeModal('chooseCompany') : getViewCompanyData()
                                    }}
                                >
                                    view company
                                </button>
                                <p>or</p>
                                <button type="button"
                                    className={`btn`}
                                    onClick={() => {
                                        onChangeApp('createCompany', 'modalRenameNameCompany')
                                        this.cantClose = true;
                                    }}
                                >
                                    create company
                                </button>
                                {wasSaved ? (
                                    <>
                                        <p>or</p>
                                        <button type="button"
                                            className={`btn`}
                                            onClick={() => {
                                                onChangeModal('chooseCompany')
                                                changeNameData('oldData')
                                            }}
                                        >
                                            view your company
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </>
                    )} {modalName === 'modalRenameEmp' && (
                        <>
                            <h4>rename</h4>
                            <hr />
                            <form className='add-form d-flex'>
                                <input type="text" 
                                    name='name'
                                    placeholder='name' 
                                    className='form-control new-post-label' 
                                    onChange={onChangeValue} 
                                    value={name ?? this.props.name} 
                                />
                                <input type="number" 
                                    name='salary'
                                    placeholder='З/П в $?' 
                                    className='form-control new-post-label' 
                                    onChange={onChangeValue} 
                                    value={salary ?? this.props.salary} 
                                />
                                <button type="submit"
                                    className="btn btn-outline-light blue"
                                    onClick={(e) => {
                                        onRenameEmp(e, name || makeInputDefault('name'), salary > 0 ? salary : makeInputDefault('salary'));
                                        this.onCloseModal();
                                    }}
                                >
                                    save
                                </button>
                                <button type="submit"
                                    className="btn btn-outline-light red"
                                    onClick={(e) => this.onCloseModal()}
                                >
                                    cancel
                                </button>
                            </form>
                        </>
                    )} {modalName === 'modalRenameNameCompany' && (
                        <>
                            {this.cantClose ? this.canClose = false : this.canClose = true}
                            <h4>company name</h4>
                            <hr />
                            <input type="text" 
                                    name='nameCompany'
                                    placeholder='name company' 
                                    className='form-control new-post-label' 
                                    onChange={onChangeValue} 
                                    value={nameCompany ?? this.props.nameCompany} 
                                />
                            <button type="submit"
                                className="btn btn-outline-light blue"
                                onClick={() => {
                                    if((!nameCompany || !nameCompany.trim()) && (!this.props.nameCompany || !this.props.nameCompany.trim())) return

                                    this.canClose = true;
                                    this.cantClose = false;

                                    onRenameNameCompany(nameCompany ? nameCompany.trim() : null || this.props.nameCompany.trim())
                                    this.onCloseModal();
                                }}
                            >
                                save
                            </button>
                            <button type="submit"
                                className="btn btn-outline-light red"
                                onClick={() => this.cantClose ? onChangeApp('selectAction', 'selectAction') : this.onCloseModal()}
                            >
                                cancel
                            </button>
                        </>
                    )} {modalName === 'saveCompany' && ( 
                        <>
                            <h4>do you want to save your company?</h4>
                            <hr />
                            <div className="btn-group">
                                <button onClick={postCompany}>
                                    Yes, I want to save
                                </button>
                                <button onClick={() => makeDefaultProps()}>
                                    No, I don't want to save
                                </button>
                                <button onClick={this.onCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    )} {modalName === 'reportModal' && (
                        <>
                            {canCloseReportModal ? this.canClose = false : this.canClose = true}
                            <h4>{massege}</h4>
                            <hr />
                            <button onClick={() => canCloseReportModal ? onChangeApp('selectAction', navForReportModal || 'selectAction') : this.onCloseModal()}>
                                ok
                            </button>
                        </>
                    )} {modalName === 'chooseCompany' && (
                        <>
                            {this.canClose = false}
                            <h4>choose company</h4>
                            <hr />
                            <Select options={nameData === 'viewCompanyData' ? namesCompanyView : namesCompany} 
                            onChange={(elem) => this.elemActive = elem.value}/>
                            <button
                                className="btn blue"
                                onClick={() => this.elemActive ? showCompany(this.elemActive, nameData) : null}
                            >
                                view
                            </button>
                            <button
                                className="btn red"
                                onClick={() => onChangeModal('selectAction')}
                            >
                                back
                            </button>
                            {nameData === 'oldData' && (
                                <button
                                    className="btn red"
                                    onClick={() => this.elemActive ? doYouWantDeleteCompany(this.elemActive) : null}
                                >
                                    delete
                                </button>
                            )} 
                        </>
                    )} {modalName === 'loading' && (
                        <>
                            {this.canClose = false}

                            <h4>loading...</h4>
                            <img src={spiner} alt="spiner" />
                            <hr />
                            <button
                                className="btn blue" 
                                onClick={onCancelLoading}
                            >
                                cancel
                            </button>
                        </>
                    )} {modalName === 'deleteCompany' && (
                        <>
                            {this.canClose = false}
                            <h4>Are you sure want to delete your company?</h4>
                            <hr />
                            <button
                                className="btn blue" 
                                onClick={() => onChangeModal('chooseCompany')}
                            >
                                cancel
                            </button>
                            <button
                                className="btn red" 
                                onClick={deleteCompany}
                            >
                                Yes
                            </button>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default Modal;