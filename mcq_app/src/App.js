import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import AdminPage from "./components/admin_stuff/AdminPage";
import McqPage from "./components/pages/McqPage";
import ResultPage from "./components/pages/ResultPage";
import HomePage from "./components/pages/HomePage";
import AddQuesForm from "./components/admin_stuff/single_components/AddQuesForm";
import Message from "./components/single_components/Message";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false,
      totalMarks: 0,
      messageText: "",
      isMessageShowing: false
    };
  }
  // Fetching Data
  async componentDidMount() {
    // Initalize the state with data..
    try {
      const res = (await axios.get("/api/questions")).data;
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
      const newques = (await axios.post("/api/questions", postData)).data;
      // updating the data
      this.setState(prevState => ({
        data: [...prevState.data, newques]
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  handleChecking = async (postData, quesId) => {
    // Set the isloaed to false to show loader while updating
    this.setState({ isLoaded: false });
    try {
      const updatedQues = await axios.put(`/api/questions/${quesId}`, postData);
      // Finding the updated ques in the state
      const prevDataIndex = this.state.data.findIndex(
        ques => ques._id === quesId
      );
      // Replacing the prevQues with updated one
      this.setState(prevState => {
        prevState.data.splice(prevDataIndex, 1, updatedQues.data);
        return { data: prevState.data, isLoaded: true };
      });
      return true;
    } catch (err) {
      console.err(err);
      return false;
    }
  };

  handleDelQues = async quesId => {
    // Set the isloaed to false to show loader while updating
    this.setState({ isLoaded: false });
    try {
      await axios.delete(`/api/questions/${quesId}`);
      const newData = (await axios.get("/api/questions")).data;
      this.setState({
        data: newData,
        isLoaded: true
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  getTotalMarks = marks => {
    this.setState({ totalMarks: marks });
  };

  // Function to shuffle array
  shuffle = arr => {
    var arrLength = arr.length,
      temp,
      index;

    // While there are elements in the array
    while (arrLength > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * arrLength);
      // Decrease arrLength by 1
      arrLength--;
      // And swap the last element with it
      temp = arr[arrLength];
      arr[arrLength] = arr[index];
      arr[index] = temp;
    }
    return arr;
  };

  // notifying messages
  notify = msg => {
    this.setState(prevState => ({
      isMessageShowing: !prevState.isMessageShowing,
      messageText: msg
    }));
    setTimeout(() => {
      this.setState(prevState => ({
        isMessageShowing: !prevState.isMessageShowing,
        messageText: ""
      }));
    }, 1500);
  };

  render() {
    // message style settings..
    let msgStyle;
    if (this.state.isMessageShowing) {
      msgStyle = {
        opacity: "1",
        transform: "translateX(-50%) translateY(50px)"
      };
    }
    return (
      <Router>
        <Header />
        <Message messageText={this.state.messageText} msgStyle={msgStyle} />
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} />} />
          <Route
            exact
            path="/admin"
            render={props => (
              <AdminPage
                {...props}
                {...this.state}
                handleChecking={this.handleChecking}
                handleDelQues={this.handleDelQues}
                notify={this.notify}
              />
            )}
          />
          <Route
            exact
            path="/mcq"
            render={props => (
              <McqPage
                {...props}
                filteredData={this.shuffle(
                  this.state.data.filter(val => val.isChecked)
                )}
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
          <Route
            path="/admin/addquestion"
            render={props => (
              <AddQuesForm
                {...props}
                handlePosting={this.handlePosting}
                notify={this.notify}
              />
            )}
          />
          {/* 404 Route */}
          <Route path="*" render={() => <h1>404 page not found...</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
