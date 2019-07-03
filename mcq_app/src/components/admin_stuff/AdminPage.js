import React from "react";
import "../../stylesheets/_AdminPage.scss";
import TableQues from "./single_components/TableQues";
import AddQuesForm from "./single_components/AddQuesForm";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormShowing: false
    };
  }

  toggleForm = () => {
    this.setState(prevState => ({
      isFormShowing: !prevState.isFormShowing
    }));
  };

  render() {
    const allQues = this.props.data.map(ques => (
      <TableQues
        key={ques._id}
        {...ques}
        handleChecking={this.props.handleChecking}
        handleDelQues={this.props.handleDelQues}
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

    let formStyle;
    // Hiding and showing the form
    if (this.state.isFormShowing) {
      formStyle = {
        transform: "translateX(0)",
        opacity: "1"
      };
    }

    // if there is no data in the database..
    if (this.props.data.length === 0) {
      return (
        <div>
          <center style={{ marginTop: "4rem" }}>
            <h1>No data Found...</h1>
          </center>
          <div className="float-btn" onClick={this.toggleForm}>
            +
          </div>
          <AddQuesForm
            handlePosting={this.props.handlePosting}
            formStyle={formStyle}
          />
        </div>
      );
    }

    return (
      <div>
        <table>
          <thead className="table-head">
            <tr>
              <th>Add Question</th>
              <th>Question Text</th>
              <th>Options</th>
              <th>Right Option</th>
              <th>Manage Question</th>
            </tr>
          </thead>
          <tbody>{allQues}</tbody>
        </table>
        <div className="float-btn" onClick={this.toggleForm}>
          +
        </div>
        <AddQuesForm
          handlePosting={this.props.handlePosting}
          formStyle={formStyle}
        />
      </div>
    );
  }
}

export default AdminPage;
