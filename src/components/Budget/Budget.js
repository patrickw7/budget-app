import React from "react";

import './Budget.scss'

const Budget = React.forwardRef((props, budgetRef) => {
  return (
    <div>
      <h2 className="budgetText">
       My budget: <span ref={budgetRef}>{props.sum}$</span>
      </h2>
    </div>
  );
});

export default Budget;
