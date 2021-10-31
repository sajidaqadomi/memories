import { Button, Paper } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getPostsBySearch } from "../../../actions/posts";

import FormInput from "../FormInput";
import useStyles from "./styles";

const Search = () => {
    const methodes = useForm();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()

    const onsubmit = (data) => {
        const { searchMemories, tags } = data

        if (searchMemories.trim() || tags.length) {
            dispatch(getPostsBySearch(data))
            history.push(`/posts/search?searchQuery=${searchMemories || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push(`/`)
        }
    };

    return (
        <Paper elevation={6} className={classes.paper}>
            <FormProvider {...methodes}>
                <FormInput name="searchMemories" label="Search Memories" defaultValue='' />
                <Controller
                    control={methodes.control}
                    name="tags"
                    defaultValue={[]}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <ChipInput
                            variant="outlined"
                            label="Search Tags"
                            fullWidth
                            className={classes.input}
                            onChange={onChange}
                        //value={value}
                        //onBlur={onBlur}


                        />
                    )}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={methodes.handleSubmit(onsubmit)}

                >
                    search
                </Button>
            </FormProvider>
        </Paper>
    );
};

export default Search;
