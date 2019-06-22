import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import AdminPage from './components/AdminPage';
import McqPage from './components/McqPage';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false
    };
  }
  // Fetching Data
  async componentDidMount() {
    // Initalize the state with data..
    try {
      const res = (await axios.get('/api/questions')).data;
      this.setState({
        data: res,
        isLoaded: true
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/admin"
            render={props => <AdminPage {...props} />}
          />
          <Route exact path="/" render={props => <McqPage {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
