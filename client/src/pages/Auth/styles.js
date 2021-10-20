import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(3),

    },
    icon: {
        margin: 'auto',
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        padding: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)

    },
    title: {
        textAlign: 'center'
    }

}))