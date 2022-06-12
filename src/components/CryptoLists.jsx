import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { MarginWrapper } from '../wrapper';
import CryptoItem from './CryptoItem';
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
  root: {
    flexGrow: 1,
  },
});

function currencyFormat(num) {
  return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const CryptoLists = () => {
  const classes = useStyles();
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList);
  }, [cryptosList, searchTerm]);


  console.log("CryptoList", cryptos);

  if (cryptos != undefined) {
    return (
      <TableContainer style={{ maxHeight: "100vh" }}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ zIndex: 110 }}>&nbsp;&nbsp;&nbsp;&nbsp;Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>24h%</StyledTableCell>
              <StyledTableCell>7d%</StyledTableCell>
              <StyledTableCell>Market Cap</StyledTableCell>
              <StyledTableCell>Volume(24h)</StyledTableCell>
              <StyledTableCell>Circulating Supply</StyledTableCell>
              <StyledTableCell>Last 7 Days</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos?.map((currency, i) => (
              <CryptoItem
                ranking={currency.market_cap_rank}
                name={currency.name}
                price={currencyFormat(currency.current_price)}
                price_change_24h={millify(currency.price_change_percentage_24h)}
                price_change_7d={millify(currency.price_change_percentage_7d_in_currency)}
                logo={currency.image}
                symbol={currency.symbol.toUpperCase()}
                marketCap24h={currencyFormat(currency.market_cap)}
                circulatingSupply={currencyFormat(currency.circulating_supply)}
                volume24h={currencyFormat(currency.total_volume)}
                id={currency.id}
                key={i}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return "Loading..."  
  }
}

export default CryptoLists;