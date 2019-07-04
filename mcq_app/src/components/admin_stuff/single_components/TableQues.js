import React from "react";

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
    this.props.handleUpdation(postData, _id)
      ? this.props.notify("Mcq Added")
      : this.props.notify("Err an Error occured!");
  };

  delQues = () => {
    // It will first confirm if user wants to del ques
    if (window.confirm("Really 😒")) {
      const isDeleted = this.props.handleDelQues(this.props._id);
      if (isDeleted) {
        this.props.notify("Deletion Successful");
      } else {
        this.props.notify("Errr An error Occured!");
      }
    } else {
      return;
    }
  };

  editQues = () => {
    // go to edit page with ques data..
    const { _id, options, questionText, rightOption, isChecked } = this.props;
    const quesData = { _id, options, questionText, rightOption, isChecked };

    this.props.history.push({
      pathname: `/admin/editquestion/${this.props._id}`,
      state: { data: quesData }
    });
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
          <ul style={{ listStyle: "none" }}>{options}</ul>
        </td>
        <td>{this.props.rightOption}</td>
        <td>
          <button className="del-btn" onClick={this.delQues}>
            X
          </button>
          <button className="del-btn" onClick={this.editQues}>
            edit
          </button>
        </td>
      </tr>
    );
  }
}

export default TableQues;
