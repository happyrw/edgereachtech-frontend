interface IData {
  title: string;
  description: string;
}

interface IUpdate {
  status: string;
  taskId: string;
}

const createTask = async (taskData: IData) => {
  console.log(taskData);
  try {
    const response = await fetch("http://localhost:5000/task/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllTasks = async () => {
  try {
    const response = await fetch("http://localhost:5000/task/get_tasks", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (updateData: IUpdate) => {
  try {
    const response = await fetch("http://localhost:5000/task/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { createTask, getAllTasks, updateTask };
