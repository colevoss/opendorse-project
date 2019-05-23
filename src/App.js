import React from 'react';
import styles from './App.module.scss';
import { Sidebar } from './Sidebar';
import { Provider } from 'react-redux';
import store from './state';
import { Router } from '@reach/router';
import { Stats } from './Stats';
import { HittingLeaders } from './HittingLeaders';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Sidebar />

        <Router>
          <HittingLeaders path="/" />
          <Stats path="/stats" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
