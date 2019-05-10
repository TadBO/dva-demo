export default {
  namespace: 'todos',
  state: {
    todos: [
      {text: 1231},
      {text: 2313},
      {text: 679878},
    ]
  },
  reducers: {
    delTodo(state, action) {
      state.todos.splice(action.payload, 1);
      return {
        ...state,
        todos: state.todos
      };
    },
  },
  effects: {
    *delTodos(action, {call, put}) {
      yield call(delay, 1000);
      yield put({type: 'delTodo', payload: action.payload});
    }
  }
}


function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
