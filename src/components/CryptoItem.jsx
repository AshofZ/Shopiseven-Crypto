import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from "./useMediaQuery";

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
    sticky: {
        minWidth: "13.5rem", 
        background: "white", 
        zIndex: 100, 
        top: 0, 
        left: 0, 
        position: "sticky"
    },
    notSticky: {

    }
}));

const CryptoItem = ({ ranking, name, logo, symbol, price, price_change_24h, price_change_7d, marketCap24h, circulatingSupply, volume24h, id }) => {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);
    const matches = useMediaQuery("(max-width: 768px)");
    const small = "sticky";
    const big = "notSticky";

    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    }
    const logoUrlString = logo.toString();
    const sparklineId = logoUrlString.match(/images\/(.+?(?=\/))/)

    return (
        <StyledTableRow style={{ background: "white" }}>
            <StyledTableCell align="left" className={ matches ? classes.sticky : big }>
                <a href={`/crypto/${id}`} className={classes.crypto_link}>
                    {matches ? (
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="start" spacing={spacing}>
                                    <Grid item>
                                        <img src={logo} className={classes.cryptocurrency_logo} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <br />
                                        <Typography variant="body2" color="textSecondary" component="p"># {ranking} {symbol}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="start" spacing={spacing}>
                                    <Grid item>
                                        # {ranking} <img src={logo} className={classes.cryptocurrency_logo} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" color="textSecondary" component="p">{symbol}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </a>
            </StyledTableCell>
            <StyledTableCell align="left">${price}</StyledTableCell>
            {price_change_24h.includes('-') ? (
                <StyledTableCell align="left" className={classes.red}>{price_change_24h}%</StyledTableCell>
            ) : (
                <StyledTableCell align="left" className={classes.green}>{price_change_24h}%</StyledTableCell>
            )}
            {price_change_7d.includes('-') ? (
                <StyledTableCell align="left" className={classes.red}>{price_change_7d}%</StyledTableCell>
            ) : (
                <StyledTableCell align="left" className={classes.green}>{price_change_7d}%</StyledTableCell>
            )}
            <StyledTableCell align="left">${marketCap24h}</StyledTableCell>
            <StyledTableCell align="left" $>{volume24h}</StyledTableCell>
            <StyledTableCell align="left">{circulatingSupply} {symbol}</StyledTableCell>
            <StyledTableCell align="left">
                <a href={`/crypto/${id}/#chart`}>
                    <img src={`https://www.coingecko.com/coins/${sparklineId[1]}/sparkline`} />
                </a>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default CryptoItem