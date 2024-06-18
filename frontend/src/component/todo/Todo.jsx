import React, { useState, useEffect } from "react";
import "./Todo.css";
import Todocard from "./Todocard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from "./UpdateModal";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const id = sessionStorage.getItem("id");

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or Body can't be empty");
      return;
    }

    if (id) {
      try {
        const response = await axios.post("http://localhost:1000/api/v2/addtask", {
          title: inputs.title,
          body: inputs.body,
          id: id
        });

        setArray([...array, response.data]);
        setInputs({ title: "", body: "" });
        toast.success("Your task is added");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Error adding task");
      }
    } else {
      const newTask = { title: inputs.title, body: inputs.body, tempId: Date.now() };
      const updatedArray = [...array, newTask];
      setArray(updatedArray);
      localStorage.setItem("tasks", JSON.stringify(updatedArray));
      setInputs({ title: "", body: "" });
      toast.error("Your task is added  ! Saved SignUp to Save ");
    }
  };

  const del = async (taskId) => {
    console.log(taskId);
    if (id) {
      await axios.delete(`http://localhost:1000/api/v2/deleteTask/${taskId}`, { data: { id: id } }).then((response) => {
        console.log(response);

        const updatedArray = array.filter(item => item._id !== taskId);
        setArray(updatedArray);
        localStorage.setItem("tasks", JSON.stringify(updatedArray));
        toast.success("Task Deleted Successfully")
      });
    } else {
      const updatedArray = array.filter(item => item.tempId !== taskId);
      setArray(updatedArray);
      localStorage.setItem("tasks", JSON.stringify(updatedArray));
      toast.success("Task Deleted Successfully")
    }
  };

  const openUpdateModal = (index) => {
    setCurrentItem(array[index]);
    setCurrentIndex(index);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentItem(null);
    setCurrentIndex(null);
  };

  const updateItem = (updatedItem) => {
    const updatedArray = [...array];
    updatedArray[currentIndex] = updatedItem;
    setArray(updatedArray);
    if (!id) {
      localStorage.setItem("tasks", JSON.stringify(updatedArray));
    }
  };
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:1000/api/v2/get/${id}`).then((response) => {
        if (response.data.list) {
          setArray(response.data.list);
        }
      }).catch((error) => {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks");
      });
    } else {
      const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setArray(localTasks);
    }
  }, [id]);

  // Clear local storage on window unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex my-4 align-items-center justify-content-center">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              name="title"
              placeholder="TITLE"
              className="todo-inputs  p-2"
              value={inputs.title}
              onChange={change}
              onClick={show}
            />
            <textarea
              id="textarea"
              name="body"
              placeholder="BODY"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={change}
              style={{ display: "none" }}
            ></textarea>
          </div>
          <div className="w-100 w-lg-50 d-flex justify-content-end ">
            <button className="todo-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container">
            <div className="row">
              {array.map((item, index) => (
                <div key={item._id || item.tempId} className="col-lg-3 col-11 mx-lg-5 mx-3 my-2">
                  <Todocard
                    title={item.title}
                    body={item.body}
                    id={item._id || item.tempId}
                    delid={del}
                    upid={() => openUpdateModal(index)}  // Pass index instead of id
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <UpdateModal
        item={currentItem}
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onUpdate={updateItem}
        taskId={currentItem ? currentItem._id || currentItem.tempId : null}  // Pass taskId
      />
    </>
  );
};

export default Todo;
