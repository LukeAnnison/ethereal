import React, { useState, useEffect } from "react";

import { titleTruncate } from "../utils/dataRecord";

const DataRecord = ({ dataRecord, handleDelete }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="data-record">
      <div className="data-record-left">
        <label className="data-record-checkbox-container">
          <input
            type="checkbox"
            value="check"
            className="data-record-checkbox"
            checked={selected}
            onChange={() => setSelected(!selected)}
          ></input>

          <span className="data-record-checkmark"></span>
        </label>
        <div className="data-title">
          <p>
            {selected
              ? titleTruncate(dataRecord.title, 30)
              : titleTruncate(dataRecord.title, 40)}
          </p>
        </div>
      </div>
      <div className="time">
        <p>{dataRecord.time}</p>
      </div>
      <div
        onClick={() => handleDelete(dataRecord)}
        className={selected ? "delete-slide__selected" : "delete-slide"}
      >
        <p className={selected ? "delete-button__selected" : "delete-button"}>
          Delete
        </p>
      </div>
    </div>
  );
};

export default DataRecord;
