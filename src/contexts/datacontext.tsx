import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import useAuthState from '@/components/useAuthState';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Column, Subtask ,Board} from '@/components/editBoard/editBoard';
import {fetchColumnsFromFirestore} from '@/utils/fetchColumns'
type openedTaskType= {
    id: string;
    title: string;
    description: string;
    columnId: string;
    subTask: Subtask[];
} | null 
type DataContextType = {
    boards: Board[];
    setBoards: React.Dispatch<React.SetStateAction<Board[] >>
    currentBoardId: string;
    setCurrentBoardId: (boardId: string) => void;
    currentBoard:Board | undefined;
    setCurrentBoard: React.Dispatch<React.SetStateAction<Board |undefined>>;
    headerTitle: string;
    setHeaderTitle: (title: string) => void;
    columns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    isMoving:boolean;
    SetIsMoving:React.Dispatch<React.SetStateAction<boolean>>;
    isCompleted:boolean;
    setIsCompleted:React.Dispatch<React.SetStateAction<boolean>>;
    currentTaskId:string;
    SetCurrentTaskId:React.Dispatch<React.SetStateAction<string>>;
    ColId:string;
    setColId:React.Dispatch<React.SetStateAction<string>>;
    openedTask:openedTaskType;
    setOpenedTask:React.Dispatch<React.SetStateAction<openedTaskType>>;
};


export const DataContext = createContext<DataContextType>({} as DataContextType);



export const DataProvider = (props: { children: React.ReactNode }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [columns,setColumns]= useState<Column[]>([])
    const [currentBoard,setCurrentBoard]= useState<Board>()
    const [currentBoardId, setCurrentBoardId] = useState<string>('');
    const [headerTitle, setHeaderTitle] = useState<string>('');
    const authInstance = getAuth();
    const [user, loading, error] = useAuthState(authInstance);
    const [isMoving,SetIsMoving] = useState(false)
    const [isCompleted,setIsCompleted] = useState(false)
    const [currentTaskId,SetCurrentTaskId]=React.useState<string>('')
    const [ColId,setColId] = React.useState<string>('')
    const [openedTask, setOpenedTask] = useState<{
        id: string;title: string;
        description: string;
        columnId: string;
        subTask: Subtask[];
        } | null>(null);


    useEffect(() => {
        const fetchBoards = async () => {
        if (!user) return;

        const boardsCollection = collection(db, 'boards');
        const q = query(boardsCollection, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedBoards: Board[] = [];
        querySnapshot.forEach((doc) => {
            fetchedBoards.push({ id: doc.id, name: doc.data().name, userId: user.uid, columns: [] });
        });

        setBoards(fetchedBoards);
        };

        fetchBoards();
    }, [user]);

    useEffect(() => {
        const savedHeaderTitle = localStorage.getItem('headerTitle');
        if (savedHeaderTitle) {
            setHeaderTitle(savedHeaderTitle);
        }
        }, []);

        
    useEffect(() => {
        const savedHeaderTitle = localStorage.getItem('headerTitle');
        if (savedHeaderTitle) {
            setHeaderTitle(savedHeaderTitle);
        }
        }, []);

    useEffect(() => {
            const savedCurrentBoardId = localStorage.getItem('currentBoardId');
            if (savedCurrentBoardId) {
                setCurrentBoardId(savedCurrentBoardId);
            }
            }, []);

    useEffect(() => {
                const fetchColumns = async () => {
                    if (currentBoardId) {
                        const tempColumns = await fetchColumnsFromFirestore(currentBoardId);
                        setColumns(tempColumns);
                        
                    }
                };
            
            fetchColumns();
            
    }, [currentBoardId,columns,isMoving]);

    useEffect(() => {
                for(const board of boards){
                    if(board.id===currentBoardId){
                        setHeaderTitle(board.name)
                        localStorage.setItem('headerTitle',board.name)
                    }
                }
                
    }, [isMoving]);

    return (
        <DataContext.Provider value={{
        boards,
        setBoards,
        currentBoardId,
        setCurrentBoardId,
        headerTitle,
        setHeaderTitle,
        columns,setColumns,
        currentBoard,setCurrentBoard,
        isMoving,SetIsMoving,
        isCompleted,setIsCompleted,
        SetCurrentTaskId,currentTaskId,
        ColId,setColId,
        openedTask, setOpenedTask
        }}>{props.children}</DataContext.Provider>
    );
    };
