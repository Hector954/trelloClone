import React from "react";
import Button from "react-bootstrap/esm/Button";
import "./BoardBar.scss";

const BoardBar = (props) => {
  const { image, user, onClose } = props;
  return (
    <>
      <div className="board-bar">
        <img src={image} alt="Imagen de usuario" className="img-user"/>
        <div className="user-name">{user.name}</div>
        {Object.keys(user).length > 0 && (
          <Button onClick={(e) => onClose(e)} variant="dark"> Sign Out</Button>
        )}
      </div>
    </>
  );
};

export default BoardBar;
