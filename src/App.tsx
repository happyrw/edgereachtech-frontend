import { Button } from "./components/ui/button";
import { useEffect } from "react";
import AllTask from "./components/AllTask";
import Form from "./components/Form";
import { buttons } from "./data/DammyData";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, fetchTasks, filterTask } from "./store/taskSlice";
import LoadingComponent from "./components/loadingComponent";
import { useNavigate } from "react-router-dom";

interface IButton {
  name: string;
  value: string;
}

const App = () => {
  // const [status, setStatus] = useState("all");

  // Select filteredData from the Redux store
  const filteredTasks = useSelector((state: any) => state.task.filteredData);
  const isLoading = useSelector((state: any) => state.task.isLoading);
  const data = useSelector((state: any) => state.task.data); // Fetch all tasks from the store
  const status = useSelector((state: any) => state.task.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch tasks once on mount
  useEffect(() => {
    dispatch(fetchTasks() as any); // Fetch tasks when the component mounts
  }, [dispatch]);

  // Filter tasks when status changes and tasks are fetched
  useEffect(() => {
    if (data.length > 0) {
      // Only filter if data exists
      dispatch(filterTask());
    }
    if (status !== "update") {
      navigate("/");
    }
  }, [status, dispatch, data]); // Trigger when status or data changes

  return (
    <div className="px-2 lg:px-32 py-10">
      <div className="p-3 bg-blue-700 text-white">
        <p className="text-white text-4xl text-center uppercase py-10">
          project management
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-5 py-3">
        {/* SIDE NAVBAR */}
        <div className="w-full lg:w-1/3 p-2 lg:p-5 grid lg:grid-cols-none grid-cols-3 gap-2">
          {buttons.map((button: IButton) => {
            const isActive = status === button.value;
            return (
              <Button
                onClick={() => dispatch(changeStatus(button.value))}
                key={button.value}
                className={`w-full py-7 px-6 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out text-xl font-semibold flex items-center justify-start bg-gray-700 text-gray-300 rounded-lg shadow-md hover:shadow-lg ${
                  isActive && "bg-blue-700"
                }`}
              >
                {button.name}
              </Button>
            );
          })}
        </div>
        <div className="w-full lg:w-2/3">
          {isLoading && <LoadingComponent />}
          {isLoading && (
            <p className="mt-4 ml-5 text-xl font-bold">Loading...</p>
          )}
          {!isLoading &&
            filteredTasks?.length === 0 &&
            status !== "form" &&
            status !== "update" && (
              <p className="text-xl text-semibold mt-4 text-center">
                No tasks for now
              </p>
            )}
          <AllTask tasksData={filteredTasks} />
          {(status === "form" || status === "update") && <Form />}
        </div>
      </div>
    </div>
  );
};

export default App;
