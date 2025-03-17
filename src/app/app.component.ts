import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

interface data {
  message: string;
}

interface todo {
  title: string,
  status: string
  _id?: string
}
enum todoStatus {
  "Inprogess" = "inprogress",
  "Completed" = "completed",
  "Pending" = "pending"
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tastStatus: todoStatus = todoStatus.Inprogess
  title = 'todo_list';
  taskTitle!: string;
  taskStatus: string = "pending";
  tasks: todo[] = [];
  message!: string;
  selectedTaskID: string | null = null;


  private apiService = inject(ApiService);

  ngOnInit() {
    this.apiService.getMessage().subscribe((data: data) => {
      this.message = data.message;
    })

    this.getAllTasks();

  }

  getAllTasks() {
    this.apiService.refreshTodoList();
    this.apiService.allTodos$.subscribe((data) => {
      this.tasks = data;
    })

  }


  addTask() {
    console.log();
    if (this.taskTitle) {
      const prepareTask: todo = {
        title: this.taskTitle,
        status: this.taskStatus,
      }
      this.apiService.createTodo(prepareTask).subscribe(() => {
        this.resetTask()
      })
    }
  }


  deleteTask(id: string) {
    this.apiService.deleteTodo(id).subscribe()
  }

  editTask(id: string) {
    this.selectedTaskID = id;
  }

  updateTask(id: string, task: string) {
    const findID = this.tasks.find((task) => task._id === id);
    if (findID) {
      const preparedata = {
        title: task,
        status: findID.status
      }

      this.apiService.updateTodo(id, preparedata).subscribe(() => {
        this.selectedTaskID = null;
      })
    }

  }

  resetTask() {
    this.taskTitle = '';
    this.taskStatus = 'pending';
  }
}
