// import { updateDoc, doc,getDoc,deleteDoc,setDoc,collection,getDocs } from 'firebase/firestore'; // Import updateDoc and doc
// import { db } from '@/config/firebase'; // Import Firestore instance
// import { Subtask } from '@/types';

// export const toggleSubtaskCompletion = async (currentBoardId:string,columnId:string,taskId: string, subtaskId?: string) => {
//     const columnsCollection = collection(db, "boards", currentBoardId, "columns");
//     const columnDocRef = doc(columnsCollection, columnId);
//     const columnDocSnapshot = await getDoc(columnDocRef);
    
//         if (!columnDocSnapshot.exists()) {
//         console.error("Column not found!");
//         return;
//         }
    
//         const tasksCollection = collection(columnDocRef, "tasks");
//         const taskDocRef = doc(tasksCollection, taskId);
//         const taskDocSnapshot = await getDoc(taskDocRef);
    
//         if (!taskDocSnapshot.exists()) {
//         console.error("Task not found!");
//         return;
//         }
    
//         const subTasksCollection = collection(taskDocRef, "subTasks");
//         const subtaskDocRef = doc(subTasksCollection, subtaskId);
//         const subtaskSnapshot = await getDoc(subtaskDocRef);
    
//         if (!subtaskSnapshot.exists()) {
//         console.error("Subtask not found!");
//         return;
//         }
    
//         const subtaskData = subtaskSnapshot.data() as Subtask;
//         const updatedIsCompleted = !subtaskData.isCompleted;
    
//         await updateDoc(subtaskDocRef, { isCompleted: updatedIsCompleted });

//     };