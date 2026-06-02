// import React, { useState } from "react";
import {
  // CheckCircle,
  // Ellipsis,
  Pencil,
  Square,
  SquareCheck,
  Trash2,
} from "lucide-react";
import type { TaskForm } from "../typescript/types/Task.type";
type TaskProps = {
  Tasks: TaskForm;
  id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
  isEdit: boolean;
};
const ToDoTask_List = ({
  Tasks,
  id,
  onEdit,
  onDelete,
  onCompleted,
  // isEdit,
}: TaskProps) => {
  // const [taskForm, setTaskForm] = useState<TaskForm>({
  //   taskName: "",
  //   taskPriority: "",
  //   taskDescription: "",
  //   taskCompleted: false,
  // });

  // const [tasks, setTasks] = useState<TaskForm[]>(() =>
  //   JSON.parse(localStorage.getItem("Tasks") ?? "[]"),
  // );

  // const [editindex, setEditIndex] = useState<number | null>(null);

  // const handleCompleted = (index: number) => {
  //   const completed = tasks.map((task, i) =>
  //     i === index
  //       ? {
  //           ...task,
  //           taskCompleted: !task.taskCompleted,
  //         }
  //       : task,
  //   );
  //   setTasks(completed);
  //   localStorage.setItem("Tasks", JSON.stringify(completed));
  // };

  // const handleEdit = (index: number) => {
  //   const editTasks = tasks[index];
  //   setTaskForm(editTasks);
  //   setEditIndex(index);
  // };

  // const handleDelete = (index: number) => {
  //   const updated = tasks.filter((task, i) => i !== index);
  //   setTasks(updated);
  //   localStorage.setItem("Tasks", JSON.stringify(updated));
  // };
  return (
    <>
      <div
        className={`flex flex-col text-white border ${
          Tasks.taskCompleted
            ? "bg-[#0b2424] border-[#103232]"
            : "bg-[#0d1f35] border-[#152d4d]"
        } p-4 m-1 rounded-2xl shadow-lg `}
      >
        <div className="">
          <p
            className={`text-base ${Tasks.taskCompleted ? "opacity-60 line-through text-green-200" : "opacity-100"}`}
          >
            <span className="font-bold"></span>
            {Tasks.taskName === "" ? "" : Tasks.taskName}
          </p>
          <p className="text-xs p-1 my-2 opacity-80">
            {Tasks.taskDescription === "" ? "" : Tasks.taskDescription}
          </p>
        </div>
        <div className="flex gap-2 my-2">
          <p
            className={`px-1 text-white ${Tasks.taskPriority === "High" ? "bg-red-500" : Tasks.taskPriority === "Medium" ? "bg-orange-500" : "bg-green-500"} w-fit px-2 rounded-md`}
          >
            {Tasks.taskPriority === "" ? "" : Tasks.taskPriority}
          </p>
          <p className="text-center">{Tasks.deadline === "" ? "" : Tasks.deadline}</p>
          <p
            className={`text-xs bg-slate-500 w-fit h-fit px-1 py-1 border border-black rounded-xl ${Tasks.taskCompleted ? "opacity-60 text-green-200" : "opacity-100"}`}
          >
            {Tasks.taskCompleted ? "Done✔️" : "In-progress"}
          </p>
        </div>

        <div className="mt-auto flex justify-end">
          <button
            className={`border border-zinc-50 ${Tasks.taskCompleted ? "bg-green-500 line-through" : "bg-slate-400"} p-1 px-2 m-1 rounded-xl active:scale-90 transition-transform duration-150`}
            onClick={() => onCompleted(id)}
          >
            {Tasks.taskCompleted ? <SquareCheck /> : <Square size={24} />}
          </button>
          <button
            className="border bg-yellow-500 p-1 px-2 m-1 rounded-xl active:scale-90 transition-transform duration-150"
            onClick={() => onEdit(id)}
            //  disabled={isEdit}
          >
            <Pencil />
          </button>
          <button
            className="border bg-red-500 p-1 px-2 m-1 rounded-xl active:scale-90 transition-transform duration-150"
            onClick={() => onDelete(id)}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDoTask_List;
