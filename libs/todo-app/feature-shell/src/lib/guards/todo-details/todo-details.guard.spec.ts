import { TestBed } from '@angular/core/testing';

import { TodoDetailsGuard } from './todo-details.guard';

describe('TodoDetailsGuard', () => {
  let guard: TodoDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TodoDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
