import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './Main.js';
// import './App.scss';
import { NavbarComponents, Footer } from './components';
import { Home, CryptoDetails, Exchanges, Tickers } from './pages';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/cryptoHome" element={<Home />} />
                <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route exact path="/exchanges" element={<Exchanges />} />
                <Route exact path="/exchanges/tickers/:exchangeId" element={<Tickers />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App