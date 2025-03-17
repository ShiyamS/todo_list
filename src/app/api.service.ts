import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private getUpdatedTodos = new Subject<todo[]>();
  allTodos$ = this.getUpdatedTodos.asObservable();



  constructor(private http: HttpClient) { }

  getMessage(): Observable<data> {
    return this.http.get<data>('http://localhost:3000/api/message');
  }

  createTodo(data: todo): Observable<todo> {
    return this.http.post<todo>('http://localhost:3000/api/createTodo', data).pipe(tap(() => this.refreshTodoList()));
  }

  getTodo(): Observable<todo[]> {
    return this.http.get<todo[]>('http://localhost:3000/api/getTodos').pipe(tap(data => this.getUpdatedTodos.next(data)));
  }

  deleteTodo(id: string): Observable<todo> {
    return this.http.delete<todo>(`http://localhost:3000/api/deleteTodo/${id}`).pipe(tap(() => this.refreshTodoList()));
  }

  updateTodo(id: string, data: todo): Observable<todo> {
    return this.http.put<todo>(`http://localhost:3000/api/updateTodo/${id}`, data).pipe(tap(() => this.refreshTodoList()));
  }

  refreshTodoList() {
    this.getTodo().subscribe();
  }

}

interface data {
  message: string;
}

interface todo {
  title: string,
  status: string
  _id?: string
}
