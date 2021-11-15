import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosWrapperComponent } from './todos-wrapper/todos-wrapper.component';
import { TodoAppUiListModule } from '@todo-app/todo-app/ui-list';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppDataAccessModule } from '@todo-app/todo-app/data-access';

const routes: Routes = [
  {
    path: '',
    component: TodosWrapperComponent,
  },
];

@NgModule({
  imports: [CommonModule, TodoAppUiListModule, RouterModule.forChild(routes), TodoAppDataAccessModule],
  declarations: [TodosWrapperComponent],
})
export class TodoAppFeatureListModule {}
