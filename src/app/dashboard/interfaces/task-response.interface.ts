import { Task } from "./task.interface";

export interface TaskResponse {
  success: boolean;
  data:    Task[];
}
