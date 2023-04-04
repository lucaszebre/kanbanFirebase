import { useState,useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import useAuthState from './useAuthState';
import { KanbanContext } from '@/contexts/sidebarcontext';
import { Opencontext } from '@/contexts/contextopen';
import styles from '../styles/SidebarMobile.module.css';
import Image from 'next/image';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Switch } from '@chakra-ui/react';
import BoardCart from './boardCart';
import { DataContext } from '@/contexts/datacontext';
import { Board } from '@/types';
import { getInitialWindowWidth } from '@/utils/GetInitialWidth';
import { useTheme } from '@/contexts/themecontext';
import { Switch as MuiSwitch } from '@mui/material';

const Sidebar = () => {
const { theme, setTheme } = useTheme();

const { isSidebarMobile, setIsSidebarMobile } = useContext(KanbanContext);  // state to toggle the sidebar 
const { setAddBoard } = useContext(Opencontext);  // state to toggle the display of the Add Board components
const [windowWidth, setWindowWidth] = useState(getInitialWindowWidth()); // Update the useState call
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

    useEffect(() => {
        // Check if the window object is available
        if (typeof window !== 'undefined') {
            // Add this useEffect to update the windowWidth state when the window is resized
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    useEffect(() => {
        // Add this useEffect to update the isSidebarOpen state based on the windowWidth state
        if (windowWidth > 767) {
            setIsSidebarMobile(false);
        }
    }, [windowWidth, setIsSidebarMobile]);

    
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

    const handleThemeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked ? 'light' : 'dark');
        };

  // function to handle the click on a board cart 
const handleBoardClick = (boardName: string, boardId: string) => {
    setHeaderTitle(boardName);
    setCurrentBoardId(boardId);
    localStorage.setItem('currentBoardId', boardId);
    setIsSidebarMobile(false)
    };

    return (
        <div className={styles.SidebarContainer} 
        style={{ display: isSidebarMobile ? 'flex' : 'none' }}
        onClick={(e)=>{
            if (e.target === e.currentTarget) {
                setIsSidebarMobile(false)
            }
        }}
        >
            <div 
            className={`${styles.SibebarWrapper} ${
                theme === 'light' ? styles.light : styles.dark
                }`}
            >
                    <h1 className={`${styles.SideBarTitle} ${
                        theme === 'light' ? styles.light : styles.dark
                        }`}
                    >ALL BOARDS({boards.length})</h1>
                
                    {boards.map((board,index) => (
                        <BoardCart 
                        text={board.name} 
                        key={index} 
                        onClick={() => { handleBoardClick(board.name, board.id) }}
                        selected={currentBoardId === board.id}
                        />
                    ))}
                
                    <div className={`${styles.CreateBoard} ${
                        theme === 'light' ? styles.light : styles.dark
                        }`} onClick={() => { setAddBoard(true);}}>
                        <Image className={styles.BoardImage} src="/assets/icon-board2.svg" alt="plus" width={16} height={16} />
                        <p className={styles.CreateBoardText}>+ Create New Board</p>
                    </div>
            
            
                    <div className={`${styles.ToggleBlock} ${
                        theme === 'light' ? styles.light : styles.dark
                        }`} >
                        <Image src="/assets/icon-dark-theme.svg" alt="icon-dark-theme" width={18.33} height={18.33} />
                        <MuiSwitch
                        size="medium"
                        color="default"
                        checked={theme !== 'dark'}
                        onChange={handleThemeToggle}
                        />                        
                        <Image src="/assets/icon-light-theme.svg" alt="icon-light-theme" width={15} height={15} />
                    </div>

                    <div onClick={() => {setIsSidebarMobile(false);}} className={styles.HideSideBar}>
                        <Image className={styles.HideItems} src="/assets/icon-hide-sidebar.svg" width={18} height={16} alt="hide-sidebar" />
                        <p>Hide Sidebar</p>
                    </div>
            
        </div>
    </div>


        
    );
    };

export default Sidebar;