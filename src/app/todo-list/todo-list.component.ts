import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HoverDirective } from '../hover.directive';
import { Subject } from 'rxjs';

interface todo {
  title: string,
  status: string
  _id?: string
}

@Component({
  selector: 'app-todo-list',
  imports: [MatInputModule, MatButtonModule, MatListModule, MatIconModule, CommonModule, MatFormFieldModule, FormsModule, HoverDirective],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {


  @Input() allTasks: todo[] = [];
  @Input() editSelectedTask: string | null = null;

  @Output() updateTodo = new Subject<{ "id": string, "value": string }>();
  @Output() editTodo = new Subject<string>();
  @Output() deleteTodo = new Subject<string>();


  emitUpdateTask(id: string, value: string) {
    this.updateTodo.next({ "id": id, "value": value });
  }

}
