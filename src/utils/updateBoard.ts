type RequestBody = {
    boardId: string;
    boardName: string;
    columnsToAdd: { id: string; name: string }[];
    columnsToRename: { id: string; name: string }[];
    columnsToRemove: string[];
    };



export const updateBoard = async ({
    boardId,
    boardName,
    columnsToAdd,
    columnsToRename,
    columnsToRemove,
    }:RequestBody) => {
        const res = await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            boardId,
            boardName,
            columnsToAdd,
            columnsToRename,
            columnsToRemove,
        }),
        });
    
        if (!res.ok) {
        throw new Error("Error updating board");
        }
    
        return res.json();
    };
    