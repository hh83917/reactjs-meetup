import React from "react";
import Link from 'react-router-dom/Link';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

import Fetch from "./Fetch";
import Loading from './Loading';
import Error from './Error';


const EventDetails = ({ match }) => (
    <div className='event-details-page'>
        <Link to='/' style={{ display: 'flex', justifyContent: 'center', padding: '20px', textDecoration: 'none' }}>
            <Button variant="raised" color="primary">
                <KeyboardArrowLeft />Back to events
            </Button>
        </Link>
        <div className='event-details'>
            <Fetch
                url={`https://api.meetup.com/reactjs-dallas/events/${
                match.params.id
                }/rsvps?&sign=true&photo-host=public&omit=event,group,venue`}
                loading={() =>  <Loading />}
                done={eventMembers => (
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <p>{eventMembers.length} RSVPs.</p>
                            <p>
                            {eventMembers.filter(x => x.response === "yes").length} going.
                            </p>
                            <p>
                            {eventMembers.reduce((memo, val) => val.response !== 'waitlist' ? memo += val.guests : memo += 0, 0)} guests going.
                            </p>
                            <p>
                            {eventMembers.reduce((memo, val) => val.response === 'waitlist' ? memo += val.guests : memo += 0, 0)} guests not going.
                            </p>
                            <p>
                            {eventMembers.filter(x => x.response === "no").length} no going.
                            </p>
                            <p>
                            {eventMembers.filter(x => x.response === "waitlist").length} on
                            waitlist.
                            </p>
                        </div>
                        <div className='member-table'>
                            <Paper className='member-table-paper'>
                                <Table>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Going</TableCell>
                                        <TableCell numeric>Guests</TableCell>
                                        {/* <TableCell numeric>Protein (g)</TableCell> */}
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {eventMembers.map((x, i) => 
                                        <TableRow key={i}>
                                            <TableCell>
                                                <img src={x.member.photo.thumb_link} alt='Image' />
                                            </TableCell>
                                            <TableCell>{x.member.name}</TableCell>
                                            <TableCell>{x.response}</TableCell>
                                            <TableCell numeric>{x.guests}</TableCell>
                                            {/* <TableCell numeric>{n.protein}</TableCell> */}
                                        </TableRow>
                                    )}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </div>
                )}
                error={error => <Error error={error}/>}
            />
        </div>
    </div>
);

export default EventDetails;