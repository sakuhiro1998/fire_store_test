import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { push } from 'connected-react-router';
import { firebaseInfo } from '../../plugins/firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Container, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {RadioButtonUnchecked , Close} from '@material-ui/icons';
import { setReserveInfo } from '../../modules/store/reducers/reservation';

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
    const reserveInfo = useSelector((state) => state.reservation);

    useEffect(() => {
        (async () => {
            if (userInfo.userId === null || userInfo.userId === '') {
                alert('お手数ですが、もう一度ログインしてください。');
                dispatch(push('/'));
                return false;
            } else {
                firebaseInfo.firestore().collection('reservations').get().then(response => {
                    let inputArray=[];
                    response.forEach(posDocs=>{
                        inputArray.push(posDocs.data());
                    })
                    dispatch(setReserveInfo(inputArray));
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
                新規登録
          </Typography>
            <br />
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>会議室</TableCell>
                            {reserveInfo.roomA.day.map((row) => (
                                <TableCell>
                                    {row}
                                </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={'roomA'}>
                        <TableCell>会議室A</TableCell>
                        {reserveInfo.roomA.empty.map((row , index) => (
                                <TableCell>
                                    {row === '1'
                                    ? <Button variant='contained' size="large" startIcon={<RadioButtonUnchecked />} color='primary' className={classes.button}>空室あり</Button> 
                                    : <Button variant='contained' size="large" startIcon={<Close />} disabled color='primary' className={classes.button}>空室なし</Button>
                                    }
                                </TableCell>
                        ))}
                        </TableRow>
                        <TableRow key={'roomB'}>
                        <TableCell>会議室B</TableCell>
                        {reserveInfo.roomB.empty.map((row , index) => (
                                <TableCell>
                                    {row === '1'
                                    ? <Button variant='contained' size="large" startIcon={<RadioButtonUnchecked />} color='primary' className={classes.button}>空室あり</Button> 
                                    : <Button variant='contained' size="large" startIcon={<Close />} disabled color='primary' className={classes.button}>空室なし</Button>
                                    }
                                </TableCell>
                        ))}
                          </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
};

