import React from 'react';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Card, { CardContent } from 'material-ui/Card';

import DateDisplay from './DateDisplay';

const GroupEvent = ({ event }) => {
    const eventTime = moment(`${event.local_date} ${event.local_time}`).format('dddd, MMMM D, YYYY, H:mA');

    return (
        <div className='events-list'>
            <Link to={`/event/${event.id}`}>
                <Card className='group-event'>
                    <DateDisplay date={event.local_date} />
                    <CardContent className='event-info'>
                        <div className='event-time'>{eventTime}</div>
                        <div className='event-title'>{event.name}</div>
                        <br />
                        <div className='event-stats'>
                            {event.yes_rsvp_count} Going / {event.waitlist_count} Waitlist / {event.rsvp_limit} RSVP Limit
                        </div>
                    </CardContent>
                    <div className='event-location'>
                        <div className='location-title'>{event.venue.name}</div>
                        <div>{event.venue.address_1}</div>
                        {event.venue.address_2 && <div>{event.venue.address_2}</div>}
                        <div>{event.venue.city}</div>
                        <div>{event.venue.state}</div>
                    </div>
                </Card>
            </Link>
        </div>
    );
}

export default GroupEvent;