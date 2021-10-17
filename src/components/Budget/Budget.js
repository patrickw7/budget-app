import React from "react";

const Budget = React.forwardRef((props, budgetRef) => {
  return (
    <div>
      <h2>
        Mój budżet to: <span ref={budgetRef}>{props.sum}$</span>
      </h2>
    </div>
  );
});

export default Budget;
