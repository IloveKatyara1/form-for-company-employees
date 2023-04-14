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
        }
    }

    canClose = true;
    cantClose = true;

    onCloseModal = () => {
        if(this.canClose) {
            this.props.onModal('none')

            this.setState(({inputs}) => ({
                inputs: {
                    name: null,
                    salare: null,
                    nameComopany: null
                }
            }))
        }
    }

    render() {
        const {modalName, onRenameEmp, onChangeApp, onRenameNameCompany} = this.props;

        let clazz = `modal`

        if(modalName === 'selectAction' || modalName === 'modalRenameNameCompany') {
            clazz = 'modal ' + modalName
        }

        const dataBtns = [
            {placeHolder: 'view company', key: 'viewCompany', modalName: 'modal_selectAction'},
            {placeHolder: 'or', isP: true},
            {placeHolder: 'create company', key: 'createCompany', modalName: 'modalRenameNameCompany'},
        ]

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
                                {
                                    dataBtns.map((btn, i) => {
                                        if(btn.isP) return <p key={i}>{btn.placeHolder}</p>

                                        const clazz = this.props.active === btn.key ? 'btn-light' : '';
                
                                        return (
                                            <button type="button"
                                                className={`btn ${clazz}`}
                                                key={btn.key}
                                                onClick={() => {
                                                    onChangeApp(btn.key, btn.modalName)
                                                    this.cantClose = true;
                                                }}
                                            >
                                                {btn.placeHolder}
                                            </button>
                                        )
                                    })
                                }
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
                                        onRenameEmp(e, name || makeInputDefault('name'), salary > 0 ? salary : makeInputDefault('salary') || makeInputDefault('salary'));
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
                                    if(!nameComopany) return

                                    this.canClose = true;
                                    this.cantClose = false;

                                    onRenameNameCompany(nameComopany)
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
                    )}
                </div>
            </div>
        )
    }
}

export default Modal;