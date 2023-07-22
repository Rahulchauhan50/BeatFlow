import React from 'react';

const Notfound = ({term}) => (
  <div className="w-full flex justify-center items-center">
    <h1 className="font-bold text-2xl text-white">{`No related ${term} found`}</h1>
  </div>
);

export default Notfound;