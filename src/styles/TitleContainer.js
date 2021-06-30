import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ParentContainer:{
        backgroundColor: "#99c0c62e",
        borderRadius: "0.5em",
        height: "100%",
        width: "100%",
    },
    TitleContainer:{
        backgroundColor: "#1a7769",
        borderRadius: "0.5em",
        color: "whitesmoke",
        height: "50px",
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