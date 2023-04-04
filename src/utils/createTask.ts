import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';

export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
    taskId: string;
}

export async function createTask(boardId: string | null, columnId: string, title: string, subTasks: string[], description?: string,) {
    try {
        if (!boardId) {
            throw new Error('Board ID is not provided');
        }
        let task={}
        if(description){
            task = {
                title,
                description,
                columnId,
                // Add any other fields you need for the task here
            };
        }else{
                task={
                title,
                description:'',
                columnId
            }
        }
      
        if(boardId && columnId){
            const tasksCollectionRef = collection(firestore, 'boards', boardId, 'columns', columnId, 'tasks');
        const newTaskDoc = await addDoc(tasksCollectionRef, task);

        
        
        // Create subtasks
        for (const subTask of subTasks) {
            const subTaskData = {
                title: subTask,
                isCompleted:false,
                taskId: newTaskDoc.id,
            };

            const subTasksCollectionRef = collection(firestore, 'boards', boardId, 'columns', columnId, 'tasks', newTaskDoc.id, 'subTasks');
            await addDoc(subTasksCollectionRef, subTaskData);
        }
    

        console.log('Task created successfully:', newTaskDoc.id);
    }
    } catch (error) {
        console.error('Error creating task:', error);
    }
}
