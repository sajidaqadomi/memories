import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../actions/posts";

import { CommentForm } from "../../Form";
import useStyles from "./styles";

const Comments = () => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [updateComment, setUpdateComment] = useState("");
    const { post } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.authData);
    const dispatch = useDispatch();

    const commentRef = useRef();
    const parentRef = useRef();

    useEffect(() => {

        if (post.comments) {
            setComments(post.comments);
            // commentRef.current.scrollIntoView({ behavior: "smooth" });
            parentRef.current.scrollTo(0, commentRef.current.offsetTop);
        }
    }, [post]);

    const handleUpdate = (id, comment) => {
        setUpdateComment({ id, comment });
    };

    const handleDelete = (id) => {
        dispatch(deleteComment(id));
    };

    return (
        <div className={classes.commentContainer}>
            <div className={classes.comments}>
                <Typography gutterBottom variant="h6">
                    Comments
                </Typography>
                <div
                    style={{ height: 200, overflowY: "auto", margin: 10 }}
                    ref={parentRef}
                >
                    {comments.length ? comments.map((comment) => (
                        <div
                            key={comment._id}
                            className={classes.commentContent}

                        >
                            <Typography gutterBottom variant="subtitle1" style={{ flex: 1 }}>
                                <strong> {comment.creator}</strong> : {comment.comment}
                            </Typography>
                            {(user?.googleId === comment.creatorId ||
                                user?._id === comment.creatorId) && (
                                    <div style={{}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleUpdate(comment._id, comment.comment)}
                                            className={classes.button}

                                        >
                                            UPDATE
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleDelete(comment._id)}

                                        >
                                            DELETE
                                        </Button>
                                    </div>
                                )}
                        </div>
                    )) : null}
                    <div ref={commentRef}></div>
                </div>
            </div>
            <div>
                {user && (
                    <>
                        <Typography
                            gutterBottom
                            variant="h6"
                            className={classes.commentForm}
                        >
                            {updateComment ? "Update" : "Write"} comment
                        </Typography>
                        <CommentForm
                            setComments={setComments}
                            updateComment={updateComment}
                            setUpdateComment={setUpdateComment}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Comments;
