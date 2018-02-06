import React from 'react';
import {DatePicker} from "material-ui";
import {withStyles} from "material-ui-next";

import Wrapper from "../../../../hoc/Wrapper";

const styles = theme => (
    {
        item: {
            margin: '0 0 15px',

            [theme.breakpoints.up('md')]: {
                margin: 0
            }
        },


    }
);

const DateRange = (props) => {
    const {
        formatDate,
        minDate,
        maxDate,
        handleChangeDate,
        classes
    } = props;

    return (
        <Wrapper>
            <DatePicker
                name="minDate"
                formatDate={formatDate('minDate')}
                className={classes.item}
                onChange={handleChangeDate('minDate')}
                autoOk={false}
                defaultDate={minDate}
                disableYearSelection={false}
            />
            <DatePicker
                name="maxDate"
                locale="en-US"
                formatDate={formatDate('maxDate')}
                className={classes.item}
                onChange={handleChangeDate('maxDate')}
                autoOk={false}
                defaultDate={maxDate}
                disableYearSelection={false}
            />
        </Wrapper>
    )
};

export default withStyles(styles)(DateRange);