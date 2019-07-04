import React from "react";
import "../../stylesheets/_AdminPage.scss";
import TableQues from "./single_components/TableQues";
import { Link } from "react-router-dom";

class AdminPage extends React.Component {
  render() {
    const allQues = this.props.data.map(ques => (
      <TableQues
        key={ques._id}
        {...ques}
        history={this.props.history}
        handleUpdation={this.props.handleUpdation}
        handleDelQues={this.props.handleDelQues}
        notify={this.props.notify}
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

    // if there is no data in the database..
    if (this.props.data.length === 0) {
      return (
        <div>
          <center style={{ marginTop: "4rem" }}>
            <h1>No data Found...</h1>
          </center>
          <Link to="/admin/addquestion" className="float-btn">
            +
          </Link>
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
        <Link to="/admin/addquestion" className="float-btn">
          +
        </Link>
      </div>
    );
  }
}

export default AdminPage;
