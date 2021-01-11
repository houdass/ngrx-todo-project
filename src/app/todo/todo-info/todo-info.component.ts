import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';
import * as fromTodoReducers from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';

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
    this.store.dispatch(new fromTodoActions.DeleteAllTodos());
  }
}
