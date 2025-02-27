import { ITask } from "@/App";
import { useState } from "react";
import LoadingComponent from "./loadingComponent";
import { updateTask } from "@/data/databaseData";

const TaskComponent = ({ task }: { task: ITask }) => {
  const [taskStatus, setTaskStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (status: string, taskId: string) => {
    const singleData = {
      status,
      taskId,
    };
    setUpdating(true);
    try {
      const data = await updateTask(singleData);
      console.log(data);
      if (!data.updatedTask) {
        return alert("Task not updated");
      }
      window.location.reload();
      setTaskStatus(status);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <>
      {updating && <LoadingComponent />}
      <div className=" flex flex-col justify-between border-2 bg-slate-700 relative text-white px-4 py-2 rounded-lg hover:scale-x-95 transition-all duration-200 ease-in-out">
        <div>
          <p className="absolute top-2 right-2 text-xl">📌</p>
          <h1 className="font-bold text-xl mb-2">{task.title}</h1>
          <p className="border-l-4 border-blue-500 rounded-xl px-2 py-4 text-xl font-semibold">
            {task.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <select
            name=""
            value={taskStatus ? taskStatus : task.status}
            onChange={(e) => handleStatusChange(e.target.value, task._id)}
            id="select"
            className="bg-gray-700 px-4 border-2  border-white rounded-xl"
          >
            <option value="doing">Doing</option>
            <option value="pending">Pending</option>
            <option value="with_issue">With Issue</option>
            <option value="escaped">Escaped</option>
            <option value="done">Done</option>
          </select>
          <p className="text-gray-400 capitalize text-sm pt-4 text-end">
            {taskStatus ? taskStatus : task.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default TaskComponent;
