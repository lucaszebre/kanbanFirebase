import styles from '../styles/modalAbout.module.css';
import { useContext } from 'react';
import { Opencontext } from '@/contexts/contextopen';
import { useTheme } from '@/contexts/themecontext';

const ModalAbout = (props: {right: string;top: string;visible: boolean;}) => {

  // state to toggle the display of the Delete Components or the EditBoard 
  const {setDeleteBlock,setIsOpenModal,setEditBoard,} = useContext(Opencontext); 

  const { theme, setTheme } = useTheme();


  function HandleClickDelete() {  // function display the delete block 
    setDeleteBlock(true);
    setIsOpenModal(false);
  }

  function HandleClickEdit() { // function to display the EditBoard 
    setEditBoard(true);
    setIsOpenModal(false);
  }
  
  return (
    <div className={styles.ModalWrapper}>
      <div
        className={`${styles.modalAboutDiv} ${
          theme === 'light' ? styles.light : styles.dark
        }`}
        style={{
          top: props.top,
          right: props.right,
          display: props.visible ? 'flex' : 'none',
        }}
      >
        <p
          className={styles.EditModalAbout}
          onClick={() => HandleClickEdit()}
        >
          Edit Board
        </p>
        <p
          className={styles.DeleteModalAbout}
          onClick={() => HandleClickDelete()}
        >
          Delete Board
        </p>
      </div>
    </div>
  );
};

export default ModalAbout;
