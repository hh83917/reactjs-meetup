import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

const DateDisplay = ({ date, style }) => {
    const day = moment(date).format('D');
    const month = moment(date).format('MMM').toUpperCase();

    return (
        <div className='date-display'>
            <div className='date-icon'>
                <div className='date-display-day'>{day}</div>
                <div className='date-display-month'>{month}</div>
            </div>
        </div>
    );
};

DateDisplay.propTypes = {
    date: PropTypes.string.isRequired,
}

export default DateDisplay;