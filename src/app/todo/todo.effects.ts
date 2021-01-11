import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromTodoActions from './todo.actions';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoEffects {
  @Effect()
  getTodos$: Observable<Action> = this.actions$.pipe(
    ofType(fromTodoActions.TodoActionsTypes.GET_TODOS),
    switchMap(() =>
      this.todoService.getAll().pipe(
        map((todos: Array<Todo>) => new fromTodoActions.GetTodosSuccess(todos)),
        catchError((err: string) => of(new fromTodoActions.GetTodosError(err))),
      ),
    ),
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
