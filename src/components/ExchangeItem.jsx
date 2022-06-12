import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import millify from 'millify';
import { Typography } from '@material-ui/core';
import { ProgressBar } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
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
  tdSticky: {
    minWidth: "9.5rem",
    background: "white",
    zIndex: 100,
    top: 0,
    left: 0,
    position: "sticky"
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

function currencyFormat(num) {
  return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const ExchangeItem = ({ ranking, exchange, logo, trustScore, volumeNormalized24h, volume24h, id }) => {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const matches = useMediaQuery("(max-width: 768px)");
  const small = "sticky";
  const big = "notSticky";

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  }
  const logoUrlString = logo.toString();
  const sparklineId = logoUrlString.match(/images\/(.+?(?=\/))/);
  // console.log("Sparkline", sparklineId[1]);

  return (
    <StyledTableRow style={{ background: "white", height: "100px" }}>
      <StyledTableCell align="left" className={matches ? classes.tdSticky : big }>
        <a href={`tickers/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          {matches ? (
            <>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="start" spacing={spacing}>
                    <Grid item>
                      <img src={logo} className={classes.cryptocurrency_logo} />
                    </Grid>
                    <Grid item xs="2">
                      <Typography>
                        {exchange}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item style={{ left: "3rem", position: "absolute" }}>
                  #{ranking}
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justifyContent="start" spacing={spacing}>
                  <Grid item>
                    #{ranking}&nbsp;&nbsp;&nbsp;<img src={logo} className={classes.cryptocurrency_logo} />
                  </Grid>
                  <Grid item>
                    <Typography>
                      {exchange}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </a>
      </StyledTableCell>
      <StyledTableCell align="left">
        {/* <ProgressBar now={trustScore} max="10" /> */}
        <Typography variant="p" style={{ fontWeight: 'bold' }}>{trustScore}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left">${currencyFormat(volumeNormalized24h)}</StyledTableCell>
      <StyledTableCell align="left">${currencyFormat(volume24h)}</StyledTableCell>
      <StyledTableCell align="left">
        <img src={`https://www.coingecko.com/exchanges/${sparklineId[1]}/sparkline`} />
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default ExchangeItem