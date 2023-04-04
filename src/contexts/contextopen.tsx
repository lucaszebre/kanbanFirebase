


import React, { createContext, useContext, useState } from 'react';

// import { useData } from './boardcontext';
export type contextopen = { // Type for context
    DeleteBlock: boolean; // Delete block state
    setDeleteBlock: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenModal: boolean; // Delete block state
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Delete block state setter
    EditBoard: boolean; // Delete block state
    setEditBoard: React.Dispatch<React.SetStateAction<boolean>>; // Delete block state setter
    AddTask: boolean; // Delete block state
    setAddTask: React.Dispatch<React.SetStateAction<boolean>>; // Delete block state setter
    SubTasks: boolean; // Delete block state
    setSubTasks: React.Dispatch<React.SetStateAction<boolean>>; // Delete block state setter
    AddBoard: boolean; // Delete block state
    setAddBoard: React.Dispatch<React.SetStateAction<boolean>>; // Delete block state setter
    isChanged: boolean; // Delete block state
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>; // Delete block state setter
    EditTask:boolean;
    setEditTask:React.Dispatch<React.SetStateAction<boolean>>;
    DeleteTaskBlock:boolean,
    setDeleteTaskBlock:React.Dispatch<React.SetStateAction<boolean>>;

};

export const Opencontext = createContext<contextopen>({ // Create context
    DeleteBlock: true,
    setDeleteBlock: () => {},
    isOpenModal : false , setIsOpenModal: () => {},
    EditBoard: false,
    setEditBoard: () => {},
    AddTask: false,
    setAddTask: () => {},
    SubTasks: false,
    setSubTasks: () => {},
    AddBoard: false,
    setAddBoard: () => {},
    isChanged: false,
    setIsChanged: () => {},
    EditTask: false,
    setEditTask:()=>{},
    DeleteTaskBlock:false,
    setDeleteTaskBlock:()=>{}
    
});


export type BoardType = {
    id: string;
    name: string;
    };






const ContextOpen = (props: { children: React.ReactNode }) => { // Context provider
    const [DeleteBlock, setDeleteBlock] = useState<boolean>(false);  // Set initial state for delete block
    const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)  // Set initial state for the Open Modal
    const [EditBoard, setEditBoard] = useState<boolean>(false); // Set initial state for Edit Board
    const [AddTask, setAddTask] = useState<boolean>(false);  // Set initial state for Add Task
    const [SubTasks, setSubTasks] = useState<boolean>(false);  // Set initial state for Sub Tasks
    const [AddBoard, setAddBoard] = useState<boolean>(false);  // Set initial state for Add Board
    const [isChanged, setIsChanged] = useState<boolean>(false);  // Set initial state for Add Board
    const [EditTask, setEditTask]= useState<boolean>(false);
    const [DeleteTaskBlock, setDeleteTaskBlock]=useState<boolean>(false)

    // const {BoardId, setBoardId} = useData();

    return (
        <Opencontext.Provider
        value={{
            DeleteBlock,
            setDeleteBlock,
            isOpenModal, setIsOpenModal,
            EditBoard,setEditBoard
            ,AddTask,setAddTask
            ,SubTasks,setSubTasks
            ,AddBoard,setAddBoard
            ,isChanged,setIsChanged,
            EditTask, setEditTask,
            DeleteTaskBlock, setDeleteTaskBlock

        }}
        >
        {props.children}
        </Opencontext.Provider>
    );
    };

export default ContextOpen;