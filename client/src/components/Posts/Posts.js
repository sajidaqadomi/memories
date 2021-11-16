import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const Posts = () => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const location = useLocation();

    const RenderPosts = () => {
        if (!isLoading && !posts.length)
            return (
                <Paper style={{ padding: "60px 0 60px 15px" }} elevation={6}>
                    <Typography style={{}} variant="h3" component="h1">
                        {location.search ? "No Posts Matched Your Search" : "No Posts Yet"}
                    </Typography>
                </Paper>
            );
        return !isLoading ? (
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6} lg={3}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <CircularProgress />
        );
    };
    return (
        <div>
            <RenderPosts />
        </div>
    );
};

export default Posts;
