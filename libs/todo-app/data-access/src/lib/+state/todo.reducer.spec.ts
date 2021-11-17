import { Action } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { TodoEntity } from './todo.models';
import { State, initialState, reducer } from './todo.reducer';

describe('Todo Reducer', () => {
  const createTodoEntity = (
    _id: string,
    name = '',
    description = 'asd',
    createdAt = '',
    deadline = ''
  ): TodoEntity => ({
    _id,
    name: name || `name-${_id}`,
    description,
    createdAt,
    deadline,
  });

  // describe('valid Todo actions', () => {
  //   it('loadTodoSuccess should return the list of known Todo', () => {
  //     const todo = [
  //       createTodoEntity('TODO-aaa'),
  //       createTodoEntity('TODO-zzz'),
  //     ];
  //     const action = TodoActions.loadTodoSuccess({ todo });
  //
  //     const result: State = reducer(initialState, action);
  //
  //     expect(result.loaded).toBe(true);
  //     expect(result.ids.length).toBe(2);
  //   });
  //
  //   it('createTodoSuccess should add todo', () => {
  //     const todo = [
  //       createTodoEntity('TODO-aaa'),
  //       createTodoEntity('TODO-zzz'),
  //     ];
  //     const action = TodoActions.loadTodoSuccess({ todo });
  //
  //     const result: State = reducer(initialState, action);
  //
  //     expect(result.loaded).toBe(true);
  //     expect(result.ids.length).toBe(2);
  //
  //     const addedTodo = [
  //       createTodoEntity('TODO-zzz'),
  //     ]
  //
  //     const actionThen = TodoActions.createTodoSuccess({ todo: addedTodo });
  //
  //     const resultThen: State = reducer(initialState, actionThen);
  //
  //     expect(resultThen.loaded).toBe(true);
  //     expect(resultThen.ids.length).toBe(3)
  //   })
  //
  //   it('removeTodo should remove todo from store', () => {
  //     const todo = [
  //       createTodoEntity('TODO-aaa'),
  //       createTodoEntity('TODO-zzz'),
  //     ];
  //     const action = TodoActions.loadTodoSuccess({ todo });
  //
  //     const result: State = reducer(initialState, action);
  //
  //     expect(result.loaded).toBe(true);
  //     expect(result.ids.length).toBe(2);
  //
  //     const actionThen = TodoActions.removeTodoSuccess()
  //
  //     const resultThen: State = reducer(initialState, actionThen);
  //
  //     expect(resultThen.loaded).toBe(true);
  //     expect(result.ids.length).toBe(1);
  //   })
  // });

  describe('LOAD_TODO action', () => {
    it('should set loading to true', () => {
      const action = TodoActions.init();
      const state = reducer(initialState, action);

      expect(state.loaded).toBe(false);
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LOAD_TODO_SUCCESS action', () => {
    it('should add todos to state', () => {
      const todo = [createTodoEntity('TODO-A')];
      const action = TodoActions.loadTodoSuccess({ todo });
      const state = reducer(initialState, action);

      expect(state.loaded).toBe(true);
      expect(state.ids.length).toBe(1);
    });
  });

  describe('LOAD_TODO_FAIL action', () => {
    it('should set error not to undefined', () => {
      const action = TodoActions.loadTodoFailure({ error: 'error' });
      const state = reducer(initialState, action);

      expect(state.loaded).toBe(true);
      expect(state.error).toBe('sd')
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
