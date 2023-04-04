import { Opencontext } from '@/contexts/contextopen';
import { useContext } from 'react';
import styles from '../styles/EmptyBoard.module.css';

const EmptyBoard = () => {
  
  const { setEditBoard } = useContext(Opencontext);


  return (
    <div className={styles.emptyBoardDiv}>
      <h1 className={styles.emptyBoardTitle}>
        This board is empty. Create a new column to get started.
      </h1>
      <button
        onClick={() => { setEditBoard(true) }} 
      className={styles.emptyBoardButton}>
        + Add New Column
      </button>
    </div>
  );
};

export default EmptyBoard;
