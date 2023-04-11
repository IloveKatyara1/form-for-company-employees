import { Component } from 'react';

import './modal.css'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: null,
                salary: null
            }
        }
    }

    // const dataBtns = [
    //     {placeHolder: 'view company', key: 'viewCompany'},
    //     {placeHolder: 'or', isP: true},
    //     {placeHolder: 'create company', key: 'createCompany'},
    // ]

    // const btns = dataBtns.map((btn, i) => {
    //     if(btn.isP) return <p key={i}>{btn.placeHolder}</p>

    //     const clazz = active === btn.key ? 'btn-light' : '';

    //     return (
    //         <button type="button"
    //             className={`btn ${clazz}`}
    //             key={btn.key}>
    //             {btn.placeHolder}
    //         </button>
    //     )
    // })

//     <h4>
//     виберіть дію
// </h4>
// <hr />
// <div className="btn-group">
//     {btns}
// </div>

    onCloseModal = () => {
        this.props.onModal('none')

        this.setState(({inputs}) => ({
            inputs: {
                name: null,
                salare: null
            }
        }))
    }

    render() {
        const {modalName, onRenameEmp} = this.props

        if(modalName === 'rename') {                   
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

            const {name, salary} = this.state.inputs

            return (
                <div className="background" onClick={
                        (e) => {if(e.target.classList[0] === 'background') this.onCloseModal()}
                    }
                >
                    <div className="modal">
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
                                    onRenameEmp(e, name || makeInputDefault('name'), salary || makeInputDefault('salary'));
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
                    </div>
                </div>
            )
        } else {
            return <></>
        }
    }
}

export default Modal;