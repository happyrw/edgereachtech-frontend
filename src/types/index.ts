export interface ITask {
  title: string;
  description: string;
  status: string;
  _id: string;
}

export interface ITaskState {
  isLoading: boolean;
  data: ITask[];
  filteredData: ITask[];
  error: string | null;
  status:
    | "all"
    | "pending"
    | "doing"
    | "with_issue"
    | "escaped"
    | "done"
    | "form";
}

export interface ICreateTask {
  title: string;
  description: string;
}
