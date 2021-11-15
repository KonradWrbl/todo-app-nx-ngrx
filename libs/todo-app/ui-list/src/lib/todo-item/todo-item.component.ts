import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoEntity } from '@todo-app/todo-app/data-access';

@Component({
  selector: 'todo-app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo?: TodoEntity;
  @Output() deleteTodo = new EventEmitter<number | string>();

  removeTodo() {
    this.todo && this.deleteTodo.emit(this.todo?.id);
  }
}
