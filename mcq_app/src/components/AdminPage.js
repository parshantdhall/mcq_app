import React from 'react';
import '../stylesheets/_AdminPage.scss';
import TableQues from './TableQues';

class AdminPage extends React.Component {
  render() {
    const allQues = this.props.data.map(ques => (
      <TableQues key={ques._id} {...ques} />
    ));
    return (
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
    );
  }
}

export default AdminPage;
