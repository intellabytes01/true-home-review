import React from 'react';
import { Link } from 'react-router-dom';
import dummyImage from '../../../../assets/images/no-image.png';

const PropertyCard = ({userType, type, sendEmailReminder, job }) => (

    <div className="property-card clearfix">
        <Link to='/main/inspections/property-detail' onClick={()=>localStorage.setItem("in_re_po_ID",job.report.reportID)} >
            <div className="property-picture">
                <img src={(job.report.photo)?  job.report.photo.split(',')[0]    : dummyImage} className="img-fluid" alt="" />
            </div>
        </Link>
        <div className="proderty-details">
           
                <div className="property-head">
                <Link to='/main/inspections/property-detail' onClick={()=>localStorage.setItem("in_re_po_ID",job.report.reportID)} >
                        <h2 className="m-0">{job.report.lotID}</h2>
                </Link>
                    <p>{job.address.street+" "+job.address.block+" "+job.address.section+" "+job.address.city+" "+job.address.city+" "+job.address.state+" "+job.address.county+" "+job.address.zip}</p>
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
                    <span className="title-description float-left">{job.inspector.firstName+" "+job.inspector.lastName}</span>
                </div>
                <div className="clearfix property-listing">
                    {(type === 1  ) ?
                        (<> <span className="title" >  Score</span>
                            <span className="title-description float-left">{job.report.score}%</span> </>)
                        : (<>
                        {+userType === 1 ?
                        
                            <div onClick={() => sendEmailReminder && sendEmailReminder({reportID:job.report.reportID,clientID:job.report.clientID})} >
                                <span className="title cursor-pointer message-icon" ><i className="icon-Email-reminder" style={{ fontSize: '20px' }}></i></span>
                                <span className="title-description cursor-pointer float-left hide-on-list">Send Reminder</span>

                            </div>: null
                    }
                        </>
                        )
                    }
                </div>
            </div>
        </div>
       
    </div>

);

export default PropertyCard;