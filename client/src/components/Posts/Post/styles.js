import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    actions: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        position: 'relative'

    },
    details: {
        margin: 20

    },
    media: {
        paddingTop: '47%',
        backgroundColor: 'rgba(0,0,0,.5)',
        backgroundBlendMode: 'darken',
        backgroundSize: 'contain'

    },
    overlayContent: {
        position: 'absolute',
        top: 20,
        left: 20,
        display: 'flex',
        right: 20,
        justifyContent: 'space-between',
        color: 'white'

    },
    moreBtn: {
        color: "white"
    }




}))