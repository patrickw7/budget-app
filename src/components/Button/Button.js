import React from "react";

import './Button.scss'

const Button = ( { handleClick,children } ) => {
    return <button onClick={handleClick} className="confirmBtn">{children}</button>
};

export default Button;