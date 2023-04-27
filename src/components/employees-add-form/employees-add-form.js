import './employees-add-form.css';
import { Component } from 'react';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
        }
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {name, salary} = this.state;
        const {addNewItem} = this.props;

        return (
            <div className="app-add-form">
                <h3>Add a new employee.</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="What is their name?"
                        name='name'
                        value={name}
                        onChange={this.onChangeValue} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Salary in $?"
                        name='salary'
                        value={salary}
                        onChange={this.onChangeValue} />
    
                    <button type="submit"
                            className="btn btn-outline-light"
                            onClick={(e) => {
                                e.preventDefault();
                                if(!name.trim() || !+salary.trim() || salary < 0) return

                                addNewItem(e, name, salary);
                                this.setState(({name, salary}) => ({
                                    name: '',
                                    salary: ''
                                }))
                            }}>Add</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;