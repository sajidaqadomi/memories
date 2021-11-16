import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Slide, Snackbar } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";

const Toast = ({ open, title, onClose, message, type }) => {
    return (
        // <Alert >{"This is an error alert — check it out!"}</Alert>
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={4000}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            TransitionComponent={(props) => <Slide direction='down'{...props} />}
        >
            <Alert severity={type}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
