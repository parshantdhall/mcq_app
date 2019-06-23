import React, { Component } from 'react';

export default class McqCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // Check if the selected option is right and increment to next ques
    this.props.incrementNextQues(this.props.ques.rightOption);
  };

  handleChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    return (
      <div className="ques-container" id={this.props.ques._id}>
        <div className="time-left">
          <p>15:00</p>
        </div>
        <div className="ques-text">
          <p>
            <span>Ques {this.props.i + 1}. </span>
            {this.props.ques.questionText}
          </p>
        </div>
        <form className="option-container" onSubmit={this.handleSubmit}>
          {this.props.ques.options.map((option, i) => (
            <div className="radio-container" key={i}>
              <input
                type="radio"
                name="option"
                value={option}
                className="form-radio"
                checked={this.state.selectedOption === option}
                onChange={this.handleChange}
              />
              <label>{option}</label>
            </div>
          ))}
          <div style={{ marginTop: '4rem' }}>
            <input type="submit" className="submit-btn" />
          </div>
        </form>
      </div>
    );
  }
}
