import key from 'keymaster';
export  default  {
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  effects: {
    *add(action, {call, put}) {
      yield call(delay, 1000);
      yield put({type: 'mius'});
    }
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    mius(state) {
      return {...state, current: state.current - 1};
    },
  },
  subscriptions : {
    keyboardWatch({dispatch}) {
      key('ctrl+up, ⌘+up', () => {dispatch({type: 'add'})});
    }
  }
};

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
