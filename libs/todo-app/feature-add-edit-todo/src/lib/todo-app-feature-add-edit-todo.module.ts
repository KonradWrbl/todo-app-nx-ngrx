import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditDialogComponent } from './add-edit-dialog/add-edit-dialog.component';
import { SharedMaterialModule } from '@todo-app/shared/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoAppDataAccessModule } from '@todo-app/todo-app/data-access';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedMaterialModule, TodoAppDataAccessModule ],
  declarations: [
    AddEditDialogComponent,
  ],
})
export class TodoAppFeatureAddEditTodoModule {}
