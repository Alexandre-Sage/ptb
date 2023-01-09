import { Repository } from "../mariaDb/repositories/repository";
import { Task, TaskRow } from "../types/task/task.type";

export class TaskService {
  constructor(private readonly repository: Repository<Task, TaskRow>) {
    this.repository = repository;
  }
  create = () => {};
  getAll = () => {};
  getById = () => {};
  update = () => {};
  delete = () => {};
}
