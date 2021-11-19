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
  @Output() editTodo = new EventEmitter<void>();
  @Output() markTodoAsDone = new EventEmitter<void>()

  deleteTodoHandler(event: MouseEvent) {
    event.stopPropagation()
    this.todo && this.deleteTodo.emit(this.todo?._id);
  }

  editTodoHandler(event: MouseEvent) {
    event.stopPropagation()
    this.todo && this.editTodo.emit()
  }

}
