import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Todo.css";

const UpdateModal = ({ item, isOpen, onClose, onUpdate, taskId }) => {
  const [inputs, setInputs] = useState({ title: "", body: "" });

  useEffect(() => {
    if (item) {
      setInputs({ title: item.title, body: item.body });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or Body can't be empty");
    } else {
      try {
        if (taskId) {
          await axios.post(`http://localhost:1000/api/v2/updateTask/${taskId}`, {
            title: inputs.title,
            body: inputs.body
          });
        }
        onUpdate(inputs);
        toast.success("Task updated successfully");
        onClose();
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Error updating task");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Task</h2>
        <input
          type="text"
          name="title"
          placeholder="TITLE"
          className="my-2 p-2"
          value={inputs.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="BODY"
          className="p-2"
          value={inputs.body}
          onChange={handleChange}
        ></textarea>
        <button className='btn btn-dark' onClick={handleSubmit}>Update</button>
        <button className='btn btn-danger' onClick={onClose}>Close</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateModal;
