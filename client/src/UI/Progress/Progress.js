import React from 'react';
import {CircularProgress, Typography} from "material-ui-next";

const styles = {
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, .6)'
    }
};

const progress = (props) => {
    return (
        <div style={{
            ...styles.root,
            display: props.show ? 'flex' : 'none'
        }}>
            <Typography type="title" style={{color: '#fff'}}>
                {props.text}
            </Typography>
            <CircularProgress color="secondary" size={60} thickness={5}/>
        </div>
    );
};

export default progress;