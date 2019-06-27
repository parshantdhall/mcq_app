import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import AdminPage from './components/AdminPage';
import McqPage from './components/McqPage';
import ResultPage from './components/ResultPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false,
      totalMarks: 0
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

  handlePosting = async postData => {
    try {
      const newques = (await axios.post('/api/questions', postData)).data;
      // updating the data
      this.setState(prevState => ({
        data: [...prevState.data, newques]
      }));
    } catch (err) {
      console.error(err);
    }
  };

  handleChecking = async (postData, quesId) => {
    // Set the isloaed to false to show loader while updating
    this.setState({ isLoaded: false });
    try {
      const updatedQues = await axios.put(`/api/questions/${quesId}`, postData);
      const prevDataIndex = this.state.data.findIndex(
        ques => ques._id === quesId
      );
      this.setState(prevState => {
        prevState.data.splice(prevDataIndex, 1, updatedQues.data);
        return { data: prevState.data, isLoaded: true };
      });
    } catch (err) {
      console.err(err);
    }
  };

  handleDelQues = async quesId => {
    // Set the isloaed to false to show loader while updating
    this.setState({ isLoaded: false });
    try {
      await axios.delete(`/api/questions/${quesId}`);
      const newData = (await axios.get('/api/questions')).data;
      this.setState({
        data: newData,
        isLoaded: true
      });
    } catch (err) {
      console.error(err);
    }
  };

  getTotalMarks = marks => {
    this.setState({ totalMarks: marks });
  };
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/admin"
            render={props => (
              <AdminPage
                {...props}
                {...this.state}
                handlePosting={this.handlePosting}
                handleChecking={this.handleChecking}
                handleDelQues={this.handleDelQues}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <McqPage
                {...props}
                filteredData={this.state.data.filter(val => val.isChecked)}
                isLoaded={this.state.isLoaded}
                getTotalMarks={this.getTotalMarks}
              />
            )}
          />
          <Route
            path="/result"
            render={props => (
              <ResultPage {...props} totalMarks={this.state.totalMarks} />
            )}
          />
          {/* 404 Route */}
          <Route render={() => <h1>404 page not found...</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
