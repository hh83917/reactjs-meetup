import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Fetch from "./components/Fetch";
import GroupHeader from './components/GroupHeader';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import Loading from './components/Loading';
import Error from './components/Error';

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <div className='group-header-card'>
            <Fetch
              url="https://api.meetup.com/reactjs-dallas?&sign=true&photo-host=public"
              loading={() => <Loading />}
              done={group => <GroupHeader group={group}/>}
              error={error => <Error error={error} message='Error fetching group infomation.'/>}
            />
          </div>
          <Switch>
            <Route exact path="/" component={Events} />
            <Route path="/event/:id" component={EventDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
