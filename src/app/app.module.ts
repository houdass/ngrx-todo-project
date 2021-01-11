import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoInfoComponent } from './todo/todo-info/todo-info.component';
import { todoReducer } from './todo/todo.reducers';
import { TodoEffects } from './todo/todo.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoInfoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ todo: todoReducer }),
    EffectsModule.forRoot([TodoEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 10 }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
