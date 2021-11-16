import { Action } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { TodoEntity } from './todo.models';
import { State, initialState, reducer } from './todo.reducer';

describe('Todo Reducer', () => {
  const createTodoEntity = (_id: string, name = '', description = 'asd', createdAt = '', deadline = ''): TodoEntity => ({
    _id,
    name: name || `name-${_id}`,
    description,
    createdAt,
    deadline,
  });

  describe('valid Todo actions', () => {
    it('loadTodoSuccess should return the list of known Todo', () => {
      const todo = [
        createTodoEntity('TODO-aaa'),
        createTodoEntity('TODO-zzz'),
      ];
      const action = TodoActions.loadTodoSuccess({ todo });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('createTodoSuccess should return the list of Todo', () => {
      const todo = [
        createTodoEntity('TODO-aaa'),
        createTodoEntity('TODO-bbb'),
        createTodoEntity('TODO-zzz'),
      ]

      const action = TodoActions.createTodoSuccess({todo});

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(3)
    })
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
