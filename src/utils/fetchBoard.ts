import { doc, getDoc } from "firebase/firestore";
import { Board } from "@/components/editBoard/editBoard";
import { fetchColumnsFromFirestore } from "./fetchColumns";
import { db } from "@/config/firebase";

export const fetchBoardFromFirestore = async (boardId: string) =>{
    const boardDocRef = doc(db, "boards", boardId);
    const boardSnapshot = await getDoc(boardDocRef);

    if (!boardSnapshot.exists()) {
        throw new Error("Board not found!");
    }

    const boardData = boardSnapshot.data() as Omit<Board, "id">;
    const columns = await fetchColumnsFromFirestore(boardId);

    const board: Board = {
        id: boardSnapshot.id,
        ...boardData,
        columns: columns,
    };

    return board;
};
