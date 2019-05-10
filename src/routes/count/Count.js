import React from 'react';
import { connect } from "dva";
import styles from './count.less';

function Count({count, menus, dispatch}) {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
      </div>
      <div>

      </div>
    </div>
  );
};

Count.propTypes = {};


export default connect(({count, menus}) => ({count, menus}))(Count);
