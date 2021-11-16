import React from 'react'
import { Container, Grid, Grow, Paper } from "@material-ui/core";

import { Pagination, Posts } from '../../components';
import { PostForm, SearchForm } from '../../components/Form';
import useStyles from './styles'
import { useLocation } from 'react-router';

const Home = () => {
    const classes = useStyles()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const page = useQuery().get('page') || 1;
    const searchQuery = useQuery().get('searchQuery');
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={classes.mainContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <SearchForm />
                        <PostForm />
                        {(page && !searchQuery) && <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
