// proses membuat redux

// nilai default
const initialState = {
    popup : false,
    isLogin : false,
    isLoading : false,
    user : {},
    notes : []
  }
  
  // method untuk meubah
  const reducer = (state = initialState, action) => {
    // logic sebagai pembeda action apa yang akan dilakukan oleh user
    if(action.type === 'CHANGE_POPUP') {
      return {
        // copy value dari initialState agar tidak diubah semua
        ...state,
        popup : action.value
      }
    }
    if(action.type === 'CHANGE_LOGIN') {
      return {
        ...state,
        isLogin : action.value
      }
    }
    if(action.type === 'CHANGE_USER') {
      return {
        ...state,
        user : action.value
      }
    }
    if(action.type === 'CHANGE_LOADING') {
      return {
        ...state,
        isLoading : action.value
      }
    }
    if(action.type === 'SET_NOTES') {
      return {
        ...state,
        notes : action.value
      }
    }
    return state;
  }

  export default reducer;
  