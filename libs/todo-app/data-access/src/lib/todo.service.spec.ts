import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_CONFIG } from '@todo-app/app-config';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../apps/todo-app/src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APP_CONFIG, useValue: environment }],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
