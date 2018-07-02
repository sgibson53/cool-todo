import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'seth-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: any;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(res => {
      this.todos = res.filter(el => el.hasOwnProperty('label'));
    });
  }

}
