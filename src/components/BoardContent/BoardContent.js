import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import "./BoardContent.scss";
import { initData } from "../../actions/initData";
import _ from "lodash";
import { mapOrder } from "../../utils/sorts";
import { Container, Draggable } from "react-smooth-dnd";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

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
    console.log(">>>>>> onColumnDrop", dropResult);
  };

  if (_.isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

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
                  <Column column={column} />
                </Draggable>
              );
            })}
        </Container>
      </div>
    </>
  );
};

export default BoardContent;
