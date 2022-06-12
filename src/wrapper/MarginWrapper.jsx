import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '30px 30px 30px 30px'
    }
}))

const MarginWrapper = (Component) => function HOC() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Component />
        </div>
    );
};

export default MarginWrapper;
