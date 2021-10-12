import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import React from "react";
import { ThumbUp, Delete, MoreHoriz } from "@material-ui/icons";
import moment from "moment";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import * as actions from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const deletePost = (id) => {
        dispatch(actions.deletePost(id));
    };

    const likePost = (id) => {
        dispatch(actions.likePost(id));
    };

    return (
        <Card className={classes.card}>
            <CardMedia image={post.selectedFile} className={classes.media} />
            <div className={classes.overlayContent}>
                <div>
                    <Typography>{post.creator}</Typography>
                    <Typography>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div>
                    <Button
                        className={classes.moreBtn}
                        onClick={() => setCurrentId(post._id)}
                    >
                        <MoreHoriz fontSize="small" />
                    </Button>
                </div>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <CardContent>
                <Typography
                    className={classes.title}
                    variant="h5"
                    gutterBottom
                    component="h2"
                >
                    {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button color="primary" size="small" onClick={() => likePost(post._id)}>
                    <ThumbUp fontSize="small" /> &nbsp;LIKE&nbsp; {post.likeCount}
                </Button>
                <Button
                    color="secondary"
                    size="small"
                    onClick={() => deletePost(post._id)}
                >
                    <Delete fontSize="small" /> DELETE
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
