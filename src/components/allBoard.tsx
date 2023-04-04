import React, { useState, useEffect } from 'react';
import { Boards } from '@/types';
import BoardCart from './boardCart';
import { useContext } from 'react';
import { DataContext } from '@/contexts/datacontext';


const AllBoard = () => {
    const { boards,setCurrentBoardId,setHeaderTitle,isMoving,currentBoardId } = useContext(DataContext);  // get state to manage the global data 
    const [AllBoard,setAllBoard]=useState<Boards[]>([])  // state we all the Board 

    function GetBoards(){ // function to get All the board présent in firestore of the current user 
        for (const board of boards){
            setAllBoard([...AllBoard, {id:board.id,name:board.name}])  
        }
    }
    
    React.useEffect(()=>{  // every something is happening in the data we update 
        GetBoards()
    },[isMoving]) 
    

    return (AllBoard || []).map((doc: Boards,index:number) => (
        <BoardCart
        key={index}
        text={doc.name}
        onClick={() => {
            setCurrentBoardId(doc.id);
            localStorage.setItem('boardId', JSON.stringify(doc.id));
            setHeaderTitle(doc.name);
        }}
        selected={currentBoardId==doc.id}
        />
    ));
};

export default AllBoard;
