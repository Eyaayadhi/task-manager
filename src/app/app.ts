
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './services/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  tasks: Task[] = [];
  newTask = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  addTask(): void {
    if (!this.newTask.trim()) return;

    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.newTask = '';
        this.loadTasks();
      },
      error: (err) => console.error('Error adding task:', err)
    });
  }

  toggleTask(task: Task): void {
    this.taskService.updateTask(task.id, !task.completed).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error updating task:', err)
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error deleting task:', err)
    });
  }
}
