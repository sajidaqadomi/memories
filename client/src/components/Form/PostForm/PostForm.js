import React, { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormHelperText, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";

import { createPost, updatePost } from "../../../actions/posts";
import useStyles from "./styles";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { UpdateContext } from "../../../contexts/UpdateContext";

const schema = yup
    .object({
        title: yup.string().min(3, "Title_too_short").required(),
        message: yup.string().min(6, "Message_too_short").required(),
        tags: yup.string(),
        selectedFile: yup.lazy((value) =>
            /^data/.test(value)
                ? yup.string().nullable()
                    .trim()
                    .matches(
                        /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,

                        'Must be a valid Image',
                    )

                : yup.string().nullable(true)
        ),
    }).required();

const Form = () => {
    const authData = useSelector(state => state.authData)
    const { posts } = useSelector((state) => state.posts);
    const history = useHistory()

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues: {
            title: "",
            message: "",
            tags: "",
            selectedFile: null,
        },
    });
    //  const [selectedFile, setSelectedFile] = useState("");
    const { currentId, setCurrentId } = useContext(UpdateContext)

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        methods.register("selectedFile");

    }, [methods.register]);

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

    const handleSelectedFile = (base64) => {
        // console.log(base64, 'base64')
        // setSelectedFile(base64)
        methods.setValue('selectedFile', base64, { shouldValidate: 'true', shouldDirty: 'true' })
    }

    const clear = () => {
        methods.reset();
        setCurrentId(null);
    };

    const onSubmit = (data) => {
        currentId
            ? dispatch(updatePost(currentId, { ...data, creator: authData?.user?.name, tags: data.tags.split(",") }, history))
            : dispatch(createPost({ ...data, creator: authData?.user?.name, tags: data.tags.split(",") }, history));
        clear();
    };

    if (!authData?.user?.name) return (
        <Paper className={classes.paper} elevation={6}>
            <Typography variant='h6' align='center'>
                Please Sign In to create your own memories and react with other's memories.
            </Typography>
        </Paper>
    )

    return (
        <Paper variant="elevation" className={classes.paper} elevation={6}>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <Typography variant="h6" className={classes.title}>
                        {currentId ? `Editing a Memory ` : `Creating a Memory`}
                    </Typography>

                    {/* <FormInput name="creator" label="Creator" /> */}
                    <FormInput name="title" label="Title" />
                    <FormInput name="message" label="Message" multiline rows={4} />
                    <FormInput name="tags" label="Tags ((coma separated))" />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => handleSelectedFile(base64)}
                        />
                        {
                            methods.formState.errors?.selectedFile && (
                                <FormHelperText
                                    error={true}
                                    variant="outlined"
                                    className={classes.input}
                                >
                                    {methods.formState.errors?.selectedFile.message}
                                </FormHelperText>
                            )
                        }
                    </div>


                    <FormButton
                        className={classes.buttonSubmit}
                        type="submit"
                    >
                        Submit
                    </FormButton>
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
