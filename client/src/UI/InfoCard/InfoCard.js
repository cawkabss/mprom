import React from 'react';
import {Paper, Icon} from 'material-ui-next';
import {grey} from 'material-ui-next/colors';

const styles = {
    content: {
        padding: '5px 10px',
    },
    number: {
        display: 'block',
        fontWeight: 900,
        fontSize: 18,
        color: grey[800]
    },
    text: {
        fontSize: 20,
        fontWeight: 500,
        color: grey[800]
    },
    iconSpan: {
        display: 'flex',
        justifyContent: 'center',
        width: 90,
        textAlign: 'center',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        maxWidth: '100%',
        color: '#fff',
        fontSize: 30
    }
};

const InfoCard = ({color, title, value, icon}) => {

    return (
        <Paper style={{display: 'flex'}}>
                <span style={{...styles.iconSpan, backgroundColor: color}}>
                    <Icon
                        className="material-icons"
                        style={styles.icon} >
                    {icon}
                    </Icon>
                </span>

            <div style={styles.content}>
                <span style={styles.text}>{title}</span>
                <span style={styles.number}>{value}</span>
            </div>
        </Paper>
    );
};


export default InfoCard;