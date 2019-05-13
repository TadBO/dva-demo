import key from 'keymaster'
export default {
  namespace: 'todolist',
  state: {
    todolist: [
      {
        content: '213132131',
        status: 1,
        isEdit: false
      }
    ]
  },
  reducers: {
    addNewTodos(state, action) {
      state.todolist.push(action.payload);
      return {
        ...state,
      }
    },
    delTodosByIndex(state, action) {
      state.todolist.splice(action.payload, 1);
      return {
        ...state,
      }
    },
    editTodos(state, {payload}) {
      state.todolist[payload.key][payload.name] = payload.value;
      return {
        ...state,
      }
    },
    clearDoneTodos(state) {
      return {
        ...state,
        todolist: state.todolist.filter((item) => {
          return item.status === 0
        })
      }
    }
  },
  effects: {},
  subscriptions: {
  }
};
