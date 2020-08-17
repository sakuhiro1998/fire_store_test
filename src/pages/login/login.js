import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { push } from "connected-react-router"
import { firebaseInfo } from "../../plugins/firebase";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Container, Button } from '@material-ui/core';

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

export default function Login(props) {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errMsgUserId, setErrMsgUserId] = useState('');
    const [errMsgPassword, setErrMsgPassword] = useState('');
    const classes = useStyles();
    return (
        <React.Fragment>
            <MediaQuery query="(min-width: 768px)">
                <Grid container spacing={3}>
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <img src={`${process.env.PUBLIC_URL}/logo192.png`} />
                    </Grid>

                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Paper className={classes.paper}>
                            <Container>
                                <Grid container spacing={2}>
                                    <Grid container item xs={12} justify="center" alignItems="center">
                                        <TextField fullWidth required label="ユーザID" variant="outlined" value={userId} onChange={(e) => setUserId(e.target.value)} />
                                    </Grid>
                                    <Grid container item xs={12} justify="center" alignItems="center">
                                        <TextField type="password" fullWidth required label="パスワード" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}></Grid>
                                    <Grid container item xs={12} justify="flex-end" alignItems="center">
                                        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => dispatch(firebaseLogin(userId , password))}>
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <Container>
                    <Grid container spacing={3}>
                        <Grid container item xs={12} justify="center" alignItems="center">
                            <img src={`${process.env.PUBLIC_URL}/logo192.png`} />
                        </Grid>
                        <Grid container item xs={12} justify="center" alignItems="center">
                            <TextField fullWidth required label="ユーザID" variant="outlined" value={userId} onChange={(e) => setUserId(e.target.value)}  />
                        </Grid>
                        <Grid container item xs={12} justify="center" alignItems="center">
                            <TextField fullWidth required label="パスワード" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Grid>
                        <Grid container item xs={12} justify="flex-end" alignItems="center">
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => dispatch(firebaseLogin(userId , password))}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </MediaQuery>
        </React.Fragment>
    )
};

const firebaseLogin = (userId,password) => {
    return dispatch => {
        firebaseInfo.auth().signInWithEmailAndPassword(userId, password).then(e => {
            let userInfo = firebaseInfo.database().collection("userInfo");
            console.log(userInfo);
            dispatch(push('/home'));
            return false;
        }).catch(error=>{
            alert('ログインに失敗しました。');
            return false;
        })

    }
}