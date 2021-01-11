import { Todo } from './todo.model';
import { TodoActions, TodoActionsTypes } from './todo.actions';

export interface State {
  todos: Array<Todo>;
  lastUpdate: string;
}

const initialState: State = {
  todos: [new Todo('Learn Java from NgRx'), new Todo('Learn Angular from NgRx')],
  lastUpdate: new Date().toString()
};

export function todoReducer(state: State = initialState, action: TodoActions): State {
  switch (action.type) {
    case TodoActionsTypes.ADD_TODO:
      return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [...state.todos, action.payload]
      };
    case TodoActionsTypes.DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter((t: Todo) => t.id !== action.payload),
        lastUpdate: new Date().toString()
      };
    case TodoActionsTypes.UPDATE_TODO:
      const todos = state.todos.map((t: Todo) => {
        if (t.id === action.payload.id) {
          t = { ...t, ...action.payload };
        }
        return t;
      });
      return {
        ...state,
        todos,
        lastUpdate: new Date().toString()
      };
    case TodoActionsTypes.DELETE_ALL_TODOS:
      return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: []
      };
    default:
      return state;
  }
}
