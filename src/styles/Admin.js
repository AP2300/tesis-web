import { makeStyles} from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        margin: "2vmin",
    },
    profileDate: {
        position: "relative",
        left: "17vmax",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 15) * ((20vw - 303px) / (1600 - 300)))",
    },
    btn_changePass: {
        marginTop: '1vmin',
        background: "white",
        width: "45vmin",
        height: "2vmax",
        position: "relative",
        borderRadius: "40px",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    btn_update: {
        background: "white",
        width: "30vmin",
        height: "2vmax",
        position: "relative",
        left: "25vmax",
        borderRadius: "40px",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    typography: {
        position: "relative",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 16) * ((20vw - 303px) / (1600 - 300)))",
        left: "1.5vmax"
    },
    typographybtn: {
        fontWeight: 600,
        fontSize: "calc(14px + (24 - 16) * ((20vw - 303px) / (1600 - 300)))",
    },
    typographyState: {
        position: "relative",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 16) * ((20vw - 303px) / (1600 - 300)))",
        left: "-25vmax"
    },
    textField: {
        position: "relative",
        width: "80vmax",
        "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
            backgroundColor:"#bdbdbd6e",
        },        

        marginBottom: "1vmax",
        ["& input"]:{
            height: "0.5vmax",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
          },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3f51b5"
          },

    }, 
    switch: {
        color: "green",
        position: "relative",
        left: "-25vmax"
    },
}));