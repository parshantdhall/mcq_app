import React, { Component } from 'react';
import '../stylesheets/_McqPage.scss';
import McqCard from './McqCard';

class McqPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextQues: 0,
      marks: 0
    };
  }

  incrementNextQues = correctOption => {
    if (correctOption === this.props.filteredData[this.state.nextQues]) {
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
      console.log('Done');
      // doo the total marks here
      console.log(this.state.marks);
    }
  };

  render() {
    // All the Questions which will render
    const questions = this.props.filteredData.map((ques, i) => (
      <McqCard
        key={ques._id}
        ques={ques}
        i={i}
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
    return (
      <div className="McqPage">
        <h1>Quiz</h1>
        {questions[this.state.nextQues]}
      </div>
    );
  }
}
export default McqPage;
