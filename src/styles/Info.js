import { makeStyles} from '@material-ui/core/styles';

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
        left: "10%",
        margin: "1%",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 15) * ((20vw - 303px) / (1600 - 300)))",
    },
    typography: {
        position: "relative",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 16) * ((20vw - 303px) / (1600 - 300)))",
        left: "1.5vmax"
    },
    typographyState: {
        position: "relative",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 16) * ((20vw - 303px) / (1600 - 300)))",
        left: "-25vmax"
    },
    textFields:{
        width: "90%"
    },
    textField: {
        position: "relative",
        width: "100%",
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
}));