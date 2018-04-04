import React from "react";
import startCase from 'lodash/fp/startCase';
import Link from 'react-router-dom/Link';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import Fetch from "./Fetch";
import Loading from './Loading';
import Error from './Error';

const formatChartData = dataObj =>
    Object.entries(dataObj)
        .reduce((memo, val, idx) => {
            memo[idx] = { name: startCase(val[0]), value: val[1] };
            return memo;
    }, []);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const EventDetails = ({ match }) => (
    <div>
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
                done={eventMembers => {
                    const memberStats = {
                        memberGoing: eventMembers.filter(x => x.response === "yes").length || 0,
                        memberNotGoing: eventMembers.filter(x => x.response === "no").length || 0,
                        guestGoing: eventMembers.reduce((memo, val) => val.response !== 'waitlist' ? memo += val.guests : memo += 0, 0) || 0,
                        guestNotGoing: eventMembers.reduce((memo, val) => val.response === 'waitlist' ? memo += val.guests : memo += 0, 0) || 0,
                        waitlist: eventMembers.filter(x => x.response === "waitlist").length || 0,
                        rsvp: eventMembers.length || 0,
                    };
                    const { rsvp, guestNotGoing, ...stats } = memberStats;
                    const formattedData = formatChartData(stats);

                    return (
                        <div>
                            <div className='stats-panel'>
                                <ExpansionPanel style={{ width: '800px' }}>
                                    <ExpansionPanelSummary
                                        className='stats-panel-summary'
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell numeric>RSVP</TableCell>
                                                    <TableCell numeric>Members Going</TableCell>
                                                    <TableCell numeric>Members Not Going</TableCell>
                                                    <TableCell numeric>Waitlist</TableCell>
                                                    <TableCell numeric>Guests</TableCell>
                                                    <TableCell numeric>Guests Not Going</TableCell>
                                                </TableRow>
                                                </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell numeric>{memberStats.rsvp}</TableCell>
                                                    <TableCell numeric>{memberStats.memberGoing}</TableCell>
                                                    <TableCell numeric>{memberStats.memberNotGoing}</TableCell>
                                                    <TableCell numeric>{memberStats.waitlist}</TableCell>
                                                    <TableCell numeric>{memberStats.guestGoing}</TableCell>
                                                    <TableCell numeric>{memberStats.guestNotGoing}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className='stats-panel'>
                                        <PieChart width={400} height={350}>
                                            <Pie
                                                isAnimationActive={true}
                                                data={formattedData}
                                                cx={200}
                                                cy={200}
                                                dataKey="value"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                            {
                                                formattedData.map((x, i) =>
                                                    <Cell key={i} fill={COLORS[i % COLORS.length]}/>
                                                )
                                            }
                                            </Pie>
                                            <Tooltip />
                                            <Legend verticalAlign='top' textAlign='center' />
                                        </PieChart>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                            <div className='member-table'>
                                <Paper className='member-table-paper'>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Avatar</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Going</TableCell>
                                                <TableCell numeric>Guests</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {eventMembers.map((x, i) => 
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <img src={x.member.photo.thumb_link} alt={x.member.name} />
                                                </TableCell>
                                                <TableCell>{x.member.name}</TableCell>
                                                <TableCell>{x.response}</TableCell>
                                                <TableCell numeric>{x.guests}</TableCell>
                                            </TableRow>
                                        )}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </div>
                        </div>
                    )
                }}
                error={error => <Error error={error}/>}
            />
        </div>
    </div>
);

export default EventDetails;