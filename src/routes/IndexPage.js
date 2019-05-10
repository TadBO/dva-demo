import React from 'react';
import { connect } from 'dva';
import { Link } from "react-router-dom";
import styles from './IndexPage.css';

function IndexPage({menus, history}) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        <Link to="/home/about">count321313</Link>
        <Link to="/work/epic">Epic</Link>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({menus}) => ({menus}))(IndexPage);
