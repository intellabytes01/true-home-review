
import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import Builder from '../builder/Builder';

class Address extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: 0, cards: [1] };
    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }
    render() {
        const { cards, collapse } = this.state;
        return (
            <div className="addresses">
                {cards.map(index => {
                    return (
                        <div className="addresses-accordion" key={index}>
                            <div className="addresses-header" onClick={this.toggle} data-event={index}>
                                <i className="material-icons float-left cursor-pointer" onClick={this.toggle} data-event={index}>{collapse === index ? "arrow_drop_up" : "arrow_drop_down" }</i>Randolph
                            </div>
                            <Collapse isOpen={collapse === index}>
                                <div>
                                    <Builder />
                                </div>
                            </Collapse>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Address;