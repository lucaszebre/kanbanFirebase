import styles from "../../styles/EditBoard.module.css";
import { Opencontext } from "@/contexts/contextopen";
import { useState,useContext,useEffect } from "react";
import { DataContext } from '@/contexts/datacontext';
import { nanoid } from "@reduxjs/toolkit";
import BoardColumn from "../boardColumn";
import { Column,ColumnData } from "@/types";
import { handleSaveChanges } from "./handleSave";
import { useTheme } from '@/contexts/themecontext';

const EditBoard = () => {

const { EditBoard, setEditBoard } = useContext(Opencontext); // state to toggle the display of components
const [columnstoAdd, setColumnstoAdd] = useState<Column[]>([]); // state to know the column to add in the database
const [columnsToDelete, setColumnsToDelete] = useState<string[]>([]);  // state to know the column to delete in the database
const [columnsToRename, setColumnsToRename] = useState<ColumnData[]>([]);// state to know the column to rename in the database
const [copyBoardColumns, setCopyBoardColumns] = useState<Column[]>([]);// state to know the current present in the database
const [Header,setHeader]= useState<string>(''); // state to know the current boardname selected
const [Save,SetSave]= useState<boolean>(false) // state to toggle the disabled thhe button save 
const { currentBoardId,columns,headerTitle,setHeaderTitle,isMoving,SetIsMoving } = useContext(DataContext); // state to manage the global data
const [columnErrors, setColumnErrors] = useState<boolean[]>([]); // state to handle if one input is empty 
const [inputError, setInputError] = useState<boolean>(false); // state to handle if the boardname is empty 
const { theme, setTheme } = useTheme();

    useEffect(() => {
        setCopyBoardColumns(columns);
        setHeader(headerTitle)
    }, [EditBoard,isMoving]);  // every some thing is moving in the data we get the new headertiltle and columns of the currentboard 

    useEffect(()=>{
        setColumnstoAdd([])
        setColumnsToRename([])
        setColumnsToDelete([])
    },[Save])   // everytime to save the edit to reset the state of columns to add , rename , delete

    useEffect(() => {
        const initialColumnErrors = columns.map((column) => column.name.trim() === "");
        setColumnErrors(initialColumnErrors);
    }, [EditBoard]); // get the initial columns errror 




    const handleAddColumn = () => { // function to add column 
        const newColumn = {
        id: nanoid(), 
        name: "",
        boardId: currentBoardId,
        tasks: [],
        add:true
        };
        setCopyBoardColumns([...copyBoardColumns, newColumn]);
        setColumnstoAdd([...columnstoAdd, newColumn]);
    };

    function handleDeleteColumn(index: number, columnId: string) { // function to delete column
        const updatedColumns = [...copyBoardColumns];
        updatedColumns.splice(index, 1);
        setCopyBoardColumns(updatedColumns);
        setColumnsToDelete([...columnsToDelete, columnId]);
    
        // Filter out the deleted column from columnsToRename
        const updatedColumnsToRename = columnsToRename.filter(
            (column) => column.id !== columnId
        );
        setColumnsToRename(updatedColumnsToRename);
    
        // Update columnErrors state by removing the corresponding error
        const updatedColumnErrors = [...columnErrors];
        updatedColumnErrors.splice(index, 1);
        setColumnErrors(updatedColumnErrors);
    }
    

    const handleEditColumn = (index: number, columnName: string, add?: boolean) =>{
        const updatedColumns = [...copyBoardColumns];
        updatedColumns[index] = { ...updatedColumns[index], name: columnName };
        setCopyBoardColumns(updatedColumns);
        
        const updatedColumnErrors = [...columnErrors];
        updatedColumnErrors[index] = columnName.trim() === '';
        setColumnErrors(updatedColumnErrors);
    
        if (add) {
            const existingColumnIndex = columnstoAdd.findIndex((c) => c.id === updatedColumns[index].id);
            if (existingColumnIndex !== -1) {
                const updatedColumnsToAdd = [...columnstoAdd];
                updatedColumnsToAdd[existingColumnIndex] = updatedColumns[index];
                setColumnstoAdd(updatedColumnsToAdd);
            }
        } else {
            const existingColumnIndex = columnsToRename.findIndex((c) => c.id === updatedColumns[index].id);
            if (existingColumnIndex === -1) {
                setColumnsToRename([...columnsToRename, updatedColumns[index]]);
            } else {
                const updatedColumnsToRename = [...columnsToRename];
                updatedColumnsToRename[existingColumnIndex] = updatedColumns[index];
                setColumnsToRename(updatedColumnsToRename);
            }
        }
    };
    
    
function renderColumns() {  
    return copyBoardColumns.map((column, index) => (
        <BoardColumn
            key={index}
            title={column.name}
            onChange={(updatedTitle: string) =>handleEditColumn(index,updatedTitle,column.add)}
            Remove={ ()=> handleDeleteColumn(index,column.id) }
            error={columnErrors[index] || false}
        />
    ));
}

    return (
    <div className={styles.EditBoardWrapper}
        onClick={(e) => {
            if (e.target === e.currentTarget) {
            setEditBoard(false);  
            SetIsMoving(!isMoving)
            }}}
        style={{
            display: EditBoard ? "flex" : "none", // toggle the display 
        }}>
        <div 
        className={`${styles.EditBoardBlock} ${
            theme === 'light' ? styles.light : styles.dark
            }`}>
            <h1 className={`${styles.EditBoardTitle} ${
                theme === 'light' ? styles.light : styles.dark
                }`}>Edit Board</h1>
            <form action="" className={styles.EditBoardForm} 
                onSubmit={async (e) => {
                    e.preventDefault();
                    
                    const newColumnErrors = copyBoardColumns.map((column) => column.name.trim() === "");
                    setColumnErrors(newColumnErrors);
                    if(Header.trim()===''){
                        setInputError(true);
                    }else if (newColumnErrors.some((error) => error)) {
                        return;
                    }else{
                        await handleSaveChanges(columnsToDelete,columnsToRename,columnstoAdd,currentBoardId,Header,headerTitle);
                        setEditBoard(false);
                        SetIsMoving(!isMoving);
                        SetSave(!Save);
                    }
                    
                    
                }}
                >
                <label className={`${styles.EditLabel}} ${
                theme === 'light' ? styles.light : styles.dark
                }`} htmlFor="boardName">
                    Board Name
                </label>
                <input
                    type="text"
                    name="boardName"
                    className={`${styles.EditBoardInput} ${
                        theme === 'light' ? styles.light : styles.dark
                        } ${inputError ? styles.InputError : ''}`}
                    value={Header}
                    onChange={(e) =>{ 
                        setInputError(false);
                        setHeader(e.target.value)
                    }}
                />
                {inputError && <div className={styles.ErrorMessage}>Please enter a board name.</div>}

                <label className={`${styles.EditLabel}} ${
                theme === 'light' ? styles.light : styles.dark
                }`} htmlFor="boardDescription">
                    Board Columns
                </label>
                {renderColumns()}
                <button
                    className={`${styles.EditBoardAddButton} ${
                    theme === 'light' ? styles.light : styles.dark
                    }`}
                    onClick={(e) => {
                    e.preventDefault();
                    handleAddColumn();
                    }}
                >
                    + Add Column
                </button>
                <button
                    className={styles.EditBoardSaveButton}
                    type='submit'
                    
                >
                    Save Changes
                </button>
            </form>
        </div>
    </div>
    );
    };

export default EditBoard;
