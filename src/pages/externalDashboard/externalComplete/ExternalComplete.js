import React, { Component } from 'react'
import ExternalInspectionsHeader from '../externalInspection-header/ExternalInspectionHeader';
import ExternalPropertyCard from '../externalPropertyCard/ExternalPropertyCard';


// import SearchAbleSelect from '../../commonComponents/formComponents/searchableSelect/SearchableSelect';


class ExternalCompletedJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: "grid",
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState(() => ({ view: nextProps.className }))
        // console.log(nextProps)
    }

    changeListView = (view) => {
        if (view === "list") {
            this.setState(() => ({ view: view }))
        } else if (view === "grid") {
            this.setState(() => ({ view: view }))
        }
    }

    render() {
        return (
            <div className="external-wrapper">
                <ExternalInspectionsHeader className={this.state.view} changeListView={this.changeListView} />
                <div className="inspections">

                    <div className={`property-wrapper property-${this.state.view}`}>
                        <ul className="clearfix">
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                            <li>
                                <ExternalPropertyCard type={2} />
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
export default ExternalCompletedJobs;