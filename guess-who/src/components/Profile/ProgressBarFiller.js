import React from "react";

const Filler = props => {
  return (
    <div className="filler" style={{ width: `${props.percentage * 10}%` }} />
  );
};

export default Filler;
