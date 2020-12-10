const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_LOGGEDIN_USER':
            return action.data
        case 'REMOVE_LOGGEDIN_USER':
            return null
        default:
            return state
    }
}

export const setUser = (user) => {
    return dispatch => {
        dispatch({ type: 'SET_LOGGEDIN_USER', data: user })
    }
}

export const removeUser = () => {
    return dispatch => {
        dispatch({ type: 'REMOVE_LOGGEDIN_USER' })
    }
}

export default reducer