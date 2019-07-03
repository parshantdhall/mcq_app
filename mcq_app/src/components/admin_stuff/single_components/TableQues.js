import React from 'react';

class TableQues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.isChecked
    };
  }

  handleCheck = async e => {
    // update the isCheked state
    await this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
    // Update the data into the server
    const { options, questionText, rightOption, _id } = this.props;
    const postData = {
      options,
      questionText,
      rightOption,
      isChecked: this.state.isChecked
    };
    this.props.handleChecking(postData, _id);
  };

  delQues = () => {
    // It will first confirm if user wants to del ques
    if (window.confirm('Really 😒')) {
      this.props.handleDelQues(this.props._id);
    } else {
      return;
    }
  };

  render() {
    const options = this.props.options.map((option, i) => (
      <li key={i} data-id={`option-${i}`}>
        {option}
      </li>
    ));
    return (
      <tr className="ques-row">
        <td>
          <input
            id={this.props._id}
            type="checkbox"
            name="selectedQuestion"
            className="chk-box"
            checked={this.state.isChecked}
            onChange={this.handleCheck}
          />
        </td>
        <td>{this.props.questionText}</td>
        <td>
          <ul style={{ listStyle: 'none' }}>{options}</ul>
        </td>
        <td>{this.props.rightOption}</td>
        <td>
          <button className="del-btn" onClick={this.delQues}>
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default TableQues;
