import React, { useState } from 'react';
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

export default function Home(props) {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    return (
        <React.Fragment>
          <Typography>
              お知らせ
          </Typography>
        </React.Fragment>
    )
};

const getUserInfo = (userId) => {
    return dispatch => {
        firebaseInfo.firestore().collection('userInfo').doc(userId).get().then(request => {
            console.log(request.data());
            return false;
        }).catch(error => {
            alert('データ取得に失敗しました。');
            dispatch(push('/'));
            return false;
        })
    }
}