import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import { CallMissedSharp } from '@material-ui/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getPost, getPostsBySearch } from '../../actions/posts'
import RecommendedPost from './RecommendedPost'

import useStyles from './styles'

const Post = () => {
    const [recommended, setRecommended] = useState([])
    const dispatch = useDispatch()
    const { post, posts, isLoading } = useSelector(state => state.posts)
    const { id } = useParams()

    const classes = useStyles()

    useEffect(() => {
        if (id) dispatch(getPost(id))

    }, [id])

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ searchMemories: 'none', tags: post?.tags }))
            // setRecommended(posts)
        }

    }, [post])

    useEffect(() => {

        if (post) {
            console.log('in set recom effect when posts chang', post, 'post', posts, 'posts')
            setRecommended(posts.filter(item => item._id !== id))
        }

    }, [posts])

    useEffect(() => {
        { console.log(recommended, 'recom') }
    }, [recommended])



    if (!post) return null
    if (isLoading) return (
        <Paper className={classes.paper} raised elevation={6}>
            <div style={{ display: 'flex', justifyContent: 'center', height: '40vh', alignItems: 'center' }}>
                <CircularProgress size={50} />
            </div>
        </Paper>
    )


    return (
        <Paper className={classes.paper} raised elevation={6}>
            <div className={classes.card}>
                <div className={classes.postDetail}>
                    <Typography variant='h3' component='h2'>{post.title}</Typography>
                    <Typography variant='h6' color='textSecondary'>{post.tags.map(tag => `#${tag} `)}</Typography>
                    <Typography variant='body1'>{post.message}</Typography>
                    <Typography variant='h6'>Created by: {post.creator}</Typography>
                    <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.mediaContainer} >
                    <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} className={classes.img} alt='post image' />
                </div>
            </div>

            {

                recommended.length > 0 ? (
                    <div className={classes.recommendedSection} >
                        <Typography variant='h6' gutterBottom>You might also like:</Typography>
                        <Divider />
                        <div className={classes.recommendedContainer}>
                            {
                                recommended.map((item) => <RecommendedPost post={item} />)
                            }
                        </div>

                    </div>

                ) : (null)
            }



        </Paper>
    )
}

export default Post