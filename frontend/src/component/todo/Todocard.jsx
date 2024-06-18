import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

import "./Todo.css";

const Todocard = ({ title, body, id, delid, upid }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="p-3 todo-cards"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h5>{title}</h5>
      <p className={`todo-card-p ${isHovered ? "hovered" : ""}`}>
        {isHovered ? body : `${body.slice(0, 77)}`}
      </p>
      <div className="d-flex justify-content-around">
        <div
          className="card-icons align-items-center card-icons-head d-flex"
          onClick={upid}
        >
          <GrDocumentUpdate className="card-icons" style={{ cursor: "pointer" }} />
          <span style={{ cursor: "pointer" }}>Update</span>
        </div>
        <div
          className="card-icons align-items-center card-icons-head d-flex text-danger"
          onClick={() => delid(id)}
        >
          <AiFillDelete className="card-icons del" style={{ cursor: "pointer" }} />
          <span style={{ cursor: "pointer" }}>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default Todocard;
