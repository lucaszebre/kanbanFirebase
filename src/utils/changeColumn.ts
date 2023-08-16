// import { getDoc,getDocs } from "firebase/firestore";
// import { db } from '@/config/firebase'; // Import Firestore instance
// import { doc, setDoc, deleteDoc, updateDoc, collection, addDoc } from "firebase/firestore";
// import { firestore } from "@/config/firebase";

// export const changeColumn = async (newColumnId: string,columnId:string,BoardId:string,TaskId:string) => {
//     if (newColumnId !== columnId) {
//         try {
//             // Reference to the current task
//             const currentTaskRef = doc(db, "boards", BoardId, "columns", columnId, "tasks", TaskId);
    
//             // Retrieve the task data
//             const taskSnapshot = await getDoc(currentTaskRef);
//             const taskData = taskSnapshot.data();
    
//             if (!taskData) {
//             throw new Error("Task not found");
//             }
    
//             // Reference to the new task location
//             const newTaskRef = doc(db, "boards", BoardId, "columns", newColumnId, "tasks", TaskId);
    
//             // Add the task to the new column
//             await setDoc(newTaskRef, taskData);
    
//             // Move subtasks to the new task location
//             const subTasksCollection = collection(currentTaskRef, "subTasks");
//             const subTasksSnapshot = await getDocs(subTasksCollection);
    
//             for (const subTaskDoc of subTasksSnapshot.docs) {
//             const subTaskData = subTaskDoc.data();
//             const newSubTaskRef = doc(newTaskRef, "subTasks", subTaskDoc.id);
//             await setDoc(newSubTaskRef, subTaskData);
//             await deleteDoc(doc(subTasksCollection, subTaskDoc.id));
//             }
    
//             // Remove the task from the old column
//             await deleteDoc(currentTaskRef);
    
//             console.log("Task column updated successfully");
//         } catch (error) {
//             console.error("Error updating task column:", error);
//         }
//         }
//     };



    