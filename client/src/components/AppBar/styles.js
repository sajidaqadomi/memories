import { makeStyles } from "@material-ui/core";

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
        justifyContent: 'center',
        alignItems: 'center'


    },
    name: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),

    },
    toolbar: {

    },
    profile: {
        display: 'flex',
        alignItems: 'center'
    }
}));
