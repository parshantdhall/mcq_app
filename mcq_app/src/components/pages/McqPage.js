import React, { PureComponent } from 'react';
import '../../stylesheets/_McqPage.scss';
import McqCard from '../single_components/McqCard';
import { Redirect } from 'react-router-dom';

class McqPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nextQues: 0,
      marks: 0,
      minTime: 1,
      secTime: 60,
      toResultPage: false
    };
  }

  incrementNextQues = correctOption => {
    // Check if the selected option is correct next increment marks by 1
    if (
      correctOption === this.props.filteredData[this.state.nextQues].rightOption
    ) {
      this.setState(prevState => ({
        marks: prevState.marks + 1
      }));
    }
    // check if there's next question by checking the length
    if (this.state.nextQues < this.props.filteredData.length - 1) {
      this.setState(prevState => ({
        nextQues: prevState.nextQues + 1
      }));
    } else {
      // redirect to result page with total marks
      this.goToResult();
    }
  };

  goToResult = () => {
    // Sending total marks to result page
    this.props.getTotalMarks(this.state.marks);
    // set the result page to true
    this.setState({
      toResultPage: true
    });
  };

  render() {
    // All the Questions which will render
    const questions = this.props.filteredData.map((ques, i) => (
      <McqCard
        key={ques._id}
        ques={ques}
        i={i}
        minutes={this.state.minTime}
        seconds={this.state.secTime}
        incrementNextQues={this.incrementNextQues}
      />
    ));

    // if data not loaded yet then show only loader
    if (!this.props.isLoaded) {
      return (
        <div className="loader-container">
          <div className="mul13">
            <div className="m13s m13c1" />
            <div className="m13s m13c2" />
          </div>
        </div>
      );
    }

    // redirecting to result page
    if (this.state.toResultPage) {
      return <Redirect to="/result" />;
    }

    return (
      <div className="McqPage">
        <h1 className="McqPage-heading">Quiz</h1>
        {questions[this.state.nextQues]}
      </div>
    );
  }

  componentDidMount() {
    this.inervalId = setInterval(() => {
      // Check if timer is less than a min and ends
      if (this.state.minTime < 1 && this.state.secTime <= 1) {
        // when timer ends
        this.setState({
          secTime: 0
        });
        clearInterval(this.inervalId);
        // GO to results page
        this.goToResult();
        return;
      }
      // while sectime > 1 decrement it
      if (this.state.secTime > 1) {
        this.setState(prevState => ({
          secTime: prevState.secTime - 1
        }));
        // if min time is > 0 then decrement it and reset the secs..
      } else if (this.state.minTime > 0) {
        this.setState(prevState => ({
          minTime: prevState.minTime - 1,
          secTime: 60
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inervalId);
  }
}
export default McqPage;
