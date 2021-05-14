import React, { useState, useEffect } from 'react';
import { Ellipsis } from 'react-css-spinners'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GetUserData } from "../api/user"
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "2%",
        marginRight: "2%",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        "& > *": {
            color: "#4f4f4f"
        }
    },
    cont: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        "& .codeCont": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "4%"
        }
    },

    number: {
        backgroundColor: "#ececec",
        color: "#ff6d6d",
        width: "15vw",
        height: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3.5rem",
        margin: "1.5%",
        borderRadius: "5px",
        fontWeight: "600",
        boxShadow: "3px 3px 2px 1px #4f4f4f61"
    }
}));

export default function LoadingComp() {
    const classes = useStyles()
    const history = useHistory()
    const [IsAdmin, setIsAdmin] = useState("")

    useEffect(() => {
        if (IsAdmin === "") getUserData()
    })

    const getUserData = async () => {
        const res = await GetUserData()
        if (res) setIsAdmin(res.res.IsAdmin)
        else history.push("/")

    }

    function handleReturn() {
        history.push("/home")
    }
    function loadAnimation() {
        return (
            <div className={classes.cont}>
                <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                    Verificando privilegios...
                </Typography>
                <Ellipsis size={120} color={"#4f4f4f"} />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            {IsAdmin === "" ?
                    loadAnimation()
                : IsAdmin === 0 ?
                    <div className={classes.cont}>
                        <div className="codeCont">
                            <Typography className={classes.number}>4</Typography>
                            <Typography className={classes.number}>0</Typography>
                            <Typography className={classes.number}>3</Typography>
                        </div>
                        <Typography className={classes.text} gutterBottom variant="h2" component="h2" style={{ color: "#ff6d6d" }} align="center">
                            Acceso Denegado
                    </Typography>
                        <Button onClick={handleReturn}
                            style={{ fontSize: "1.5em", color: "#4f4f4f" }}>
                            Volver a home
                    </Button>
                    </div>
                    :
                    loadAnimation()
                    }
        </div>
    )
}