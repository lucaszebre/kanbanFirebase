import { db } from '@/config/firebase';
import { collection, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';


export const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
    try {
        // Delete all subtasks of the task
        const subTasksQuery = query(
            collection(db, 'boards', boardId, 'columns', columnId, 'tasks', taskId, 'subTasks')
        );
        const subTasksQuerySnapshot = await getDocs(subTasksQuery);
        subTasksQuerySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Delete the task itself
        await deleteDoc(doc(db, 'boards', boardId, 'columns', columnId, 'tasks', taskId));
    } catch (error) {
        console.error('Error while deleting the task and its subtasks:', error);
    }
};