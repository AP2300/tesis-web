import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from "../../styles/Profile";
import { ChangeOption, otherPage } from "../../helpers/Profile"
import { useHistory } from 'react-router';

export default function Profile(props) {
    const history = useHistory();
    const classes = useStyles();
    const { Data } = props;

    function ChangePage(e) {
        let path = otherPage(e);
        if (path) {
          history.push(path);
        }
    }

    return (
        <div className={classes.root}>

            <div className={classes.container}>
                <div className={classes.container_avatar}>
                    <Avatar className={classes.avatar} alt="" src="" />
                    <Paper elevation={0} className={classes.username}>
                        <Typography className={classes.typography}>{Data.FullName}</Typography>
                    </Paper>
                </div>

                <div className={classes.container_buttons}>
                    <Button variant="contained" className={classes.btn_info} onClick={ChangePage}>
                        <Typography className={classes.typography}>Visualizar Datos</Typography>
                    </Button>

                    <Button variant="contained" className={classes.btn_edit} onClick={ChangePage}>
                        <Typography className={classes.typography}>Editar Perfil</Typography>
                    </Button>
                </div>
            </div>

            <Paper elevation={0} className={classes.GraphBox} >
                {ChangeOption()}
            </Paper>


        </div>
    );
}