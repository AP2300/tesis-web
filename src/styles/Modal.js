import { makeStyles} from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: "1em",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 0),
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    close: {
        fontSize: "1em",
        borderRadius: "1em",
        color: "#f44336",
        backgroundColor: "#f4433612",
    },
    continue:{
        fontSize: "1em",
        borderRadius: "1em",
        color: "#2196f3",
        backgroundColor: "#2196f312",
    },
    bottom: {
        paddingTop: "3%",
        paddingBottom: "3%",
        display: "flex",
        justifyContent: "space-between",
    },
}));