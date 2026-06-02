import React, { useState } from "react";
import type { TaskForm } from "../typescript/types/Task.type";
import ToDoTask_List from "./ToDoTask_List";
import ToggleSwitch from "./ToggleSwitch";

{
  /*Features: Add, remove, mark as completed.
Scope: Array state management using useState. */
}
const ToDoTask = () => {
  const [taskForm, setTaskForm] = useState<TaskForm>({
    taskName: "",
    taskPriority: "",
    taskDescription: "",
    deadline: "",
    taskCompleted: false,
  });
  const [tasks, setTasks] = useState<TaskForm[]>(() =>
    JSON.parse(localStorage.getItem("Tasks") ?? "[]"),
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editindex, setEditIndex] = useState<number | null>(null);
  // const [isEnter, setIsEnter] = useState<boolean>(false);

  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // setIsEnter((prev) => !prev);
    console.log(e);
  };
  {
    /*This toogle the button between mark done/done */
  }
  const handleCompleted = (index: number) => {
    const completed = tasks.map((task, i) =>
      i === index
        ? {
            ...task,
            taskCompleted: !task.taskCompleted,
          }
        : task,
    );
    setTasks(completed);
    localStorage.setItem("Tasks", JSON.stringify(completed));
  };

  const handleEdit = (index: number) => {
    const editTasks = tasks[index];
    setTaskForm(editTasks);
    setEditIndex(index);
    setIsEdit(true);
  };

  const handleDelete = (index: number) => {
    const updated = tasks.filter((_task, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("Tasks", JSON.stringify(updated));
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updated = tasks.map((task, i) => (i === editindex ? taskForm : task));
    setTasks(updated);
    localStorage.setItem("Tasks", JSON.stringify(updated));
    setTaskForm({
      taskName: "",
      taskPriority: "",
      taskDescription: "",
      deadline: "",
      taskCompleted: false,
    });
    setEditIndex(null);
    setIsEdit(!isEdit);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updated = [...tasks, taskForm];
    setTasks(updated);
    localStorage.setItem("Tasks", JSON.stringify(updated));
    console.log(updated);
    setTaskForm({
      taskName: "",
      taskPriority: "",
      taskDescription: "",
      deadline: "",
      taskCompleted: false,
    });
  };

  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <div className={`h-[100vh]  ${toggle ? "bg-[#231F20]" : "bg-[#f5f5f5]"}`}>
        <div
          className={`flex justify-between  ${toggle ? "bg-[#231F20]" : "bg-[#f5f5f5]"}`}
        >
          <h1
            className={`text-center tracking-tight font-semibold font-inter ml-2 pl-2 py-2 pr-4 mt-2 mb-2 text-sm ${toggle ? " bg-zinc-900 text-slate-50 border border-[#D4AF37]" : "bg-slate-50 text-zinc-900 border border-[#D4AF37]"} w-fit rounded-tl-md rounded-tr-3xl`}
          >
            <span className="">To Do</span>
          </h1>
          <ToggleSwitch handleToggle={handleToggle} toggle={toggle} />
        </div>
        <div
          className={` flex flex-col md:flex-row justify-center gap-4 font-inter ${toggle ? "text-white bg-[#231F20]" : "text-black bg-[#f5f5f5]"}`}
        >
          <div className="flex justify-start h-[28rem] ml-2">
            <form
              className={`flex flex-col w-96 ${toggle ? "text-zinc-400 bg-[#231F20]" : "text-black bg-[#f5f5f5] border-black"} border p-4 rounded-xl`}
            >
              <label htmlFor="">Task Name</label>
              <input
                className="border rounded-lg p-2 px-2 "
                placeholder="Enter Task"
                type="text"
                name="taskName"
                onChange={handleChange}
                value={taskForm.taskName}
              />
              <label htmlFor="" className="mt-2">
                Task Description
              </label>
              <textarea
                className="border rounded-lg p-2 px-2"
                placeholder="Enter task description"
                name="taskDescription"
                onChange={handleChange}
                value={taskForm.taskDescription}
              ></textarea>
              <label htmlFor="" className="mt-2">
                Deadline
              </label>
              <input
                className="border rounded-lg p-2 px-2"
                type="date"
                name="deadline"
                onChange={handleChange}
                value={taskForm.deadline}
              />
              <label htmlFor="" className="mt-2">
                Task Priority
              </label>
              <select
                className="border rounded-lg p-2 px-2"
                name="taskPriority"
                onChange={handleChange}
                value={taskForm.taskPriority}
              >
                <option value=""> ---Select--- </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button
                className="border rounded-lg p-2 mt-8 font-bold bg-blue-400 active:scale-95 transition-transform duration-150"
                onClick={
                  editindex !== null && isEdit ? handleUpdate : handleSubmit
                }
              >
                {editindex !== null && isEdit ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>

          <div
            className={`w-[90vw] ${toggle ? "text-white bg-[#231F20]" : "text-black bg-[#f5f5f5] border-[#D4AF37]"} border rounded-2xl shadow-md mx-2`}
          >
            <div className="flex flex-col md:flex-row justify-between p-2 ">
              <div>
                <h2 className="text-left font-inter text-4xl font-bold tracking-tighter mt-2 ml-2 px-2 ">
                  Tasks
                </h2>
                <p
                  className={` px-2 text-sm w-fit rounded-md border${toggle ? "text-white" : "text-black"} mx-4`}
                >
                  {today}
                </p>
              </div>
              <div className="w-fit h-fit flex gap-1">
                {" "}
                <p className="border text-center p-2 rounded-xl">
                  Total Tasks:{tasks.length}{" "}
                </p>
                <p className="border text-center p-2 rounded-xl bg-green-300">
                  Completed Tasks:
                  {tasks.filter((task) => task.taskCompleted === true).length}
                </p>
                <p className="border text-center p-2 rounded-xl bg-red-300">
                  Remaining Tasks:
                  {tasks.filter((task) => task.taskCompleted === false).length}
                </p>
              </div>
            </div>

            <div className="h-[75vh] grid grid-cols-1 my-2 mx-4 overflow-auto">
              {tasks.map((task, index) => (
                <ToDoTask_List
                  key={index}
                  id={index}
                  Tasks={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCompleted={handleCompleted}
                  isEdit={isEdit}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoTask;
