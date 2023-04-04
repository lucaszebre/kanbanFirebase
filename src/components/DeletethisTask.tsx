import styles from '../styles/DeleteThisTask.module.css';
import { Opencontext } from '@/contexts/contextopen';
import { useContext } from 'react';
import { DataContext } from '@/contexts/datacontext';
import { deleteTask } from '@/utils/deleteTask'; // import the function to delete the task in the firestore 
import { useTheme } from '@/contexts/themecontext';


const DeleteThisTask = (props:{TaskTitle:string,TaskId:string,columnId:string}) => {

const { theme, setTheme } = useTheme();

const { DeleteTaskBlock, setDeleteTaskBlock } = useContext(Opencontext); // state to toggle the display of the components 
const {
    currentBoardId,
    SetIsMoving,
    isMoving } = useContext(DataContext);  // state to manage the global data 

    return (
        <div className={styles.DeleteThisTaskWrapper} style={{ display: DeleteTaskBlock ? 'flex' : 'none' }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setDeleteTaskBlock(false);
                }}}>
            <div className={`${styles.DeletethisTaskDiv} ${
                theme === 'light' ? styles.light : styles.dark
                }`}>
                <h1 className={styles.DeleteThisTaskTitle}>Delete this task?</h1>
                <p className={styles.DeleteThisTaskText}>
                    Are you sure you want to delete the ‘<a style={{
                        color:'white'
                    }}>{props.TaskTitle}</a>’ Task? This action will remove this task and this subtasks 
                    and cannot be reversed.
                </p>
                <div className={styles.DeleteThisTaskButtons}>
                    <button
                        onClick={() => {
                            deleteTask(currentBoardId,props.columnId,props.TaskId);
                            setDeleteTaskBlock(false);
                            SetIsMoving(!isMoving)
                        }}
                        className={styles.DeleteButton}
                    >
                        Delete
                    </button>
                    <button className={styles.CancelButton} onClick={() => setDeleteTaskBlock(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteThisTask;
