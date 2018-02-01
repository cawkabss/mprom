import React, {Component} from 'react';
import {Paper, Icon} from 'material-ui-next';
import {grey} from 'material-ui-next/colors';

class InfoCard extends Component {

    render() {
        const {color, title, value, icon} = this.props;

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
                backgroundColor: color
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

        return (
            <Paper style={{display: 'flex'}}>
                <span style={styles.iconSpan}>
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
    }
}


export default InfoCard;