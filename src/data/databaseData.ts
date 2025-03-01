interface IData {
  title: string;
  description: string;
}

export interface IUpdate {
  status: string;
  taskId: string;
}

const createTask = async (taskData: IData) => {
  console.log(taskData);
  try {
    const response = await fetch(
      "https://redux-back.onrender.com/task/createTask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllTasks = async () => {
  try {
    const response = await fetch(
      "https://redux-back.onrender.com/task/get_tasks",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateTaskAPI = async (updateData: IUpdate) => {
  console.log(updateData);
  try {
    const response = await fetch(
      "https://redux-back.onrender.com/task/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (taskId: string) => {
  console.log("task deleted");

  try {
    const response = await fetch(
      "https://redux-back.onrender.com/task/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { createTask, getAllTasks, updateTaskAPI, deleteTask };
