import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from "./useMediaQuery";

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    red: {
        color: 'red'
    },
    green: {
        color: 'green'
    },
    cryptocurrency_logo: {
        width: '1.25rem',
    },
    crypto_link: {
        textDecoration: 'none',
        margin: 0,
        color: 'black',
    },
}));

function currencyFormat(num) {
    return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const ExchangeTickerItem = ({ key, ticker }) => {
    const classes = useStyles();
    const { data, isFetching } = useGetCryptoDetailsQuery(ticker.coin_id);
    const { data: target, isFetchingTarget } = useGetCryptoDetailsQuery(ticker.target_coin_id);
    const matches = useMediaQuery("(max-width: 768px)");

    if (data !== undefined & target !== undefined) {
        console.log("Full");
        console.log("DataBase", data);
        console.log("DataTarget", target);
        return (
            <StyledTableRow style={{ background: "white" }}>
                <StyledTableCell><img src={data.image.thumb} /> {data.name} / <img src={target.image.thumb} /> {target.name}</StyledTableCell>
                <StyledTableCell>
                    <Typography variant="p">${currencyFormat(data.market_data.current_price.usd)}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                    <Typography variant="p">${currencyFormat(ticker.volume)}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                    {ticker.trust_score === "green" ? (
                        <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: "green", marginLeft: 'auto', marginRight: 'auto' }}></div>
                    ) : ticker.trust_score === "yellow" ? (
                        <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: "yellow", marginLeft: 'auto', marginRight: 'auto' }}></div>
                    ) : (
                        <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: "red", marginLeft: 'auto', marginRight: 'auto' }}></div>
                    )}
                </StyledTableCell>
            </StyledTableRow>
        )
    } else {
        return (
            <StyledTableRow style={{ background: "white" }}>
                <StyledTableCell>Loading....</StyledTableCell>
            </StyledTableRow>
        )
    }

}

export default ExchangeTickerItem