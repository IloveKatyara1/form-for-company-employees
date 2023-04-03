import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: this.props.premium,
            like: false,
        }
    }
 
    onIncrease = () => {
        this.setState(({increase}) => ({
            increase: !increase
        }))
    }

    onLike = () => {
        this.setState(({like}) => ({
            like: !like
        }))
    }

    render() {
        const {name, earnings} = this.props;

        let needPremium = 'list-group-item d-flex justify-content-between';

        if(this.state.increase) {
            needPremium += ' increase'
        }
        if(this.state.like) {
            needPremium += ' like'
        }
        
        return (
            <li className={needPremium}>
                <span className="list-group-item-label"
                onClick={this.onLike}>{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={earnings + '$'}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={this.onIncrease}>
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            className="btn-trash btn-sm ">
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"
                    onClick={this.onLike}></i>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;