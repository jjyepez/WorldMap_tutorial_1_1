import React from "react";
import "./css/DataTable_Countries.css";

export default function DataTable_Countries({ data = [], fields = [] } = {}) {
  return data && data.length > 0 ? (
    <table className="DataTable_Countries">
      <thead>
        <tr>
          <th>País</th>
          <th>CC</th>
          <th>+</th>
          <th>R</th>
          {/*<th>A</th>*/}
        </tr>
      </thead>
      <tbody>
        {data.map((reg, i) => {
          return (
            <tr key={i}>
              <td>{reg[0]}</td>
              <td>{reg[1]}</td>
              <td>{reg[2]}</td>
              <td>{reg[3]}</td>
              {/*<td>{reg[4]}</td>*/}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div>Loading ...</div>
  );
}
