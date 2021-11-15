import { createAction, props } from '@ngrx/store';
import { TodoEntity } from './todo.models';

export enum LoadTodoActionTypes {
  INIT = '[Todo/API] Load Todo Failure',
  LOAD_TODO_SUCCESS = '[Todo/API] Load Todo Success',
  LOAD_TODO_FAIL = '[Todo/API] Load Todo Failure',
}

export enum CreateTodoActionTypes {
  CREATE_PIZZA = '[Todo Page] Create Pizza',
  CREATE_PIZZA_SUCCESS = '[Todo Page] Create Pizza Success',
  CREATE_PIZZA_FAIL = '[Todo Page] Create Pizza Fail',
}

export const init = createAction(LoadTodoActionTypes.INIT);

export const loadTodoSuccess = createAction(
  LoadTodoActionTypes.LOAD_TODO_SUCCESS,
  props<{ todo: TodoEntity[] }>()
);

export const loadTodoFailure = createAction(
  LoadTodoActionTypes.LOAD_TODO_FAIL,
  props<{ error: any }>()
);

//create store

export const createTodo = createAction(
  CreateTodoActionTypes.CREATE_PIZZA,
  props<{ todo: TodoEntity }>()
);

export const createTodoSuccess = createAction(
  CreateTodoActionTypes.CREATE_PIZZA_SUCCESS,
  props<{ todo: TodoEntity[] }>()
);

export const createTodoFail = createAction(
  CreateTodoActionTypes.CREATE_PIZZA_FAIL,
  props<{ error: any }>()
);
