import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import blogService from './services/blogs'
import { fetchInitialBlogs } from './redcuers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redcuers/userReducer'
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'
import { getAllUsers } from './redcuers/allUsersReducer'
import LoginForm from './components/LoginForm'
import TopInfo from './components/TopInfo'
import Notification from './components/Notification'
import Details from './components/Details'
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.allUsers)
  const createBlogFormRef = useRef()
  const blogMatch = useRouteMatch('/blogs/:id')
  const userMatch = useRouteMatch('/users/:id')
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null
  const userDetails = userMatch ? allUsers.find(user => user.id === userMatch.params.id) : null

  useEffect(() => {
    dispatch(fetchInitialBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')

    if (loggedInUser) {
      const userFromStorage = JSON.parse(loggedInUser)
      blogService.setToken(userFromStorage.token)
      dispatch(setUser(userFromStorage))
    }
  }, [dispatch])

  return (
    <Container>
      {notification && <Notification notification={notification} />}
      {user && <TopInfo />}
      <Switch>
        <Route exact path='/'>
          {user ?
          <>
            <Togglable buttonLabel='create' ref={createBlogFormRef} >
              <BlogForm closeForm={createBlogFormRef} />
            </Togglable>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='h5'>
                      Blogs
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map(blog => 
                  <TableRow>
                    <TableCell> 
                      <Link to={`/blogs/${blog.id}`}>
                        <p> {blog.title} </p>
                      </Link>
                    </TableCell>
                    <TableCell> by {blog.author} </TableCell>
                  </TableRow>  
                )}
              </TableBody>
            </Table>
          </>
          :
          <LoginForm />
          }
        </Route>
        <Route exact path='/users'>
        {user ?
        <Table>
        <TableHead>
          <TableRow>
            <TableCell> <h1>Users</h1> </TableCell>
            <TableCell> <h1>Blogs created</h1> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {allUsers.map(user => 
          <TableRow>
            <TableCell>
              <Link to={`/users/${user.id}`}>
                <p> {user.name} </p>
              </Link>
            </TableCell>
            <TableCell>
              <p> {user.blogs.length} </p>
            </TableCell>
          </TableRow>
        )}
        </TableBody>
        </Table>
        :
        <Redirect to='/'/>}
        </Route>
        <Route path='/users/:id'>
          {user ? <User user={userDetails} /> : <Redirect to='/' />}
        </Route>
        <Route path='/blogs/:id'>
          {user ? <Details blog={blog} /> : <Redirect to='/' />}
        </Route>
      </Switch>
    </Container>
  )
}

export default App