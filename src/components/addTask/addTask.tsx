import React, { useState , useEffect } from 'react';
import { Opencontext } from '@/contexts/contextopen';
import { useContext } from 'react';
import styles from '../../styles/AddTask.module.css';
import { createTask } from '@/utils/createTask';
import { DataContext } from '@/contexts/datacontext';
import { ColumnData } from '@/types';
import renderSelect from '../../utils/renderselect';
import SubTask from './SubTask'
import { useTheme } from '@/contexts/themecontext';

const AddTask = () => {
    
    const { AddTask, setAddTask } = useContext(Opencontext)  // the state to tooggle the display of addtask
    const [taskTitle, setTaskTitle] = useState(''); // state for the tasktitle
    const [taskDescription, setTaskDescription] = useState(''); // state for task description 
    const [Select, setSelect] = useState<ColumnData[] | null>([]);  // state to render the select with the column names 
    const [SelectId, setSelectId] = useState('');  // state to know wich column is select 
    const [SubTaskCurrent,setSubTaskCurrent] = useState<string[]>([]) // states to save up the name of all the subtasks i add
    const { setBoards,SetIsMoving,isMoving,columns,currentBoardId } = useContext(DataContext); // state to manage the global data 
    const [SubTasksError, setSubTasksError] = useState<boolean[]>([]);  // state to handle if one the subtask is empty 
    const [taskTitleError, setTaskTitleError] = useState(false);  // state to handle if the task title is empty 
    const { theme, setTheme } = useTheme();

    useEffect(()=>{   // when the current board id change we default allow the select id to the first column id 
        if(columns[0]){
            setSelectId(columns[0].id)
        }
    },[currentBoardId])

        useEffect(() => {  // everytime the data is changing we actualize the ArrayColumn 
            const ArrayColumn = columns.map((column) => {
                return {
                    id: column.id,
                    name: column.name,
                }
            });
            setSelect(ArrayColumn as ColumnData[]);
            setSubTaskCurrent([])
        }, [isMoving]);    

    

        const HandleSubmit = async () => {  // function to handle the final data from the data 
        
            if (taskTitle && taskDescription && SelectId) {
                await createTask(currentBoardId, SelectId, taskTitle,  SubTaskCurrent,taskDescription);
                setTaskTitle('');
                setTaskDescription('');
                setSelectId('');
                
            }
            
            
        
        };



    function addSubTask() {  
        setSubTaskCurrent([...SubTaskCurrent,'']);
    }

    const handleColumnTitleChange = (index: number, updatedTitle: string) => {
        const updatedColumns = [...SubTaskCurrent];
        updatedColumns[index] = updatedTitle
        setSubTaskCurrent(updatedColumns);
        setTaskTitleError(false)
    };

    function handleSubTaskDelete(index: number) {
        const newSubTask = [...SubTaskCurrent];
        newSubTask.splice(index, 1);
        setSubTaskCurrent(newSubTask);
    }


    return (
    <div className={styles.AddTaskWrapper}
        style={{ display: AddTask ? 'flex' : 'none' }}
            onClick={
            (e) => {
                if (e.target === e.currentTarget) {
                    setAddTask(false)
                }
            }
        }
        >
        <div  className={`${styles.AddTaskBlock} ${
                theme === 'light' ? styles.light : styles.dark
                }`}>
            <h2 className={`${styles.AddTaskTitle} ${
                theme === 'light' ? styles.light : styles.dark
                }`}>Add Task</h2>
                <form className={styles.AddTaskForm} 
                onSubmit={async(e)=>{
                    e.preventDefault();
                    if(!SubTaskCurrent || !taskTitle){
                        const newSubTaskErrors = SubTaskCurrent.map(
                            (subTask) => subTask.trim() === ''
                        );
                        setSubTasksError(newSubTaskErrors)
                        if(taskTitle.trim()===""){
                            setTaskTitleError(true);
                        }else if(newSubTaskErrors.some(error => error)){                            
                            return;
                        }
                    }else{
                        await HandleSubmit();
                        SetIsMoving(!isMoving)
                        setAddTask(false)
                    }
                    
                }}
                >
                    <label className={`${styles.AddTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
                }`} htmlFor="taskTitle">Task Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) =>{ 
                            setTaskTitle(e.target.value)
                            setTaskTitleError(false)
                        }}
                        className={`${styles.AddTaskInput} ${
                            theme === 'light' ? styles.light : styles.dark
                            } ${taskTitleError ? styles.error : ''}`}
                    />
                    {taskTitleError && <div className={styles.TaskTitleError}>Task name can not be empty </div>}
                    <label className={`${styles.AddTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
                }`} htmlFor="taskDescription">Task Description</label>
                    <textarea 
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        cols={30}
                        rows={10}
                        className={`${styles.AddTaskTextArea} ${
                            theme === 'light' ? styles.light : styles.dark
                            }`}
                    >

                    </textarea>
                    <label className={`${styles.AddTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
                }`}  htmlFor="taskColumnSelect">Subtasks</label>
                    <SubTask
                    subTasks={SubTaskCurrent}
                    handleSubTaskDelete={handleSubTaskDelete}
                    handleColumnTitleChange={handleColumnTitleChange}
                    isMoving={isMoving}
                    columnErrors={SubTasksError}
                    />                    
                    <button className={styles.AddTaskSaveButton}  
                    style={{marginBottom: '25px'}}
                    onClick={(e) => {
                        e.preventDefault(); 
                        addSubTask();
                    }}
                    >
                        + AddNew Subtask
                    </button>
                    <select
                        onChange={(e) => setSelectId(e.target.value)}
                        className={`${styles.SelectAddTask} ${
                            theme === 'light' ? styles.light : styles.dark
                            }`} 
                    >
                        {renderSelect(columns)}
                    </select>

                    <button className={styles.AddTaskSaveButton} type="submit">
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
};


export default AddTask;
