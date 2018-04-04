import React from "react";

import Fetch from "./Fetch";
import GroupEvent from './GroupEvent';
import Loading from './Loading';
import Error from './Error';

const Events = () => (
    <div className='group-events'>
        <Fetch
            url="https://api.meetup.com/reactjs-dallas/events?&sign=true&photo-host=public&page=20"
            loading={() => <Loading />}
            done={events => (
                <div>
                {events.map((x, i) =>
                    <GroupEvent key={i} event={x} />
                )}
                </div>
            )}
            error={error => <Error error={error} message='Error fetching events.'/>}
        />
    </div>
);

export default Events;