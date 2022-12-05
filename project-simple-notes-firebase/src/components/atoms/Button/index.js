import React from "react";

const Button = ({title, onClick, loading}) => {
    if(loading) {
        return <button className="btn-register disable" disabled>Loading...</button>
    }
    return (
        <button className="btn-register" onClick={onClick}>{title}</button>
    )
}

export default Button;