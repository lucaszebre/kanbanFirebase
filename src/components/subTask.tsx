import React from 'react';
import styles from '@/styles/Subtasks.module.css';
import { DataContext } from '@/contexts/datacontext';
import { useContext } from 'react';
import { useTheme } from '@/contexts/themecontext';

const Subtasks = (props: { title: string , checked: boolean , onClick:()=>void ,  }) => {

  const { theme, setTheme } = useTheme();

  const {SetIsMoving,isMoving } = useContext(DataContext); // state to update the whole data of the app
  const [isChecked, setIsChecked] = React.useState<boolean>(props.checked); // state to able to toggle the checkbox

  React.useEffect(() => {  // everytime we check the checkbox we change the value of IsChecked
    setIsChecked(props.checked);
  }, [props.checked]);

  return (
    <div
      className={`${styles.SubtasksDiv} ${
        theme === 'light' ? styles.light : styles.dark
      }`}
      style={{
        height: isChecked ? '40px' : 'auto',}}>
      
        <input type="checkbox" checked={isChecked}
            onChange={() => {
            setIsChecked(!isChecked);
            props.onClick();
            SetIsMoving(!isMoving)}} />
        <p
          className={styles.SubtaskTitle}
          style={{
            textDecoration: isChecked ? 'line-through' : 'none',
            color: isChecked? '#BDBDBD' : 'white',
          }}
        >
          {props.title}
        </p>
    </div>
  );
};

export default Subtasks;
