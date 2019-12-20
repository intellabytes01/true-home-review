import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import Address from './address/Address';

class AssociatedNeigbhorhood extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: 0,
            cards: [1],
            editProperty: false
        };
    }

    componentWillReceiveProps(nextProps){

        let { neighborhoods } = nextProps

        console.log("neighborhoods ",neighborhoods);
        
    }



    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }
    render() {
        const { cards, collapse } = this.state;

        console.log(this.props.neighborhoods);
        

        return (
            <div className="associated-community">
                {cards.map(index => {
                    return (
                        <div style={{ marginBottom: '1rem' }} key={index}>
                            <div className="associated-header" >
                                <i className="material-icons float-left cursor-pointer" onClick={this.toggle} data-event={index}> {collapse === index ? "arrow_drop_up" : "arrow_drop_down" } </i>
                                Associated Neighborhood
                            </div>
                            
                            <Collapse isOpen={collapse === index}>
                                <div>
                                    <Address />
                                </div>
                            </Collapse>
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default AssociatedNeigbhorhood;