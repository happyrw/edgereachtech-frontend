import { ITask } from "@/App";
import TaskComponent from "./TaskComponent";

const DoingTasks = ({ tasksData }: { tasksData: ITask[] }) => {
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      {tasksData.map((task) => (
        <TaskComponent task={task} />
      ))}
    </div>
  );
};

export default DoingTasks;
