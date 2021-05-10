import { makeStyles} from '@material-ui/core/styles';

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    red: {
        backgroundColor: "#f44336"
    },
    green: {
        backgroundColor: "#4caf50"
    },
    orange: {
        backgroundColor: "#ff9800",
    },
    Noti: {
        width: "70vw",
        maxWidth: "500px",
        height: "9vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: "600",
        padding: "2%",
        cursor: "default",
        color: "#fff",

    },
    textContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        fontFamily: theme.typography.fontFamily,
        fontWeight: "400",
        "& .icon": {
            marginRight: "2.5%",
            "& > *": {
                fontSize: "3em",
            }
        },
        "& > .closeIcon": {
            marginLeft: "4%",
        }
    },
}));