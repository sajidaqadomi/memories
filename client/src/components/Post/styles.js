import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    card: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        }

    },
    paper: {
        padding: 20,
        borderRadius: 15,
    },
    postDetail: {
        flex: 1,
        margin: 10,

    },
    recommendedSection: {
        margin: 10,
    },
    recommendedContainer: {
        display: "flex",
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',

        }

    },
    mediaContainer: {
        marginLeft: 20,
        borderRadius: 15,
        overflow: 'hidden',
        width: '500px',
        height: 400,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '100%',
            height: '100%',
            maxHeight: '40vh'
        }
    },




    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'


    }



}))