# todo-info.component.html

```
<h3>TODO Info</h3>
<h5>Total des todos: {{ todos$ | async }}</h5>
<!-- <h5>Dernière mise à jour: {{ lastUpdate$ | async | date:'mediumTime' }}</h5> -->

<button class="btn btn-danger btn-sm" (click)="deleteAllTodos()">
  Tout supprimer
  <span class="fa fa-trash"></span>
</button>
```

# todo-info.component.ts

```
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
})
export class TodoInfoComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getAll();
  }

  deleteAllTodos(): void {
    this.todoService.deleteAll();
  }
} 
```

# todo-list.component.html

```
<h3>TODO List</h3>
<div class="input-group">
  <input class="form-control" (keyup.enter)="isEdit ? confirmTodo(name) : addTodo(name)" [(ngModel)]="name">
  <button class="btn btn-success" (click)="addTodo(name)" *ngIf="!isEdit" [disabled]="!name">
    Ajouter
  </button>
  <button class="btn btn-info" (click)="confirmTodo(name)" *ngIf="isEdit" [disabled]="!name">
    Modifier
  </button>
</div>

<ng-container *ngIf="todos$ | async as todos">
  <div *ngFor="let todo of todos" class="mt-3">
    {{ todo.name }}
    <div class="btn-group btn-group-sm float-right">
      <button class="btn btn-info" (click)="updateTodo(todo.id, todo)">
        <span class="fa fa-edit"></span>
      </button>
      <button class="btn btn-danger" (click)="deleteTodo(todo.id)">
        <span class="fa fa-trash"></span>
      </button>
    </div>
  </div>
  <h3 *ngIf="todos.length === 0" class="mt-3">
    Aucun TODO trouvé, veuillez en rajouter.
  </h3>
</ng-container>
```

# todo-list.component.ts

```
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  isEdit = false;
  name: string;
  selectedTodo: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todos$ = this.todoService.getAll();
  }

  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.todoService.add(todo).subscribe(() => {
      console.info(`Todo: ${todo.name} was successfully created.`);
      this.getTodos();
    });
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
    this.newTodo = '';
  }

  deleteTodo(todo: Todo): void {
    this.todoService.delete(todo.id).subscribe(() => {
      console.info(`Todo with ID: ${todo.name} was successfully deleted.`);
      this.getTodos();
    });
  }
}
```
   
# todo.service.ts

```
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = [new Todo('Learn Java'), new Todo('Learn Angular')];
  todosChanged = new BehaviorSubject(this.todos);

  constructor() {}

  add(todo: Todo) {
    this.todos.push(todo);
    this.todosChanged.next(this.todos.slice());
  }

  delete(index: number): void {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }

  update(index: number, todo: Todo): void {
    this.todos[index] = todo;
    this.todosChanged.next(this.todos.slice());
  }

  deleteAll(): void {
    this.todos = [];
    this.todosChanged.next(this.todos.slice());
  }
}
```
