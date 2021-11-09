import { Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { CommentForm } from "../../Form";
import useStyles from "./styles";

const Comments = () => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const { post } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.authData);
    const commentRef = useRef();

    useEffect(() => {
        if (post) {
            setComments(post.comments);
            commentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [post]);

    return (
        <div className={classes.commentContainer}>
            <div className={classes.comments}>
                <Typography gutterBottom variant="h6">
                    Comments
                </Typography>
                <div style={{ height: 200, overflowY: "auto", margin: 10 }}>
                    {comments?.map((comment) => (
                        <Typography gutterBottom variant="subtitle1" key={comment._id}>
                            <strong> {comment.creator}</strong> : {comment.comment}
                        </Typography>
                    ))}
                    <div ref={commentRef}></div>
                </div>
            </div>
            <div>
                {user && (<>
                    <Typography gutterBottom variant="h6" className={classes.commentForm}>
                        Write comment
                    </Typography>
                    <CommentForm />
                </>)}
            </div>
        </div>
    );
};

export default Comments;
