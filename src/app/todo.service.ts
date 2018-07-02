import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) { }

  saveTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`http://localhost:8080/api/saveTodo`, todo, {});
  }

  deleteTodo(id: string): Observable<{}> {
    return this.http.post(`http://localhost:8080/api/deleteTodo`, {id: id});
  }

  getAllTodos(): Observable<any> {
    return this.http.get('http://localhost:8080/api/todos');
  }

}
