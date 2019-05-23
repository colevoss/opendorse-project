import React from 'react';
import styles from './Sidebar.module.scss';

export default function SidebarChild({ children }) {
  return <div className={styles.SidebarChild}>{children}</div>;
}
