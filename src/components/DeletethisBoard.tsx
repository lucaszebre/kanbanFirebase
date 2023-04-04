import styles from '../styles/DeletethisBoard.module.css';
import { Opencontext } from '@/contexts/contextopen';
import { useContext } from 'react';
import { deleteDoc, doc } from 'firebase/firestore'; 
import { db } from '@/config/firebase'; // db from the firebase 
import { DataContext } from '@/contexts/datacontext';
import { useTheme } from '@/contexts/themecontext';

const DeleteThisBoard = () => {
    const { DeleteBlock, setDeleteBlock } = useContext(Opencontext); // state to toggle the display of the components
    const { boards,
        setBoards,
        currentBoardId,
        setCurrentBoardId,
        SetIsMoving,isMoving,
        headerTitle } = useContext(DataContext);  // state to manage the global data 
        const { theme, setTheme } = useTheme();

    const deleteBoard = async (boardId: string) => {  // function to delete the baord in the firestore 
        try {
            await deleteDoc(doc(db, 'boards', boardId));
            setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
            SetIsMoving(!isMoving)
            setCurrentBoardId(boards[0].id)
        } catch (error) {
            console.error('Error while deleting the board:', error);
        }
    };


    return (
        <div className={styles.DeleteThisBoardWrapper} style={{ display: DeleteBlock ? 'flex' : 'none' }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setDeleteBlock(false);
                }}}>
            <div className={`${styles.DeletethisBoardDiv} ${
                theme === 'light' ? styles.light : styles.dark
                }`}>
                <h1 className={styles.DeleteThisBoardTitle}>Delete this board?</h1>
                <p className={styles.DeleteThisBoardText}>
                    Are you sure you want to delete the ‘<a >{headerTitle}</a>’ board? This action will remove all columns and tasks
                    and cannot be reversed.
                </p>
                <div className={styles.DeleteThisBoardButtons}>
                    <button
                        onClick={() => {
                            deleteBoard(currentBoardId);
                            setDeleteBlock(false);
                            SetIsMoving(!isMoving)
                        }}
                        className={styles.DeleteButton}
                    >
                        Delete
                    </button>
                    <button className={styles.CancelButton} onClick={() => setDeleteBlock(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteThisBoard;

