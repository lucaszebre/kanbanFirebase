
type ColumnData = {
    id: string;
    name: string;
    };



export const editBoardSunmit = async (
    boardId: string|null,
    boardName: string,
    columnsToAdd: ColumnData[],
    columnsToRename: ColumnData[],
    columnsToRemove: string[]
    ) => {
        try {
        const response = await fetch("/api/editBoard", {
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
    
        if (!response.ok) {
            throw new Error("Error editing board");
        }
        } catch (error) {
        console.error("Error editing board:", error);
        }
    };
    