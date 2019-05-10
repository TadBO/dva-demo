export default {
  namespace: 'menus',
  state: {
    current: {
      navname: 'home',
      pathname: 'home',
    },
  },
  reducers: {
    resetCurrent(state, action) {
      return {
        ...state,
        current: action.payload
      }
    },
    setNavName(state, action) {
      if (state.current.navname === action.payload) {
        action.payload = '';
      }
      return {
        ...state,
        current: {
          navname: action.payload,
          pathname: state.current.pathname
        }
      }
    },
  },
  subscriptions: {
    routeChangeWatch({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/') {
          pathname = '/home/home';
        }
        dispatch({type: 'resetCurrent', payload: {
          navname: pathname.split('/')[1],
          pathname: pathname.split('/')[2],
          }})
      });
    }
  }
}
