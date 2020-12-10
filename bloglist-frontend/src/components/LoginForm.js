import React from 'react'
import { useDispatch } from 'react-redux'
import { useInput } from '../hook'
import { setNotification } from '../redcuers/notificationReducer'
import { setUser } from '../redcuers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { Button, TextField, Typography } from '@material-ui/core'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useInput('text')
    const password = useInput('password')

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username: username.value,
          password: password.value,
        })
  
        if (user === undefined) {
          dispatch(setNotification('Wrong username or password', 5))
          return
        }
  
        window.localStorage.setItem('user', JSON.stringify(user))
  
        dispatch(setUser(user))
        blogService.setToken(user.token)
      } catch (error) {
        dispatch(setNotification(error.message, 5))
      }
    }

    const styles = {
      center: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        marginTop: 20
      }
    }

    return(
        <div style={styles.center}>
            <Typography variant='h5'>
              Login to application
            </Typography>
            <form onSubmit={handleLogin} style={styles.form}>
              <TextField placeholder="username" {...username} />
              <TextField placeholder="password" {...password} />
              <Button type='submit' variant='contained' color='primary' >Login</Button>
            </form>
        </div>
    )
}

export default LoginForm