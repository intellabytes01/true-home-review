import React, { Component } from 'react';
import ReactLoading from 'react-loading';

export const Loader = ({colSpan})=>{

    return <tr > 
                <td colSpan={`${colSpan}`} > 
                    <div className="driver-loder"> <ReactLoading color="blue" type="spokes" /> </div> 
                </td> 
            </tr>
}