import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosWrapperComponent } from './todos-wrapper/todos-wrapper.component';
import { TodoAppUiListModule } from '@todo-app/todo-app/ui-list';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppDataAccessModule } from '@todo-app/todo-app/data-access';
import { SharedMaterialModule } from '@todo-app/shared/material';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';

const routes: Routes = [
  {
    path: '',
    component: TodosWrapperComponent,
  },
];

@NgModule({
  imports: [CommonModule, TodoAppUiListModule, RouterModule.forChild(routes), TodoAppDataAccessModule, SharedMaterialModule],
  declarations: [TodosWrapperComponent, AddTodoFormComponent],
})
export class TodoAppFeatureListModule {}
