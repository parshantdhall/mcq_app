import React, { Component } from "react";
import "../../../stylesheets/_AddQuesForm.scss";
export default class AddQuesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionText: "",
      options: [""],
      rightOption: "none"
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    // post to db
    this.props.handlePosting(this.state);
    // resetting the state after submitting
    this.setState({
      questionText: "",
      options: [""],
      rightOption: "none"
    });
    // Notification
    this.props.notify("Question Added Successfully..");
  };

  // Function to add option input
  addOption = e => {
    const { options } = this.state;
    this.setState({
      options: [...options, ""]
    });
  };

  // Function to remove option input
  removeOption = i => {
    this.setState(prevState => {
      prevState.options.splice(i, 1);
      return { options: prevState.options };
    });
  };
  // handling options
  handleOptionInput = e => {
    const index = Number(e.target.name.split("-")[1]);
    let options = this.state.options.map((option, i) =>
      i === index ? e.target.value : option
    );
    this.setState({ options });
  };

  render() {
    // creating option input
    const optionInput = this.state.options.map((option, i) => (
      <div key={`option-${i}`} className="form-div">
        <label>Option: {i + 1} </label>
        <textarea
          name={`option-${i}`}
          type="text"
          value={option}
          autoComplete="off"
          placeholder="Add option"
          onChange={this.handleOptionInput}
        />
        <button
          className="remove-option-btn"
          onClick={this.removeOption.bind(null, i)}
        >
          X
        </button>
      </div>
    ));

    // Creating the selection drop down for selection right option..
    const rightOpt = (
      <select
        onChange={this.handleChange}
        name="rightOption"
        required
        value={this.state.rightOption}
      >
        <option value="">None</option>
        {this.state.options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );

    // Return state starts...
    return (
      <form className="add-form" onSubmit={this.handleFormSubmit}>
        <div className="form-div">
          <label>Question Text</label>
          <input
            value={this.state.questionText}
            required
            autoComplete="off"
            name="questionText"
            onChange={this.handleChange}
          />
        </div>
        {optionInput}
        <button
          type="button"
          onClick={this.addOption}
          className="add-option-btn"
        >
          +
        </button>
        <div className="select-right-option">
          <label>Select Right Option</label>
          {rightOpt}
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
