import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';
import { select, Store } from '@ngrx/store';
import * as fromTodoReducers from '../todo.reducers';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
})
export class TodoInfoComponent {
  todoState$: Observable<fromTodoReducers.State>;

  constructor(private todoService: TodoService, private store: Store<fromTodoReducers.State>) {
    this.todoState$ = this.store.pipe(select('todo'));
  }

  deleteAllTodos(): void {
    this.store.dispatch({ type: 'DELETE ALL TODOS' });
  }
}
