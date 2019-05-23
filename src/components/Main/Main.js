import React from 'react';
import styles from './Main.module.scss';

export default function Main({ children }) {
  return <main className={styles.Main}>{children}</main>;
}
