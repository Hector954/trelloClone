import React, { useState, useEffect, useRef } from "react";
import Column from "../Column/Column";
import "./BoardContent.scss";
import { initData } from "../../actions/initData";
import _ from "lodash";
import { mapOrder } from "../../utils/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utils/dragDrop";
import { v4 as uuidv4 } from "uuid";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const [isShowList, setIsShowList] = useState(false);
  const inputRef = useRef(null);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    if (isShowList === true && inputRef.current && inputRef) {
      inputRef.current.focus();
    }
  }, [isShowList]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === "board-1");
    if (boardInitData) {
      setBoard(boardInitData);

      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, "id")
      );
    }
  }, []);

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((item) => item.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);

      setColumns(newColumns);
    }
  };

  if (_.isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  const handleAddList = () => {
    if (!valueInput) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
        return;
      }
    }
    const _columns = _.cloneDeep(columns);
    _columns.push({
      id: uuidv4(),
      boardId: board.id,
      title: valueInput,
      cards: [],
    });

    setColumns(_columns);
    setValueInput("");
    inputRef.current.focus();
  };

  const onUpdateColumn = (newColumn) => {
    const columnIdUpdate = newColumn.id;
    let ncols = [...columns];
    let index = ncols.findIndex((item) => item.id === columnIdUpdate);
    if (newColumn._destroy) {
      ncols.splice(index, 1);
    } else {
      ncols[index] = newColumn;
    }

    setColumns(ncols);
  };

  return (
    <>
      <div className="board-columns">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          getChildPayload={(index) => columns[index]}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "column-drop-preview",
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              return (
                <Draggable key={column.id}>
                  <Column
                    column={column}
                    onCardDrop={onCardDrop}
                    onUpdateColumn={onUpdateColumn}
                  />
                </Draggable>
              );
            })}
        </Container>

        {isShowList === false ? (
          <div className="add-new-column" onClick={() => setIsShowList(true)}>
            <i className="fa fa-plus"></i>
            Add new column
          </div>
        ) : (
          <div className="content-add-column">
            <input
              type="text"
              className="form-control"
              ref={inputRef}
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Enter column title..."
            />
            <div className="group-btn">
              <button
                className="btn btn-success"
                onClick={() => handleAddList()}
              >
                Add list
              </button>
              <i
                className="fa fa-times icon"
                onClick={() => setIsShowList(false)}
              ></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BoardContent;
