import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const styles = {
    border: 'solid',
    margin: 10,
    padding: 5,
  }

  return(
    <div style={styles} className='blog' id='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <p>{blog.title} {blog.author}</p>
        </Link>
      </div>
    </div>
  )
}

export default Blog
