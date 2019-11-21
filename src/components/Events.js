import React, { Fragment } from 'react';
import Event from './Event';

const Events = ({ events }) => {
    return (
        <Fragment>
            {events.map((event, i) => <Event key={i} event={event} />)}
        </Fragment>
    );
};

export default Events;