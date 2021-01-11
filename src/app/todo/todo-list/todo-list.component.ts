import { Component } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  isEdit = false;
  name: string;
  selectedTodo: Todo;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todosChanged$;
  }

  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.todoService.add(todo);
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    this.todoService.update(this.selectedTodo);
    this.isEdit = false;
    this.name = '';
  }

  deleteTodo(todo: Todo): void {
    this.todoService.delete(todo.id);
  }
}
