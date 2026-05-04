import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { TasksService } from './task.service';
import { CreateTaskRequest } from './dtos/create-task-request';
import { UpdateTaskRequest } from './dtos/update-task-request';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() request: CreateTaskRequest) {
    return this.tasksService.create(request);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: UpdateTaskRequest) {
    return this.tasksService.update(+id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.tasksService.remove(+id);
    return { message: 'Deleted' };
  }
}