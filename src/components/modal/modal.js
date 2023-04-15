

import { Component } from 'react';

import './modal.css'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: null,
                salary: null,
                nameComopany: null
            },
            massege: ''
        }
    }

    canClose = true;
    cantClose = true;

    onCloseModal = () => {
        if(this.canClose) {
            this.props.onModalEmp('none')

            this.setState(({inputs}) => ({
                inputs: {
                    name: null,
                    salare: null,
                    nameComopany: null
                }
            }))
            this.massege = ''
        }
    }

    render() {
        const {modalName, onRenameEmp, onChangeApp, onRenameNameCompany, postCompany, massege, moreThenZeroEmp, wasSaved} = this.props;

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

        const {name, salary, nameComopany} = this.state.inputs;

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
                                виберіть дію
                            </h4>
                            <hr />
                            <div className="btn-group">
                                <button type="button"
                                    className={`btn`}
                                    onClick={() => {
                                        onChangeApp('viewCompany', 'modal_selectAction')
                                        this.cantClose = true;
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
                                {wasSaved && (
                                    <>
                                        <p>or</p>
                                        <button type="button"
                                            className={`btn`}
                                        >
                                            view your company
                                        </button>
                                    </>
                                )}
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
                                    name='nameComopany'
                                    placeholder='name company' 
                                    className='form-control new-post-label' 
                                    onChange={onChangeValue} 
                                    value={nameComopany ?? this.props.nameCompany} 
                                />
                            <button type="submit"
                                className="btn btn-outline-light blue"
                                onClick={() => {
                                    if(!nameComopany && !this.props.nameCompany) return

                                    this.canClose = true;
                                    this.cantClose = false;

                                    onRenameNameCompany(nameComopany || this.props.nameCompany)
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
                                <button onClick={() => onChangeApp('selectAction', 'selectAction')}>
                                    No, I don't want to save
                                </button>
                                <button onClick={this.onCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    )} {modalName === 'reportModal' && (
                        <>
                            {moreThenZeroEmp ? this.canClose = false : this.canClose = true}
                            {massege}
                            <hr />
                            <button onClick={() => moreThenZeroEmp ? onChangeApp('selectAction', 'selectAction') : this.onCloseModal()}>ok</button>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default Modal;