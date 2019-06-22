import React from 'react';

const TableQues = props => {
  const options = props.options.map((option, i) => (
    <li key={i} data-id={`option-${i}`}>
      {option}
    </li>
  ));
  return (
    <tr className="ques-row">
      <td>
        <input
          type="checkbox"
          name="selectedQuestion"
          className="chk-box"
          checked={props.isChecked}
        />
      </td>
      <td>{props.questionText}</td>
      <td>
        <ol>{options}</ol>
      </td>
      <td>{props.rightOption}</td>
      <td>
        <button className="del-btn">X</button>
      </td>
    </tr>
  );
};

export default TableQues;
