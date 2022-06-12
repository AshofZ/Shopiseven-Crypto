import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'X-RapidAPI-Key': 'ef129cd970msh91f16ee2c854496p11174fjsn83e8152b54a3'
}

const baseUrl = 'https://coingecko.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: cryptoExchangesApiHeaders });

export const cryptoExchangesApi = createApi({
   reducerPath: 'cryptoExchangesApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: (builder) => ({
       getExchanges: builder.query({
           query: () => createRequest(`exchanges`)
       }),
       getExchangeDetail: builder.query({
           query: (exchangeId) => createRequest(`exchanges/${exchangeId}`)
       }),
       getExchangeTickers: builder.query({
           query: (exchangeId) => createRequest(`exchanges/${exchangeId}/tickers`)
       }),
   }) 
});

export const {
    useGetExchangesQuery,
    useGetExchangeDetailQuery,
    useGetExchangeTickersQuery,
} = cryptoExchangesApi;