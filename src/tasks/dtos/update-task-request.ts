import { CreateTaskRequest } from "./create-task-request";

export class UpdateTaskRequest implements Partial<CreateTaskRequest> {
  title?: string;
  description?: string;
  completed?: boolean;
}