import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    [theme.breakpoints.down(`xs`)]: {
        mainContainer: {
            flexDirection: 'column-reverse',
        }

    },
    pagination: {
        marginTop: theme.spacing(2),
        borderRadius: 4,
        padding: theme.spacing(2)
    }


}))