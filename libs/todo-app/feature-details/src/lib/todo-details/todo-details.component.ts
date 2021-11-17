import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getSelected, getSelectedById, getTodoLoaded, init, selectEntity } from '@todo-app/todo-app/data-access';

@Component({
  selector: 'todo-app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  onDestroy: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.onDestroy)).subscribe((res) => {
      console.log(res);
      this.store.dispatch(init());
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
