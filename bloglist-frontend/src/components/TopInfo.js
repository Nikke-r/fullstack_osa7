import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../redcuers/userReducer'

const TopInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const styles = {
        content: {
            'display': 'flex',
            'flex-direction': 'row',
            'align-items': 'center',
            'background-color': 'gray',
            'justify-content': 'space-between',
            'padding': 5,
        },
        links: {
            'display': 'flex',
            'flex-direction': 'row'
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('user')
        dispatch(removeUser())
    }

    return(
        <AppBar position='static' style={{marginBottom: 20}}>
            <Toolbar style={{ justifyContent: 'space-between'}}>
                <div>
                    <Link to='/'>
                        <Button>Blogs</Button>
                    </Link>
                    <Link to='/users'>
                        <Button>Users</Button>
                    </Link>
                </div>
                <div>
                    <Typography>
                        {user.name} logged in.
                    </Typography>
                </div>
                <div>
                    <Button onClick={handleLogOut} >Logout</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default TopInfo