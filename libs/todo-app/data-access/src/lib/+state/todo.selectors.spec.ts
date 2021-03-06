import { TodoEntity } from './todo.models';
import { todoAdapter, TodoPartialState, initialState } from './todo.reducer';
import * as TodoSelectors from './todo.selectors';

describe('Todo Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTodoId = (it: TodoEntity) => it._id;
  const createTodoEntity = (_id: string, name = '', description = '', createdAt = '', deadline = '') =>
    ({
      _id,
      name: name || `name-${_id}`,
      description,
      createdAt,
      deadline,
    } as TodoEntity);

  let state: TodoPartialState;

  beforeEach(() => {
    state = {
      todo: todoAdapter.setAll(
        [
          createTodoEntity('PRODUCT-AAA'),
          createTodoEntity('PRODUCT-BBB'),
          createTodoEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Todo Selectors', () => {
    it('getAllTodo() should return the list of Todo', () => {
      const results = TodoSelectors.getAllTodo(state);
      const selId = getTodoId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TodoSelectors.getSelected(state) as TodoEntity;
      const selId = getTodoId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getTodoLoaded() should return the current "loaded" status', () => {
      const result = TodoSelectors.getTodoLoaded(state);

      expect(result).toBe(true);
    });

    it('getTodoError() should return the current "error" state', () => {
      const result = TodoSelectors.getTodoError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
