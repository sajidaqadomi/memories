import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getPosts } from '../../actions/posts'
import useStyles from './styles'


const PaginationComponent = ({ page }) => {
    const dispatch = useDispatch()
    const { numberOfPages } = useSelector(state => state.posts)
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPosts(page))
    }, [page]);
    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page)}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem component={Link} to={`/posts?page=${item.page}`} {...item} />
            )}

        />
    )
}

export default PaginationComponent
