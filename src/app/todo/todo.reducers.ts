import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Todo } from './todo.model';
import { TodoActions, TodoActionsTypes } from './todo.actions';

export interface State extends EntityState<Todo> {
  lastUpdate: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const defaultTodos: any = {
  ids: [0, 1],
  entities: {
    0: new Todo('Learn Angular', 0),
    1: new Todo('Learn Java', 1),
  },
  lastUpdate: new Date().toString(),
};
const initialState: State = todoAdapter.getInitialState(defaultTodos);

export function todoReducer(state: State = initialState, action: TodoActions): State {
  switch (action.type) {
    case TodoActionsTypes.ADD_TODO:
      return todoAdapter.addOne(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
      });
    case TodoActionsTypes.DELETE_TODO:
      debugger
      return todoAdapter.removeOne(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
      });
    case TodoActionsTypes.UPDATE_TODO:
      return todoAdapter.updateOne(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
      });
    case TodoActionsTypes.DELETE_ALL_TODOS:
      return todoAdapter.removeAll({
        ...state,
        lastUpdate: new Date().toString(),
      });
    default:
      return state;
  }
}
