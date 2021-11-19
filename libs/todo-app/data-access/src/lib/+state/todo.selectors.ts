import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY, State, todoAdapter } from './todo.reducer';
import { TodoEntity } from './todo.models';
import { Dictionary } from '@ngrx/entity';

// Lookup the 'Todo' feature state managed by NgRx
export const getTodoState = createFeatureSelector<State>(TODO_FEATURE_KEY);

const { selectAll, selectEntities,  } = todoAdapter.getSelectors();

export const getTodoLoaded = createSelector(
  getTodoState,
  (state: State) => state.loaded
);

export const getTodoError = createSelector(
  getTodoState,
  (state: State) => state.error
);

export const getAllTodo = createSelector(getTodoState, (state: State) =>
  selectAll(state)
);

export const getTodoEntities = createSelector(getTodoState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getTodoState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getTodoEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectTodoById = (id: string) =>
  createSelector(getTodoEntities, (entities) => {
    return entities[id];
  });

export const filterEntityByDone = (
  entities: Dictionary<TodoEntity>,
  done: boolean = false
) => {
  const doneIds = Object.values(entities)
    .filter((el) => (done ? el?.done : !el?.done))
    .map((el) => el?._id);
  const newEntities = {} as Dictionary<TodoEntity>;
  doneIds.map((el) => {
    el && (newEntities[el] = entities[el]);
  });
  return newEntities;
};

export const getDone = createSelector(getTodoEntities, (entities) =>
  filterEntityByDone(entities, true)

);

export const getUndone = createSelector(getTodoEntities, (entities) =>
  filterEntityByDone(entities)
);
