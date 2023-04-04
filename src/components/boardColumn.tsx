import Image from 'next/image';
import React from 'react';
import styles from '../styles/BoardColumn.module.css';
import { useTheme } from '@/contexts/themecontext';

interface BoardColumnProps {
  title: string;
  onChange: (value: string) => void;
  Remove: () => void;
  resetKey?: boolean;
  error:boolean
}

const BoardColumn: React.FC<BoardColumnProps> = ({ title, onChange, Remove, resetKey,error }) => {
  const [inputValue, setInputValue] = React.useState<string>(title);
  const { theme, setTheme } = useTheme();

    React.useEffect(() => {  // every time the value of resetkey change we reset the value inside the input 
      if(resetKey){
        setInputValue('');
      }
    }, [resetKey]);  
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };


  return (
    <>
    <div className={styles.BoardColumnDiv}>
      <input
        className={`${styles.BoardColumnImput} ${
          theme === 'light' ? styles.light : styles.dark
          } ${error ? styles.InputError : ''}`}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Image
        onClick={() => Remove()}
        className={styles.BoardColumnDelete}
        src="/assets/icon-cross.svg"
        alt="DeleteTaskIcon"
        width={14.85}
        height={14.85}
      />


    </div>
      {error && <div className={styles.ErrorMessage}>Can not be empty</div>}

      </>
  );
};

export default BoardColumn;