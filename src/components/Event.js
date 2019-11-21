import React, { Fragment } from 'react';

const Event = ({ event }) => {
    return (
        <Fragment>
            {<h5>{event.summary}</h5>}
        </Fragment>
    );
};

export default Event;