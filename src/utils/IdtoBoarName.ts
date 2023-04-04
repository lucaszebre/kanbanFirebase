type Board = {
    id: string;
    name: string;
};
export function IdtoBoarName (id: string|null , boards: Board[]) {
    let boardName = '';
    boards.forEach((board: any) => {
        if (board.id === id) {
            boardName = board.name;
        }
    });
    return boardName;
}
    