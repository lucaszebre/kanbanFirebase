import styles from '../styles/modalAboutTask.module.css';
import { useContext } from 'react';
import { Opencontext } from '@/contexts/contextopen';
import { useTheme } from '@/contexts/themecontext';

const ModalAboutTask = (props: {visible: boolean;}) => {

    // state to toggle the display of the Delete task Block or the EditTask components 
    const {setDeleteTaskBlock,setIsOpenModal,setEditTask,setSubTasks} = useContext(Opencontext);

    const { theme, setTheme } = useTheme();


    function HandleClickDelete() {  // function to display the DeleteTask Block 
        setDeleteTaskBlock(true);
        setIsOpenModal(false);
        setSubTasks(false)

    }

    function HandleClickEdit() { // function to display the Edit Task Block 
        setEditTask(true);
        setIsOpenModal(false);
        setSubTasks(false);
        
    }
    
    return (
        <div className={styles.ModalWrapper}>
            <div
                className={`${styles.modalAboutDiv} ${
                    theme === 'light' ? styles.light : styles.dark
                  }`}
                style={{  display: props.visible ? 'flex' : 'none',}}
                >
                <p
                className={styles.EditModalAbout}
                onClick={() => HandleClickEdit()}
                >
                Edit Task
                </p>
                <p
                className={styles.DeleteModalAbout}
                onClick={() => HandleClickDelete()}
                >
                Delete Task
                </p>
            </div>
        </div>
    );
};

export default ModalAboutTask;
