import { useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import useAuthState from './useAuthState';
import { KanbanContext } from '@/contexts/sidebarcontext';
import { Opencontext } from '@/contexts/contextopen';
import styles from '../styles/Sidebar.module.css';
import Image from 'next/image';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Switch as MuiSwitch } from '@mui/material';
import BoardCart from './boardCart';
import { DataContext } from '@/contexts/datacontext';
import { Board } from '@/types';
import { useTheme } from '@/contexts/themecontext';

const Sidebar = () => {
  const { theme, setTheme } = useTheme();

  const { isSidebarOpen, setIsSidebarOpen } = useContext(KanbanContext);  // state to toggle the sidebar 
  const { setAddBoard } = useContext(Opencontext);  // state to toggle the display of the Add Board components
  const authInstance = getAuth();
  const [user, loading, error] = useAuthState(authInstance);
  const {
    boards,
    setBoards,
    currentBoardId,
    setCurrentBoardId,
    headerTitle,
    setHeaderTitle,
    isMoving
    } = useContext(DataContext);

    const handleThemeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTheme(event.target.checked ? 'light' : 'dark');
    };
    
  useEffect(() => {  // everytime the something happen in the data we get a new track from the firestore to stay update 
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
  }, [user, setBoards, boards,isMoving]);


  // function to handle the click on a board cart 
  const handleBoardClick = (boardName: string, boardId: string) => {
    setHeaderTitle(boardName);
    setCurrentBoardId(boardId);
    localStorage.setItem('currentBoardId', boardId);
    };

  return (
    <div className={`${styles.SidebarContainer} ${
      theme === 'light' ? styles.light : styles.dark
    }`}>
      <div className={styles.SibebarWrapper}>
        <div className={styles.DropDown}>
          <h1 
          className={`${styles.SideBarTitle} ${
            theme === 'light' ? styles.light : styles.dark
          }`}>ALL BOARDS({boards.length})</h1>
        
          {boards.map((board,index) => (
            <BoardCart 
            text={board.name} 
            key={index} 
            onClick={() => { handleBoardClick(board.name, board.id) }}
            selected={currentBoardId === board.id}
            />
          ))}
          
            <div
              className={styles.CreateBoard}
              onClick={() => {
                setAddBoard(true);
              }}
            >
              <Image className={styles.BoardImage} src="/assets/icon-board2.svg" alt="plus" width={16} height={16} />
              <p className={styles.CreateBoardText}>+ Create New Board</p>
              </div>
            </div>
        
          <div className={styles.SideBarBottom}>
            <div className={styles.ToggleBlock}>
              <Image src="/assets/icon-dark-theme.svg" alt="icon-dark-theme" width={18.33} height={18.33} />
              <MuiSwitch
                size="medium"
                color="default"
                checked={theme !== 'dark'}
                onChange={handleThemeToggle}
              />
              <Image src="/assets/icon-light-theme.svg" alt="icon-light-theme" width={15} height={15} />
            
          </div>
          <div
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            className={`${styles.HideSideBar} ${
              theme === 'light' ? styles.light : styles.dark
            }`}
            
          >
            <Image className={styles.HideItems} src="/assets/icon-hide-sidebar.svg" width={18} height={16} alt="hide-sidebar" />
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>
    </div>
      
  );
};

export default Sidebar;