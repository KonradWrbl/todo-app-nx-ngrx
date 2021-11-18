import { createAction, props } from '@ngrx/store';
import { TodoEntity } from './todo.models';
import { Update } from '@ngrx/entity';

//load todo

export enum LoadTodoActionTypes {
  INIT = '[Todo/API] Load Todo Failure',
  LOAD_TODO_SUCCESS = '[Todo/API] Load Todo Success',
  LOAD_TODO_FAIL = '[Todo/API] Load Todo Failure',
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

//create todo

export enum CreateTodoActionTypes {
  CREATE_TODO = '[Todo Page] Create Todo',
  CREATE_TODO_SUCCESS = '[Todo Page] Create Todo Success',
  CREATE_TODO_FAIL = '[Todo Page] Create Todo Fail',
}

export const createTodo = createAction(
  CreateTodoActionTypes.CREATE_TODO,
  props<{ todo: TodoEntity }>()
);

export const createTodoSuccess = createAction(
  CreateTodoActionTypes.CREATE_TODO_SUCCESS,
  props<{ todo: TodoEntity[] }>()
);

export const createTodoFail = createAction(
  CreateTodoActionTypes.CREATE_TODO_FAIL,
  props<{ error: any }>()
);

//remove todo

export enum RemoveTodoActionTypes {
  REMOVE_TODO = '[Todo Page] Remove Todo',
  REMOVE_TODO_SUCCESS = '[Todo Page] Remove Todo Success',
  REMOVE_TODO_FAIL = '[Todo Page] Remove Todo Fail',
}

export const removeTodo = createAction(
  RemoveTodoActionTypes.REMOVE_TODO,
  props<{ id: string | number }>()
);

export const removeTodoSuccess = createAction(
  RemoveTodoActionTypes.REMOVE_TODO_SUCCESS,
);

export const removeTodoFail = createAction(
  RemoveTodoActionTypes.REMOVE_TODO_FAIL,
  props<{ error: any }>()
);

export enum RemoveTodoActionTypes {
  EDIT_TODO = '[Todo Page] Edit Todo',
  EDIT_TODO_SUCCESS = '[Todo Page] Edit Todo Success',
  EDIT_TODO_FAIL = '[Todo Page] Edit Todo Fail',
}

export const editTodo = createAction(
  RemoveTodoActionTypes.EDIT_TODO,
  props<{ todo: TodoEntity }>()
);

export const editTodoSuccess = createAction(
  RemoveTodoActionTypes.EDIT_TODO_SUCCESS,
);

export const editTodoFail = createAction(
  RemoveTodoActionTypes.EDIT_TODO_FAIL,
  props<{ error: any }>()
);


