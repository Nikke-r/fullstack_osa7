import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../hook'
import { likeBlog, commentBlog } from '../redcuers/blogReducer'

const Details = ({ blog }) => {
    const dispatch = useDispatch()
    const comment = useInput('text')
    const user = useSelector(state => state.allUsers.find(user => user.id === blog.user))

    if (!blog || !user) {
        return null
    }

    const handleLike = (event) => {
        event.preventDefault()
        dispatch(likeBlog(blog))
    }

    const submitComment = (event) => {
        event.preventDefault()
        dispatch(commentBlog(blog.id, comment.value))
    }
    const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }

    return(
        <div style={styles}>
            <Card style={{padding: 10, width: 350, height: 250}}>
                <CardContent>
                    <Typography variant='h3'>
                        { blog.title } { blog.author }
                    </Typography>
                    <Typography variant='h4'>
                        URL: <a href={blog.url}> {blog.url} </a>
                    </Typography>
                    <Typography variant='h5'>
                        Added by: {user.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography>
                        Likes {blog.likes}
                    </Typography>
                    <Button onClick={handleLike} variant='contained' color='primary'>Like</Button>
                </CardActions>
            </Card>
            <Typography variant='h6'>
                Comments
            </Typography>
            <form onSubmit={submitComment} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField placeholder='Comment' {...comment} />
                <Button onClick={submitComment} variant='contained' color='primary' >Comment</Button>
            </form>
            {blog.comments.map((comment, i) => 
                <div style={{padding: 10, margin: 20, border: '1px solid black', width: '200px', borderRadius: 10 }}>
                    <Typography variant='p'>
                        {comment.comment}
                    </Typography>
                </div>
            )}
        </div>
    )
}

export default Details