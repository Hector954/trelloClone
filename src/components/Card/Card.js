import React from "react";
import "./Card.scss";

const Card = (props) => {
  const { card } = props;
  return (
    <div className="card-item">
      {card.Image && (
        <img
          className="card-cover"
          src={card.Image}
          alt="card"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
    </div>
  );
};

export default Card;
