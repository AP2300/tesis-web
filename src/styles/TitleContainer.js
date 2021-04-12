import { makeStyles } from '@material-ui/core/styles';

let useStyles = "";
export default useStyles = makeStyles((theme) => ({
    ParentContainer:{
        backgroundColor: "#FBFBFB",
        borderRadius: "0.5em",
        height: "100%",
        width: "100%",
        padding: "3% 3% 3% 3%"
    },
    TitleContainer:{
        backgroundColor: "#F3F3F3",
        borderRadius: "0.5em",
        height: "40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(15px + (50 - 15) * ((55vw - 303px) / (1600 - 300)))",
        padding: "4.5%",
        marginBottom: "3%",
        marginLeft: "-3%",
        marginRight: "-3%",
        marginTop: "-3%"

    }
}))