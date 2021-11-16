import { Button, FormHelperText, Paper } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getPostsBySearch } from "../../../actions/posts";
import FormInput from "../FormInput";
import useStyles from "./styles";

var schema = yup.object().shape(
    {
        searchMemories: yup.string().when("tags", {
            is: (tags) => !(tags && tags.length),
            then: yup.string().required(),
            otherwise: yup.string(),
        }),

        tags: yup
            .array()
            .when("searchMemories", {
                is: (searchMemories) => !searchMemories.trim(),
                then: yup.array().of(yup.string()).min(1),
                otherwise: yup.array(),
            }),
    },
    ["searchMemories", "tags"]
); // <-- HERE!!!!!!!!

const Search = () => {
    const methodes = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
        defaultValues: { searchMemories: "", tags: [] },
    });

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors, dirtyFields },
    } = methodes;


    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        register("tags");
    }, [register]);

    useEffect(() => {
        if (methodes && tags) {
            setValue("tags", tags, { shouldDirty: true });
        }
    }, [tags]);

    const handleAddChip = (chip) => {
        setTags((tags) => [...tags, chip]);
    };

    const handleDeleteChip = (chip, index) => {
        setTags((tags) => tags.filter((tag) => tag !== chip));
    };

    const onsubmit = (data) => {
        const { searchMemories, tags } = data;

        if (searchMemories.trim() || tags.length) {
            setTags([]);
            reset();
            dispatch(getPostsBySearch(data));
            history.push(
                `/posts/search?searchQuery=${searchMemories || "none"}&tags=${tags.join(
                    ","
                )}`
            );

            // setTags([]);
        } else {
            history.push(`/`);
        }
    };

    return (
        <Paper elevation={6} className={classes.paper}>
            <FormProvider {...methodes}>
                <FormInput
                    name="searchMemories"
                    label="Search Memories"
                    className={classes.input}
                    showError={false}
                />
                <ChipInput
                    name="tags"
                    variant="outlined"
                    label="Search Tags"
                    fullWidth
                    value={tags}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                    // error={!!errors["tags"]}
                    // helperText={methodes.formState?.errors["tags"]?.message}
                    classes={{ root: classes.input, helperText: classes.helperText }}
                />
                {errors?.tags && errors?.searchMemories && (
                    <FormHelperText
                        error={true}
                        variant="outlined"
                        className={classes.input}
                    >
                        Search must include at least 1 field
                    </FormHelperText>
                )}

                {/* <Controller
                    control={methodes.control}
                    name="tags"
                    // defaultValue={[]}
                    // rules={{ required: true }}
                    render={({ field }) => (
                        <ChipInput
                            variant="outlined"
                            label="Search Tags"
                            fullWidth
                            className={classes.input}
                            onChange={field.onChange}
                            value={field.value}
                        // defaultValue={[]}
                        //  onBlur={field.onBlur}

                        />
                    )}
                /> */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onsubmit)}
                >
                    search
                </Button>
            </FormProvider>
        </Paper>
    );
};

export default Search;
