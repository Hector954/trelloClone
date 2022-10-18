export const initData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "To Do Example",
          cardOrder: [
            "card-1",
          ],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Card example",
              Image: "https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png",
            },
          ],
        },
      ],
    },
  ],
};
