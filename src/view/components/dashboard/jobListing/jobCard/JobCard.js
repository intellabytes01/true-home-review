import React from 'react';
import dummyImage from '../../../../../assets/images/no-image.png'
import moment from 'moment';

const JobCard = (item) => {

    let address = JSON.parse(item.address)
    let inspector = JSON.parse(item.inspector)
    let report = JSON.parse(item.report);


    return (<div className="row mt-4 mb-4" key={report.reportID}>
        <div className="col-md-6">
            <div className="text-center">
                <img src={(report && report.photo) ? report.photo : dummyImage} className="img-fluid" alt="" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="job-info">
                <div className="job-info-head">
                    <h3>{address.street}</h3>
                    <p>{address.state + " " + address.county + " " + address.zip}</p>
                </div>
                <div className="job-info-content">
                    <p><span>Review Date: </span> {report.scheduledTime}</p>
                    <p><span>PO Number: </span>{report.poID}</p>
                    <p><span>Inspector: </span> {inspector.lastName + " " + inspector.firstName} </p>
                </div>
            </div>
        </div>
    </div>)
};

// function formatDate(utc){

//     let momentDate = moment(utc,"x")
// }

export default JobCard;