import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from "../../styles/Profile";

export default function Profile(props) {
    const {Data}= props;
    const classes = useStyles();

    return(
        <div className={classes.root}>

            <div className={classes.container}>
                <div className={classes.container_avatar}>
                    <Avatar className={classes.avatar} alt="" src="" />
                    <Paper elevation={0} className={classes.username}>
                        <Typography className={classes.typography}>{props.Data.FullName}</Typography>
                    </Paper>
                </div>
                
                <div className={classes.container_buttons}>
                    <Button variant="contained" className={classes.button_Edit}>
                        <Typography className={classes.typography}>Editar Perfil</Typography>
                    </Button>

                    <Button variant="contained" className={classes.button_idk}>
                        <Typography className={classes.typography}>IDK</Typography>
                    </Button>
                </div>
            </div>

            <Paper elevation={0} className={classes.GraphBox}/>


        </div>
    );
}