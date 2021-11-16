import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import * as actions from "../../../actions/posts";
import FormButton from "../FormButton";
import FormInput from "../FormInput";

const CommentForm = ({ setComments, updateComment, setUpdateComment }) => {
    const methodes = useForm({
        defaultValues: {
            comment: "",
        },
    });
    const { user } = useSelector((state) => state.authData);
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch();
    const { id } = useParams();

    let [comment] = methodes.watch(["comment"]);

    useEffect(() => {
        if (comment.trim()) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [comment]);

    useEffect(() => {
        if (updateComment) {
            methodes.setValue("comment", updateComment.comment, {
                shouldDirty: true,
            });
        }
    }, [updateComment]);

    const onSubmit = (data) => {
        if (user) {
            updateComment
                ? setComments((comments) => {
                    return comments.map((comment) =>
                        comment._id === updateComment.id
                            ? { ...comment, comment: data.comment }
                            : comment
                    );
                })
                : setComments((comments) => [
                    ...comments,
                    { ...data, creator: user.name },
                ]);
            updateComment
                ? dispatch(actions.updateComment(updateComment.id, { ...data }))
                : dispatch(actions.commentPost(id, { creator: user.name, ...data }));
        }
        methodes.reset();
        setUpdateComment("");
        setDisable(true);
    };

    return (
        <FormProvider {...methodes}>
            <form>
                <FormInput name="comment" label="comment" multiline rows={4} required />
                <FormButton
                    disabled={disable}
                    onClick={methodes.handleSubmit(onSubmit)}
                >
                    {updateComment ? "Update" : "Comment"}
                </FormButton>
            </form>
        </FormProvider>
    );
};

export default CommentForm;
