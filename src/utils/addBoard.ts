import { db, auth } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Column,Board } from "@/types";
export const AddBoardToFirestore = async (
    boardName: string,
    columnNames: string[],
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>,
    SetIsMoving: React.Dispatch<React.SetStateAction<boolean>>,
    isMoving: boolean
    ) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
        console.error("Error: User is not logged in.");
        return;
    }
    try {
        // Create a new board document with a generated ID
        const newBoardDoc = await addDoc(collection(db, "boards"), {
        name: boardName,
        userId: userId,
        });

        // Create columns subcollection with the provided column names
        const columnsCollection = collection(newBoardDoc, "columns");

        const columns: Column[] = [];

        for (const columnName of columnNames) {
        if (columnName !== "") {
            const newColumnDoc = await addDoc(columnsCollection, {
            name: columnName,
            boardId: newBoardDoc.id,
            });

            columns.push({
            id: newColumnDoc.id,
            name: columnName,
            boardId: newBoardDoc.id,
            tasks: [],
            });
        }
        }

        setBoards((prevBoards) => [
        ...prevBoards,
        { id: newBoardDoc.id, name: boardName, userId: userId, columns },
        ]);

        // Return the new board's ID
        return newBoardDoc.id;
    } catch (error) {
        console.error("Error adding board to Firestore:", error);
    }
};