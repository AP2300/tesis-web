import { makeStyles} from '@material-ui/core/styles';

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    profileDate: {
        position: "relative",
        left: "10%",
        margin: "1%",
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 15) * ((20vw - 303px) / (1600 - 300)))",
    },
    btn_changePass: {
        margin: "1%",
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
        placeSelf: "flex-end",
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
        left: "3vmin"
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
            height: "0.2vmax",
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
        top: "-10%",
        left: "1.5vmax"
    },
    bottom: {
        marginTop: "2%",
        width: "90%",
        display: 'flex',
        flexDirection: "row",
        placeContent: "space-between"
    },
}));