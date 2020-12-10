import { Table, TableRow, Typography, TableBody, TableHead, TableCell } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {

    if (!user) {
        return null
    }

    return(
        <div>
            <Typography variant='h5'>
                {user.name}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='h4'>
                                Added blogs
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {user.blogs.map(blog => 
                    <TableRow>
                        <TableCell>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Link>
                        </TableCell>
                    </TableRow>    
                )}
                </TableBody>
            </Table>
        </div>
    )
}

export default User