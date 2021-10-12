import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, label, ...rest }) => {
    const methods = useFormContext();
    return (
        <Controller
            name={name}
            control={methods.control}
            render={({ field }) => (
                <TextField
                    InputLabelProps={field.value ? { shrink: true } : {}}
                    label={label}
                    variant="outlined"
                    {...field}
                    fullWidth
                    {...rest}
                />
            )}
        />
    );
};

export default FormInput;
