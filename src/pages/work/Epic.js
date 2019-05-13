import React, {Component} from 'react';
import {connect} from "dva";
import styles from './epic.less';

let timer = null;

class Epic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
    }
  }
  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  itemHandleChange(index,e) {
    this.props.dispatch({type: 'todolist/editTodos', payload: {
      name: 'content',
        value: e.target.value,
        key: index
      }});
  }
  handleDblClick(index, e) {
    this.props.dispatch({type: 'todolist/editTodos', payload: {
        name: 'isEdit',
        value: true,
        key: index
      }});
    timer = setTimeout(() => {
      this.refs[`edit_${index}`].focus();
    });
  }
  handleBlur(index, e) {
    this.props.dispatch({type: 'todolist/editTodos', payload: {
        name: 'isEdit',
        value: false,
        key: index
      }});
  }
  submitEvent(e) {
    e.preventDefault();
    if (!this.state.newTodo) {
      return;
    }
    this.setState({
      newTodo: ''
    });
    this.props.dispatch({type: 'todolist/addNewTodos', payload: {
        content: this.state.newTodo,
        status: 0,
        isEdit: false
      }});
  }
  delHandle(index) {
    this.props.dispatch({type: 'todolist/delTodosByIndex', payload: index});
  }
  hideEdit(index, e) {
    e.preventDefault();
    this.props.dispatch({type: 'todolist/editTodos', payload: {
        name: 'isEdit',
        value: false,
        key: index
      }});
  }
  statusChange(index, e) {
    this.props.dispatch({type: 'todolist/editTodos', payload: {
      name: 'status',
        value: e.target.checked ? 1: 0,
        key: index
      }});
  }
  clearDone() {
    this.props.dispatch({type: 'todolist/clearDoneTodos'});
  }
  componentDidMount() {
    clearTimeout(timer);
  }

  render() {
    const {
      todolist,
    } = this.props;
    let statusNum = 0;
    todolist.todolist.forEach((value, index) => {
      if (!!value.status) {
        statusNum += 1;
      }
    });
    return (
      <div className={styles.todoapp}>
        <div className={styles.title}>
          <h1>Todos</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.createtodo}>
            <form onSubmit={(e) => this.submitEvent(e)}>
              <input value={this.state.newTodo} placeholder="What needs to be done?" type="text" onChange={(e) => this.handleChange(e)}/>
            </form>
            <span className={styles.uitoolTip}>Press Enter to save this task</span>
          </div>
          <ul className={styles.todolist}>
            {
              todolist.todolist.map((item, index) => {
                return (
                  <li key={index} onDoubleClick={(e) => this.handleDblClick(index, e)}>
                    <div className={!item.status ? styles.todo : styles.done} >
                      <div style={{display: !item.isEdit ? 'block' : 'none'}}>
                        <input checked={!!item.status}  className={styles.check} type="checkbox" onChange={(e) => this.statusChange(index, e)}/>
                        <div className={styles.todocontent}>{item.content}</div>
                        <span onClick={(index) => this.delHandle(index)} className={styles.tododestroy}></span>
                      </div>
                      <div className={styles.editing} style={{display: !item.isEdit ? 'none' : 'block'}}>
                        <form onSubmit={(e) => this.hideEdit(index, e)}>
                          <input onChange={(e) => this.itemHandleChange(index, e)} onBlur={(e) => this.handleBlur(index, e)}    className={styles.todoinput} type="text" value={item.content} ref={`edit_${index}`} />
                        </form>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <div className={styles.todostats}>
            <span className={styles.todoCount}>
              < span className={styles.number}>{todolist.todolist.length}</span>
              <span className={styles.word}>items</span> left.
            </span>
            <span className={styles.todoclear} style={{display: !!statusNum ? 'block': 'none'}}>
              <a href="javascript:;" onClick={() => this.clearDone()}>
                Clear <span className={styles.numberdone}>{statusNum}</span>
                completed <span className={styles.worddone}>items</span>
              </a>
        </span>
          </div>
        </div>
      </div>
  );
  }
  }

  export default connect(({todolist}) => ({todolist}))(Epic);
