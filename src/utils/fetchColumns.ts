// import {collection, getDocs, doc} from "firebase/firestore";
// import { db } from "@/config/firebase";
// import { Task, Subtask, Column } from "@/types";

// export const fetchColumnsFromFirestore = async (boardId: string) => {
//     const columnsCollection = collection(db, "boards", boardId, "columns");
//     const columnSnapshot = await getDocs(columnsCollection);
//     const columns: Column[] = [];

// for (const columnDoc of columnSnapshot.docs) {
//     const columnData = columnDoc.data() as Omit<Column, "id">;

//     const tasksCollection = collection(
//         db,
//         "boards",
//         boardId,
//         "columns",
//         columnDoc.id,
//         "tasks"
//     );
//     const tasksSnapshot = await getDocs(tasksCollection);
//     const tasks: Task[] = [];

//     for (const taskDoc of tasksSnapshot.docs) {
//     const taskData = taskDoc.data() as Omit<Task, "id">;

//     const subTasksCollection = collection(
//         db,
//         "boards",
//         boardId,
//         "columns",
//         columnDoc.id,
//         "tasks",
//         taskDoc.id,
//         "subTasks"
//     );
//         const subTasksSnapshot = await getDocs(subTasksCollection);
//         const subTasks: Subtask[] = [];

//     subTasksSnapshot.forEach((subTaskDoc) => {
//         const subTaskData = subTaskDoc.data() as Omit<Subtask, "id">;
//         subTasks.push({
//             id: subTaskDoc.id,
//             ...subTaskData,
//         });
//     });

//     tasks.push({
//         id: taskDoc.id,
//         ...taskData,
//         subTasks: subTasks,
//     });
//     }

//     columns.push({
//       id: columnDoc.id, // Make sure to use the document ID here
//         ...columnData,
//         tasks: tasks,
//     });
// }

//     return columns;
// };
