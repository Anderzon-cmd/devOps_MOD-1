import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskRequest } from './dtos/create-task-request';
import { UpdateTaskRequest } from './dtos/update-task-request';
import { TaskEntity } from './entities/task-entity';

@Injectable()
export class TasksService {
  private tasks: TaskEntity[] = [];
  private idCounter = 1;

  create(request: CreateTaskRequest): TaskEntity {
    const task: TaskEntity = {
      id: this.idCounter++,
      title: request.title,
      description: request.description,
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  findAll(): TaskEntity[] {
    return this.tasks;
  }

  findOne(id: number): TaskEntity {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  update(id: number, request: UpdateTaskRequest): TaskEntity {
    const task = this.findOne(id);
    Object.assign(task, request);
    return task;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Task not found');
    this.tasks.splice(index, 1);
  }
}