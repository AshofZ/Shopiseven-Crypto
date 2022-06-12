import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { LineChart } from '../components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { MarginWrapper } from '../wrapper';
import { Icon, Typography } from '@material-ui/core';
import millify from 'millify';
import { PageNotFound } from '../pages';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  cryptoContainer: {
    padding: '0 10px 0 10px',
    marginBottom: '50px',
  },
  crypto_details: {
    textAlign: 'left',
  },
  crypto_info: {
    textAlign: 'right',
  },
  crypto_logo: {

  },
  crypto_badge: {
    background: '#f5f5f5',
    borderRadius: '6px',
    marginRight: '10px',
    padding: '10px 10px 10px 10px',
  },
  crypto_bottom_info: {
    borderRight: '1px solid #ababab',
  }
}));

function currencyFormat(num) {
  return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetchingHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const classes = useStyles();

  if (isFetching) return 'Loading ...';
  if (isFetchingHistory) return 'Loading ...';

  if (data != undefined & coinHistory != undefined) {
    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={3} className={classes.cryptoContainer}>
            <Grid item md={8} xs={12} className={classes.crypto_details}>
              <Grid container justifyContent="flex-start" alignitems="center" spacing={1}>
                <Grid item>
                  <img src={data.image.small} className={classes.crypto_logo} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{data.name}</Typography>
                </Grid>
                <Grid item className={classes.crypto_badge}>
                  <Typography variant="h6">{data.symbol}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="p">{data.name} Price ({data.symbol.toUpperCase()})</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start" spacing={2} style={{ marginBottom: '10px' }}>
                <Grid item>
                  <Typography variant="h5">${currencyFormat(data.market_data.current_price.usd)}</Typography>
                </Grid>
                <Grid item>
                  {millify(data.market_data.price_change_percentage_24h).includes('-') ? (
                    <Typography variant="h5">
                      <Typography variant="h6" style={{ color: 'white', background: '#EA3943', padding: '0 5px 0 5px', borderRadius: '5px' }}>{data.market_data.price_change_percentage_24h}%</Typography>
                    </Typography>
                  ) : (
                    <Typography variant="h5">
                      <Typography variant="h6" style={{ color: 'white', background: '#4EAF0A', padding: '0 5px 0 5px', borderRadius: '5px' }}>{data.market_data.price_change_percentage_24h}%</Typography>
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start" alignitems="center" spacing={1}>
                <Grid item className={classes.crypto_badge}>
                  <Typography variant="p">Rank #{data.market_cap_rank}</Typography>
                </Grid>
                <Grid item className={classes.crypto_badge}>
                  {data.categories[0] ? (
                    <Typography variant="p">{data.categories[0].toLowerCase()}</Typography>
                  ) : data.categories[1] ? (
                    <Typography variant="p">{data.categories[1].toLowerCase()}</Typography>
                  ) : (
                    <Typography variant="p"></Typography>
                  )}
                </Grid>
              </Grid>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">Market Cap</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">${currencyFormat(data.market_data.market_cap.usd)}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="p">Circulating Supply</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">{currencyFormat(data.market_data.circulating_supply)} {data.symbol.toUpperCase()}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">

                      </TableCell>
                      <TableCell align="right">

                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="p">Total Supply</Typography>
                      </TableCell>
                      <TableCell align="right">
                        {data.market_data.total_supply ? (
                          <Typography variant="p">{currencyFormat(data.market_data.total_supply)}</Typography>
                        ) : (
                          <Typography variant="p">  </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">Fully Diluted Valuation</Typography>
                      </TableCell>
                      <TableCell align="right">
                        {/* {data.market_data.fully_diluted_valuation ? (
                          <Typography variant="p">${currencyFormat(data.market_data.fully_diluted_valuation.usd)}</Typography>
                        ) : (
                          <Typography variant="p">$</Typography>
                        )} */}
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="p">Max Supply</Typography>
                      </TableCell>
                      <TableCell align="right">
                        {data.market_data.max_supply ? (
                          <Typography variant="p">{currencyFormat(data.market_data.max_supply)}</Typography>
                        ) : (
                          <Typography variant="p">$</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={4} xs={12} className={classes.crypto_info}>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" spacing={2} id="chart">
            <Grid item md={8} xs={12}>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>{data.symbol.toUpperCase()} Price Statistic</Typography>
              <LineChart
                coinHistory={coinHistory.prices}
                currentPrice={data.price}
                coinName={data.name}
              />
            </Grid>
            <Grid item md={4} xs={12} style={{ backgroundColor: '#F3F4F6', borderRadius: '10px' }}>
              <Typography variant="h5" style={{ fontWeight: 'bold' }} gutterBottom>{data.symbol.toUpperCase()} Price Statistic</Typography>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">{data.name} Price</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">${currencyFormat(data.market_data.current_price.usd)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">Market Cap</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">${currencyFormat(data.market_data.market_cap.usd)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">24h Low / 24h High</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p"> ${currencyFormat(data.market_data.low_24h.usd)} / ${currencyFormat(data.market_data.high_24h.usd)} </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">Market Cap Rank</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">#{data.market_data.market_cap_rank}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">All-Time High</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">${currencyFormat(data.market_data.ath.usd)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="p">All-Time Low</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p">${currencyFormat(data.market_data.atl.usd)}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>


        </div>
      </>
    )
  } else {
    return 'Loading...';
  }
}

export default MarginWrapper(CryptoDetails)