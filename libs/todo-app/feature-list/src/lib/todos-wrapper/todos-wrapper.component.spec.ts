import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosWrapperComponent } from './todos-wrapper.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoEntity } from '@todo-app/todo-app/data-access';

describe('TodosWrapperComponent', () => {
  let component: TodosWrapperComponent;
  let fixture: ComponentFixture<TodosWrapperComponent>;
  let store: MockStore;
  const initialState: TodoEntity = {
    _id: `asd`,
    name: 'TODO ',
    description: 'DESCRIPTION',
    createdAt: new Date(),
    deadline: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosWrapperComponent ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
