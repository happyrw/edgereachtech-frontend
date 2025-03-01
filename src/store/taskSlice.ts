import {
  createTask,
  deleteTask,
  getAllTasks,
  IUpdate,
  updateTaskAPI,
} from "@/data/databaseData";
import { ICreateTask, ITaskState } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const data = await getAllTasks();
  return data.tasks;
});

export const taskUpdate = createAsyncThunk(
  "tasks/updateTask",
  async (updateData: IUpdate) => {
    const data = await updateTaskAPI(updateData);
    return data.updatedTask;
  }
);

export const taskCreate = createAsyncThunk(
  "tasks/createTask",
  async (taskData: ICreateTask) => {
    const data = await createTask(taskData);
    return data.newTask;
  }
);

export const taskDelete = createAsyncThunk(
  "task/delete",
  async (taskId: string) => {
    const data = await deleteTask(taskId);
    return data.deletedTaskId; // Return the deleted task's ID
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    isLoading: false,
    data: [],
    filteredData: [],
    error: null,
    status: "all",
  } as ITaskState,
  reducers: {
    changeStatus: (state, action) => {
      const status = action.payload;
      state.status = status;
    },
    filterTask: (state) => {
      if (state.status === "all") {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(
          (task) => task.status === state.status
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch task
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      // Update task
      .addCase(taskUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskUpdate.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        console.log(updatedTask);
        const index = state.data.findIndex(
          (task) => task._id === updatedTask._id
        );

        if (index !== -1) {
          state.data[index] = updatedTask;
        }

        state.isLoading = false;
      })
      .addCase(taskUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update task";
      })
      // Create task
      .addCase(taskCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        const newTask = action.payload;
        state.data.push(newTask);
      })
      .addCase(taskCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create task";
      })
      // Delete
      .addCase(taskDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedTaskId = action.payload;
        state.data = state.data.filter((task) => task._id !== deletedTaskId);
      })
      .addCase(taskDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete task";
      });
  },
});

export const { filterTask, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;

// // Update
// if (index !== -1) {
//   state.data[index] = updatedTask; // Update the task at the found index
// }

// // Create
// state.data.push(newTask); // Always add the new task to the array

// // Delete
// state.data = state.data.filter((task) => task._id !== deletedTask._id); // Remove the task with the specified _id
