import { ITask } from "@/App";
import TaskComponent from "./TaskComponent";

const DoneTasks = ({ tasksData }: { tasksData: ITask[] }) => {
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      {tasksData.map((task) => (
        <TaskComponent task={task} key={task._id} />
      ))}
    </div>
  );
};

export default DoneTasks;
