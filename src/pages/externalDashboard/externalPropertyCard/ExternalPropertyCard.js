import React from 'react';
import { Link } from 'react-router-dom';
import dummyImage from '../../../assets/images/no-image.png';

const ExternalPropertyCard = ({job, type, toggleEmailReminder }) => (

    <div className="property-card clearfix">
        <Link to='/external-dashboard/property-detail' onClick={() => localStorage.setItem("ex_in_re_po_ID", job.report.reportID)} >
            <div className="property-picture">
                <img src={(job.report.photo) ? job.report.photo : dummyImage} className="img-fluid" alt="" />
            </div>
            {/* </Link> */}
            <div className="proderty-details">

                <div className="property-head">
                    <h2 className="m-0">{job.report.lotID}</h2>
                    <p title={job.address.street + " " + job.address.block + " " + job.address.section + " " + job.address.city + " " + job.address.city + " " + job.address.state + " " + job.address.county + " " + job.address.zip}>{job.address.street + " " + job.address.block + " " + job.address.section + " " + job.address.city + " " + job.address.city + " " + job.address.state + " " + job.address.county + " " + job.address.zip}</p>
                </div>

                <div className="property-content">
                    <div className="clearfix property-listing">
                        <span className="title">Review Date</span>
                        <span className="title-description float-left">{job.report.scheduledTime}</span>
                    </div>
                    <div className="clearfix property-listing">
                        <span className="title">PO Number</span>
                        <span className="title-description float-left">{job.report.poID}</span>
                    </div>
                    <div className="clearfix property-listing mb-2">
                        <span className="title">Neighborhood</span>
                        <span className="title-description float-left">{job.address.neighborhood}</span>
                    </div>

                    <div className="clearfix property-listing">
                        <span className="title">Inspector</span>
                        <span className="title-description float-left">{job.inspector.firstName + " " + job.inspector.lastName}</span>
                    </div>
                    <div className="clearfix property-listing">
                        {(type === 2) ?
                            (<> <span className="title" >  Score</span>
                                <span className="title-description float-left"> {job.report.score} %</span> </>)
                            : (<>
                                <span className="title cursor-pointer message-icon" onClick={() => toggleEmailReminder && toggleEmailReminder()}><i className="icon-Email-reminder" style={{ fontSize: '20px' }}></i></span>
                                <span className="title-description float-left hide-on-list">Send Reminder</span>
                            </>
                            )
                        }
                    </div>
                </div>
            </div>
        </Link>
    </div>

);

export default ExternalPropertyCard;