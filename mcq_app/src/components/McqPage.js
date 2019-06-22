import React, { Component } from 'react';
import '../stylesheets/_McqPage.scss';

class McqPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const filteredData = this.props.data.filter(ques => ques.isChecked);
    console.log(filteredData);
    return (
      <div className="McqPage">
        <h1>Quiz</h1>
        <div className="ques-container">
          <div className="time-left">
            <p>15:00</p>
          </div>
          <div className="ques-text">
            <p>
              <span>Ques 1. </span> This is the question one related to lots of
              programming and security stuff?{' '}
            </p>
          </div>
          <form className="option-container">
            <input type="radio" className="option" name="option" />
            <input type="radio" className="option" name="option" />
            <input type="radio" className="option" name="option" />
            <input type="radio" className="option" name="option" />
            <input type="submit" className="submit-btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default McqPage;
