import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getAllTodo, getSelected, init, selectTodoById, TodoEntity } from '@todo-app/todo-app/data-access';


@Component({
  selector: 'todo-app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  onDestroy: Subject<void> = new Subject();
  todo$: Observable<TodoEntity | undefined> = new Observable<TodoEntity | undefined>();

  constructor(private route: ActivatedRoute, private store: Store<TodoEntity>) {}

  ngOnInit(): void {

    this.route.params.pipe(takeUntil(this.onDestroy)).subscribe((res) => {
      console.log(res);
      this.store.dispatch(init());
      //this.todo$ = this.store.pipe(select(selectTodoById(res.id)))
      this.todo$.subscribe(res => console.log(res))
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
