import React from 'react';
import styles from './Sidebar.module.scss';
import { Router, Link } from '@reach/router';
import { SidebarStats } from '../Stats';
import { SidebarHittingLeaders } from '../HittingLeaders';

const activeLinkStyle = ({ isCurrent }) => ({
  className: isCurrent ? styles.LinkActive : styles.Link,
});

export default function Sidebar() {
  return (
    <nav className={styles.Sidebar}>
      <div className={styles.SidebarLinksContainer}>
        <Link to="/" getProps={activeLinkStyle}>
          Leaders
        </Link>

        <Link to="/stats" getProps={activeLinkStyle}>
          Stats
        </Link>
      </div>

      <Router>
        <SidebarHittingLeaders path="/" />
        <SidebarStats path="/stats" />
      </Router>
    </nav>
  );
}
