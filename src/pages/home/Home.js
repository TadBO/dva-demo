import React, { Component } from 'react';
import { connect } from "dva";

class Home extends React.Component {
  constructor() {
    super();
  }
  delEvent(key, event) {
    this.props.dispatch({type: 'todos/delTodos', payload: key})
  }
  render() {
    console.log(this.props);
    return(
      <div>
        <p>123123213</p>
        <ul>
          {
            this.props.todos.todos.map((item, key) => {
              return (
                <li key={key}>{item.text} <button onClick={this.delEvent.bind(this, key)}>删除</button></li>
              )
            })
          }
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default connect(({todos}) => ({todos}))(Home);
