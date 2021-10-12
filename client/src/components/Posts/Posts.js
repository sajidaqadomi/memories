import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);

    console.log(posts, "in posts selector");

    const RenderPosts = () => {
        return posts.length ? (
            <Grid container spacing={2} >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6}>
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
