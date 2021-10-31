import { makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
    },
    heading: {
        marginRight: 15,
        color: "rgba(0,183,255, 1)",
        textDecoration: "none"
    },
    logo: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2)
        }


    },
    name: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),

    },
    userAvater: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],

    },
    toolbar: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        },

    },
    profile: {
        display: 'flex',
        alignItems: 'center'
    }
}));
