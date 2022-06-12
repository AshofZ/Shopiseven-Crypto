import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { MarginWrapper } from '../wrapper';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 140,
    },
    news_link: {
        textDecoration: 'none',
    },
}));

const HeaderNews = () => {
    const classes = useStyles();

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 4 });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value) return 'Loading ...';

    return (
        <div className={classes.root} style={{ overflowX: "scroll", overflowY: "hidden"}}>
            <div style={{ whiteSpace: "nowrap", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {cryptoNews.value.map((news, i) => (
                    <div key={i} style={{ minWidth: "280px", whiteSpace: "normal", marginRight: "15px" }}>
                        <a href={news.url} className={classes.news_link} target="_blank" rel="noopener noreferrer">
                            <Card style={{ padding: "5px", boxShadow: "none" }}>
                                <div style={{ whiteSpace: "normal", display: "flex", flexDirection: "row", rowGap: "20px", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <img src={news?.image?.thumbnail?.contentUrl || demoImage} style={{ borderRadius: "5px" }} />
                                    </div>
                                    <div style={{ marginLeft: "5px" }}>
                                        <Typography>{news.name}</Typography>
                                    </div>
                                </div>
                            </Card>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeaderNews;