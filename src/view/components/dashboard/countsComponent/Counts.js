import React from 'react';

const Counts = ({count, name}) => (
    <div className="count p-4 text-center mb-2">
        <h2>{count}</h2>
        <p className="text-uppercase">{name}</p>
    </div>
);

export default Counts;