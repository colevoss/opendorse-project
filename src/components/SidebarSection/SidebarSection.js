import React from 'react';
import styles from './SidebarSection.module.scss';

export default function SidebarSection({ children, label }) {
  return (
    <div className={styles.SidebarSection}>
      <label className={styles.SidebarSectionLabel}>{label}</label>

      {children}
    </div>
  );
}
