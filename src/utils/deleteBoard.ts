import { Data } from "../types";

type Column = {
    id: string;
    name: string;
    tasks: [];
    };
  
    type Board = {
      id: string;
    name: string;
    columns: Column[];
    };
  
  type BoardData = {
    boards: Board[];
    };
  
  export    function deleteBoard(id: string, data: Data): Data {
        const index = data.boards.findIndex((board) => board.id === id);
        if (index !== -1) {
        data.boards.splice(index, 1);
        }
    return data;
    }