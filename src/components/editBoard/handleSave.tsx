import { doc, setDoc, deleteDoc, updateDoc,collection,addDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { getDoc } from "firebase/firestore";
import { Column,ColumnData } from "@/types";


export const handleSaveChanges = async (columnsToDelete:string[],columnsToRename:ColumnData[],columnstoAdd:Column[],currentBoardId:string,Header:string,headerTitle:string) => {
        
    // Delete columns
    if (columnsToDelete.length > 0) {
        for (const columnId of columnsToDelete) {
            const columnRef = doc(firestore, "boards", currentBoardId, "columns", columnId);
            console.log('columnRef:', columnRef);
            console.log('columnId:', columnId);
        try {
            await deleteDoc(columnRef);
            console.log(`Column with ID ${columnId} deleted successfully`);
        } catch (error) {
            console.log(`Error deleting column with ID ${columnId}:`, error);
        }
        }
    }

if (columnsToRename.length > 0) {
    // Update columns
    for (const column of columnsToRename) {
        const columnRef = doc(firestore, "boards", currentBoardId, "columns", column.id);
        const columnSnapshot = await getDoc(columnRef);
        
      // Check if the column document exists before updating it
        if (columnSnapshot.exists()) {
        await updateDoc(columnRef, { name: column.name });

        }
    }
    }

if(columnstoAdd.length>0){
    // Add new columns
   // Add new columns
for (const column of columnstoAdd) {
    const columnsCollectionRef = collection(firestore, "boards", currentBoardId, "columns");
    // Remove the 'add' property before adding the column to Firestore
    const { add, id,...columnWithoutAdd } = column;
    const newColumnDoc = await addDoc(columnsCollectionRef, columnWithoutAdd);

}
}

if (Header !== headerTitle) {
    
    const boardRef = doc(firestore, "boards", currentBoardId);
    const boardSnapshot = await getDoc(boardRef);
    if (boardSnapshot.exists()) {
        await updateDoc(boardRef, { name: Header });
        }
}
        
};