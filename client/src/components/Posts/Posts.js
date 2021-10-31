import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);


    const RenderPosts = () => {
        if (!isLoading && !(posts.length)) return 'no posts'
        return !isLoading ? (
            <Grid container spacing={2} >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6} lg={4} xl={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
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
