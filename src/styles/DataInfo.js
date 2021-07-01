import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

export default makeStyles((theme) => ({
    Card: {
        width: "50%",
        height: "100%",
        marginRight: "2%",
        [sizes.Wdown("xs")]: {
            height: "100%",
            width: "100%"
        }
    },
    Cardgrid: {
        padding: "2%",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    header: {
        height: "25%",
        backgroundColor:" #1a7769",
        boxShadow: "2px 4px 5px",
        color: "whitesmoke",
    },
content: {
    height: "75%",
    },
List: {
        position: 'relative',
            overflowY: 'auto',
                height: "100%"
},
Divider: {
    marginTop: "1%",
        marginBottom: "1%",
    },
message: {
    display: "flex",
        height: "100%",
            justifyContent: "center",
                alignItems: "center",
                    "&& > *": {
        fontSize: "2em",
            [sizes.Wdown("xs")]: {
            margin: "12%"
        }
    },
},
}));