import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, defaultValue, label, showError = true, ...rest }) => {
    const methods = useFormContext();
    return (
        <Controller
            name={name}
            control={methods.control}
            //  defaultValue={defaultValue ? defaultValue : ''}
            render={({ field }) => (
                <TextField
                    InputLabelProps={field.value ? { shrink: true } : {}}
                    label={label}
                    variant="outlined"
                    {...field}
                    error={!!methods.formState?.errors[name]}
                    helperText={showError && methods.formState?.errors[name]?.message}
                    // onChange={field.onChange}
                    // onBlur={field.onBlur}
                    fullWidth
                    {...rest}
                />
            )}
        />
    );
};

export default FormInput;
