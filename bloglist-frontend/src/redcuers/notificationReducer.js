const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

let timeout

export const setNotification = (notification, seconds) => {
    return dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', notification })

        if (timeout !== undefined) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, (seconds * 1000))
    }
}

export default reducer