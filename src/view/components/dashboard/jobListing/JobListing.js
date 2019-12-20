import React from 'react';
import JobCard from './jobCard/JobCard';
import ButtonPrimary from '../../../commonComponents/buttons/ButtonPrimary';
// import dummyImage from '../../../../assets/images/no-image.png'

const JobListing = ({ arr, btnText, jobHeading, handleRedirect }) =>{

   return  <div className="job-listing p-4">
            <h2>{jobHeading}</h2>
            {arr.map((item, index )=> {
                return <JobCard key={index} {...item} />
            })}
            {arr.length === 0 ? "No data found" : null}
        <div className="job-list-btn-wrapper">
            <ButtonPrimary btntext={btnText} onClick={handleRedirect} className={'btn-block button-primary'} />
        </div>
    </div>
};

export default JobListing;