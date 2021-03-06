import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as TodoActions from './todo.actions';
import { TodoEffects } from './todo.effects';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_CONFIG } from '@todo-app/app-config';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../../apps/todo-app/src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from '../todo.service';
import { TodoEntity } from '@todo-app/todo-app/data-access';

describe('TodoEffects', () => {
  let actions: Observable<Action>;
  let effects: TodoEffects;
  let service: TodoService;

  const todos: TodoEntity[] = [
    {
      _id: 'is',
      name: '',
      description: '',
      createdAt: '',
      deadline: '',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: APP_CONFIG, useValue: environment },
        TodoEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        TodoService,
      ],
    });

    effects = TestBed.inject(TodoEffects);
    service = TestBed.inject(TodoService);
  });

  describe('init$', () => {
    xit('should work', () => {
      actions = hot('-a-|', { a: TodoActions.init() });

      const expected = hot('-a-|', {
        a: TodoActions.loadTodoSuccess({ todo: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
