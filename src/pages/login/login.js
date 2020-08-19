import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { firebaseInfo } from '../../plugins/firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Container, Button , Hidden } from '@material-ui/core';

import {setUserInfo} from '../../modules/store/reducers/userInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

export default function Login(props) {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    return (
        <React.Fragment>
            <Hidden xsDown implementation='css'>
                <Grid container spacing={3}>
                    <Grid container item xs={12} justify='center' alignItems='center'>
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} />
                    </Grid>

                    <Grid container item xs={12} justify='center' alignItems='center'>
                        <Paper className={classes.paper}>
                            <Container>
                                <Grid container spacing={2}>
                                    <Grid container item xs={12} justify='center' alignItems='center'>
                                        <TextField fullWidth required label='ユーザID' variant='outlined' value={userId} onChange={(e) => setUserId(e.target.value)} />
                                    </Grid>
                                    <Grid container item xs={12} justify='center' alignItems='center'>
                                        <TextField type='password' fullWidth required label='パスワード' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}></Grid>
                                    <Grid container item xs={12} justify='flex-end' alignItems='center'>
                                        <Button variant='contained' size='large' color='primary' className={classes.margin} onClick={() => dispatch(firebaseLogin(userId, password))}>
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden smUp implementation='css'>
                <Container>
                    <Grid container spacing={3}>
                        <Grid container item xs={12} justify='center' alignItems='center'>
                            <img src={`${process.env.PUBLIC_URL}/logo192.png`} />
                        </Grid>
                        <Grid container item xs={12} justify='center' alignItems='center'>
                            <TextField fullWidth required label='ユーザID' variant='outlined' value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </Grid>
                        <Grid container item xs={12} justify='center' alignItems='center'>
                            <TextField fullWidth required label='パスワード' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                        <Grid container item xs={12} justify='flex-end' alignItems='center'>
                            <Button variant='contained' size='large' color='primary' className={classes.margin} onClick={() => dispatch(firebaseLogin(userId, password))}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Hidden>
        </React.Fragment>
    )
};

const firebaseLogin = (userId, password) => {
    return dispatch => {
        firebaseInfo.auth().signInWithEmailAndPassword(userId, password).then(e => {
            firebaseInfo.firestore().collection('userInfo').doc(userId).get().then(response =>{
                dispatch(setUserInfo(response.data()));
                dispatch(push('/home'));
                return false;
            }).catch(error => {
                alert('データの取得に失敗しました。');
                return false;
            })
        }).catch(error => {
            alert('ログインに失敗しました。');
            return false;
        })
    }
}

