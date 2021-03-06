import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { TodoEntity } from './todo.models';

export const TODO_FEATURE_KEY = 'todo';

export interface State extends EntityState<TodoEntity> {
  selectedId?: string | number; // which Todo record has been selected
  loaded: boolean; // has the Todo list been loaded
  error?: string | null; // last known error (if any)
}

export interface TodoPartialState {
  readonly [TODO_FEATURE_KEY]: State;
}

export const todoAdapter: EntityAdapter<TodoEntity> =
  createEntityAdapter<TodoEntity>({
    selectId: (model: TodoEntity) => model._id as string
  });

export const initialState: State = todoAdapter.getInitialState({
  // set initial required properties
  action: TodoActions,
  loaded: false,
  error: null,
});

const todoReducer = createReducer(
  //init reducers
  initialState,
  on(TodoActions.init, (state) => ({ ...state, loaded: false})),
  on(TodoActions.loadTodoSuccess, (state, { todo }) =>
    todoAdapter.setAll(todo, { ...state, loaded: true })
  ),
  on(TodoActions.loadTodoFailure, (state, { error }) => ({ ...state, error })),

  //create reducers
  on(TodoActions.createTodo, (state, { todo }) =>
    todoAdapter.addOne(todo, { ...state, loaded: false })
  ),
  on(TodoActions.createTodoSuccess, (state, { todo }) =>
    todoAdapter.setAll(todo, { ...state, loaded: true })
  ),
  on(TodoActions.createTodoFail, (state, { error }) => ({ ...state, error })),

  //remove reducers
  on(TodoActions.removeTodo, (state, { id }) =>
    todoAdapter.removeOne(`${id}`, { ...state, loaded: false })
  ),

  on(TodoActions.removeTodoSuccess, (state) => ({ ...state, loaded: true })),

  on(TodoActions.removeTodoFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
