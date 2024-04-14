import React from "react";

import "./Button.css";

const Button = (props) => {
    return (
        <button className="btn" type={props.type || "btn"} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
