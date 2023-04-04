import React from 'react';
import TaskCard from './taskCard';
import styles from '../styles/ListTask.module.css';
import { Task ,ListTaskProps} from '@/types';
import { DataContext } from '@/contexts/datacontext';
import { useContext } from 'react';


const ListTask: React.FC<ListTaskProps> = ({ tasks, title, NbList,columnId }) => {

    const { setOpenedTask} = useContext(DataContext) // state to toggle the display of the  modalTask 

    const RenderTask = (): React.ReactNode[] => {  // functioon to render the all the tasks 
        return tasks?.map((task,index) => (
        <TaskCard
            key={index}
            title={task.title}
            description={task.description}
            id={task.id}
            columnId={columnId}
            subtask={task.subTasks}
            onClick={() => {
                setOpenedTask({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    columnId: columnId,
                    subTask: task.subTasks,
                });
                }}
        />
        ));
    };

    return (
        <div className={styles.ListTaskDiv}>
        <div className={styles.ListTaskRow}>
            <div className={styles.CircleListTask}>.</div>
            <h1 className={styles.ListTaskTitle}>
            {title} ({tasks.length})
            </h1>
        </div>
        <div className={styles.ListTaskCols}>{RenderTask()}</div>
        </div>
    );
    };

export default ListTask;


