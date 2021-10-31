import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
    },
    fileInput: {
        margin: "10px 0",
    },
    form: {
        "& .MuiTextField-root": {
            margin: `${theme.spacing(1)}px 0`,
        },
    },
    buttonSubmit: {
        marginBottom: 10,
    },
}));
