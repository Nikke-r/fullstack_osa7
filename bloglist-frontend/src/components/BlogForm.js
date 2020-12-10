import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../redcuers/blogReducer'
import { Button, TextField } from '@material-ui/core'
import { useInput } from '../hook'

const BlogForm = ({ closeForm }) => {
  const dispatch = useDispatch()
  const url = useInput('text')
  const title = useInput('text')
  const author = useInput('text')

  const create = (event) => {
    event.preventDefault()
    dispatch(addBlog({ 
      author: author.value, 
      url: url.value, 
      title: title.value 
    }))
    closeForm.current.toggleVisibility()
  }

  return (
    <div style={{display: "flex", flexDirection: 'column'}}>
      <h2>Create new</h2>
      <form onSubmit={create} style={{display: "flex", flexDirection: 'column'}}>
        <TextField placeholder='title' {...title} />
        <TextField placeholder='author' {...author} />
        <TextField placeholder='url' {...url} />
        <Button variant='contained' type='submit' color='primary'>Create</Button>
      </form>
    </div>
  )
}

export default BlogForm
