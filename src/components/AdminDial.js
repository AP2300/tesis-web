import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CloseIcon from '@material-ui/icons/Close';
import HistoryIcon from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { PageSelector, otherPage } from "../helpers/Home";
import { useHistory } from "react-router";

const actions = [
  { icon: <PeopleIcon />, name: 'Aministar Usuarios' },
  { icon: <HistoryIcon />, name: 'Historial global' },
  { icon: <LockOpenIcon />, name: 'Administrar seguridad' }
];

export default function AdminDial() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "absolute",
      right: "1%"
    },
      speedDial: {
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          "& button.MuiFab-root.MuiSpeedDial-fab":{
              backgroundColor: "#4c4c4c"
          },
          "& button.MuiFab-root.MuiSpeedDial-fab:hover ~ div.MuiSpeedDial-actions":{
              backgroundColor: open?"#4c4c4cba":"transparent",
              transition: "300ms ease-in",
              display: "flex",
              height: "48px",
              alignItems: "center",
              paddingRight: "35px",
              paddingLeft: "10px",
              borderRadius: "2em",
              width: open?"220px":0
          },
          "& div.MuiSpeedDial-actions":{
              width: 0,
              display: "flex",
              height: "48px",
              alignItems: "center",
              paddingRight: "35px",
              paddingLeft: "10px",
              borderRadius: "2em",
              transition: "300ms ease-out",
              "& button.MuiButtonBase-root.MuiFab-root.MuiSpeedDialAction-fab ":{
                  backgroundColor:"#4c4c4c",
                  color: "whitesmoke",
                  boxShadow: "none",
              },
              "& button.MuiButtonBase-root.MuiFab-root.MuiSpeedDialAction-fab:hover ":{
                  color: "#4c4c4c",
                  backgroundColor: "whitesmoke"
              }
          },
          "& div.MuiSpeedDial-actions:hover":{
              backgroundColor: "#4c4c4cba",
              display: "flex",
              height: "70px",
              alignItems: "center",
              paddingRight: "35px",
              paddingLeft: "10px",
              borderRadius: "2em",
              width: "220px",
              transition: "200ms"
          }
      },
      
  }));
  const classes = useStyles();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ChangePage = (name) => {
    let path = otherPage(name);
    if (path) {
      setOpen(false);
      history.push(path);
    }
  }

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        direction="left"
        icon={<SpeedDialIcon icon={<VerifiedUserIcon/>} openIcon={<CloseIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            id={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => ChangePage(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
