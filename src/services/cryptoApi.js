import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'X-RapidAPI-Key': 'ef129cd970msh91f16ee2c854496p11174fjsn83e8152b54a3'
}

const baseUrl = 'https://coingecko.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
   reducerPath: 'cryptoApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: (builder) => ({
       getCryptos: builder.query({
           query: (count) => createRequest(`coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d`)
       }),
       getCryptoDetails: builder.query({
           query: (id) => createRequest(`coins/${id}`),
       }),
       getCryptoHistory: builder.query({
           query: ({ coinId, timeperiod }) => createRequest(`coins/${coinId}/market_chart?vs_currency=usd&days=${timeperiod}`),
       })
   }) 
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;