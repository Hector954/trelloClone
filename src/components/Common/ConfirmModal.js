import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";
import { MODAL_ACTION_CONFIRM, MODAL_ACTION_CLOSE } from "../../utils/constant";

const ConfirmModal = (props) => {
  const { show, title, content, onAction } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={() => onAction(MODAL_ACTION_CLOSE)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(content)}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onAction(MODAL_ACTION_CLOSE)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => onAction(MODAL_ACTION_CONFIRM)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ConfirmModal;
