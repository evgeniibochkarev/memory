import React from "react";

const Card = props => {
    const { imgSource, className, onClick } = props;
    return (
        <div className={`squaregrid-card ${className}`} onClick={onClick}>
            <div className="squaregrid-img" style={{ backgroundImage: `url(${imgSource})` }} ></div>
        </div>
    );
};

export default Card;
