import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseInfo } from '../../plugins/firebase';
import { push } from 'connected-react-router';
import { AppBar, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Badge, Tooltip } from '@material-ui/core';
import { MoveToInbox, Mail, Menu, Notifications, MeetingRoom , AddBox ,Refresh} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Home from '../home/home'
import NewReservation from '../newReservation/newReservation'

import { setUserInfo } from '../../modules/store/reducers/userInfo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));


export default function Main(props) {
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

    const drawer = (
        <div>
            <div className={classes.toolbar} >
                <div className={classes.logo}>
                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} width='55' height='55' />
                </div>
            </div>
            <Divider />
            <List>
                <ListItem button key={'ホーム'} onClick={() => dispatch(getOshirase())}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={'ホーム'} />
                </ListItem>
                <ListItem button key={'新規予約'} onClick={() => dispatch(getNewReservationInfo())}>
                    <ListItemIcon><AddBox /></ListItemIcon>
                    <ListItemText primary={'新規予約'} />
                </ListItem>
                <ListItem button key={'予約変更'}>
                    <ListItemIcon><Refresh /></ListItemIcon>
                    <ListItemText primary={'予約変更'} />
                </ListItem>
            </List>
            <Divider />

        </div>
    );

    return (
        <div className={classes.root}>
            {userInfo.userId ?
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant='h6' className={classes.title} noWrap>
                                ようこそ　{userInfo.userName}　さん
                            </Typography>
                            <Tooltip title='お知らせ'>
                                <IconButton color='inherit'>
                                    <Badge badgeContent={0} color='secondary'>
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='ログアウト'>
                                <IconButton color='inherit'>
                                    <Badge color='secondary'>
                                        <MeetingRoom />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        <Hidden xsDown implementation='css'>
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant='permanent'
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smUp implementation='css'>
                            <Drawer
                                container={container}
                                variant='temporary'
                                anchor={'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>

                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path='/Home' component={Home} />
                            <Route exact path='/NewReservation' component={NewReservation} />
                        </Switch>
                    </main>
                </> : <></>}
        </div>
    );
};

const getNewReservationInfo = () => {
    return dispatch => {
        dispatch(push('/NewReservation'));
        /* firebaseInfo.firestore().collection('userInfo').doc(userId).get().then(response => {
            dispatch(setUserInfo(response.data()));
            dispatch(push('/home'));
            return false;
        }).catch(error => {
            alert('データの取得に失敗しました。');
            return false;
        }) */

    }
}

const getOshirase = () => {
    return dispatch => {
        dispatch(push('/Home'));
        /* firebaseInfo.firestore().collection('userInfo').doc(userId).get().then(response => {
            dispatch(setUserInfo(response.data()));
            dispatch(push('/home'));
            return false;
        }).catch(error => {
            alert('データの取得に失敗しました。');
            return false;
        }) */

    }
}