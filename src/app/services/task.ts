
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Add a task
  addTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title });
  }

  // Update a task
  updateTask(id: number, completed: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { completed });
  }

  // Delete a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
