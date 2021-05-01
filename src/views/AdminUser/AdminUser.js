import React, { useState, useEffect } from 'react';
import useStyles from '../../styles/AdminUser';
import { Paper, Avatar, Divider, Typography, List, ListItem, Chip, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Switch, Button, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core/';
import { ChevronLeft, ChevronRight, People, Mood, Close, ExpandMore, Done } from '@material-ui/icons/';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/';
import TitleContainer from '../../components/TitleContainer';
import { GetFullUserData, UpdateAuthMethods } from "../../api/user"
import { useHistory } from 'react-router';
import clsx from 'clsx';

export default function AdminUser() {
    const [UsersPanel, setUsersPanel] = useState(true)
    const classes = useStyles()

    function handleClick() {
        setUsersPanel(!UsersPanel)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.mainContainer}>
                <div className={classes.panelContainer}>
                    <Paper className={clsx(UsersPanel ? classes.UserList : classes.UserListMinimized)}>
                        {UsersPanel ?
                            <div>
                                <Typography align="center" className="Title">Usuarios</Typography>
                                <Divider variant="middle" className="divider"/>
                                <Accordion className="acordion">
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Usuarios</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion className="acordion">
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className={classes.heading}>Administradores</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                
                            </div>
                            :
                            <People />
                        }
                    </Paper>
                    <Button className={classes.minimizerButton} onClick={handleClick}>
                        {UsersPanel ? <ChevronLeft className="icon" /> : <ChevronRight className="icon" />}
                    </Button>
                    <Paper elevation={0} className={classes.dataContainer}>
                        <div className={classes.UpperContainer}>
                            <Typography className="name">Usuario</Typography>
                            <Typography className="code">Codigo</Typography>
                            <Typography className="EmailType">Email-tipo</Typography>
                        </div>
                        <Divider variant="middle"/>
                        <div className={classes.BottomContainer}>
                            <Paper elevation={2} className={classes.LeftContainer}></Paper>
                            <Paper elevation={2} className={classes.RightContainer}></Paper>
                        </div>
                    </Paper>
                </div>
            </Paper>
        </div>
    )
}