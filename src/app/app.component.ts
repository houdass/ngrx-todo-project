import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromTodoReducer from './todo/todo.reducers';
import * as fromTodoActions from './todo/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private store: Store<fromTodoReducer.State>) {
    this.store.dispatch(new fromTodoActions.GetTodos());
  }
}
