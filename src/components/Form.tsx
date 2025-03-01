import { changeStatus, taskCreate, taskUpdate } from "@/store/taskSlice";
import { ICreateTask, ITask } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "./loadingComponent";
// import { ITask } from "@/types";

const Form = () => {
  // URL id
  const taskId = new URLSearchParams(window.location.search).get("taskId");
  const [task, setTask] = useState<ICreateTask>({
    title: "",
    description: "",
  });

  // redux
  const isLoading = useSelector((state: any) => state.task.isLoading);
  const error = useSelector((state: any) => state.task.error);
  const filteredData = useSelector((state: any) => state.task.filteredData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      const updateTask = filteredData.find(
        (task: ITask) => task._id === taskId
      );
      setTask({
        title: updateTask ? updateTask.title : "",
        description: updateTask ? updateTask.description : "",
      });
    } else {
      setTask({ title: "", description: "" });
    }
  }, [taskId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      task,
      taskId,
    };
    if (taskId) {
      dispatch(taskUpdate(data as any) as any);
    } else {
      dispatch(taskCreate(task as any) as any);
    }
    dispatch(changeStatus("all"));
  };

  if (taskId && !task.title) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className="max-w-xl mx-2 md:mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          {taskId ? "Update the below task" : "Add Task Here Below"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="textInput"
              className="block text-sm text-slate-300 mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="textInput"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="descriptionInput"
              className="block text-sm text-slate-300 mb-2"
            >
              Description:
            </label>
            <textarea
              id="descriptionInput"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter task description"
            ></textarea>
          </div>

          {error && (
            <p className="bg-white text-red-700 px-4 py-2 text-center rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? "Loading..." : taskId ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
