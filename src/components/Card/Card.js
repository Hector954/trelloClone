import React from "react";
import "./Card.scss";

const Card = (props) => {
  const { card } = props;
  return (
    <li className="card-item">
      {card.Image && <img className="card-cover" src={card.Image} alt="card" />}
      {card.title}
    </li>
  );
};

export default Card;
