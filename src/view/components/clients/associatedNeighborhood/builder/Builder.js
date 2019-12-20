
import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import EditJob from '../../../../commonComponents/popup/EditJob';

class Builder extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: 0,
            cards: [1],
            editProperty: false
        };
    }

    toggleEditJob = () => {
        this.setState({
            editProperty: !this.state.editProperty
        });
    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }
    render() {
        const { cards, collapse } = this.state;
        return (
            <div className="builder-wrapper">
                {cards.map(index => {
                    return (
                        <div className="builder-accordion panel" key={index} >
                            <div className="panel-header" >
                                <ul className="list-unstyled m-0 d-flex align-items-center justify-content-between w-100">
                                    <li className="clearfix">
                                        <i onClick={this.toggle} data-event={index} className="material-icons float-left cursor-pointer">{collapse === index ? "arrow_drop_up" : "arrow_drop_down" }</i>
                                        <h2 className="float-left pt-1">HM-2-1-0</h2>
                                    </li>
                                    <li>
                                        <small>1559 E Main St, Richmond, VA 23219</small>
                                    </li>
                                    <li>
                                        <span className="cursor-pointer" onClick={this.toggleEditJob}>
                                            <i className="icon-edit"></i>
                                            <span className="edit-text">Edit</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <Collapse isOpen={collapse === index}>
                                <div className="panel-body">
                                    <table>
                                        <thead>
                                            <th>Contact Name</th>
                                            <th>Position </th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Freda Mclaughlin</td>
                                                <td>Builder</td>
                                                <td>(804) 243-7654</td>
                                                <td>freda@mainstreetrealiyt.com</td>
                                            </tr>
                                            <tr>
                                                <td>Freda Mclaughlin</td>
                                                <td>Builder</td>
                                                <td>(804) 243-7654</td>
                                                <td>freda@mainstreetrealiyt.com</td>
                                            </tr>
                                            <tr>
                                                <td>Freda Mclaughlin</td>
                                                <td>Builder</td>
                                                <td>(804) 243-7654</td>
                                                <td>freda@mainstreetrealiyt.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapse>
                        </div>
                    )
                })}
                {/* Edit Job  popup*/}
                <EditJob toggleEditJob={this.toggleEditJob} editProperty={this.state.editProperty} />
            </div>
        );
    }
}

export default Builder;