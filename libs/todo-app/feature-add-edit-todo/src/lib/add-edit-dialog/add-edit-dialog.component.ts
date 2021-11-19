import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  createTodo,
  editTodo,
  TodoEntity,
} from '@todo-app/todo-app/data-access';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../../../data-access/src/lib/todo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'todo-app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss'],
})
export class AddEditDialogComponent implements OnDestroy {
  onDestroy = new Subject();

  minDate: Date = new Date();
  form: FormGroup;

  get name() {
    return this.form.get('name') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  get deadline() {
    return this.form.get('deadline') as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TodoEntity,
    private dialogRef: MatDialogRef<AddEditDialogComponent>,
    private fb: FormBuilder,
    private store: Store<TodoEntity>
  ) {
    this.form = this.fb.group({
      name: [data && data.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      description: [data && data.description, [Validators.required]],
      deadline: [data && data.deadline, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const todo = {
        _id: this.data ? this.data._id : `${Math.floor(Math.random() * 10000)}`,
        name: this.name.value,
        description: this.description.value,
        deadline: this.deadline.value,
        createdAt: new Date().toString(),
        done: false
      } as TodoEntity;

      this.data
        ? this.store.dispatch(editTodo({ todo }))
        : this.store.dispatch(createTodo({ todo }));

      this.dialogRef.close();
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
