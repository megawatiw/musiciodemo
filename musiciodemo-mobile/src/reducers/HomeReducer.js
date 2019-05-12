const INITIAL_STATE = {
  message: '',
  isLoggedIn: true
}

export default (state = INITIAL_STATE, action) => {
  /*switch(action.type) {
    case HOME:
      return {...state, message: action.payload};
    default:
      return state;
  }*/

  if (action.type === 'HOME') {
    return {...state, message: action.payload};
  }
  else if (action.type === 'LOGOUT_SUCCESS') {
    return {...state, message: ''}
  }
  else if (action.type === 'SESSION_NOT_EXISTS') {
    return {...state, isLoggedIn: false}
  }

  return state;
}
