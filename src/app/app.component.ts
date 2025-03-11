import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo_list';
  task = '';
  tasks: string[] = [];


  addTask() {
    if (this.task != '') {
      this.tasks.push(this.task);
      this.task = '';
    }
  }


  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
