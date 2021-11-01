import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

import useStyles from './styles'

const RecommendedPost = ({ post: { title, message, creator, likes, selectedFile, _id } }) => {
    const classes = useStyles()
    return (
        <Paper className={classes.card} component={Link} to={`/posts/${_id}`} elevation={3}>
            <div >
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle1'>{creator}</Typography>
                <Typography gutterBottom variant='subtitle1'>{message}</Typography>
                <Typography gutterBottom variant='subtitle2'>Likes:{likes.length}</Typography>
                <div>
                    <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='postImage' width={200} />
                </div>

            </div>
        </Paper>
    )
}

export default RecommendedPost
