import { makeStyles } from '@material-ui/core/styles';

let useStyles = "";
export default useStyles = makeStyles((theme) => ({
    ParentContainer:{
        backgroundColor: "#FBFBFB",
        borderRadius: "0.5em",
        height: "100%",
        width: "100%",
    },
    TitleContainer:{
        backgroundColor: "#F3F3F3",
        borderRadius: "0.5em",
        color: "#000000a6",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(13px + (40 - 13) * ((45vw - 303px) / (1600 - 300)))",
        fontWeight: "600",
    },
    content: {
        padding: "3%",
        display: "flex",
        justifyContent: "space-evenly"
    }
}))