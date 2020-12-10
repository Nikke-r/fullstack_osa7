import blogServices from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIAL_BLOGS':
            return action.blogs
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'REMOVE_BLOG':
            const blogsAfterDeletion = state.filter(blog => blog.id !== action.data)
            return blogsAfterDeletion
        case 'LIKE_BLOG':
            const blog = state.find(blog => blog.id === action.data)
            const modifiedBlog = {...blog, likes: blog.likes + 1}
            return state.map(blog => blog.id === action.data ? modifiedBlog : blog)
        case 'ADD_COMMENT':
            const blogToComment = state.find(blog => blog.id === action.data.id)
            const addCommentToBlog = {...blogToComment, comments: [...blogToComment.comments, {comment: action.data.comment}]}
            return state.map(blog => blog.id === action.data.id ? addCommentToBlog : blog)
        default:
            return state
    }
}

export const fetchInitialBlogs = () => {
    return async dispatch => {
        const blogs = await blogServices.getAll()
        dispatch({ type: 'INITIAL_BLOGS', blogs })
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        const response = await blogServices.createBlog(blog)
        dispatch({ type: 'ADD_BLOG', data: response })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogServices.deleteBlog(id)
        dispatch({ type: 'REMOVE_BLOG', data: id })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogServices.likeBlog(blog)
        dispatch({type: 'LIKE_BLOG', data: blog.id })
    }
}

export const commentBlog = (id, comment) => {
    return async dispatch => {
        await blogServices.addComment(id, comment)
        dispatch({ type: 'ADD_COMMENT', data: { id, comment } })
    }
}

export default reducer