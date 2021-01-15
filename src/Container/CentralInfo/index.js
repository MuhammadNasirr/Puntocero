import React, { useState, useEffect } from 'react';
import Header from '../../Component/Header/index'
import { Grid, Button, Paper, Dialog, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Student from '../../Component/Assets/student.jpg'
import { db } from '../../Component/config/firebase'
import moment from 'moment'
import './index.css'
import { Link } from 'react-router-dom';
import { chunk } from "lodash";
import ReactTooltip from 'react-tooltip'
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
    },
    listContainer: {
        padding: 20,
        margin: 0
    }
}));

const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
]

function CentralInfo(props) {
    const classes = useStyles();
    const [state, setstate] = useState({
        tables: [],
        open: false,
        adultTicket: 0,
        kidTicket: 0,
        tableIndex: null,
        tableDataIndex: null,
        selectedTable: [],
        totalPrice: 0,
        totalATickets: 0,
        totalKTickets: 0,
        hoverItem: null
    })

    const snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { uid: e[0] }))


    const getTable = async (update) => {
        const dbRef = db.ref(`Table`);
        dbRef.on("value", (snapshot) => {
            setstate({
                ...state,
                tables: snapshotToArray(snapshot.val())
            })
            if (update) {
                setstate({
                    ...state,
                    adultTicket: '',
                    kidTicket: '',
                    open: false,
                    tableData: snapshotToArray(snapshotToArray(snapshot.val())[state.tableIndex])
                })
            }
        });
    };

    const buyTicket = () => {
        const {
            buyTicketData,
            kidTicket,
            adultTicket,
            tableIndex,
            tables,
            totalPrice,
            totalATickets,
            totalKTickets,
            tableDataIndex,
            selectedTable
        } = state;
        let selected = {
            eventId: tables[tableIndex].uid,
            eventData: buyTicketData,
            adultTicket: Number(adultTicket),
            kidTicket: Number(kidTicket),
        }
        tables[tableIndex][buyTicketData.uid].adultTicket = buyTicketData.adultTicket + Number(adultTicket)
        tables[tableIndex][buyTicketData.uid].kidTicket = buyTicketData.kidTicket + Number(kidTicket)
        setstate({
            ...state,
            tables: tables,
            selectedTable: [...selectedTable, selected],
            totalPrice: totalPrice + (buyTicketData.price * (Number(kidTicket) + Number(adultTicket))),
            totalATickets: totalATickets + Number(adultTicket),
            totalKTickets: totalKTickets + Number(kidTicket),
            tableData: tables[tableIndex],
            open: false,
            adultTicket: '',
            tableIndex: tableIndex,
            kidTicket: '',
        })
        chunked = chunk(tables[tableIndex], 15)
        // db.ref(`Table/` + tables[tableIndex].uid + "/" + buyTicketData.uid).update({
        //     adultTicket: adultTicket ? buyTicketData.adultTicket + Number(adultTicket) : buyTicketData.adultTicket,
        //     kidTicket: kidTicket ? buyTicketData.kidTicket + Number(kidTicket) : buyTicketData.kidTicket,
        // })
        //     .then(res => {
        //         getTable('update')
        //         setTimeout(() => {
        //             // setstate({
        //             //     ...state,

        //             // })
        //         }, 1000);
        //     }).catch(error => {
        //         alert(error.message)
        //     })
    };

    const buyTicketModal = (data, index) => {
        setstate({
            ...state,
            buyTicketData: data,
            open: true,
            tableDataIndex: index
        })
    };

    const handleClose = () => {
        setstate({
            ...state,
            open: false
        })
    };

    const handlechange = (type, value) => {
        setstate({
            ...state,
            [type]: value
        })
    };

    const makePayment = () => {
        const { selectedTable, totalATickets, totalKTickets, totalPrice } = state;
        const value = {
            selectedTable, totalATickets, totalKTickets, totalPrice
        }
        props.history.push('/payment_managment_system', { value: value })

    };

    useEffect(() => {
        getTable()
    }, [])


    function getUnique(array, key) {
        if (typeof key !== 'function') {
            const property = key;
            key = function (item) { return item[property]; };
        }
        return Array.from(array.reduce(function (map, item) {
            const k = key(item);
            if (!map.has(k)) map.set(k, item);
            return map;
        }, new Map()).values());
    }

    const { tables, tableData, open, kidTicket, adultTicket, selectedTable, totalATickets, totalPrice, totalKTickets, hoverItem } = state
    var chunked = chunk(tableData, 15);
    return (
        <div class="">
            <Header />
            <div style={{ display: 'flex', padding: 20 }}>
                <Grid container justify={"center"}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: 34 }}>Central Information</div>
                        <Grid item xs={12}>
                            <div style={{ fontSize: 24, marginTop: 10 }}>Selected Tables</div>
                            <div style={{ marginTop: 10 }}>
                                Tables:
                                {
                                    getUnique(selectedTable && selectedTable, "eventId").map((res, index) => {
                                        return (
                                            <span style={{ marginLeft: 10 }}>{res.eventId}</span>
                                        )
                                    })
                                }
                            </div>
                            <div style={{ marginTop: 10 }}>
                                Adulto Tickets:
                                <span style={{ marginLeft: 10 }}>{totalATickets}</span>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                Kids Tickets:
                                <span style={{ marginLeft: 10 }}>{totalKTickets}</span>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                Total Price to pay:
                                <span style={{ marginLeft: 10 }}>{"$" + totalPrice}</span>
                            </div>
                            <Button className={classes.button} variant="outlined">
                                <Link style={{ textDecoration: 'none', color: '#000' }} to={{
                                    pathname: '/payment_managment_system',
                                    state: {
                                        value: {
                                            selectedTable, totalATickets, totalKTickets, totalPrice
                                        }
                                    }
                                }} >
                                    {"Manage to Payment"}
                                </Link>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                tables.map((res, index) => (
                                    <Button onClick={() => setstate({ ...state, tableData: snapshotToArray(res), tableIndex: index })} className={classes.button} variant="outlined">{res.uid}</Button>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {/* <Grid container item xs={12} lg={12} spacing={3} alignItems={"center"} className={classes.listContainer}>
                {
                    tableData && tableData.length && tableData.map((item, index) => {
                        if (item.name)
                            return (
                                <Grid key={index} item md={2} sm={6} xs={12} onClick={() => buyTicketModal(item, index)} className={'tableListing'}>
                                    <Paper elevation={5} style={{ borderRadius: 10, backgroundColor: Number(item.adultTicket) + Number(item.kidTicket) > 9 ? "yellow" : Number(item.adultTicket) + Number(item.kidTicket) === 0 ? "white" : 'orange' }}>
                                        <div className="ps-block--category">
                                            <img style={{ width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={Student} alt="burger" />
                                            <div style={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <p>Event Name:{item.name}</p>
                                                <p>Event Date: {moment(item.created_at).format('MMM-DD-YYYY')}</p>
                                                <div>{`Money ${item.price}$`}</div>
                                                <div>
                                                    <p className={classes.foodOrder}>{`Tickets ${Number(item.adultTicket) + Number(item.kidTicket)}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                            )
                    })
                }
            </Grid> */}
            <Grid container item xs={12} lg={12} spacing={3} justify={"center"} alignItems={"center"} className={classes.listContainer}>
                {
                    chunked && chunked.length > 0 && chunked[0].length > 0 &&
                    <Grid container justify={'space-around'}>
                        <div style={{ border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 250, height: 40 }}>
                            COCINA
                    </div>
                        <div style={{ border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 250, height: 40 }}>
                            COCINA
                    </div>
                    </Grid>
                }
                {
                    chunked && chunked.length > 0 && chunked[0].length > 0 && alphabets.map((res, j) => {
                        if (j <= (chunked[0].length - 1)) {

                            return (
                                <div style={{
                                    margin: 10,
                                    width: 50, textAlign: 'center'
                                }}>{res}</div>
                            )
                        } else return null
                    })
                }
                {chunked.map((chunk, i) => (
                    <Grid style={{ width: '82%', flexDirection: 'row', display: 'flex' }} key={i}>
                        <div style={{ height: 50, paddingTop: 30 }}>{i + 1}</div>
                        {
                            chunk && chunk.length > 0 && chunk.map((item, index) => {
                                if (item.name && item.type !== "stage") {
                                    return (
                                        <Grid key={index} data-tip='' data-for={item.uid} onClick={() => buyTicketModal(item, index)} className={'tableListing'}>
                                            <Paper elevation={1} style={{
                                                borderRadius: 10, margin: 10,
                                                width: 50, height: 50,
                                                backgroundColor: Number(item.adultTicket) + Number(item.kidTicket) > 9 ? "yellow" : Number(item.adultTicket) + Number(item.kidTicket) === 0 ? "white" : 'orange'
                                            }}>
                                                <ReactTooltip backgroundColor={"transparent"} effect={"solid"} id={item.uid} aria-haspopup='false' >
                                                    <Paper elevation={5} style={{ borderRadius: 10, width: 200, backgroundColor: "white" }}>
                                                        <div className="ps-block--category">
                                                            <img style={{ width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={Student} alt="burger" />
                                                            <div style={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                                <p>Event Name:{item.name}</p>
                                                                <p>Event Date: {moment(item.created_at).format('MMM-DD-YYYY')}</p>
                                                                <div>{`Money ${item.price}$`}</div>
                                                                <div>
                                                                    <p className={classes.foodOrder}>{`Tickets ${Number(item.adultTicket) + Number(item.kidTicket)}`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </ReactTooltip>
                                            </Paper>
                                        </Grid>
                                    )
                                }
                                else if (item.name && item.type === "stage" && item.main === true) {
                                    return (
                                        <div style={{
                                            marginLeft: 15, marginRight: 10,
                                            width: 400, backgroundColor: 'blue', fontWeight: 'bold', fontSize: 28,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>{item?.stagename}</div>
                                    )
                                }
                            })
                        }
                        <div style={{ height: 50, paddingTop: 30 }}>{i + 1}</div>
                    </Grid>
                ))}
                <Grid container justify={'center'}>

                    {
                        chunked && chunked.length > 0 && chunked[0].length > 0 && alphabets.map((res, j) => {
                            if (j <= (chunked[0].length - 1)) {

                                return (
                                    <div style={{
                                        margin: 10,
                                        width: 50, textAlign: 'center'
                                    }}>{res}</div>
                                )
                            } else return null
                        })
                    }
                </Grid>

                {
                    chunked && chunked.length > 0 && chunked[0].length > 0 &&
                    <Grid style={{ width: '82%', flexDirection: 'row', display: 'flex' }} >
                        <div style={{ border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 250, height: 150 }}>
                            Baños
                    </div>
                    </Grid>
                }
            </Grid>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Select the ticket you want</DialogTitle>
                <Grid className={'ticketDialog'}>
                    <TextField
                        placeholder={"Adult Ticket"}
                        className={"textField"}
                        value={adultTicket === 0 ? '' : adultTicket}
                        onChange={(value) => handlechange('adultTicket', value.target.value)}
                    />
                    <TextField
                        placeholder={"Kids Ticket"}
                        className={"textField"}
                        value={kidTicket === 0 ? '' : kidTicket}
                        onChange={(value) => handlechange('kidTicket', value.target.value)}
                    />
                    <Grid container justify={'space-around'}>
                        <Button variant={'contained'} color={"primary"} className={'setAside'} onClick={() => handleClose()}>Cancel</Button>
                        <Button variant={'contained'} color={"primary"} className={'setAside'} onClick={() => buyTicket()}>Set Aside</Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div >
    );
}

export default CentralInfo;