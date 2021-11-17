import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    button: {
        margin: "0 8px",
        [theme.breakpoints.down('md')]: {
            margin: '8px 8px 8px 0',
        }

    },
    commentContainer: {
        display: "flex"
    },
    commentContent: {
        display: "flex",
        justifyContent: "space-between",
        //alignItems: "center",
        margin: "8px 0 8px 0",
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        }

    },
    comments: {
        flex: 1,
        marginRight: 20,

    },
    commentForm: {

    }



}))