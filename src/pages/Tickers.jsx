import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Icon, Typography } from '@material-ui/core';
import millify from 'millify';

import { MarginWrapper } from '../wrapper';
import { useGetExchangeDetailQuery, useGetExchangeTickersQuery } from '../services/cryptoExchangesApi';
import { ExchangeTickerItem } from '../components';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
  },
});

function currencyFormat(num) {
  return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });

const Tickers = () => {

  const classes = useStyles();
  const { exchangeId } = useParams();
  const { data, isFetching } = useGetExchangeDetailQuery(exchangeId);
  const { data: tickers, isFetchingTicker } = useGetExchangeTickersQuery(exchangeId);
  // console.log("Data: ", data);
  console.log("Tickers: ", tickers);

  if (data !== undefined & tickers !== undefined) {
    // setTimeout(() => {this.setState({timePassed: true})}, 1000)
    // console.log("Tickers: ", tickers);

    return (
      <div style={{margin: "10px 5px 0 5px"}}>
        <Grid container spacing={3} className={classes.exchangeContainer}>
          <Grid item md={8} xs={12}>
            <Grid container justifyContent="flex-start" alignitems="center" spacing={2}>
              <Grid item>
                <img src={data.image} className={classes.crypto_logo} />
              </Grid>
              <Grid item>
                <Typography variant="h5">{data.name}</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-start" alignitems="center" spacing={2}>
              <Grid item>
                <Typography variant="h5">{data.trust_score}</Typography>
                <Typography variant="subtitle1">Trust Score</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ zIndex: 100 }}>Coin</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>24h Volume</StyledTableCell>
                <StyledTableCell>Trust Score</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickers.tickers.slice(0, 50).map((ticker, i) => (
                <ExchangeTickerItem
                  ticker={ticker}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  } else {
    return 'Loading...';
  }
  // if (isFetching) return 'Loading...';
  // if (isFetchingTicker) return 'Loading...';
}

export default Tickers;