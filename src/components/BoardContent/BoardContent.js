import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import "./BoardContent.scss";
import { initData } from "../../actions/initData";
import _ from "lodash";
import { mapOrder } from "../../utils/sorts";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === "board-1");
    if (boardInitData) {
      setBoard(boardInitData);

      setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, "id"));
    }
  }, []);

  if (_.isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  return (
    <>
      <div className="board-columns">
        {columns &&
          columns.length > 0 &&
          columns.map((column, index) => {
            return <Column key={column.id} column={column} />;
          })}
      </div>
    </>
  );
};

export default BoardContent;
