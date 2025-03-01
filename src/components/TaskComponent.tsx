import { ITask } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, taskDelete, taskUpdate } from "@/store/taskSlice";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TaskComponent = ({ task }: { task: ITask }) => {
  const [openButton, setOpenButton] = useState(false);
  const error = useSelector((state: any) => state.task.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStatusChange = async (status: string, taskId: string) => {
    const singleData = {
      status,
      taskId,
    };

    dispatch(taskUpdate(singleData) as any);
    if (error) {
      alert(error);
    }
  };

  const handleChange = (taskId: string, action: string) => {
    if (action === "edit") {
      // open modal for editing
      dispatch(changeStatus("update"));
      navigate(`/?taskId=${taskId}`);
    } else if (action === "delete") {
      // delete task
      dispatch(taskDelete(taskId) as any);
      setOpenButton(false);
    }
  };
  return (
    <>
      <div className=" flex flex-col justify-between border-2 bg-slate-700 relative text-white px-4 py-2 rounded-lg hover:scale-x-95 hover:z-10 transition-all duration-200 ease-in-out">
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
            value={task.status}
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
          <div className="relative flex items-center">
            <p className="text-gray-400 capitalize text-sm pt-4 text-end">
              {task.status}
            </p>
            <button
              onClick={() => setOpenButton((prev) => !prev)}
              className="bg-blue-800 mt-4 px-2 ml-2 rounded-lg"
            >
              <MoreHorizontal />
            </button>
            {openButton && (
              <div className="absolute top-12 -right-4 z-30 bg-black p-3 rounded-lg">
                <div className="flex items-center">
                  <button
                    onClick={() => handleChange(task._id, "edit")}
                    className="bg-emerald-700 p-2"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleChange(task._id, "delete")}
                    className="bg-red-700 p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskComponent;
