import React, { useState, useEffect } from 'react';
import Header from '../../Component/Header'
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Logo from "../../Component/Assets/logo.jpg";
import { auth, db } from "../../Component/config/firebase";

var QRCode = require('qrcode.react');

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        marginRight: 20,
        marginBottom: 20
    },
    sname: {
        marginTop: 20
    }
}));

function Home({ history }) {
    const classes = useStyles();
    const [state, setstate] = useState({
        QRValue: null,
        eventName: '',
        eventDate: '',
        eventMusic: '',
        eventBanquet: '',
        eventVideo: '',
        sName: '',
        sDetail: '',
        gift: '',
        giftDetails: '',
    })
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false);


    useEffect(async () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setuser(user);
                setloading(false);
            } else {
                setloading(false);
            }
        });
    }, [user]);

    useEffect(() => {
        const params = history.location.state && history.location.state.value
        if (params) {
            setstate({
                ...state,
                QRValue: params,
                sName: params?.selectedTable[0]?.eventId
            })
        }
    }, [history])

    const handleChange = (type, value) => {
        setstate({
            ...state,
            [type]: value.target.value
        })
    }

    const handleQRCode = () => {
        const { eventName, eventDate, eventMusic, eventBanquet, eventVideo, gift, sName, sDetail, giftDetails } = state
        const value = {
            eventName: eventName,
            eventDate: eventDate,
            eventMusic: eventMusic,
            eventBanquet: eventBanquet,
            eventVideo: eventVideo,
            gift: gift,
            sName: sName,
            sDetail: sDetail,
            giftDetails: giftDetails
        }
        setstate({
            ...state,
            QRValue: JSON.stringify(value)
        })
    }

    const handleQRCodeRemove = () => {
        setstate({
            eventName: '',
            eventDate: '',
            eventMusic: '',
            eventBanquet: '',
            gift: '',
            sName: '',
            sDetail: '',
            giftDetails: '',
            QRValue: null
        })
    }



    const { QRValue, eventName, eventMusic, eventBanquet, eventVideo, eventDate, gift, sName, sDetail, giftDetails } = state
    return (
        <div class="">
            <Header />
            <div style={{ display: 'flex', padding: 20 }}>
                <Grid container justify={"center"} >
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <Grid item xs={6} style={{ width: '100%' }}>



                            {
                                QRValue ?
                                    <>
                                        <Grid container direction={'column'} alignItems={"center"} style={{}}>
                                            <img src={Logo} style={{ width: 240, margin: 20 }} alt={""} />
                                            <div className="" style={{ width: '100%' }}>
                                                <span style={{ fontSize: 18, backgroundColor: '#fff', padding: 15 }}>{eventDate}</span>
                                                <div style={{ width: '100%', height: 4, backgroundColor: '#000', marginTop: -12 }} />
                                            </div>
                                            <Grid container justify={"space-around"} style={{ marginBottom: 20, marginTop: 20 }}>
                                                <div className="">
                                                    <div style={{ fontWeight: 'bold' }}>MUSICA</div>
                                                    <div style={{ fontSize: 12, color: 'grey' }}>{eventMusic}</div>
                                                </div>
                                                <div className="">
                                                    <div style={{ fontWeight: 'bold' }}>BANQUETE</div>
                                                    <div style={{ fontSize: 12, color: 'grey' }}>{eventBanquet}</div>
                                                </div>
                                                <div className="">
                                                    <div style={{ fontWeight: 'bold' }}>FOTO Y VIDEO</div>
                                                    <div style={{ fontSize: 12, color: 'grey' }}>{eventVideo}</div>
                                                </div>
                                            </Grid>
                                            <div className="">Welcome to Experiences 4.0!</div>
                                            <div className={classes.sname}>{sName}</div>
                                            <Grid container justify={"space-around"} style={{ marginBottom: 20, marginTop: 20 }}>
                                                <div className="">Table: L4</div>
                                                <div className="">Seat: 1</div>
                                            </Grid>
                                            <QRCode size={200} style={{ margin: 20 }} value={QRValue} />
                                            <Grid item xs={6}>
                                                <div className="">This is your QR invitation, just sent it to your guest with this he/she be access to the event</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button onClick={handleQRCodeRemove} className={classes.button} variant={"contained"} color={"primary"}>Remove</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button onClick={() => window.location.href = "/central-information"} className={classes.button} variant={"contained"} color={"primary"}>Done</Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                    : <CircularProgress />
                                // <>
                                //     <div style={{ fontSize: 34 }}>Online Invitation</div>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={eventName} onChange={(value) => handleChange('eventName', value)} placeholder={"Event Name "} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={eventDate} onChange={(value) => handleChange('eventDate', value)} placeholder={"Event Date"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={eventMusic} onChange={(value) => handleChange('eventMusic', value)} placeholder={"Event Music"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={eventBanquet} onChange={(value) => handleChange('eventBanquet', value)} placeholder={"Event Banquet"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={eventVideo} onChange={(value) => handleChange('eventVideo', value)} placeholder={"Event Video"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={sName} onChange={(value) => handleChange('sName', value)} placeholder={"Student Name"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={sDetail} onChange={(value) => handleChange('sDetail', value)} placeholder={"Student Details"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={gift} onChange={(value) => handleChange('gift', value)} placeholder={"Gift Table"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <TextField fullWidth className={classes.input} value={giftDetails} onChange={(value) => handleChange('giftDetails', value)} placeholder={"Gift Table Details"} />
                                //     </Grid>
                                //     <Grid item xs={12}>
                                //         <Button onClick={handleQRCode} className={classes.button} variant={"contained"} color={"primary"}>Continue</Button>
                                //     </Grid>
                                // </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Home;