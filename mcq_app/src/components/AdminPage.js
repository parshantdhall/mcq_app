import React from 'react';
import '../stylesheets/_AdminPage.scss';

class AdminPage extends React.Component {
  render() {
    const quesMarkUp = (
      <tr className="ques-row">
        <td>
          <input type="checkbox" name="selectedQuestion" className="chk-box" />
        </td>
        <td>
          This is the text ofdcsdvsdvsdvd dvsdvadv sdvsdv sdvsdvsdvsdv
          sdvsdvsdvsdv dsvsdvsd text question
        </td>
        <td>
          <ol>
            <li>optioncscscscscscscscscscscscscsc </li>
            <li>option aadasdcascascas</li>
            <li>option scsacas</li>
          </ol>
        </td>
        <td>This is the right option</td>
        <td>
          <button className="del-btn">X</button>
        </td>
      </tr>
    );
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
        <tbody>
          {quesMarkUp}
          {quesMarkUp}
        </tbody>
      </table>
    );
  }
}

export default AdminPage;
