import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { push } from 'connected-react-router';
import { firebaseInfo } from '../../plugins/firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Container, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { setUserInfo } from '../../modules/store/reducers/userInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        maxWidth: '10%',
        minWidth: '400px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button : {
        margin: '0px 5px'
    },
    table: {
        [theme.breakpoints.up('sm')]: {
            minWidth: 450,
        },
        minWidth: '100%'
    },
    container: {
        maxHeight: 250,
    },
}));

function createData(update, detail) {
    return { update, detail};
}

const rows = [
    createData('2020/08/01', '予約機能を追加しました。'),
    createData('2020/08/15', 'お知らせ機能を追加しました。'),
];

export default function Home(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const userInfo = useSelector((state) => state.userInfo);

    useEffect(() => {
        (async () => {
            if (userInfo.userId === null || userInfo.userId === '') {
                alert('お手数ですが、もう一度ログインしてください。');
                dispatch(push('/'));
                return false;
            } else {
                firebaseInfo.firestore().collection('userInfo').doc(userInfo.userId).get().then(response => {
                    dispatch(setUserInfo(response.data()));
                }).catch(error => {
                    alert('データの取得に失敗しました。もう一度ログインしてください。');
                    dispatch(push('/'));
                })
            }
        })()
    }, []);
    return (
        <React.Fragment>
            <Typography variant='h5'>
                お知らせ
          </Typography>
            <br />
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>更新日</TableCell>
                            <TableCell>内容</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.update}>
                                <TableCell>
                                    {row.update}
                                </TableCell>
                                <TableCell align="left">{row.detail}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <br />
            <Typography variant='h5'>
                予約情報
          </Typography>
            <br />
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>予約番号</TableCell>
                            <TableCell>予約日時</TableCell>
                            <TableCell>会議室</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow hover key={userInfo.reserveNum}>
                            <TableCell>
                                {userInfo.reserveNum}
                            </TableCell>
                            <TableCell>{userInfo.reserveDay}</TableCell>
                            <TableCell>{userInfo.room}</TableCell>
                            <TableCell>
                            <Button variant='contained' color='primary' className={classes.button}>
                                変更
                            </Button>
                            <Button color='inherit' variant='contained' className={classes.button}>
                                削除
                            </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <br />
        </React.Fragment>
    )
};

