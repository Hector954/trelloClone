import "./Column.scss";
import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { mapOrder } from "../../utils/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import ConfirmModal from "../Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM, MODAL_ACTION_CLOSE } from "../../utils/constant";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

const Column = (props) => {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  const [isShowModal, setIsShowModal] = useState(false);
  const [titleColumn, setTitleColumn] = useState("");
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
  const [valueTextArea, setValueTextArea] = useState("");

  useEffect(() => {
    if (isShowAddNewCard === true && textAreaRef.current && textAreaRef) {
      textAreaRef.current.focus();
    }
  }, [isShowAddNewCard]);

  useEffect(() => {
    if (column && column.title) {
      setTitleColumn(column.title);
    }
  }, [column]);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const onModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
    }
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };

      onUpdateColumn(newColumn);
    }

    toggleModal();
  };

  const selectText = (e) => {
    setIsFirstClick(false);

    if (isFirstClick) {
      e.target.select();
    } else {
      inputRef.current.setSelectionRange(
        titleColumn.length,
        titleColumn.length
      );
    }
    // e.target.focus();
  };

  const handleClickOutside = (e) => {
    setIsFirstClick(true);

    const newColumn = {
      ...column,
      title: titleColumn,
      _destroy: false,
    };

    onUpdateColumn(newColumn);
  };

  const handleAddnewCard = () => {
    if (!valueTextArea) {
      textAreaRef.current.focus();
      return;
    }

    const newCard = {
      id: uuidv4(),
      boardId: column.boardId,
      columnId: column.id,
      title: valueTextArea,
      image: "",
    };
    let newColumns = { ...column };
    newColumns.cards = [...newColumns.cards, newCard];
    newColumns.cardOrder = newColumns.cards.map((card) => card.id);

    onUpdateColumn(newColumns);
    setValueTextArea("");
    setIsShowAddNewCard(false);
  };

  return (
    <>
      <div className="column">
        <header className="column-drag-handle">
          <div className="column-title">
            <Form.Control
              type="text"
              size={"sm"}
              value={titleColumn}
              className="custom-input-column"
              onClick={selectText}
              onChange={(e) => setTitleColumn(e.target.value)}
              spellCheck={false}
              onBlur={handleClickOutside}
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
          <div className="column-dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Add card</Dropdown.Item>
                <Dropdown.Item onClick={toggleModal}>
                  Remove this column ...
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className="card-list">
          <Container
            groupName="col"
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "column-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => {
                return (
                  <Draggable key={card.id}>
                    <Card card={card} />
                  </Draggable>
                );
              })}
          </Container>

          {isShowAddNewCard && (
            <div className="add-new-card">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Enter a title for tgis card..."
                ref={textAreaRef}
                value={valueTextArea}
                onChange={(e) => setValueTextArea(e.target.value)}
              />
              <div className="group-btn">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddnewCard()}
                >
                  Add Card
                </button>
                <i
                  className="fa fa-times icon"
                  onClick={() => setIsShowAddNewCard(false)}
                ></i>
              </div>
            </div>
          )}
        </div>
        {!isShowAddNewCard && (
          <footer>
            <div
              className="footer-action"
              onClick={() => setIsShowAddNewCard(true)}
            >
              <i className="fa fa-plus icon"></i> Add another
            </div>
          </footer>
        )}
      </div>
      <ConfirmModal
        show={isShowModal}
        title={"Remove a column"}
        content={`Are you sure to remove this column: <b> ${column.title} </b>?`}
        onAction={onModalAction}
      ></ConfirmModal>
    </>
  );
};

export default Column;
