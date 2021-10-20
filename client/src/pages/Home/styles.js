import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    [theme.breakpoints.down(`xs`)]: {
        mainContainer: {
            flexDirection: 'column-reverse',
        }

    }


}))