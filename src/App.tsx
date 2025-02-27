import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import AllTask from "./components/AllTask";
import DoingTasks from "./components/DoingTasks";
import WithIssue from "./components/WithIssue";
import EscapedTasks from "./components/EscapedTasks";
import DoneTasks from "./components/DoneTasks";
import Form from "./components/Form";
import { buttons } from "./data/DammyData";
import { getAllTasks } from "./data/databaseData";
import PendingTasks from "./components/PendingTasks";

interface IButton {
  name: string;
  value: string;
}

export interface ITask {
  title: string;
  description: string;
  status: string;
  _id: string;
}

const App = () => {
  const [status, setStatus] = useState("all");
  const [data, setData] = useState<ITask[]>([]);
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);

  const getDatabaseTask = async () => {
    setLoading(true);
    const databaseData = await getAllTasks();
    if (databaseData.tasks) {
      setAllTasks(databaseData.tasks);
    }
    setLoading(false);
  };

  const filterData = (status: string) => {
    if (status === "all") {
      setData(allTasks);
      return;
    }
    const tasks = allTasks?.filter((task) => task.status === status);
    setData(tasks);
  };

  useEffect(() => {
    getDatabaseTask();
  }, []);

  useEffect(() => {
    filterData(status);
  }, [status, allTasks]);

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
          {/* links */}
          {buttons.map((button: IButton) => {
            const isActive = status === button.value;
            return (
              <Button
                onClick={() => setStatus(button.value)}
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
          {loading && (
            <div className="text-xl font-semibold mt-4 ml-4">Loading...</div>
          )}
          {!loading && data?.length === 0 && status !== "form" && (
            <p className="text-xl text-semibold mt-4 text-center">
              No tasks for now
            </p>
          )}
          {status === "all" && <AllTask tasksData={data} />}
          {status === "pending" && <PendingTasks tasksData={data} />}
          {status === "doing" && <DoingTasks tasksData={data} />}
          {status === "with_issue" && <WithIssue tasksData={data} />}
          {status === "escaped" && <EscapedTasks tasksData={data} />}
          {status === "done" && <DoneTasks tasksData={data} />}
          {status === "form" && (
            <Form setStatus={setStatus} setAllTasks={setAllTasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
