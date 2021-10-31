import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import React from "react";
import {
    ThumbUp,
    ThumbUpAltOutlined,
    Delete,
    MoreHoriz,
} from "@material-ui/icons";

import moment from "moment";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../actions/posts";
import { Link } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.authData);
    console.log(user, post, "in post");

    const deletePost = (id) => {
        dispatch(actions.deletePost(id));
    };

    const likePost = (id) => {
        dispatch(actions.likePost(id));
    };

    const updatePost = (e, id) => {
        console.log(e, id, "propegation")
        e.preventDefault()
        e.stopPropagation()
        setCurrentId(id)
    }

    const Like = () => {
        const likeCount = post.likes.length;
        const likeIndex = post.likes.findIndex(
            (like) => like === user?._id || like === user?.googleId
        );
        console.log(likeCount, likeIndex, 'countindex')
        if (likeCount >= 1) {
            return likeIndex >= 0 ? (
                <> <ThumbUp fontSize="small" />&nbsp;
                    {likeCount <= 2
                        ? `${likeCount}like${likeCount === 1 ? "" : "s"}`
                        : `you and ${likeCount - 1} other`}</>


            ) : (
                <> <ThumbUpAltOutlined fontSize="small" /> &nbsp;{`${likeCount} Like${likeCount === 1 ? '' : 's'}`}</>


            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like </>;
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardActionArea component={Link} to={`/posts/${post._id}`}>
                <CardMedia image={post.selectedFile} className={classes.media} />
                <div className={classes.overlayContent}>
                    <div>
                        <Typography>{post.creator}</Typography>
                        <Typography>{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                    <div>
                        {(user?.googleId === post.creatorId ||
                            user?._id === post.creatorId) && (
                                <Button
                                    className={classes.moreBtn}
                                    onClick={(e) => updatePost(e, post._id)}
                                >
                                    <MoreHoriz fontSize="small" />
                                </Button>
                            )}
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
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button
                    color="primary"
                    size="small"
                    disabled={!(user?.googleId || user?._id)}
                    onClick={() => likePost(post._id)}
                >
                    <Like />
                </Button>
                {(user?.googleId === post.creatorId ||
                    user?._id === post.creatorId) && (
                        <Button
                            color="secondary"
                            size="small"
                            onClick={() => deletePost(post._id)}
                        >
                            <Delete fontSize="small" /> DELETE
                        </Button>
                    )}
            </CardActions>
        </Card>
    );
};

export default Post;
