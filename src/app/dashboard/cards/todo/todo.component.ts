import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/index.service';
import { Task, TaskResponse } from '../../interfaces';

@Component({
  selector: 'ally-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  public titleTasks: string = 'Otras tareas';

  private taskService   = inject(TaskService);
  public tasks: Task[]  = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response: TaskResponse) => {
        this.tasks = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
