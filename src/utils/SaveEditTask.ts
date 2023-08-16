// import { doc,  deleteDoc, updateDoc, collection, addDoc } from "firebase/firestore";
// import { firestore } from "@/config/firebase";
// import { changeColumn } from "@/utils/changeColumn";
// type newSubtask= {
//     id?: string;
//     title: string;
//     isCompleted: boolean;
//     taskId: any;
//     add?: boolean;
// }

// export const handleSave = async (taskName:string,
//     InitialTitle:string,
//     taskDescription:string,
//     InitialDescription:string,
//     subTasksToAdd:newSubtask[],
//     subTasksToRename:newSubtask[],
//     subTasksToDelete:string[],
//     currentBoardId:string,
//     selectedColumnId:string,
//     columnId:string,
//     currentTaskId:string) =>{
//     console.log('currentBoardId:', currentBoardId);
//     console.log('columnId:', columnId);
//     console.log('currentTaskId:', currentTaskId);
//     if (taskName.trim() === "") {
//         alert("Task name cannot be empty");
//         return;
//     }
    

//     if (!currentBoardId || !columnId || !currentTaskId) {
//         console.error("Error: currentBoardId, columnId, or currentTaskId is empty or undefined.");
//         return;
//     }
//    // Check if the task name or description has changed
//     const hasTaskNameChanged = taskName !== InitialTitle;
//     const hasTaskDescriptionChanged = taskDescription !== InitialDescription;

//     // If any value has changed, update the task in the database
//     if (hasTaskNameChanged || hasTaskDescriptionChanged) {
//         if(firestore && currentBoardId && columnId && currentTaskId){
//             const taskDocRef = doc(firestore, "boards", currentBoardId, "columns", columnId, "tasks", currentTaskId);

        

//         if (hasTaskNameChanged) {
//         await updateDoc(taskDocRef, { title: taskName });
//         }

//         if (hasTaskDescriptionChanged) {
//         await updateDoc(taskDocRef, { description: taskDescription });
//         }
//     }
// }

//     // Handle subtasks
//     const subTasksCollectionRef = collection(firestore, "boards", currentBoardId, "columns", columnId, "tasks", currentTaskId, "subTasks");

//  // Add new subtasks
// if (subTasksToAdd.length > 0) {
//     for (const subTask of subTasksToAdd) {
//         const { id, add, ...subTaskWithoutId } = subTask;
//         if(subTask && subTasksCollectionRef){
//         try {
//             await addDoc(subTasksCollectionRef, subTaskWithoutId);
//         } catch (error) {
//             console.error("Error adding subtask:", error);
//         }
//     }
//     }
// }
//     // Rename subtasks
//  // Rename subtasks
// if (subTasksToRename.length > 0) {
//     for (const subTask of subTasksToRename) {
//         if(subTask.id && subTasksCollectionRef){
//             const subTaskRef = doc(subTasksCollectionRef, subTask.id);
//             await updateDoc(subTaskRef, { title: subTask.title });
//         }
    
//     }
// }
//     // Delete subtasks
//     if(subTasksToDelete.length>0){
//     for (const subTaskId of subTasksToDelete) {
//         if(subTaskId && subTasksCollectionRef){
//             const subTaskRef = doc(subTasksCollectionRef, subTaskId);
//             await deleteDoc(subTaskRef);
//             }
//         }
//     }

//     // change the column if necessary

    
//     if (selectedColumnId && selectedColumnId !== columnId) {
//         await changeColumn(selectedColumnId,columnId,currentBoardId,currentTaskId);
//         }
    


        
//     };