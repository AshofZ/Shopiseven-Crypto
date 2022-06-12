import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useGetExchangesQuery } from '../services/cryptoExchangesApi';
import { MarginWrapper } from '../wrapper';
import ExchangeItem from './ExchangeItem';
import millify from 'millify';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
    top: 0,
    position: "sticky"
  },
  body: {
    fontSize: 14,
    top: 0,
    position: "sticky"
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function currencyFormat(num) {
  return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const ExchangesLists = () => {
  const classes = useStyles();
  const { data: exchangesList, isFetching } = useGetExchangesQuery();
  const [exchanges, setExchanges] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setExchanges(exchangesList);
  }, [exchangesList, searchTerm]);

  if (isFetching) return 'Loading ...';


  console.log("CryptoList", exchanges);

  if(exchanges != undefined) {
    return (
        <TableContainer style={{ maxHeight: "100vh" }}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ zIndex: 110 }}>Exchange</StyledTableCell>
                <StyledTableCell>Trust Score</StyledTableCell>
                <StyledTableCell>24h Volume (Normalized)</StyledTableCell>
                <StyledTableCell>24h Volume</StyledTableCell>
                <StyledTableCell>Last 7 Days</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchanges?.map((exchange, i) => (
                <ExchangeItem
                  id={exchange.id}
                  ranking={exchange.trust_score_rank}
                  exchange={exchange.name}
                  logo={exchange.image}
                  trustScore={exchange.trust_score}
                  volumeNormalized24h={exchange.trade_volume_24h_btc_normalized}
                  volume24h={exchange.trade_volume_24h_btc}
                  key={i}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }
}

export default ExchangesLists