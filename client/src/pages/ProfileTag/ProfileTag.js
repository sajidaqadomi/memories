import React, { useEffect } from 'react'
import { Container, Typography, Divider, Grid } from '@material-ui/core'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts'
import Posts from '../../components/Posts/Posts'

const ProfileTag = () => {
    const { name } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()


    useEffect(() => {
        if (location.pathname.startsWith('/tags')) {
            dispatch(getPostsBySearch({ searchMemories: 'none', tags: [name] }))
        } else {
            dispatch(getPostsByCreator(name))
        }
    }, [])


    return (
        <Container maxWidth='lg'>
            <Typography variant='h2'>
                {name}
            </Typography>
            <Divider style={{ margin: '20px 0 50px 0' }} />
            <Posts setCurrentId />
        </Container>
    )
}

export default ProfileTag
