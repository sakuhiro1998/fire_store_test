import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { push } from 'connected-react-router';
import { firebaseInfo } from '../../plugins/firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Container, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        maxWidth: '10%',
        minWidth: '400px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NewReservation(props) {
    const { window } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const userInfo = useSelector((state) => state.userInfo);

    useEffect(() => {
        (async () => {
            if (userInfo.userId === null || userInfo.userId === '') {
                alert('お手数ですが、もう一度ログインしてください。');
                dispatch(push('/'));
                return false;
            }
        })()
    }, []);

    return (
        <React.Fragment>
          <Typography>
              新規予約
          </Typography>
        </React.Fragment>
    )
};

