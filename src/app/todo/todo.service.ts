import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Todo } from './todo.model';
import { delay } from 'rxjs/operators';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}todos`).pipe(delay(5000));
  }
}
