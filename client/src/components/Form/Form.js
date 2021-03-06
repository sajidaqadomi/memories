import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
import FormInput from "./FormInput";

const Form = ({ currentId, setCurrentId }) => {
    const posts = useSelector((state) => state.posts);

    const methods = useForm({
        defaultValues: {
            creator: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: null,
        },
    });
    const [selectedFile, setSelectedFile] = useState("");

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (methods) {
            methods.register("selectedFile", { value: selectedFile });
        }
    }, [selectedFile, methods]);

    useEffect(() => {
        if (currentId && posts) {
            let prevPost = posts.find((post) => post._id === currentId);

            for (const [key, value] of Object.entries(prevPost)) {
                if (key === "tags") {
                    methods.setValue(key, prevPost.tags.join(","), {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                } else {
                    methods.setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }
        }
    }, [currentId, methods, posts]);

    const clear = () => {
        methods.reset();
        setCurrentId(null);
    };

    const onSubmit = (data) => {
        currentId
            ? dispatch(updatePost(currentId, { ...data, tags: data.tags.split(",") }))
            : dispatch(createPost({ ...data, tags: data.tags.split(",") }));
        clear();
    };

    return (
        <Paper variant="elevation" className={classes.paper}>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <Typography variant="h6" className={classes.title}>
                        {currentId ? `Editing a Memory ` : `Creating a Memory`}
                    </Typography>

                    <FormInput name="creator" label="Creator" />
                    <FormInput name="title" label="Title" />
                    <FormInput name="message" label="Message" multiline rows={4} />
                    <FormInput name="tags" label="Tags ((coma separated))" />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setSelectedFile(base64)}
                        />
                    </div>

                    <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="secondary"
                        size="small"
                        fullWidth
                        onClick={clear}
                    >
                        Clear
                    </Button>
                </form>
            </FormProvider>
        </Paper>
    );
};

export default Form;
