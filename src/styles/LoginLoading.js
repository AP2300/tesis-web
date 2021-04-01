import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    cont: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "60%"
    },

    root: {
        display: "inline-block",
        position: "relative",
        width: "80px",
        height: "80px",
    
        "&& div": {
            position: "absolute",
            top: "33px",
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background: "black",
            animationTimingFunction: "cubic-bezier(0, 1, 1, 0)"
        },

        "&& div:nth-child(1)": {
            left: "8px",
            animationName: "$ldsellipsis1",
            animationDuration: "0.6s",
            animationIterationCount: "infinite"
        },

        "&& div:nth-child(2)": {
            left: "8px",
            animationName: "$ldsellipsis2",
            animationDuration: "0.6s",
            animationIterationCount: "infinite"
        },

        "&& div:nth-child(3)": {
            left: "32px",
            animationName: "$ldsellipsis2",
            animationDuration: "0.6s",
            animationIterationCount: "infinite"
        },

        "&& div:nth-child(4)": {
            left: "56px",
            animationName: "$ldsellipsis3",
            animationDuration: "0.6s",
            animationIterationCount: "infinite"
        }
    },

    "@keyframes ldsellipsis1": {
        "0%": {
            transform: "scale(0)"
        },
        "100%": {
            transform: "scale(1)"
        }
    },

    "@keyframes ldsellipsis3": {
        "0%": {
            transform: "scale(1)"
        },
        "100%": {
            transform: "scale(0)"
        }
    },

    "@keyframes ldsellipsis2": {
        "0%": {
            transform: "translate(0, 0)"
        },
        "100%": {
            transform: "translate(24px, 0)"
        }
    },

    text: {
        marginTop: "60px",
    }
}));

