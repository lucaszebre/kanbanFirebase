// Import necessary hooks and components from React and your own libraries

import  { useContext, useState, useEffect } from "react";
import styles from "../styles/EditTask.module.css";
import { Opencontext } from "@/contexts/contextopen";
import { DataContext } from '@/contexts/datacontext';
import { handleSave } from "@/utils/SaveEditTask";
import renderSelect from "@/utils/renderselect";
import { RenderSubTask } from "@/utils/renderSubTask";
import { newSubtask } from "@/types";
import { useTheme } from '@/contexts/themecontext';

// Main EditTask functional component

const EditTask = (props:{columnId:string,}) => {

        // State hooks for managing subtasks and input errors

const [subTasksToAdd, setSubTasksToAdd] = useState<newSubtask[]>([]);
const [subTasksToDelete, setSubTasksToDelete] = useState<string[]>([]);
const [subTasksToRename, setSubTasksToRename] = useState<newSubtask[]>([]);
const { EditTask, setEditTask, setSubTasks } = useContext(Opencontext);
const [taskName, setTaskName] = useState<string>('');
const [taskDescription, setTaskDescription] = useState<string>('');
const [subTasked, setSubTasked] = useState<newSubtask[]>([]);
const [columnId, setColumnId] = useState<string>('');
const [save, setSave] = useState<boolean>(false);
const { currentTaskId,currentBoardId, ColId, columns, openedTask, isMoving, SetIsMoving } = useContext(DataContext);
const [selectedColumnId, setSelectedColumnId] = useState(props.columnId);
const [InitialTitle,SetInitialTitle]=useState<string>('')
const [InitialDescription,SetInitialDescription]=useState<string>('')
const [InitialColId,SetInitialColId]= useState<string>('')
const [columnErrors, setColumnErrors] = useState<boolean[]>([]);
const [inputError, setInputError] = useState<boolean>(false);
const { theme, setTheme } = useTheme();

// Set the selected column ID whenever the prop changes
useEffect(() => {
    setSelectedColumnId(props.columnId);
}, [props.columnId]);



// Reset subtask-related state hooks when save state changes

useEffect(()=>{
    setSubTasksToAdd([])
    setSubTasksToDelete([])
    setSubTasksToRename([])
},[save])

// Set initial column errors based on subtasks

useEffect(() => {
    const initialColumnErrors = subTasked.map((column) => column.title.trim() === "");
    setColumnErrors(initialColumnErrors);
}, [EditTask]);


// Update task states when EditTask or openedTask changes

useEffect(() => {
        if (openedTask) {
            SetInitialTitle(openedTask.title)
            SetInitialDescription(openedTask.description)
            SetInitialColId(openedTask.columnId)
            setTaskName(openedTask.title);
            setTaskDescription(openedTask.description);
            setSubTasked(openedTask.subTask);
            setColumnId(openedTask.columnId);
        }
    }, [EditTask, openedTask]);

// function Add a subtask 
    const handleAddSubtask = () => {
        const newSubtask = {
            title: "",
            isCompleted: false,
            taskId: currentTaskId,
            add:true,
        };
        setSubTasked([...subTasked, newSubtask]);
        setSubTasksToAdd([...subTasksToAdd,newSubtask])
    };

// function to delete a subtask
    const handleDeleteSubtask = (index: number, subTaskId?: string) => {
        const updatedSubTasks = [...subTasked];
        updatedSubTasks.splice(index, 1);
        setSubTasked(updatedSubTasks);
    
        if (subTaskId) {
            setSubTasksToDelete([...subTasksToDelete, subTaskId]);
        }
    
        const updatedSubTaskToRename = subTasksToRename.filter(
            (sub) => sub.id !== subTaskId
        );
        setSubTasksToRename(updatedSubTaskToRename);
    };


    // function to handle the edit of a subtask 

    const handleEditSubTask = (index: number, newTitle: string, subTaskId?: string, add?: boolean) => {
            const updatedSubTasks = [...subTasked];
            updatedSubTasks[index].title = newTitle;
            
            setSubTasked(updatedSubTasks);
        
            if (add) {
                const existingSubTaskIndex = subTasksToAdd.findIndex((st) => st.id === updatedSubTasks[index].id);
                if (existingSubTaskIndex !== -1) {
                    const updatedSubTasksToAdd = [...subTasksToAdd];
                    updatedSubTasksToAdd[existingSubTaskIndex] = updatedSubTasks[index];
                    setSubTasksToAdd(updatedSubTasksToAdd);
                }
            } else {
                const existingSubTaskIndex = subTasksToRename.findIndex((st) => st.id === updatedSubTasks[index].id);
                if (existingSubTaskIndex === -1) {
                    setSubTasksToRename([...subTasksToRename, updatedSubTasks[index]]);
                } else {
                    const updatedSubTasksToRename = [...subTasksToRename];
                    updatedSubTasksToRename[existingSubTaskIndex] = updatedSubTasks[index];
                    setSubTasksToRename(updatedSubTasksToRename);
                }
        }
    };




    
 // Render the EditTask component
    return (
        <div className={styles.EditTaskWrapper}
        style={{
            display:EditTask?'flex':'none'
        }}
        onClick={async(e) => {
            if (e.target === e.currentTarget) {
                
                
            setEditTask(false);
            SetIsMoving(!isMoving)}
            }}
        
        >
            <div 
            className={`${styles.EditTaskBlock} ${
                theme === 'light' ? styles.light : styles.dark
                }`}>
            <h3 className={`${styles.EditTaskHeader} ${
                theme === 'light' ? styles.light : styles.dark
            }`}>Edit Task</h3>
            <form className={styles.EditTaskForm}  onSubmit={async(e)=>{
                    e.preventDefault();
                    const newColumnErrors = subTasked.map((sub) => sub.title.trim() === "");
                    setColumnErrors(newColumnErrors);
                    if(taskName.trim()===''){
                        setInputError(true)
                    }else if (newColumnErrors.some((error) => error)){
                        return ;
                    }else{
                        await handleSave(taskName,InitialTitle,taskDescription,InitialDescription,subTasksToAdd,subTasksToRename,subTasksToDelete,currentBoardId,selectedColumnId,props.columnId,currentTaskId);
                        setSave(!save);
                        setEditTask(false);
                    }
                    
                }}>
            <label className={`${styles.EditTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
            }`} htmlFor="boardName">
                Task name
            </label>
                <input
                    type="text"
                    className={`${styles.EditTaskInputHeader} ${
                        theme === 'light' ? styles.light : styles.dark
                    } ${inputError ? styles.InputError : ''}`}
                    value={taskName}
                    onChange={(e) =>{
                        setTaskName(e.target.value)
                        setInputError(false)
                    }}
                />
                {inputError && <div className={styles.ErrorMessage}>Please enter a Task name.</div>}

                <label className={`${styles.EditTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
            }`} htmlFor="boardName">
                Description
                </label>
                <textarea
                className={`${styles.EditTaskTextArea} ${
                    theme === 'light' ? styles.light : styles.dark
                }`}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
                <label className={`${styles.EditTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
            }`} htmlFor="boardName">
                SubTasks
                </label>
                
                <RenderSubTask subTasks={subTasked} handleEditSubTask={handleEditSubTask} handleDeleteSubtask={handleDeleteSubtask}  columnErrors={columnErrors}/>
        
                <button className={styles.EditTaskAddButton} type='button' onClick={handleAddSubtask}>Add Subtask</button>
                <label className={`${styles.EditTaskLabel} ${
                theme === 'light' ? styles.light : styles.dark
            }`}  htmlFor="">Current Status</label>

                <select
                        value={selectedColumnId}
                        onChange={(e) => {
                            setSelectedColumnId(e.target.value);
                        }}
                        className={`${styles.SelectState} ${
                            theme === 'light' ? styles.light : styles.dark
                        }`}
                    >
                        {renderSelect (columns)}
                    </select>
            <button className={styles.EditTaskSaveButton}  
            type='submit'
                >Save Changes</button>
            </form>
        </div>
    </div>

    );
};
export default EditTask;