import Image from 'next/image';
import React from 'react';
import styles from '../styles/BoardCarts.module.css';

const BoardCart = (props: {
  text: string;
  onClick?: () => void;
  selected: boolean;
}) => {
  return (
    <div onClick={props.onClick}  className={`${styles.BoardCartContainer} ${
      props.selected ? styles.selected : ''
    }`}>
      <Image className={styles.BoardImage} src="/assets/icon-board.svg" alt="board" width={16} height={16} />
      <p className={styles.BoardCartText}>{props.text}</p>
    </div>
  );
};

export default BoardCart;
