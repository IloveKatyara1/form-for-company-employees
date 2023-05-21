import './employees-add-form.css';
import { useState } from 'react';

const EmployeesAddForm = (props) => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');

    return (
        <div className="app-add-form">
            <h3>Add a new employee.</h3>
            <form className="add-form d-flex">
                <input
                    type="text"
                    className="form-control new-post-label"
                    placeholder="What is their name?"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    className="form-control new-post-label"
                    placeholder="Salary in $?"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-outline-light"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!name.trim() || !+salary.trim() || salary < 0) return;

                        props.addNewItem(e, name, salary);

                        setName('');
                        setSalary('');
                    }}>
                    Add
                </button>
            </form>
        </div>
    );
};

export default EmployeesAddForm;
