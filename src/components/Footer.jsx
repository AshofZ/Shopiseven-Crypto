import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    rootBox: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    footerNav: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(0),

        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: 'auto',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
        }
    },
    footerLink: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(2),
        }
    },
}));

const Footer = (props) => {
    const classes = useStyles();

    return (
        <footer style={{ backgroundColor: '#F3F4F6' }}>
            <Container maxWidth="lg">
                <Box py={6} display="flex" flexWrap="wrap" alignitems="center" className={classes.rootBox}>
                    <Box component="nav" className={classes.footerNav}>
                        <Link href="/cryptoHome" variant="body1" color="textPrimary" className={classes.footerLink}>Home</Link>
                    </Box>
                </Box>
            </Container>
        </footer>
    );

}

export default Footer